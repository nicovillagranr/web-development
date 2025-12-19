import Layout from "./Components/1-layout/Layout/Layout"
import Hero from "./Components/2-Hero/HeroSection"
import Features from "./Components/3-Features/FeatureSection/FeaturesSection"
import PortfolioSection from "./Components/4-Portfolio/PortfolioSection/PortfolioSection"
import TeamSection from "./Components/5-Team/TeamSection/TeamSection"
import Testimonial from "./Components/6-Testimonial/Testimonial"
import CTA from "./Components/7-Cta/CTA"

import "./assets/styles/reset.css"
import "./assets/styles/variables.css"
import "./assets/styles/App.css"

function App() {

  return (
    <>
      <Layout>
        <Hero />
        <Features />
        <PortfolioSection />
        <TeamSection />
        <Testimonial />
        <CTA />
      </Layout>
    </>
  )
}
export default App
