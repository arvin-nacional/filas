import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'

const escapeHTML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  )

/** Email clients require inline styles and table layouts rather than website CSS. */
export const renderFormEmail = (content: string, subject: string) => {
  const body = content
    .replace(/<p>/g, '<p style="margin:0 0 20px;">')
    .replace(
      /<table[^>]*>/g,
      '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;">',
    )
    .replace(
      /<td[^>]*>/g,
      '<td style="padding:12px;border:1px solid #dedbd4;vertical-align:top;overflow-wrap:anywhere;">',
    )
    .replace(
      /<th[^>]*>/g,
      '<th align="left" style="padding:12px;border:1px solid #dedbd4;background:#efeee7;">',
    )
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHTML(subject)}</title></head>
<body style="margin:0;padding:0;background:#efeee7;color:#1c1c1b;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efeee7;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#faf9f6;border:1px solid #dedbd4;">
<tr><td style="padding:28px 32px;border-top:5px solid #a95536;border-bottom:1px solid #dedbd4;"><div style="font-size:28px;font-weight:700;letter-spacing:3px;color:#1c1c1b;">FILAS</div><div style="margin-top:8px;font-size:12px;line-height:1.6;color:#595953;">First to Execute. Last to See Things Through.</div></td></tr>
<tr><td style="padding:32px;font-size:16px;line-height:1.7;color:#1c1c1b;overflow-wrap:anywhere;"><h1 style="margin:0 0 24px;font-size:26px;line-height:1.25;font-weight:600;color:#1c1c1b;">${escapeHTML(subject)}</h1>${body}</td></tr>
<tr><td style="padding:24px 32px;border-top:1px solid #dedbd4;font-size:12px;line-height:1.7;color:#595953;">One team. End-to-end e-commerce support.<br>Store management · Warehousing &amp; fulfillment · Demand generation</td></tr>
</table></td></tr></table></body></html>`
}

export const styleFormEmails: BeforeEmail = (emails) =>
  emails.map((email) => ({
    ...email,
    html: renderFormEmail(email.html || '', email.subject || 'FILAS inquiry'),
  }))
