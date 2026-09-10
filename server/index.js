import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'
import rateLimit from 'express-rate-limit'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM = process.env.RESEND_FROM || '360 Coating Solutions <notifications@360coatingsolutions.com>'

const ADMIN_EMAIL = process.env.CONTACT_EMAIL_ADMIN || 'admin@360coatingsolutions.com'
const RECIPIENTS = {
  homeowner: process.env.CONTACT_EMAIL_HOMEOWNER || ADMIN_EMAIL,
  builder: process.env.CONTACT_EMAIL_BUILDER || ADMIN_EMAIL,
}

const sanitizeHeader = (v = '') => String(v).replace(/[\r\n]+/g, ' ').trim()
const isValidEmail = (v = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const app = express()
app.set('trust proxy', 1)
app.use(compression())
app.use(express.json())

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, phone, email, audience, neighborhood, company, message, website } = req.body || {}

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
      console.error('RESEND_API_KEY is not set')
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

app.use(
  express.static(distDir, {
    setHeaders(res, filePath) {
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
})
