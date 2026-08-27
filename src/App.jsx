import { useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import ProgressRing from './components/ProgressRing'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Gateway from './components/Gateway'
import CoatingWing from './components/CoatingWing'
import PaintingWing from './components/PaintingWing'
import SpecialtyTrades from './components/SpecialtyTrades'
import Transformations from './components/Transformations'
import Family from './components/Family'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Philosophy />
        <Gateway />
        <CoatingWing />
        <PaintingWing />
        <SpecialtyTrades />
        <Transformations />
        <Family />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ProgressRing />
    </>
  )
}
