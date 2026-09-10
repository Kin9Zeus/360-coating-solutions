import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { CONTACT, SERVICE_AREAS } from '../content/site'

const inputCls =
  'w-full rounded-md border border-clay/25 bg-bone px-4 py-3 text-[15px] text-clay placeholder:text-clay/40 transition-colors duration-200 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 min-h-12'

function Field({ id, label, required, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold tracking-wide text-clay">
        {label}
        {required && (
          <span className="text-teal" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-clay/70">{hint}</p>}
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const [audience, setAudience] = useState('homeowner')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  useReveal(ref)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const data = Object.fromEntries(new FormData(form).entries())
    data.audience = audience

    try {
      setStatus('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(result.error || `Server responded ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="contact" className="relative scroll-mt-16 bg-carbon py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={360} label="Full Circle" />

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 data-reveal className="silk-head text-4xl leading-[1.08] text-sand sm:text-5xl lg:text-6xl">
              Bring your project
              <span className="silk-italic text-gold"> full circle.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-sand/65 sm:text-lg">
              Tell us about your walls: a single accent wall, a whole home, or a whole community.
              You&rsquo;ll hear back from Tatiana or Andrés themselves.
            </p>

            <dl data-reveal className="mt-10 space-y-6">
              <div>
                <dt className="eyebrow text-sand/45">Call or text</dt>
                <dd className="mt-1.5">
                  <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`} className="steel-head text-2xl font-bold text-sand transition-colors hover:text-gold">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-sand/45">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${CONTACT.email}`} className="text-lg text-sand/85 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-sand/45">Mail</dt>
                <dd className="mt-1.5 text-[15px] text-sand/70">{CONTACT.address}</dd>
              </div>
              <div>
                <dt className="eyebrow text-sand/45">Follow the work</dt>
                <dd className="mt-2.5 flex gap-3">
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="360 on Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/20 text-sand/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="360 on Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/20 text-sand/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M14 8.5V7c0-.8.2-1.2 1.4-1.2H17V3h-2.4C11.7 3 10.8 4.4 10.8 6.8v1.7H9V11h1.8v10H14V11h2.3l.3-2.5H14z" />
                    </svg>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal className="rounded-lg bg-sand p-6 shadow-[0_30px_90px_-30px_rgba(197,168,128,0.4)] sm:p-10">
            <fieldset className="mb-7">
              <legend className="mb-3 text-[13px] font-semibold tracking-wide text-clay">I am a…</legend>
              <div className="grid grid-cols-2 gap-2 rounded-full border border-clay/20 p-1" role="radiogroup">
                {[
                  { v: 'homeowner', label: 'Homeowner' },
                  { v: 'builder', label: 'Builder / Business' },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    role="radio"
                    aria-checked={audience === o.v}
                    onClick={() => setAudience(o.v)}
                    className={`min-h-11 cursor-pointer rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                      audience === o.v ? 'bg-carbon text-sand shadow' : 'text-clay/65 hover:text-clay'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <form onSubmit={handleSubmit} noValidate={false} className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />

              <Field id="f-name" label="Full name" required>
                <input id="f-name" name="name" type="text" autoComplete="name" required className={inputCls} placeholder="Jane Smith" />
              </Field>
              <Field id="f-phone" label="Phone" required>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" required className={inputCls} placeholder="(303) 555-0123" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="f-email" label="Email" required>
                  <input id="f-email" name="email" type="email" autoComplete="email" required className={inputCls} placeholder="jane@email.com" />
                </Field>
              </div>

              {audience === 'homeowner' ? (
                <div className="sm:col-span-2">
                  <Field id="f-area" label="Neighborhood / city" hint="Backcountry, Highlands Ranch, Castle Pines…">
                    <input id="f-area" name="neighborhood" type="text" autoComplete="address-level2" className={inputCls} placeholder="Backcountry" />
                  </Field>
                </div>
              ) : (
                <div className="sm:col-span-2">
                  <Field id="f-company" label="Company" required>
                    <input id="f-company" name="company" type="text" autoComplete="organization" required className={inputCls} placeholder="Builder Co." />
                  </Field>
                </div>
              )}

              <div className="sm:col-span-2">
                <Field
                  id="f-message"
                  label={audience === 'homeowner' ? 'Tell us about your project' : 'Project scope & timeline'}
                  required
                  hint={
                    audience === 'homeowner'
                      ? 'Rooms, style you love, timing. Anything helps.'
                      : 'Community, unit count, phases, target dates.'
                  }
                >
                  <textarea id="f-message" name="message" rows="4" required className={`${inputCls} resize-y`} placeholder="We're dreaming of…" />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-carbon px-8 py-4 text-sm font-bold tracking-[0.12em] text-sand uppercase transition-all duration-300 hover:bg-clay disabled:cursor-default disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? 'Sending…' : 'Send my request'}
                  {status !== 'sending' && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  )}
                </button>

                <div aria-live="polite" className="mt-4">
                  {status === 'sent' && (
                    <p className="flex items-center gap-2 text-sm font-semibold text-teal">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      Request sent. We&rsquo;ll be in touch within one business day.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm font-semibold text-red-700">
                      Something went wrong sending your request. Please try again, or call us at {CONTACT.phone}.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div data-reveal className="mt-20 border-t border-sand/10 pt-8">
          <p className="eyebrow text-sand/45">Serving the Front Range</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
            {SERVICE_AREAS.map((city) => (
              <li key={city} className="flex items-center gap-2.5 text-[15px] text-sand/70">
                <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
