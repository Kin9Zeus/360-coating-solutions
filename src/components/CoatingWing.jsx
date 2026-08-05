import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { COATING_SERVICES } from '../content/site'
import { IMG } from '../content/images'

const ICONS = {
  blueprint: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <path d="M3.5 9.5h17M9 9.5V19.5M13.5 14h7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 2.6v5.2c0 4.4-3 7.6-7 9.2-4-1.6-7-4.8-7-9.2V6.1z" />
      <path d="M8.8 11.8l2.2 2.2 4.2-4.4" />
    </>
  ),
  stamp: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.5v5.5l3.5 2" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5h16M6 20.5V6l6-2.5V20.5M12 8.5l6 2v10" />
      <path d="M8.5 9h1M8.5 12.5h1M8.5 16h1M15 14h1M15 17h1" />
    </>
  ),
}

const CREDENTIALS = [
  { k: '15+ years', v: 'engineering leadership in high-stakes oil & gas production' },
  { k: 'ATP-certified pilot', v: 'trained at Centennial Airport — checklists are a way of life' },
  { k: 'B.S. Computer Science', v: 'University of Florida — systems thinking on every site' },
]

export default function CoatingWing() {
  const ref = useRef(null)
  useReveal(ref)

  useGSAP(
    () => {
      // Builder logos rise in for everyone (one-shot).
      gsap.from('[data-partner]', {
        y: 26,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.9,
        scrollTrigger: { trigger: '[data-partner-row]', start: 'top 85%', once: true },
      })

      // Portrait parallax is continuous scroll motion — gated behind motion pref.
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-andres-img]',
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: '[data-andres-card]', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="coating" className="steel-grid relative scroll-mt-16 bg-carbon py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={120} label="360 Coating Solutions" />

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <h2 data-reveal className="steel-head text-4xl font-bold text-sand sm:text-5xl lg:text-6xl">
              Built for builders.
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-sand/65 sm:text-lg">
              Painting and coating packages for production homebuilding — estimated with engineering rigor,
              staffed to specification and delivered on schedule. When a community has hundreds of walls,
              every degree of process matters.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-sand/10 bg-sand/10 sm:grid-cols-2">
              {COATING_SERVICES.map((s, i) => (
                <article
                  key={s.title}
                  data-reveal
                  data-reveal-delay={i * 0.08}
                  className="group bg-carbon p-7 transition-colors duration-400 hover:bg-steel/60"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-gold/80 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[s.icon]}
                  </svg>
                  <h3 className="mt-5 font-sans text-[17px] font-semibold text-sand">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-sand/55">{s.body}</p>
                </article>
              ))}
            </div>

            {/* builder partners */}
            <div data-partner-row className="mt-14">
              <p data-reveal className="eyebrow text-sand/45">
                Trusted by Colorado&rsquo;s premier homebuilders
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
                <span data-partner className="steel-head text-xl font-bold tracking-[0.18em] text-sand/85 uppercase">
                  Toll Brothers
                </span>
                <span data-partner className="hidden h-8 w-px bg-sand/15 sm:block" aria-hidden="true" />
                <span data-partner className="steel-head text-xl font-bold tracking-[0.18em] text-sand/85 uppercase">
                  Aspen View Homes
                </span>
              </div>
            </div>
          </div>

          {/* Andrés profile */}
          <aside data-andres-card data-reveal className="lg:pt-10">
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-full w-full border border-gold/35" aria-hidden="true" />
              <div className="relative overflow-hidden">
                <img
                  data-andres-img
                  src={IMG.foundersTarmac.src}
                  srcSet={IMG.foundersTarmac.srcSet}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  width={IMG.foundersTarmac.w}
                  height={IMG.foundersTarmac.h}
                  alt={IMG.foundersTarmac.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full scale-[1.14] object-cover object-[30%_20%]"
                />
              </div>
            </div>
            <div className="mt-8 border-l-2 border-gold/60 pl-5">
              <h3 className="steel-head text-2xl font-bold text-sand">Andrés Gomez</h3>
              <p className="eyebrow mt-1.5 text-gold/80">Principal · Operations &amp; B2B Partnerships</p>
              <p className="mt-4 text-[15px] leading-relaxed text-sand/60">
                Andrés spent more than fifteen years engineering high-stakes production systems before bringing
                that discipline to construction. He flies planes for the same reason he walks every job twice:
                precision isn&rsquo;t a habit you switch off.
              </p>
            </div>
            <dl className="mt-8 space-y-4">
              {CREDENTIALS.map((c) => (
                <div key={c.k} className="flex gap-4 border-b border-sand/10 pb-4">
                  <dt className="steel-head w-40 shrink-0 text-sm font-bold text-gold">{c.k}</dt>
                  <dd className="text-sm leading-relaxed text-sand/55">{c.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
