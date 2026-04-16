import './assets/styles/App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero id="inicio" />
        <About id="nosotros" />
        <Services id="servicios" />
        <WhyUs id="por-que-elegirnos" />
        <Contact id="contacto" />
      </main>
      <Footer />
    </>
  )
}

export default App
