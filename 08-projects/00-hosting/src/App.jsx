import { useState, useEffect } from "react";

import "./assets/styles/App.css";

import Preloader from "@/Components/0-Preloader/Preloader";
import Header from "@/Components/1-Header/Header";
import Hero from "@/Components/2-Main/1-Hero/Hero";
import Catalog from "@/Components/2-Main/2-Catalog/Catalog";
import Footer from "@/Components/3-Footer/Footer";
import ErrorBoundary from "@/Components/4-ErrorBoundary/ErrorBoundary";

import { PRELOADER_KEY, THEME_KEY } from "./data/storageKeys";
import { useProjects } from "@/hooks/useProjects";

export default function App() {

  const [loading, setLoading] = useState(
    () => localStorage.getItem(PRELOADER_KEY) !== "1"
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
  );

  const { projects, profile, loading: projectsLoading, error: projectsError } = useProjects();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handlePreloaderComplete = () => {
    localStorage.setItem(PRELOADER_KEY, "1");
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="container-page">
        {/* Error Boundary tiene como propósito mostrar un componente alternativo en caso de error */}
        {/* De esta forma, si la lógica da error, no se muestra un pantallazo blanco al usuario */}
        <ErrorBoundary>
          <Hero projects={projects} profile={profile} />
          <Catalog projects={projects} loading={projectsLoading} error={projectsError} />
        </ErrorBoundary>
      </main>
      <Footer theme={theme} profile={profile} />
    </>
  );
}
