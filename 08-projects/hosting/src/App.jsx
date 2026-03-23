import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main className="mx-auto w-[min(1080px,92vw)]">
        <Hero />
        <Catalog />
        <About />
      </main>

      <Footer />
    </>
  );
}
