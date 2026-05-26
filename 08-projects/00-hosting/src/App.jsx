import { useState, useEffect, lazy, Suspense } from "react";
import "./assets/styles/App.css";

import Header from "@/Components/Header/Header";
import Hero from "@/Components/Main/Hero/Hero";
const Catalog = lazy(() => import("@/Components/Main/Catalog/Catalog"));
import Footer from "@/Components/Footer/Footer";
import ErrorBoundary from "@/Components/ErrorBoundary/ErrorBoundary";

import { THEME_KEY } from "./data/storageKeys";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function App() {

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
  );

  const { projects, profile, loading: projectsLoading, error: projectsError } = usePortfolioData();

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

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} profile={profile} loading={projectsLoading} />
      <main className="container-page">
        <ErrorBoundary profile={profile}>
          <Hero projects={projects} profile={profile} loading={projectsLoading} />
          <Suspense fallback={<div className="mt-6 min-h-[75vh]" aria-hidden="true" />}>
            <Catalog projects={projects} loading={projectsLoading} error={projectsError} />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer theme={theme} profile={profile} />
    </>
  );
}
