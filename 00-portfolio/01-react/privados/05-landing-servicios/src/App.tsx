import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MobileCtaBar } from "./components/MobileCtaBar";
import { Process } from "./components/Process";
import { Services } from "./components/Services";

export function App() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
