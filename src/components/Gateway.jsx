import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

/**
 * The Steel ↔ Silk gateway. On large screens with motion enabled the section
 * pins while the two brand worlds slide in from opposite sides and a warm
 * gold beam sweeps across — the brand doc's "light turning blueprints into
 * painted rooms". Small screens and reduced-motion get the same content as a
 * calm stacked layout.
 */
export default function Gateway() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // The pinned Steel↔Silk sequence and its gold beam sweep are the
      // section's signature moment, so they play for every desktop visitor.
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.6,
          },
        })

        tl.from('[data-gw-steel]', { xPercent: -60, autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0)
          .from('[data-gw-silk]', { xPercent: 60, autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0.15)
          .from('[data-gw-divider]', { scaleY: 0, duration: 0.8 }, 0.6)
          .fromTo('[data-gw-beam]', { xPercent: -120 }, { xPercent: 120, duration: 1.4, ease: 'power1.inOut' }, 0.9)
          .from('[data-gw-tagline]', { y: 24, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 1.6)
      })

      // Below the pin breakpoint the two cards stack and reveal on scroll —
      // rise + fade for everyone.
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('[data-gw-steel], [data-gw-silk]', ref.current).forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-carbon">
      <div className="relative mx-auto grid min-h-svh max-w-7xl items-stretch gap-6 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-0 lg:py-0">
        {/* STEEL — Andrés */}
        <a
          href="#coating"
          data-gw-steel
          className="group steel-grid relative flex flex-col justify-center overflow-hidden rounded-lg border border-sand/10 bg-steel/40 p-8 transition-colors duration-500 hover:border-gold/50 sm:p-12 lg:my-24 lg:mr-8 lg:rounded-none lg:border-y lg:border-l lg:border-r-0"
        >
          <p className="eyebrow text-sand/50">For builders · Andrés Gomez</p>
          <h2 className="steel-head mt-5 text-4xl font-bold text-sand sm:text-5xl">
            STEEL<span className="text-gold">.</span>
          </h2>
          <p className="mt-2 font-sans text-lg font-medium text-sand/85">360 Coating Solutions</p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-sand/60">
            Production-grade coating systems, engineered schedules and B2B partnerships with Colorado&rsquo;s
            elite homebuilders. Measured twice. Delivered once.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">
            Enter the workshop
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </span>
        </a>

        {/* SILK — Tatiana */}
        <a
          href="#painting"
          data-gw-silk
          className="silk-glow group relative flex flex-col justify-center overflow-hidden rounded-lg bg-sand p-8 transition-shadow duration-500 hover:shadow-[0_24px_80px_-24px_rgba(197,168,128,0.55)] sm:p-12 lg:my-24 lg:ml-8 lg:rounded-none"
        >
          <p className="eyebrow text-clay/75">For homeowners · Tatiana Gomez</p>
          <h2 className="silk-italic mt-5 text-4xl text-clay sm:text-5xl">
            Silk<span className="text-teal">.</span>
          </h2>
          <p className="mt-2 font-sans text-lg font-medium text-clay/90">360 Painting &amp; Wall Design</p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-clay/70">
            Accent walls, color stories and whole-home transformations for Colorado&rsquo;s most exclusive
            neighborhoods — designed with empathy, finished like couture.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.16em] text-clay uppercase">
            Enter the studio
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </span>
        </a>

        {/* center divider — desktop pin only */}
        <div
          data-gw-divider
          className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[52%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold to-transparent lg:block"
          aria-hidden="true"
        />

        {/* gold light beam */}
        <div data-gw-beam className="beam-gradient pointer-events-none absolute inset-y-0 left-0 hidden w-full lg:block" aria-hidden="true" />
      </div>

      <p
        data-gw-tagline
        className="eyebrow pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-sand/50 lg:block"
      >
        One name · Two crafts · Zero compromise
      </p>
    </section>
  )
}
