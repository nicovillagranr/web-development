// ================= CONTEXTO MODULO =================
// Componente raiz que compone todas las secciones de la landing page.
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import PainPoints from './components/sections/PainPoints'
import Services from './components/sections/Services'
import Process from './components/sections/Process'
import Metrics from './components/sections/Metrics'
import Testimonials from './components/sections/Testimonials'
import Faq from './components/sections/Faq'
import FinalCta from './components/sections/FinalCta'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <Process />
      <Metrics />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  )
}
