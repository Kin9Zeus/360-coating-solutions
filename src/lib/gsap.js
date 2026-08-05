import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// QA hook: open the site with ?forcemotion to preview the full animation
// experience even on a machine whose OS requests reduced motion. Visitors
// never hit this path — reduced motion is honored by default.
if (typeof window !== 'undefined' && window.location.search.includes('forcemotion')) {
  document.documentElement.classList.add('force-motion')
  const native = window.matchMedia.bind(window)
  window.matchMedia = (query) => {
    if (query.includes('prefers-reduced-motion')) {
      return {
        matches: query.includes('no-preference'),
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent: () => false,
      }
    }
    return native(query)
  }
}

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export { gsap, ScrollTrigger, useGSAP }
