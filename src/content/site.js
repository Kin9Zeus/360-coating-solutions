// ---------------------------------------------------------------------------
// EDIT ME — every real-world detail lives here so it can be swapped in one
// place. Content migrated from 360paintingandwalldesign.com (the previous
// site), condensed so the new page stays uncluttered.
// ---------------------------------------------------------------------------

export const CONTACT = {
  phone: '(307) 251-7072',
  email: 'info@360coatingsolutions.com', // TODO: confirm the address to publish
  address: 'PO Box 630082, Highlands Ranch, CO 80163',
  serviceArea: 'Highlands Ranch · Denver Front Range',
  instagram: 'https://www.instagram.com/360coatingsolutions',
  facebook: 'https://www.facebook.com/profile.php?id=100094539626039',
}

// The contact form posts to /api/contact, handled by server/index.js
// (Resend). Which inbox each inquiry lands in — homeowner vs. builder — is
// configured there via CONTACT_EMAIL_HOMEOWNER / CONTACT_EMAIL_BUILDER env
// vars, not here, since recipient addresses are server-side only. See
// README.md → "Contact form (Resend + Railway)".

// Ten cities from the previous site, ordered from home base outward.
export const SERVICE_AREAS = [
  'Highlands Ranch',
  'Lone Tree',
  'Centennial',
  'South Glenn',
  'Columbine',
  'Englewood',
  'Littleton',
  'Glendale',
  'Lakewood',
  'Aurora',
  'Denver',
]

export const TESTIMONIALS = [
  {
    id: 'terri',
    quote:
      'Absolutely the BEST! That was as painless a process as we could have ever imagined once we hired this team. Color consulting, attention to detail, quick responses to questions… the trust of the HRCA and ARC committees — the team attended the meetings on our behalf.',
    name: 'Terri Shuman',
    meta: 'Exterior repaint & HOA approvals · April 2025',
    featured: true,
  },
  {
    id: 'nathanel',
    quote:
      'I HIGHLY recommend giving them a chance to show you the kind of excellent workmanship that I have only seen a handful of times in my 10 years as a project manager. 360 holds itself to a higher standard of quality and accountability.',
    name: 'Nathanel Mendoza',
    meta: 'Project manager · Interior & exterior, multiple projects',
    featured: true,
  },
  {
    id: 'cathy',
    quote:
      'Tatiana and the crew repainted our whole main level and second floor last week in only 4 days! They protected and moved all of our things for us… We join many other BC families in offering our highest recommendation.',
    name: 'Cathy Herr-Kaminski',
    meta: 'Whole-home interior repaint · May 2024',
    featured: true,
  },
  {
    id: 'laura',
    quote:
      'Tatiana Gomez and 360 really elevated the space — adding glam and luxury to what were literally just plain, gray walls before… She is a perfectionist.',
    name: 'Laura Flatt',
    meta: 'Entryway & staircase accent wall · March 2024',
  },
  {
    id: 'tina',
    quote:
      'We had them paint our new baseboards and stair risers and they did a fantastic job. They also installed new balusters for a much more reasonable rate than someone else quoted. Tatiana made sure we were 100% happy before the job was complete.',
    name: 'Tina Christensen',
    meta: 'Millwork, balusters & finish carpentry',
  },
  {
    id: 'stephanie',
    quote:
      'Taty has been amazing to work with. I am a picky client and Taty has been flexible and accommodating with beautiful rendering options. I highly recommend Taty and 360!',
    name: 'Stephanie Wise Nalick',
    meta: 'Exterior & interior transformation · April 2025',
  },
  {
    id: 'jen',
    quote:
      'I wanted my home office to be a place that felt like an office and made me excited to WFH… And no need for virtual backgrounds. I could not be happier.',
    name: 'Jen Nichols',
    meta: 'Home office redesign · December 2024',
  },
  {
    id: 'dennis',
    quote:
      'We recently finished some painting and wall design projects with 360 and couldn’t be happier… we would highly recommend Tatiana Gomez and her team of talented professionals.',
    name: 'Dennis Smythe',
    meta: 'Painting & wall design · February 2024',
  },
  {
    id: 'jackie',
    quote:
      'They helped us paint this stair railing white in our previous house, before putting on market. The finish was perfect. We were very pleased!',
    name: 'Jackie Stratton',
    meta: 'Staircase refinishing · April 2024',
  },
]

export const COATING_SERVICES = [
  {
    title: 'New-construction production painting',
    body: 'Full interior and exterior paint packages for premier builders — scheduled by phase, staffed to spec, documented at every walkthrough.',
    icon: 'blueprint',
  },
  {
    title: 'Exterior coating systems',
    body: 'Colorado sun, snow, wind and rapid temperature swings destroy unprotected surfaces. We specify primers that bond and topcoats that hold their color — not the cheapest can on the shelf.',
    icon: 'shield',
  },
  {
    title: 'Repaints & HOA compliance',
    body: 'Color approvals, ARC paperwork and committee presentations handled end-to-end. We attend the meetings so owners never have to.',
    icon: 'stamp',
  },
  {
    title: 'Commercial & multi-unit',
    body: 'Durable finishes for high-traffic interiors and building envelopes — scheduled evenings and weekends so your doors stay open.',
    icon: 'building',
  },
]

export const PAINTING_SERVICES = [
  {
    title: 'Interior & exterior painting',
    body: 'Furniture protected, rooms sequenced, homes left spotless. Interior finishes that wash clean for years; exteriors built for Colorado weather.',
  },
  {
    title: 'Accent walls & wall design',
    body: 'Geometric paneling, wood slats, shiplap and sculpted feature walls — designed for your room, then built and finished by hand.',
  },
  {
    title: 'Color consultation & renderings',
    body: 'See your room before a brush is lifted. Color chosen for how your light actually moves through the day, not how a chip looks in the store.',
  },
  {
    title: 'Space & interior design',
    body: 'Color, spatial planning and materials coordinated together — turning houses into homes and offices into rooms that earn their keep.',
  },
]

// Real questions prospects ask, answered in 40–60 words each — the length AI
// search engines extract cleanest. Every answer is grounded in something
// verifiable from the business (testimonials, service pages), never invented.
// These render visibly in the FAQ section AND feed the FAQPage schema in
// index.html; Google requires FAQ schema content to be visible on the page,
// so the two must stay in sync.
export const FAQS = [
  {
    q: 'Do you handle HOA and ARC color approvals?',
    a: 'Yes — end to end. We prepare the color submittals, complete the paperwork, and attend the HOA and ARC committee meetings on your behalf. Homeowners in Highlands Ranch and Backcountry regularly hand us a non-compliance letter and never have to appear at a meeting themselves.',
  },
  {
    q: 'How long does a whole-home interior repaint take?',
    a: 'Most homes finish in days rather than weeks. A recent Backcountry project covered an entire main level and second floor in four days, including protecting and moving furniture. We sequence rooms so the house stays livable and hand it back clean.',
  },
  {
    q: 'Can I see the color before you start painting?',
    a: 'Yes. Tatiana designs your room first and delivers photorealistic renderings, so you approve the finished look before a brush is lifted. Color is chosen around how daylight actually moves through your space, not how a chip looks under store lighting.',
  },
  {
    q: 'Which Colorado communities do you serve?',
    a: 'We serve Highlands Ranch, Lone Tree, Centennial, South Glenn, Columbine, Englewood, Littleton, Glendale, Lakewood, Aurora and Denver — the Front Range south of Denver, with a concentrated presence in the Backcountry neighborhood of Highlands Ranch.',
  },
  {
    q: 'What makes exterior paint last in Colorado?',
    a: 'Colorado sun, hail and rapid freeze–thaw cycles destroy unprotected surfaces. Longevity comes from specification, not brand: primers that genuinely bond to the substrate, and topcoats chosen for UV resistance and the traffic and moisture that surface actually sees.',
  },
  {
    q: 'How long does Venetian plaster last?',
    a: 'With basic care, a properly applied Venetian plaster wall stays beautiful for 15–20 years. We hand-trowel three to four whisper-thin coats, burnish to a polished stone-like depth, then seal it — which is what makes the finish resist aging.',
  },
]

// The specialty trades — carried over from the old site's service pages.
// These sit between the two wings because both companies draw on them.
export const SPECIALTY_TRADES = [
  {
    id: 'venetian',
    eyebrow: 'Old-world finish',
    title: 'Venetian plaster',
    body: 'Three to four whisper-thin coats, hand-troweled and burnished to a polished stone-like depth that shifts with the light. Sealed to resist aging — beautiful for 15–20 years with basic care.',
    detail: 'Prep · Multi-layer trowel · Custom color · Seal · Inspection',
  },
  {
    id: 'carpentry',
    eyebrow: 'Built to fit',
    title: 'Custom carpentry',
    body: 'Cabinetry, built-ins, office fixtures and storage designed for your room and your habits — working with the grain of the wood rather than against it.',
    detail: 'Kitchens · Built-ins · Office fixtures · Storage',
  },
  {
    id: 'millwork',
    eyebrow: 'Architectural character',
    title: 'Custom millwork',
    body: 'Crown molding, baseboards, chair rails and window casings milled to your home’s proportions. The detail mass-produced trim can never replicate.',
    detail: 'Crown · Base · Chair rail · Casings',
  },
  {
    id: 'facade',
    eyebrow: 'Seen from the street',
    title: 'Exterior facade design',
    body: 'The stone and brick stay — everything else changes. We design the palette around the materials you can’t move, then repaint stucco, siding, trim and garage doors in systems built for Colorado sun, hail and freeze–thaw.',
    detail: 'Color design · Stucco & siding · Trim, shutters & doors · HOA approval',
  },
]
