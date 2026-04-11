import { useState } from "react";

import "./assets/styles/App.css"

import Preloader from "@/Components/0-Preloader/Preloader";
import Header from "@/Components/1-Header/Header";
import Hero from "@/Components/2-Main/1-Hero/Hero";
import Catalog from "@/Components/2-Main/2-Catalog/Catalog";
import About from "@/Components/2-Main/3-About/About";
import Footer from "@/Components/3-Footer/Footer";

const PRELOADER_KEY = "preloader:seen";

export default function App() {

  const [loading, setLoading] = useState(
    () => localStorage.getItem(PRELOADER_KEY) !== "1"
  );

  const handlePreloaderComplete = () => {
    localStorage.setItem(PRELOADER_KEY, "1");
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Header />
      <main className="container-page">
        <Hero />
        <Catalog />
        <About />
      </main>
      <Footer />
    </>
  );
}
