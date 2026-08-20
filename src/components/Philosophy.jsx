import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'

// Three commitments. Each card draws another arc of the circle, so the count
// is read from the array rather than hardcoded — dropping or adding a value
// re-divides the ring automatically.
const VALUES = [
  {
    title: 'Ambition & Growth',
    body: 'Andrés and Tatiana, two engineers with fifteen-plus years each in high-stakes oil & gas production, now applying that same rigor to walls instead of wells.',
  },
  {
    title: 'Love & Family',
    body: 'Every project is signed with our family name, so it gets finished the way we finish things for our own home.',
  },
  {
    title: 'Precision & Grace',
    body: 'Structural discipline underneath, beautiful transformation on the surface. Neither is optional. Both are the job.',
  },
]

// Arc from 12 o'clock sweeping (i+1)/total of the full circle.
function arcPath(i, total) {
  const theta = ((i + 1) * 2 * Math.PI) / total
  const x = 12 + 9 * Math.sin(theta)
  const y = 12 - 9 * Math.cos(theta)
  const largeArc = theta > Math.PI ? 1 : 0
  return `M 12 3 A 9 9 0 ${largeArc} 1 ${x} ${y}`
}

export default function Philosophy() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="circle" className="relative scroll-mt-16 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={60} label="About Us" />

        <h2 data-reveal className="silk-head mt-6 max-w-4xl text-3xl leading-[1.12] text-sand sm:text-4xl lg:text-5xl">
          360 Coating Solutions: Interior &amp; Exterior Painting,
          <span className="silk-italic text-gold"> Elevated by Design.</span>
        </h2>

        <p data-reveal className="mt-8 max-w-3xl text-base leading-relaxed text-sand/75 sm:text-lg">
          360 Coating Solutions is a full-service painting and design company serving homeowners, residential
          communities and builders. We specialize in professional interior and exterior painting, combining
          detailed preparation, premium finishes, precise execution and hands-on quality control to deliver
          beautiful, durable results.
        </p>

        <div className="mt-8 grid max-w-5xl gap-8 text-[15px] leading-relaxed text-sand/60 sm:text-base lg:grid-cols-2 lg:gap-14">
          <p data-reveal>
            Our services extend far beyond paint. Through personalized color consultations, photorealistic
            renderings, custom accent walls, architectural wall treatments and complete space design, we help
            clients visualize every detail before work begins. From selecting the perfect color palette to
            creating custom millwork, geometric paneling, wood slats, shiplap and sculpted feature walls, every
            project is thoughtfully designed to complement the home and the way our clients live.
          </p>
          <p data-reveal data-reveal-delay={0.08}>
            At 360 Coating Solutions, painting, design and craftsmanship come together under one consistent
            standard, creating polished, inviting spaces and a seamless client experience from concept to final
            handoff.
          </p>
        </div>

        <p data-reveal className="eyebrow mt-20 text-gold/70">
          The commitments behind the circle
        </p>

        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-sand/10 bg-sand/10 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <article
              key={v.title}
              data-reveal
              data-reveal-delay={i * 0.1}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-steel"
            >
              {/* each value completes another arc of the circle */}
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold/70 transition-colors duration-300 group-hover:text-gold" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                {i === VALUES.length - 1 ? (
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                ) : (
                  <path d={arcPath(i, VALUES.length)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
              <h3 className="steel-head mt-6 text-lg font-bold text-sand">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sand/60">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
