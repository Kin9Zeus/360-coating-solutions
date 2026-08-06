// Single Node service for production (Railway): serves the built static site
// AND answers the contact form via Resend. Same-origin means no CORS setup
// is needed, and there's exactly one place that holds the Resend API key.
import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'
import rateLimit from 'express-rate-limit'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

// Constructed lazily (only if a key is present) — the Resend SDK throws at
// construction time otherwise, which would crash this whole process (and
// with it, the static site it also serves) over a misconfigured email
// integration. A missing key should break only the contact form, not the
// entire website.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// "From" address — must be on a domain verified in Resend (see README).
const FROM = process.env.RESEND_FROM || '360 Coating Solutions <notifications@360coatingsolutions.com>'

// Both audiences currently land in one shared inbox (CONTACT_EMAIL_ADMIN),
// per the client's decision — but the form still tags every message by
// audience (subject line + X-360-Inquiry-Type header below), so "who is
// this from" is never lost even though there's a single recipient. If they
// ever want two separate inboxes again, just set CONTACT_EMAIL_HOMEOWNER /
// CONTACT_EMAIL_BUILDER in Railway — no code change needed, they override
// the shared default independently.
const ADMIN_EMAIL = process.env.CONTACT_EMAIL_ADMIN || 'admin@360coatingsolutions.com'
const RECIPIENTS = {
  homeowner: process.env.CONTACT_EMAIL_HOMEOWNER || ADMIN_EMAIL,
  builder: process.env.CONTACT_EMAIL_BUILDER || ADMIN_EMAIL,
}

// Strip newlines from any value that ends up in an email header (subject,
// reply-to) — otherwise a crafted form submission could inject extra
// headers/recipients into the outgoing email.
const sanitizeHeader = (v = '') => String(v).replace(/[\r\n]+/g, ' ').trim()

const isValidEmail = (v = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const app = express()
app.set('trust proxy', 1) // Railway sits behind a proxy; needed for accurate rate-limit IPs
app.use(compression()) // gzip/brotli text assets — smaller payload, better LCP
app.use(express.json())

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 5, // 5 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, phone, email, audience, neighborhood, company, message, website } = req.body || {}

    // Honeypot: a field real visitors never see or fill in (see Contact.jsx).
    // A filled honeypot means a bot — respond success without sending anything,
    // so the bot doesn't learn its submission was rejected.
    if (website) {
      return res.json({ ok: true })
    }

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }
    if (!resend) {
      console.error('RESEND_API_KEY is not set — cannot send the contact form email.')
      return res.status(500).json({ error: 'Email service is not configured yet.' })
    }

    const isBuilder = audience === 'builder'
    const to = isBuilder ? RECIPIENTS.builder : RECIPIENTS.homeowner

    const detailLine = isBuilder
      ? `Company: ${sanitizeHeader(company) || '—'}`
      : `Neighborhood/city: ${sanitizeHeader(neighborhood) || '—'}`

    const text = [
      `New ${isBuilder ? 'builder' : 'homeowner'} inquiry from the website`,
      '',
      `Name: ${sanitizeHeader(name)}`,
      `Phone: ${sanitizeHeader(phone)}`,
      `Email: ${sanitizeHeader(email)}`,
      detailLine,
      '',
      'Message:',
      String(message).trim(),
    ].join('\n')

    await resend.emails.send({
      from: FROM,
      to,
      replyTo: email,
      // Subject prefix is the practical way to filter/label these in a real
      // inbox (Gmail/Outlook rules match on subject text easily); the header
      // gives the same signal to anything that reads raw email headers.
      subject: `${isBuilder ? 'Builder' : 'Homeowner'} inquiry — ${sanitizeHeader(name)}`,
      headers: { 'X-360-Inquiry-Type': isBuilder ? 'Builder' : 'Homeowner' },
      text,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('contact form error:', err)
    res.status(500).json({ error: 'Something went wrong sending your request.' })
  }
})

// Everything else is the static build — one service does both jobs.
// A path-less app.use() catches every remaining request without relying on
// wildcard route syntax, which changed between Express 4 and 5.
app.use(
  express.static(distDir, {
    setHeaders(res, filePath) {
      // Vite fingerprints hashed asset filenames, so those are safe to cache
      // hard — the name changes whenever the content does. index.html and the
      // crawler files must stay fresh so deploys and SEO edits go live at once.
      if (/\.(js|css|webp|jpg|png|svg|woff2?|mp4)$/i.test(filePath) && /-[A-Za-z0-9_-]{8,}\./.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
      }
    },
  }),
)
app.use((_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`360 site server listening on port ${port}`)
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — the contact form will fail to send until it is configured.')
  }
})
