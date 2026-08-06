import { CONTACT } from '../content/site'

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
                ['#circle', 'The Circle'],
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

        <div className="mt-12 flex flex-col gap-3 border-t border-sand/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sand/55">
            © {new Date().getFullYear()} 360 Coating Solutions · 360 Painting &amp; Wall Design. All rights reserved.
          </p>
          <p className="eyebrow text-[9px] text-sand/50">Handcrafted, the full 360°</p>
        </div>
      </div>
    </footer>
  )
}
