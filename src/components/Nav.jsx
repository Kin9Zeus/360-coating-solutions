import { useEffect, useRef, useState } from 'react'
import logo360 from '../assets/img/logo-360-coating-white.webp'

const LINKS = [
  { href: '#circle', label: 'About Us' },
  { href: '#coating', label: 'For Builders' },
  { href: '#painting', label: 'For Homeowners' },
  { href: '#craft', label: 'Craft' },
  { href: '#gallery', label: 'Before & After' },
  { href: '#family', label: 'Our Family' },
  { href: '#reviews', label: 'Reviews' },
]

function Mark({ className = '' }) {
  return (
    <img
      src={logo360}
      width={720}
      height={359}
      alt="360 Coating Solutions"
      className={`h-11 w-auto sm:h-12 ${className}`}
    />
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeBtn = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) closeBtn.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? 'border-b border-sand/10 bg-carbon/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <a href="#top" className="rounded-sm" aria-label="360, back to top">
          <Mark />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative py-2 text-[13px] font-medium tracking-[0.14em] text-sand/75 uppercase transition-colors duration-200 hover:text-sand"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-gold/60 px-5 py-2.5 text-[13px] font-semibold tracking-[0.12em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-carbon sm:inline-block"
          >
            Request a quote
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          >
            <span className="h-px w-6 bg-sand" aria-hidden="true" />
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            <span className="h-px w-4 self-center bg-sand" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 bg-carbon transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Mark />
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-sand/20 text-sand"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="mt-10 flex flex-col gap-2 px-8">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="silk-head block border-b border-sand/10 py-4 text-3xl text-sand transition-colors hover:text-gold"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block rounded-full bg-gold px-8 py-4 text-sm font-bold tracking-[0.12em] text-carbon uppercase"
            >
              Request a quote
            </a>
          </li>
        </ul>
        <p className="eyebrow absolute bottom-8 left-8 text-sand/40">Highlands Ranch · Colorado</p>
      </div>
    </header>
  )
}
