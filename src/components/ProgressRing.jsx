import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

const R = 15
const CIRC = 2 * Math.PI * R

/** The signature: a small dial that fills 0°→360° as the page is traveled.
 *  Once full circle is reached it doubles as a back-to-top control. */
export default function ProgressRing() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const arc = ref.current.querySelector('[data-arc]')
      const label = ref.current.querySelector('[data-deg]')
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const deg = Math.round(self.progress * 360)
          arc.style.strokeDashoffset = CIRC * (1 - self.progress)
          label.textContent = `${deg}°`
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
      aria-label="Scroll progress — back to top"
      title="Back to top"
      className="fixed right-4 bottom-4 z-40 h-12 w-12 cursor-pointer rounded-full border border-sand/15 bg-carbon/70 backdrop-blur-sm transition-colors duration-300 hover:border-gold/60 sm:right-6 sm:bottom-6"
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
      <span data-deg className="absolute inset-0 flex items-center justify-center font-sans text-[9px] font-semibold tracking-wider text-sand/80" aria-hidden="true">
        0°
      </span>
    </button>
  )
}
