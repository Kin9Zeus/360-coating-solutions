import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * Scroll-scrubbed hero film.
 *
 * The 6s "empty room → sunlit luxury living room" video is pre-extracted into
 * 72 WebP frames (see README). Scroll position drives which frame is painted
 * onto a full-bleed <canvas> — scrolling down plays the transformation,
 * scrolling up rewinds it. This frame-sequence technique (not <video>
 * currentTime scrubbing) is the only approach that behaves identically on
 * iOS/Android/Windows/macOS across every browser engine.
 */
const frameModules = import.meta.glob('../assets/frames/frame-*.webp', {
  eager: true,
  import: 'default',
})
const FRAMES = Object.keys(frameModules)
  .sort()
  .map((k) => frameModules[k])

const CARBON = '#0b0f19'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const canvasRef = useRef(null)

  // --- Film + pin ---------------------------------------------------------
  // Deliberately NOT gated on `ready`. This pin adds ~180vh of spacing to the
  // document, and every ScrollTrigger below it measures against that. Creating
  // it late (after the preloader) left the Philosophy reveals holding start
  // positions from a document that had no hero spacer yet — so they never
  // fired and that section rendered blank, looking "skipped". Building it on
  // mount keeps ScrollTriggers in page order (hero → philosophy → gateway);
  // refreshPriority enforces the same order if anything ever refreshes early.
  useGSAP(
    () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d', { alpha: false })
      const state = { frame: 0 }
      let lastDrawn = -1

      // Progressive loading: kick off every frame request up front; while a
      // frame is still in flight we paint the nearest frame that HAS loaded,
      // so slow connections scrub smoothly instead of flashing blanks.
      const images = FRAMES.map((src) => {
        const im = new Image()
        im.decoding = 'async'
        im.src = src
        return im
      })
      const loaded = new Array(FRAMES.length).fill(false)

      const nearestLoaded = (target) => {
        const t = Math.max(0, Math.min(FRAMES.length - 1, Math.round(target)))
        if (loaded[t]) return t
        for (let d = 1; d < FRAMES.length; d++) {
          if (t - d >= 0 && loaded[t - d]) return t - d
          if (t + d < FRAMES.length && loaded[t + d]) return t + d
        }
        return -1
      }

      const fitCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.round(canvas.clientWidth * dpr)
        const h = Math.round(canvas.clientHeight * dpr)
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          ctx.fillStyle = CARBON
          ctx.fillRect(0, 0, w, h)
          lastDrawn = -1
        }
      }

      const draw = (i) => {
        if (i < 0 || i === lastDrawn) return
        const im = images[i]
        if (!im.naturalWidth) return
        fitCanvas()
        // cover-fit: fill the viewport, center the crop
        const s = Math.max(canvas.width / im.naturalWidth, canvas.height / im.naturalHeight)
        const dw = im.naturalWidth * s
        const dh = im.naturalHeight * s
        ctx.drawImage(im, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh)
        lastDrawn = i
      }

      const render = () => draw(nearestLoaded(state.frame))

      fitCanvas()
      images.forEach((im, i) => {
        im.onload = () => {
          loaded[i] = true
          // repaint if this newly arrived frame is the one we're waiting on
          if (nearestLoaded(state.frame) === i) draw(i)
        }
      })

      const film = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: true,
          refreshPriority: 1,
          onRefresh: () => {
            lastDrawn = -1
            render()
          },
        },
      })
      film
        .to(state, { frame: FRAMES.length - 1, ease: 'none', duration: 1, onUpdate: render }, 0)
        .to('[data-hero-content]', { autoAlpha: 0, y: -36, ease: 'power1.in', duration: 0.32 }, 0.04)
        .to('[data-hero-scrim]', { autoAlpha: 0, ease: 'none', duration: 0.45 }, 0.05)
        .to('[data-hero-cue]', { autoAlpha: 0, ease: 'none', duration: 0.08 }, 0)

      // Web fonts settle after first paint and change section heights; one
      // refresh once they're in keeps every trigger's start position honest.
      let alive = true
      document.fonts?.ready.then(() => alive && ScrollTrigger.refresh())
      return () => {
        alive = false
      }
    },
    { scope: ref },
  )

  // --- Entrance -----------------------------------------------------------
  // Waits for the preloader curtain. Pure opacity/transform work — it creates
  // no ScrollTriggers, so deferring it can't disturb page measurements.
  useGSAP(
    () => {
      if (!ready) return
      const canvas = canvasRef.current
      // If frames stall (throttled tab, low-power device) snap to the end so
      // the CTAs are never left hidden.
      const guard = setTimeout(() => tl.progress(1), 3500)
      const tl = gsap
        .timeline({ defaults: { ease: 'power4.out' }, onComplete: () => clearTimeout(guard) })
        .from(canvas, { autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-hero-eyebrow]', { y: 24, autoAlpha: 0, duration: 0.8 }, 0.15)
        .from('[data-hero-line]', { yPercent: 112, duration: 1.15, stagger: 0.14 }, 0.2)
        .from('[data-hero-copy]', { y: 30, autoAlpha: 0, duration: 1 }, 0.65)
        .from('[data-hero-cta]', { y: 26, autoAlpha: 0, duration: 0.9 }, 0.85)
        .from('[data-hero-cue]', { autoAlpha: 0, duration: 1 }, 1.4)

      return () => clearTimeout(guard)
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-center overflow-hidden bg-carbon">
      {/* the film */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* readability scrim — recedes with the headline as the room brightens */}
      <div
        data-hero-scrim
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(11,15,25,0.88) 0%, rgba(11,15,25,0.62) 42%, rgba(11,15,25,0.18) 72%, rgba(11,15,25,0.05) 100%)',
        }}
        aria-hidden="true"
      />

      <div data-hero-content className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8">
        <p data-hero-eyebrow className="eyebrow mb-7 text-gold">
          Highlands Ranch, Colorado — The Gomez Family Companies
        </p>

        <h1 className="max-w-4xl text-[clamp(2.6rem,8vw,6.2rem)] leading-[1.02]">
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="steel-head block font-bold text-sand">
              Steel precision.
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-hero-line className="silk-italic block text-gold">
              Silk finishes.
            </span>
          </span>
        </h1>

        <p data-hero-copy className="mt-8 max-w-xl text-base leading-relaxed text-sand/80 sm:text-lg">
          One family, two studios of craft. <strong className="font-semibold text-sand">360 Coating Solutions</strong> engineers
          builder-grade coating systems for Colorado&rsquo;s premier homebuilders.{' '}
          <strong className="font-semibold text-sand">360 Painting &amp; Wall Design</strong> turns luxury homes into places
          you never want to leave. Every project travels the full circle.
        </p>

        <div data-hero-cta className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#painting"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-8 py-3.5 text-sm font-bold tracking-[0.1em] text-carbon uppercase transition-all duration-300 hover:bg-sand"
          >
            For homeowners
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <a
            href="#coating"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-sand/40 bg-carbon/30 px-8 py-3.5 text-sm font-bold tracking-[0.1em] text-sand uppercase backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
          >
            For builders
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Hidden below sm: on short mobile viewports the stacked CTA buttons
          push content tall enough to collide with this bottom-anchored cue
          (measured 17px overlap at 375×667). Touch users already know to
          swipe/scroll, so the hint earns its keep on desktop only, where a
          mouse-driven visitor benefits from the nudge. */}
      <div
        data-hero-cue
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden="true"
      >
        <p className="eyebrow text-sand/60">Scroll to transform the room</p>
        <span className="block h-10 w-px overflow-hidden bg-sand/20">
          <span className="block h-4 w-px animate-[cue_1.8s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
    </section>
  )
}
