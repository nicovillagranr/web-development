import { lazy } from "react"

import LazySection from "./Components/shared/LazySection/LazySection"

import './assets/styles/App.css'
import Navbar from './Components/1-Header/Navbar'
import Hero from './Components/2-Hero/Hero'

const About = lazy(() => import('./Components/3-About/About'));
const Services = lazy(() => import('./Components/4-Services/Services'))
const WhyUs = lazy(() => import('./Components/5-Why/WhyUs'))
const Contact = lazy(() => import('./Components/6-Contact/Contact'))

import Footer from './Components/7-Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero id="home" />

        <LazySection id={"about-us"}>
          <About />
        </LazySection>

        <LazySection id={"services"}>
          <Services />
        </LazySection>

        <LazySection id={"why-us"}>
          <WhyUs />
        </LazySection>

        <LazySection id={"contact"}>
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </>
  )
}
export default App