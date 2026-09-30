import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// One-time setup. Future recipient changes belong in Payload: Forms > FILAS business inquiry > Emails.
const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    overrideAccess: true,
    depth: 0,
    limit: 1,
  })
  const inquiry = docs[0]?.layout.find((block) => block.blockType === 'contactInquiry')
  if (!inquiry?.form) throw new Error('Contact inquiry form not found')
  const id = typeof inquiry.form === 'object' ? inquiry.form.id : inquiry.form
  const form = await payload.findByID({ collection: 'forms', id, overrideAccess: true, depth: 0 })
  if (form.emails?.length) {
    console.log('Preserved existing admin-managed notification settings.')
  } else if (process.argv.includes('--write')) {
    if (!process.env.RESEND_FROM_ADDRESS || !process.env.RESEND_API_KEY)
      throw new Error('Resend sender and API key are required')
    const saved = await payload.update({
      collection: 'forms',
      id,
      overrideAccess: true,
      data: {
        emails: [
          {
            emailTo: 'arvin@rvinpaul.com',
            emailFrom: process.env.RESEND_FROM_ADDRESS,
            replyTo: '{{email}}',
            subject: 'New FILAS website inquiry',
            message: {
              root: {
                type: 'root',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'A visitor sent an inquiry through the FILAS website. Reply to this email to respond directly to them.',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '{{*:table}}',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    })
    if (saved.emails?.[0]?.emailTo !== 'arvin@rvinpaul.com')
      throw new Error('Notification configuration verification failed')
    console.log(
      `Configured editable contact notifications for arvin@rvinpaul.com. Form: ${id}. No email sent.`,
    )
  } else console.log('Ready to configure the contact notification recipient in Payload.')
} finally {
  await payload.destroy()
}
process.exit(0)
