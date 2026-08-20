import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import VideoReel from './VideoReel'
import { SPECIALTY_TRADES } from '../content/site'

import reelVenetian from '../assets/videos/venetian-detail-web.mp4'
import posterVenetian from '../assets/videos/venetian-detail-poster.webp'
import reelCarpentry from '../assets/videos/carpentry-detail-web.mp4'
import posterCarpentry from '../assets/videos/carpentry-detail-poster.webp'
import reelMillwork from '../assets/videos/millwork-detail-web.mp4'
import posterMillwork from '../assets/videos/millwork-detail-poster.webp'
import reelFacadeA from '../assets/videos/facade-transform-a-web.mp4'
import posterFacadeA from '../assets/videos/facade-transform-a-poster.webp'
import reelFacadeB from '../assets/videos/facade-transform-b-web.mp4'
import posterFacadeB from '../assets/videos/facade-transform-b-poster.webp'

const REELS = {
  venetian: { src: reelVenetian, poster: posterVenetian, label: 'Venetian Plaster, the Polished Finish' },
  carpentry: { src: reelCarpentry, poster: posterCarpentry, label: 'Custom Carpentry, Built-in Cabinetry' },
  millwork: { src: reelMillwork, poster: posterMillwork, label: 'Custom Millwork, Crown & Panel Detail' },
}

// The facade service is shown as a pair — two different Colorado homes, each
// carried from dated to current, because the proof of exterior work is the
// before-and-after itself.
const FACADE_REELS = [
  { src: reelFacadeA, poster: posterFacadeA, label: 'Board-and-Batten Gable & Charcoal Doors' },
  { src: reelFacadeB, poster: posterFacadeB, label: 'Siding, Trim & Garage Doors Refreshed' },
]

export default function SpecialtyTrades() {
  const ref = useRef(null)
  useReveal(ref)

  const [venetian, carpentry, millwork, facade] = SPECIALTY_TRADES

  return (
    <section ref={ref} id="craft" className="relative scroll-mt-16 bg-sand-deep py-24 text-clay sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={210} label="The Specialty Trades" tone="light" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2 data-reveal className="silk-head max-w-2xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
            Where paint ends,
            <span className="silk-italic text-teal"> craft begins.</span>
          </h2>
          <p data-reveal className="max-w-md text-[15px] leading-relaxed text-clay/70">
            Some finishes require more than paint. Our dedicated crews manage the specialized trades that give
            a home its architectural character, one accountable team and one consistent standard of
            craftsmanship from beginning to end.
          </p>
        </div>

        {/* Venetian plaster — the headline craft */}
        <div className="mt-16 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <VideoReel {...REELS.venetian} className="aspect-[4/3] lg:col-span-7 lg:aspect-[16/11]" />
          <div data-reveal className="lg:col-span-5">
            <p className="eyebrow text-teal">{venetian.eyebrow}</p>
            <h3 className="silk-head mt-3 text-3xl font-semibold sm:text-4xl">{venetian.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-clay/75 sm:text-base">{venetian.body}</p>
            <p className="eyebrow mt-6 border-t border-clay/15 pt-4 text-clay/55">{venetian.detail}</p>
          </div>
        </div>

        {/* Carpentry + millwork */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:gap-12">
          {[carpentry, millwork].map((t) => (
            <article key={t.id}>
              <VideoReel {...REELS[t.id]} className="aspect-[5/4]" />
              <div data-reveal>
                <p className="eyebrow mt-6 text-teal">{t.eyebrow}</p>
                <h3 className="silk-head mt-2 text-2xl font-semibold sm:text-3xl">{t.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-clay/75">{t.body}</p>
                <p className="eyebrow mt-5 border-t border-clay/15 pt-4 text-clay/55">{t.detail}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Exterior facade — the closing movement: step outside, shown as a
            diptych of two homes rather than a single hero */}
        <div className="mt-16 border-t border-clay/15 pt-14 lg:mt-24 lg:pt-16">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow text-teal">{facade.eyebrow}</p>
            <h3 className="silk-head mt-3 text-3xl font-semibold sm:text-4xl">{facade.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-clay/75 sm:text-base">{facade.body}</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {FACADE_REELS.map((reel) => (
              <VideoReel key={reel.src} {...reel} className="aspect-video" />
            ))}
          </div>

          <p data-reveal className="eyebrow mt-6 text-clay/55">
            {facade.detail}
          </p>
        </div>
      </div>
    </section>
  )
}
