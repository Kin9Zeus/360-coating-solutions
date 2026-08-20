import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { IMG } from '../content/images'

export default function Family() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="family" className="relative scroll-mt-16 overflow-hidden bg-clay py-24 text-sand sm:py-32">
      {/* sunset warmth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(1000px 500px at 18% 0%, rgba(212,175,55,0.14), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={240} label="The Gomez Family" />

        <div className="mt-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <figure data-reveal className="max-w-md">
            {/* the offset gold frame mats the photo only — the caption sits
                clear of it below */}
            <div className="relative">
              <div className="pointer-events-none absolute -right-3 -bottom-3 h-full w-full border border-gold/40" aria-hidden="true" />
              <img
                src={IMG.familyPortrait.src}
                width={IMG.familyPortrait.w}
                height={IMG.familyPortrait.h}
                alt={IMG.familyPortrait.alt}
                loading="lazy"
                className="relative w-full object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-7 text-sand/50">
              Backcountry, Colorado · Home turf
            </figcaption>
          </figure>

          <div>
            <h2 data-reveal className="silk-head text-4xl leading-[1.08] sm:text-5xl">
              Our
              <span className="silk-italic text-gold"> Family.</span>
            </h2>

            <div className="mt-8 max-w-xl text-base leading-relaxed text-sand/75 sm:text-lg">
              <p data-reveal>
                360 Coating Solutions is more than our business; it is part of our family. As a husband-and-wife
                team raising two boys, Tatiana and Andrés have built the company around the same values they
                teach at home: integrity, hard work, respect and genuine care. We treat every home as if it were
                our own and welcome every client into the 360 family.
              </p>
            </div>

            <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {['Integrity', 'Hard work', 'Respect', 'Genuine care'].map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-sm text-sand/60">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 text-gold" aria-hidden="true">
                    <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
