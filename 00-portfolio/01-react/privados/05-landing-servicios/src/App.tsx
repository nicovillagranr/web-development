import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MobileCtaBar } from "./components/MobileCtaBar";
import { Process } from "./components/Process";
import { Services } from "./components/Services";

export function App() {
  return (
    // El padding inferior en móvil es la altura de MobileCtaBar (12 + 48 + 12) más el
    // inset del iPhone. Sin él, la barra fija tapa el final del footer y no hay forma
    // de leerlo, porque ya no queda página por debajo a la que hacer scroll.
    <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Process />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
