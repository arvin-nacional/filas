import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const message = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
      ],
    })),
  },
})

const payload = await getPayload({ config })
try {
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const inquiry = pages.docs[0]?.layout.find((block) => block.blockType === 'contactInquiry')
  if (!inquiry?.form) throw new Error('Contact form not found')
  const id = typeof inquiry.form === 'object' ? inquiry.form.id : inquiry.form
  const form = await payload.findByID({ collection: 'forms', id, depth: 0, overrideAccess: true })
  const emails = [...(form.emails || [])]
  const notificationIndex = emails.findIndex(
    (email) => email.emailTo && !email.emailTo.includes('{{'),
  )
  const notification = notificationIndex >= 0 ? emails[notificationIndex] : undefined
  const recipient = notification?.emailTo || 'arvin@rvinpaul.com'
  const sender = process.env.RESEND_FROM_ADDRESS
  if (!sender) throw new Error('RESEND_FROM_ADDRESS is required')
  const updatedNotification = {
    ...notification,
    emailTo: recipient,
    emailFrom: `FILAS <${sender}>`,
    replyTo: '{{email}}',
    subject: 'New FILAS website inquiry',
    message: message([
      'A new inquiry is ready for your review.',
      'Contact: {{contactName}} · {{company}}',
      'Reply directly to this email to follow up with the sender.',
      '{{*:table}}',
    ]),
  }
  if (notificationIndex >= 0) emails[notificationIndex] = updatedNotification
  else emails.push(updatedNotification)
  const replyIndex = emails.findIndex((email) => email.emailTo?.trim() === '{{email}}')
  const reply = {
    ...(replyIndex >= 0 ? emails[replyIndex] : {}),
    emailTo: '{{email}}',
    emailFrom: `FILAS <${sender}>`,
    replyTo: recipient,
    subject: 'We’ve received your inquiry | FILAS',
    message: message([
      'Hi {{contactName}},',
      'Thank you for reaching out to FILAS. We’ve received your inquiry about {{company}}.',
      'Our team will review what you shared and get in touch to discuss your goals and the next steps.',
      'Have anything to add? Reply to this email and it will reach our team.',
      'We look forward to learning more about your brand.',
      'The FILAS team',
    ]),
  }
  if (replyIndex >= 0) emails[replyIndex] = reply
  else emails.push(reply)
  if (process.argv.includes('--write')) {
    const directory = path.join(os.tmpdir(), 'filas-content-backups')
    await mkdir(directory, { recursive: true })
    await writeFile(
      path.join(directory, `contact-emails-${Date.now()}.json`),
      JSON.stringify(form.emails),
      { flag: 'wx' },
    )
    const saved = await payload.update({
      collection: 'forms',
      id,
      overrideAccess: true,
      data: { emails },
    })
    if (!saved.emails?.some((email) => email.emailTo === '{{email}}'))
      throw new Error('Auto-reply was not saved')
    console.log('Saved branded notification and auto-reply templates. No email sent.')
  } else
    console.log('Ready to update notification and auto-reply. Use --write to save. No email sent.')
} finally {
  await payload.destroy()
}
process.exit(0)
