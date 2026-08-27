// ---------------------------------------------------------------------------
// Before & after gallery.
//
// 28 files (7 projects x before/after x two widths) is too many to hand-import,
// so the URLs are pulled in with import.meta.glob — Vite still hashes, bundles
// and tree-shakes them exactly like a static import. Files are named
// <id>-<before|after>-<width>.webp so a single lookup covers every variant.
// Raw originals (HEIC/PNG/JPEG, ~22 MB) live in /media/before_and_after,
// outside the deploy repo.
// ---------------------------------------------------------------------------

const FILES = import.meta.glob('../assets/img/ba/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const url = (id, kind, w) => {
  const key = `../assets/img/ba/${id}-${kind}-${w}.webp`
  const found = FILES[key]
  if (!found && import.meta.env.DEV) console.warn('[transformations] missing asset', key)
  return found
}

// Featured runs full-bleed at 3:2; the grid cards are 4:5 so the portrait
// interiors keep their height. Both widths are below every source's native
// size, so nothing is upscaled.
const SIZES = {
  feature: { widths: [900, 1440], w: 1440, h: 960, sizes: '(min-width: 1280px) 1216px, 92vw' },
  grid: { widths: [480, 760], w: 760, h: 950, sizes: '(min-width: 1024px) 390px, (min-width: 640px) 45vw, 90vw' },
}

function shot(id, kind, variant) {
  const s = SIZES[variant]
  return {
    src: url(id, kind, s.widths[s.widths.length - 1]),
    srcSet: s.widths.map((w) => `${url(id, kind, w)} ${w}w`).join(', '),
    sizes: s.sizes,
    w: s.w,
    h: s.h,
  }
}

const PROJECTS = [
  {
    id: 'exterior-facade',
    variant: 'feature',
    title: 'Tudor facade, full exterior repaint',
    note: 'Stucco, gable, trim and garage doors',
    alt: {
      before:
        'Two-story Tudor-style home before repainting, with tan stucco, brown garage doors and dated brown trim',
      after:
        'The same home after repainting, with white stucco, a charcoal board-and-batten gable and dark bronze garage doors',
    },
  },
  {
    id: 'dining-paneling',
    variant: 'grid',
    title: 'Dining room',
    note: 'Floor-to-ceiling paneled accent wall with paired sconces',
    alt: {
      before: 'Dining room before, with a bare pale wall and a mirror still leaning on the floor',
      after: 'The same dining room after, with a full-height gray paneled accent wall and two lit sconces',
    },
  },
  {
    id: 'basement-media',
    variant: 'grid',
    title: 'Basement media room',
    note: 'Paneled feature wall, built-in screen surround and wood columns',
    alt: {
      before: 'Basement sitting area before, with flat cream walls and a television mounted on a bare wall',
      after:
        'The same basement after, with a gray paneled wall, framed art, sconces and a built-in screen surround',
    },
  },
  {
    id: 'great-room',
    variant: 'grid',
    title: 'Two-story great room',
    note: 'Stacked stone replaced with painted paneling and a black hearth',
    alt: {
      before: 'Two-story great room before, dominated by a floor-to-ceiling stacked-stone fireplace wall',
      after:
        'The same great room after, with the stone replaced by white paneling, sconces and a black fireplace',
    },
  },
  {
    id: 'hearth-fireplace',
    variant: 'grid',
    title: 'Hearth room fireplace',
    note: 'Stone surround reworked in painted millwork with an antique mirror',
    alt: {
      before: 'Hearth room before, with a wide stacked-stone fireplace wall and dark wood flooring',
      after:
        'The same hearth room after, with a painted millwork fireplace surround, gold mirror and pale walls',
    },
  },
  {
    id: 'powder-room',
    variant: 'grid',
    title: 'Powder room',
    note: 'Emerald herringbone tile, floating oak vanity and brass fittings',
    alt: {
      before: 'Powder room before, with beige walls, tan tile wainscot and a dark framed mirror',
      after:
        'The same powder room after, with a dark green herringbone tile wall, floating oak vanity and brass fittings',
    },
  },
  {
    id: 'exterior-refresh',
    variant: 'grid',
    title: 'Two-tone exterior refresh',
    note: 'Charcoal siding, black garage doors and repainted trim',
    alt: {
      before: 'Suburban home exterior before, in flat beige siding with matching beige garage doors',
      after: 'The same home after, in charcoal and warm gray siding with black garage doors',
    },
  },
]

export const TRANSFORMATIONS = PROJECTS.map((p) => ({
  ...p,
  before: { ...shot(p.id, 'before', p.variant), alt: p.alt.before },
  after: { ...shot(p.id, 'after', p.variant), alt: p.alt.after },
}))
