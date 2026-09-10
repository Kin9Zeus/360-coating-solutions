import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import VideoReel from './VideoReel'
import { PAINTING_SERVICES } from '../content/site'
import { IMG } from '../content/images'

import reelReveal from '../assets/videos/living-room-reveal-web.mp4'
import posterReveal from '../assets/videos/living-room-reveal-poster.webp'
import reelBedroom from '../assets/videos/bedroom-accent-web.mp4'
import posterBedroom from '../assets/videos/bedroom-accent-poster.webp'
import reelStyled from '../assets/videos/living-room-styled-web.mp4'
import posterStyled from '../assets/videos/living-room-styled-poster.webp'
import reelDining from '../assets/videos/dining-panel-web.mp4'
import posterDining from '../assets/videos/dining-panel-poster.webp'
import reelBasement from '../assets/videos/basement-media-web.mp4'
import posterBasement from '../assets/videos/basement-media-poster.webp'

export default function PaintingWing() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="painting" className="silk-glow relative scroll-mt-16 bg-sand py-24 text-clay sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={180} label="360 Painting & Wall Design" tone="light" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2 data-reveal className="silk-head max-w-2xl text-4xl leading-[1.06] text-clay sm:text-5xl lg:text-6xl">
            Walls that <span className="silk-italic text-teal">feel</span> like home.
          </h2>
          <img
            data-reveal
            src={IMG.logoPainting.src}
            width={IMG.logoPainting.w}
            height={IMG.logoPainting.h}
            alt={IMG.logoPainting.alt}
            loading="lazy"
            className="w-40 mix-blend-multiply sm:w-48"
          />
        </div>

        <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-clay/75 sm:text-lg">
          Tatiana designs every room before a single brush is lifted, creating photorealistic renderings,
          personalized color stories and finishes executed with couture-level precision. Watch a few of her
          designs come to life below. Her BackCountry clients call her a perfectionist, and she proudly takes
          it as a compliment.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <VideoReel
            src={reelReveal}
            poster={posterReveal}
            label="Living Room, Bare Wall to Finished Space"
            byline="By Tatiana"
            badge="Rendering"
            className="aspect-video lg:col-span-6 lg:col-start-4 lg:row-start-1"
          />
          <VideoReel
            src={reelBedroom}
            poster={posterBedroom}
            label="Geometric Accent Wall, Primary Bedroom"
            byline="By Tatiana"
            badge="Rendering"
            className="aspect-video lg:col-span-3 lg:col-start-4 lg:row-start-2"
          />
          <VideoReel
            src={reelDining}
            poster={posterDining}
            label="Dining Room, Paneled Accent Wall"
            byline="By Tatiana"
            badge="Rendering"
            className="aspect-[3/4] lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:aspect-auto"
          />
          <VideoReel
            src={reelBasement}
            poster={posterBasement}
            label="Media Room, Full Transformation"
            byline="By Tatiana"
            badge="Rendering"
            className="aspect-[3/4] lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2 lg:aspect-auto"
          />
          <VideoReel
            src={reelStyled}
            poster={posterStyled}
            label="Living Room, Color & Styling"
            byline="By Tatiana"
            badge="Rendering"
            className="aspect-video lg:col-span-3 lg:col-start-7 lg:row-start-2"
          />
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <aside data-reveal className="order-2 lg:order-1">
            <blockquote className="border-l-2 border-teal/60 pl-6">
              <p className="silk-italic text-2xl leading-snug text-clay sm:text-[28px]">
                &ldquo;My greatest motivation is seeing my clients genuinely happy with the spaces we create
                together.&rdquo;
              </p>
              <footer className="mt-5">
                <p className="silk-head text-xl font-semibold text-clay">Tatiana Gomez</p>
                <p className="eyebrow mt-1 text-clay/60">Creative Director · High-End Residential Design</p>
              </footer>
            </blockquote>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-clay/70">
              An industrial engineer with an MBA in Global Management and fifteen years of experience in the
              oil and gas industry, Tatiana brings technical discipline, strategic thinking and genuine warmth
              to every project. Her goal is to create beautifully designed, polished and inviting spaces
              through thoughtful renderings, transparent timelines, meticulous execution and a spotless final
              handoff.
            </p>
          </aside>

          <div className="order-1 lg:order-2">
            <ul className="divide-y divide-clay/15">
              {PAINTING_SERVICES.map((s, i) => (
                <li key={s.title} data-reveal data-reveal-delay={i * 0.07} className="group flex gap-5 py-6">
                  <span
                    className="mt-1.5 h-3 w-3 shrink-0 rotate-45 bg-teal/70 transition-transform duration-300 group-hover:rotate-[135deg]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="silk-head text-xl font-semibold text-clay">{s.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-clay/65">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
