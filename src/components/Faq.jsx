import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Eyebrow from './Eyebrow'
import { FAQS } from '../content/site'

/**
 * Answers to the questions prospects actually ask before calling.
 *
 * Deliberately rendered as plain visible text rather than an accordion:
 * collapsed content is harder for search engines and AI answer engines to
 * extract, and Google's FAQ structured-data policy requires the answers to
 * be visible on the page. The matching FAQPage JSON-LD lives in index.html
 * and must mirror this copy exactly.
 */
export default function Faq() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="faq" className="relative scroll-mt-16 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow deg={330} label="Before You Call" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2 data-reveal className="silk-head max-w-2xl text-4xl leading-[1.08] text-sand sm:text-5xl lg:text-6xl">
            The questions
            <span className="silk-italic text-gold"> everyone asks.</span>
          </h2>
          <p data-reveal className="max-w-sm text-[15px] leading-relaxed text-sand/65">
            Straight answers, no estimating games. If yours isn&rsquo;t here, call
            or text — you&rsquo;ll reach Tatiana or Andrés, not a call center.
          </p>
        </div>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:gap-x-20">
          {FAQS.map((item, i) => (
            <div key={item.q} data-reveal data-reveal-delay={(i % 2) * 0.08}>
              <dt className="silk-head text-xl font-semibold text-sand sm:text-[22px]">{item.q}</dt>
              <dd className="mt-3 max-w-lg text-[15px] leading-relaxed text-sand/70">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
