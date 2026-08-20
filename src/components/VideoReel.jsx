import { useEffect, useRef } from 'react'

/**
 * A single autoplaying, muted, looping video reel — the shared pattern used
 * everywhere the site shows silent motion footage (the painting gallery,
 * the specialty-trades close-ups). `muted` + `playsInline` is the only
 * combination iOS/Android will autoplay, and an IntersectionObserver plays
 * the reel ONLY while it's on screen so the browser never decodes several
 * videos at once. The poster is the best static frame, so the tile looks
 * right before playback starts and is the graceful fallback if a device
 * ever blocks autoplay. Per the site's motion policy, reels play for
 * everyone rather than being gated behind reduced-motion.
 */
export default function VideoReel({ src, poster, label, byline, badge, className = '' }) {
  const vidRef = useRef(null)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    v.muted = true // set as a property too — some browsers need this to autoplay
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = v.play()
          if (p && p.catch) p.catch(() => {}) // ignore autoplay-blocked rejections
        } else {
          v.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <figure
      data-reveal
      className={`group relative overflow-hidden rounded-lg bg-clay/10 shadow-[0_18px_55px_-26px_rgba(61,50,42,0.55)] ${className}`}
    >
      <video
        ref={vidRef}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={`${label}${byline ? `, ${byline}` : ''}. Silent looping video.`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {badge && (
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-clay/55 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-bone/90 uppercase backdrop-blur-sm">
          {badge}
        </span>
      )}

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-clay/85 via-clay/25 to-transparent p-4 pt-12">
        <span className="eyebrow block text-bone">{label}</span>
        {byline && <span className="eyebrow mt-1.5 block text-[9px] text-gold">{byline}</span>}
      </figcaption>
    </figure>
  )
}
