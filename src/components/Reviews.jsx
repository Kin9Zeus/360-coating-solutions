import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { TESTIMONIALS } from '../content/site'
import { REVIEW_SHOTS } from '../content/images'

function Lightbox({ review, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose])

  const shot = REVIEW_SHOTS[review.id]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Original community post by ${review.name}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-carbon/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-full w-full max-w-xl overflow-hidden rounded-lg bg-bone shadow-2xl">
        <div className="flex items-center justify-between border-b border-clay/10 px-5 py-3.5">
          <p className="eyebrow text-clay/60">Original post — BackCountry Colorado Families</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close original post"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-clay transition-colors hover:bg-clay/10"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="max-h-[76svh] overflow-y-auto p-3">
          <img
            src={shot.src}
            width={shot.w}
            height={shot.h}
            alt={`Screenshot of ${review.name}'s post recommending the Gomez family's work`}
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)
  useReveal(ref)

  return (
    <section ref={ref} id="reviews" className="relative scroll-mt-16 bg-carbon py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={300} label="Word of Mouth" />

        <h2 data-reveal className="silk-head mt-6 max-w-3xl text-4xl leading-[1.08] text-sand sm:text-5xl lg:text-6xl">
          What the neighbors
          <span className="silk-italic text-gold"> keep posting.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-sand/65 sm:text-lg">
          Unprompted recommendations from the BackCountry Colorado Families community — receipts included.
          Tap any card to see the original post.
        </p>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              data-reveal
              data-reveal-delay={(i % 3) * 0.08}
              className={`break-inside-avoid rounded-lg border p-7 transition-colors duration-400 ${
                t.featured ? 'border-gold/35 bg-steel/50' : 'border-sand/10 bg-ink/60'
              } hover:border-gold/60`}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold/70" fill="currentColor" aria-hidden="true">
                <path d="M10.2 5.4C7 6.7 4.8 9.4 4.8 13v5.6h6.4V12H7.6c.2-2.2 1.5-3.9 3.6-4.8zm9 0C16 6.7 13.8 9.4 13.8 13v5.6h6.4V12h-3.6c.2-2.2 1.5-3.9 3.6-4.8z" />
              </svg>
              <blockquote className="mt-4">
                <p className="font-display text-[17px] leading-relaxed text-sand/90" style={{ fontVariationSettings: "'opsz' 30" }}>
                  {t.quote}
                </p>
              </blockquote>
              <footer className="mt-6 flex items-end justify-between gap-4 border-t border-sand/10 pt-4">
                <div>
                  <p className="font-sans text-sm font-semibold text-sand">{t.name}</p>
                  <p className="mt-1 text-xs tracking-wide text-sand/45">{t.meta}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(t)}
                  className="min-h-11 shrink-0 cursor-pointer rounded-full border border-sand/20 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-sand/70 uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Original post
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {active && <Lightbox review={active} onClose={() => setActive(null)} />}
    </section>
  )
}
