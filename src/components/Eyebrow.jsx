/**
 * Section marker. The page is one full 360° rotation — each section sits at a
 * bearing on the dial, so eyebrows read "120° — 360 COATING SOLUTIONS"
 * instead of generic 01/02/03 numbering.
 */
export default function Eyebrow({ deg, label, tone = 'dark', className = '' }) {
  const text = tone === 'dark' ? 'text-gold' : 'text-clay/70'
  const line = tone === 'dark' ? 'bg-gold/40' : 'bg-clay/25'
  return (
    <p data-reveal className={`eyebrow flex items-center gap-3 ${text} ${className}`}>
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <path
          d="M 8 1.5 A 6.5 6.5 0 0 1 14.5 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${deg} 8 8)`}
        />
      </svg>
      <span>
        {deg}° — {label}
      </span>
      <span className={`h-px w-12 ${line}`} aria-hidden="true" />
    </p>
  )
}
