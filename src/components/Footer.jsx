import { CONTACT, CREDIT } from '../content/site'

/* Studio signature — the last mark on the page, so it has to read as a
   deliberate part of the composition rather than a tacked-on credit. It sits
   at rest in a faint gold hairline, and on hover a gold beam sweeps through
   it: the same gesture the Steel↔Silk gateway opens with, reused here to
   close the 360°. WhatsApp's glyph is drawn in currentColor, never its own
   green — the palette stays carbon, sand and gold throughout. */
function StudioSignature() {
  return (
    <a
      href={CREDIT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Site designed and developed by ${CREDIT.studio}. Message the studio on WhatsApp (opens in a new tab)`}
      className="group relative inline-flex items-center gap-2.5 self-start overflow-hidden rounded-full border border-gold/20 px-4 py-2 transition-colors duration-300 hover:border-gold/55 sm:self-auto"
    >
      <span
        aria-hidden="true"
        className="beam-gradient pointer-events-none absolute inset-y-0 -left-full w-full transition-transform duration-[900ms] ease-out group-hover:translate-x-[200%]"
      />
      <span className="eyebrow relative text-[9px] text-sand/40 transition-colors duration-300 group-hover:text-sand/65">
        Site by
      </span>
      <span className="steel-head relative text-[13px] font-semibold text-sand/85 transition-colors duration-300 group-hover:text-gold">
        {CREDIT.studio}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative h-3.5 w-3.5 fill-current text-sand/45 transition-colors duration-300 group-hover:text-gold"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-carbon py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="steel-head text-xl font-bold text-sand">
              360 <span className="font-normal text-sand/55">Coating Solutions</span>
            </p>
            <p className="silk-italic mt-1 text-xl text-gold">
              360 <span className="text-gold/80">Painting &amp; Wall Design</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/50">
              Two studios. One family. {CONTACT.serviceArea}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {[
                ['#circle', 'About Us'],
                ['#coating', 'For Builders'],
                ['#painting', 'For Homeowners'],
                ['#craft', 'Specialty Trades'],
                ['#family', 'Our Family'],
                ['#reviews', 'Reviews'],
                ['#faq', 'FAQ'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-block py-1.5 text-sand/60 transition-colors duration-200 hover:text-gold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-sand/60">
            <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`} className="block transition-colors hover:text-gold">
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="mt-2 block transition-colors hover:text-gold">
              {CONTACT.email}
            </a>
            <p className="mt-2 text-sand/45">{CONTACT.address}</p>
            <div className="mt-4 flex gap-4">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                Instagram
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-sand/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-sand/55">
              © {new Date().getFullYear()} 360 Coating Solutions · 360 Painting &amp; Wall Design. All rights reserved.
            </p>
            <p className="eyebrow text-[9px] text-sand/40">Handcrafted, the full 360°</p>
          </div>
          <StudioSignature />
        </div>
      </div>
    </footer>
  )
}
