import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { TRANSFORMATIONS } from '../content/transformations'

const WIPE_MS = 650
const EASE = 'cubic-bezier(.65,0,.35,1)'

/**
 * One project, shown a whole frame at a time.
 *
 * The obvious pattern here is a drag-to-compare wipe, and it is the wrong one
 * for this set: only three of the seven pairs were shot from the same spot, so
 * on the rest a wipe stitches together two views that do not correspond and
 * reads as a mistake. Swapping the entire frame is always truthful — each
 * photograph stays whole and correctly composed — and the swap still earns its
 * moment by being revealed with the gold beam the Steel/Silk gateway uses.
 *
 * "After" is the resting state: the section should look like finished work at
 * a glance, with the past a deliberate thing you go and look at.
 */
function Transformation({ item, hint = false }) {
  const [showAfter, setShowAfter] = useState(true)
  const [wiping, setWiping] = useState(false)
  const figureRef = useRef(null)
  const timer = useRef(null)
  const touched = useRef(false)

  const wipeTo = (next) => {
    if (next === showAfter) return
    setShowAfter(next)
    setWiping(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setWiping(false), WIPE_MS + 60)
  }

  const choose = (next) => {
    touched.current = true
    wipeTo(next)
  }

  // The featured card demonstrates itself once, the first time it is seen:
  // a control nobody notices is a control nobody uses. It never fires if the
  // visitor got there first, and never repeats.
  //
  // Readiness is taken from img.complete rather than an onLoad prop. A cached
  // image finishes before React attaches its handler, so onLoad never fires for
  // a returning visitor and the hint would be dropped silently for exactly the
  // people most likely to see the page twice.
  useEffect(() => {
    if (!hint || !figureRef.current) return
    const figure = figureRef.current
    const timers = []
    const img = figure.querySelector('img')

    const run = () => {
      timers.push(
        setTimeout(() => {
          if (touched.current) return
          wipeTo(false)
          timers.push(setTimeout(() => !touched.current && wipeTo(true), 1400))
        }, 700),
      )
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (!img || img.complete) run()
        else img.addEventListener('load', run, { once: true })
      },
      { threshold: 0.55 },
    )
    io.observe(figure)

    return () => {
      io.disconnect()
      img?.removeEventListener('load', run)
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hint])

  useEffect(() => () => clearTimeout(timer.current), [])

  const feature = item.variant === 'feature'

  return (
    <figure
      ref={figureRef}
      data-reveal
      className={`group relative overflow-hidden rounded-lg bg-steel/50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ${
        feature ? 'aspect-[3/2]' : 'aspect-[4/5]'
      }`}
    >
      <img
        src={item.before.src}
        srcSet={item.before.srcSet}
        sizes={item.before.sizes}
        width={item.before.w}
        height={item.before.h}
        alt={item.before.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* The finished room sits on top and is clipped away to expose the one
          underneath, so neither image ever moves. */}
      <img
        src={item.after.src}
        srcSet={item.after.srcSet}
        sizes={item.after.sizes}
        width={item.after.w}
        height={item.after.h}
        alt={item.after.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path ${WIPE_MS}ms ${EASE}`,
        }}
      />

      {/* Gold edge riding the clip boundary. The wrapper is the full frame and
          the bar is its right edge, so both sit just outside the card at rest
          and only the travel between states is ever seen. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
          wiping ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: showAfter ? 'translateX(3px)' : 'translateX(-100%)',
          transition: `transform ${WIPE_MS}ms ${EASE}, opacity 200ms linear`,
        }}
      >
        <span className="absolute inset-y-0 right-0 w-[3px] bg-gold shadow-[0_0_30px_8px_rgba(197,168,128,0.5)]" />
      </span>

      {/* State switch. Two buttons rather than a hover reveal: hover does not
          exist on touch, and both states have to be visible to be understood. */}
      <div
        role="group"
        aria-label={`${item.title}: choose before or after`}
        className="absolute top-3 right-3 z-10 inline-flex rounded-full bg-carbon/65 p-1 ring-1 ring-sand/20 backdrop-blur-md"
      >
        {[
          ['Before', false],
          ['After', true],
        ].map(([label, value]) => (
          <button
            key={label}
            type="button"
            onClick={() => choose(value)}
            aria-pressed={showAfter === value}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
              showAfter === value ? 'bg-gold text-carbon' : 'text-sand/70 hover:text-sand'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <figcaption
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-carbon/92 via-carbon/45 to-transparent ${
          feature ? 'p-4 pt-10 sm:p-6 sm:pt-16' : 'p-4 pt-16 sm:p-5 sm:pt-20'
        }`}
      >
        <span className={`eyebrow block text-bone ${feature ? 'text-[12px]' : ''}`}>{item.title}</span>
        <span className="mt-1.5 block max-w-md text-[13px] leading-snug text-sand/60">{item.note}</span>
      </figcaption>
    </figure>
  )
}

export default function Transformations() {
  const ref = useRef(null)
  useReveal(ref)

  const [featured, ...rest] = TRANSFORMATIONS

  return (
    <section ref={ref} id="gallery" className="relative scroll-mt-16 bg-carbon py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={225} label="Before & After" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2 data-reveal className="silk-head max-w-2xl text-4xl leading-[1.06] text-sand sm:text-5xl lg:text-6xl">
            Every room has a
            <span className="silk-italic text-gold"> before.</span>
          </h2>
          <p data-reveal className="max-w-md text-[15px] leading-relaxed text-sand/60">
            Seven Colorado homes, photographed the day we arrived and the day we handed them back. Switch any
            project to see where it started.
          </p>
        </div>

        <div className="mt-14">
          <Transformation item={featured} hint />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <Transformation key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
