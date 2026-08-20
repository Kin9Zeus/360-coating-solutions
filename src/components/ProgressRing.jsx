import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

const R = 15
const CIRC = 2 * Math.PI * R

/** The signature: a small dial that fills as the page is traveled, doubling as
 *  a back-to-top control. The arc alone carries the progress — the degree
 *  readout that used to sit in the middle was dropped along with the degree
 *  eyebrows, and the arrow makes the back-to-top affordance visible instead of
 *  hiding it in a tooltip. */
export default function ProgressRing() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const arc = ref.current.querySelector('[data-arc]')
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          arc.style.strokeDashoffset = CIRC * (1 - self.progress)
        },
      })
      gsap.from(ref.current, { autoAlpha: 0, delay: 2, duration: 1 })
    },
    { scope: ref },
  )

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Scroll progress, back to top"
      title="Back to top"
      className="group fixed right-4 bottom-4 z-40 h-12 w-12 cursor-pointer rounded-full border border-sand/15 bg-carbon/70 backdrop-blur-sm transition-colors duration-300 hover:border-gold/60 sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r={R} fill="none" stroke="rgba(245,235,230,0.12)" strokeWidth="1.5" />
        <circle
          data-arc
          cx="18"
          cy="18"
          r={R}
          fill="none"
          stroke="#c5a880"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 m-auto h-4 w-4 text-sand/70 transition-colors duration-300 group-hover:text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V6M6 11.5L12 5.5l6 6" />
      </svg>
    </button>
  )
}
