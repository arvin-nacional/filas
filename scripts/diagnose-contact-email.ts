import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
try {
  console.log('Email configuration:', {
    adapter: payload.email.name,
    apiKeyPresent: Boolean(process.env.RESEND_API_KEY),
    sender: process.env.RESEND_FROM_ADDRESS,
  })
  const form = await payload.findByID({
    collection: 'forms', id: '6ab3e00df7f844d9c6d8e59b', depth: 0, overrideAccess: true,
  })
  console.log('Notifications:', form.emails?.map(({ emailTo, emailFrom, replyTo, subject }) => ({ emailTo, emailFrom, replyTo, subject })))
  const submissions = await payload.find({
    collection: 'form-submissions', where: { form: { equals: form.id } },
    sort: '-createdAt', limit: 5, depth: 0, overrideAccess: true,
  })
  console.log('Recent submissions:', { total: submissions.totalDocs, dates: submissions.docs.map(({ createdAt }) => createdAt) })
  if (process.env.RESEND_API_KEY) {
    for (const endpoint of ['domains', 'emails']) {
      const response = await fetch(`https://api.resend.com/${endpoint}`, {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      })
      const result = await response.json()
      console.log(`Resend ${endpoint}:`, response.status, response.ok
        ? result.data?.slice(0, 5).map((item: Record<string, unknown>) => endpoint === 'domains'
          ? { name: item.name, status: item.status }
          : { id: item.id, created_at: item.created_at, from: item.from, to: item.to, last_event: item.last_event })
        : { name: result.name, message: result.message })
    }
  }
} finally {
  await payload.destroy()
}
process.exit(0)
