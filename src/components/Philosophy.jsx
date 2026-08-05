import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'

const VALUES = [
  {
    title: 'Love & Family',
    body: 'Every project is signed with our family name — so it gets finished the way we finish things for our own home.',
  },
  {
    title: 'Ambition & Growth',
    body: 'Two engineers, fifteen-plus years each in high-stakes oil & gas production, now applying that rigor to walls instead of wells.',
  },
  {
    title: 'Faith & Purpose',
    body: 'We met in church thirty years ago. Integrity is not a company policy; it is how we were raised, and how we raise our sons.',
  },
  {
    title: 'Precision & Grace',
    body: 'Structural discipline underneath, beautiful transformation on the surface. Neither is optional. Both are the job.',
  },
]

export default function Philosophy() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="circle" className="relative scroll-mt-16 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={60} label="The 360 Philosophy" />

        <h2 data-reveal className="silk-head mt-6 max-w-3xl text-4xl leading-[1.08] text-sand sm:text-5xl lg:text-6xl">
          &ldquo;360&rdquo; is not a number.
          <span className="silk-italic text-gold"> It&rsquo;s a covenant.</span>
        </h2>

        <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-sand/65 sm:text-lg">
          Four commitments, joined end to end with no seam and no shortcut — the circle our companies are built on.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-sand/10 bg-sand/10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <article
              key={v.title}
              data-reveal
              data-reveal-delay={i * 0.1}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-steel"
            >
              {/* each value completes another quarter of the circle */}
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold/70 transition-colors duration-300 group-hover:text-gold" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                {i === 3 ? (
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                ) : (
                  <path
                    d={`M 12 3 A 9 9 0 ${i >= 2 ? 1 : 0} 1 ${12 + 9 * Math.sin(((i + 1) * Math.PI) / 2)} ${12 - 9 * Math.cos(((i + 1) * Math.PI) / 2)}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
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
