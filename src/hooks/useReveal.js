import { gsap, useGSAP } from '../lib/gsap'

/**
 * Reveals every `[data-reveal]` descendant of the scoped section as it scrolls
 * into view (rise + fade). Optional `data-reveal-delay="0.15"` staggers
 * siblings. A one-shot entrance like this is a signature moment, so per the
 * owner's motion policy it plays for every visitor; only continuous parallax
 * and looping effects are simplified under reduced motion (handled elsewhere).
 */
export function useReveal(scopeRef) {
  useGSAP(
    () => {
      gsap.utils.toArray('[data-reveal]', scopeRef.current).forEach((el) => {
        gsap.from(el, {
          y: 42,
          autoAlpha: 0,
          duration: 1.1,
          delay: parseFloat(el.dataset.revealDelay || 0),
          scrollTrigger: { trigger: el, start: 'top 87%', once: true },
        })
      })
    },
    { scope: scopeRef },
  )
}
