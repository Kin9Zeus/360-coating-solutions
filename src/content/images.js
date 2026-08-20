// Central image registry. All assets are pre-optimized WebP generated from
// the originals in /media (see scratchpad script). Dimensions are recorded so
// every <img> can reserve layout space (zero CLS).

import foundersTarmac640 from '../assets/img/founders-tarmac-640.webp'
import foundersTarmac1080 from '../assets/img/founders-tarmac-1080.webp'
import familyPortrait from '../assets/img/family-portrait-716.webp'
import tatianaOffice from '../assets/img/tatiana-office-640.webp'
import tatianaLivingRoom from '../assets/img/tatiana-living-room-640.webp'
import portfolioDining720 from '../assets/img/portfolio-dining-720.webp'
import portfolioDining1280 from '../assets/img/portfolio-dining-1280.webp'
import logoPainting from '../assets/img/logo-painting.webp'

import reviewTerri from '../assets/img/review-terri.webp'
import reviewStephanie from '../assets/img/review-stephanie.webp'
import reviewCathy from '../assets/img/review-cathy.webp'
import reviewJen from '../assets/img/review-jen.webp'
import reviewLaura from '../assets/img/review-laura.webp'
import reviewDennis from '../assets/img/review-dennis.webp'
import reviewJackie from '../assets/img/review-jackie.webp'

export const IMG = {
  foundersTarmac: {
    src: foundersTarmac640,
    srcSet: `${foundersTarmac640} 640w, ${foundersTarmac1080} 1080w`,
    w: 640,
    h: 941,
    alt: 'Tatiana and Andrés Gomez in flight jackets, smiling on an airport tarmac under a blue Colorado sky',
  },
  familyPortrait: {
    src: familyPortrait,
    w: 716,
    h: 860,
    alt: 'The Gomez family: Andrés, Tatiana and their two sons, Mateo and Lucas, standing together by a pond in Backcountry, Colorado',
  },
  tatianaOffice: {
    src: tatianaOffice,
    w: 565,
    h: 850,
    alt: 'Tatiana Gomez in a home office she designed, with a charcoal panel accent wall, brass lighting and gold velvet pillows',
  },
  tatianaLivingRoom: {
    src: tatianaLivingRoom,
    w: 626,
    h: 850,
    alt: 'Tatiana standing in a luxury living room with a floor-to-ceiling stacked-stone fireplace',
  },
  portfolioDining: {
    src: portfolioDining720,
    srcSet: `${portfolioDining720} 720w, ${portfolioDining1280} 1280w`,
    w: 720,
    h: 960,
    alt: 'Finished dining room design with a round black-oak table, antique gold mirror and warm sconces over a cast fireplace',
  },
  logoPainting: {
    src: logoPainting,
    w: 900,
    h: 703,
    alt: '360 Painting & Wall Design, Tatiana Gomez logo',
  },
}

export const REVIEW_SHOTS = {
  terri: { src: reviewTerri, w: 900, h: 854 },
  stephanie: { src: reviewStephanie, w: 900, h: 428 },
  cathy: { src: reviewCathy, w: 900, h: 793 },
  jen: { src: reviewJen, w: 900, h: 1351 },
  laura: { src: reviewLaura, w: 900, h: 1023 },
  dennis: { src: reviewDennis, w: 900, h: 1301 },
  jackie: { src: reviewJackie, w: 900, h: 807 },
}
