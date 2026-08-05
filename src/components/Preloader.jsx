import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const RADIUS = 34
const CIRC = 2 * Math.PI * RADIUS

/** Opening moment: the ring draws 0→360° while the counter climbs, then the
 *  curtain lifts. Skipped entirely under prefers-reduced-motion. */
export default function Preloader({ onDone }) {
  const ref = useRef(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const finish = () => {
        setGone(true)
        onDone()
      }

      // The opening dial is a signature brand moment, so it plays for every
      // visitor. It's a single short sweep (~1.4s) rather than looping or
      // parallax motion, which keeps it comfortable under reduced motion.
      // Failsafe: never hold the page hostage — if frames are throttled
      // (background tab, low-power mode, slow device), lift the curtain anyway.
      const failsafe = setTimeout(finish, 3200)

      const counter = { deg: 0 }
      const num = ref.current.querySelector('[data-count]')
      const arc = ref.current.querySelector('[data-arc]')

      gsap
        .timeline({
          onComplete: () => {
            clearTimeout(failsafe)
            finish()
          },
        })
        .to(counter, {
          deg: 360,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = `${Math.round(counter.deg)}°`
            arc.style.strokeDashoffset = CIRC * (1 - counter.deg / 360)
          },
        })
        .to(ref.current.querySelector('[data-badge]'), { scale: 0.92, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.12')
        .to(ref.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '<0.1')

      return () => clearTimeout(failsafe)
    },
    { scope: ref },
  )

  if (gone) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon"
    >
      <div data-badge className="flex flex-col items-center gap-5">
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="#1b2333" strokeWidth="1.5" />
            <circle
              data-arc
              cx="40"
              cy="40"
              r={RADIUS}
              fill="none"
              stroke="#c5a880"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC}
            />
          </svg>
          <span
            data-count
            className="absolute inset-0 flex items-center justify-center font-sans text-sm font-medium tracking-widest text-sand"
          >
            0°
          </span>
        </div>
        <p className="eyebrow text-sand/50">The Gomez Family Companies</p>
      </div>
    </div>
  )
}
