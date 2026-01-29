// Importamos useEffect y useState para manejo de DarkMode
import { useEffect, useState } from "react";

// Importamos React Router DOM para actualización de contenido dinámico
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

// Importamos Framer Motion para animar flujo de contenido
import { AnimatePresence, motion } from "framer-motion"

// Importamos estilos globales
import './assets/styles/App.css'

// Importamos componentes
import Header from "./Components/1-Header/Header.jsx"
import Hero from "./Components/2-Hero/Hero.jsx"
import Services from "./Components/3-Services/Services.jsx"
import Portfolio from "./Components/4-Portfolio/Portfolio.jsx"
import Team from "./Components/5-Team/Team.jsx"
import News from "./Components/6-News/News.jsx"
import Contact from "./Components/8-Contact/Contact.jsx"
import Footer from "./Components/9-Footer/Footer.jsx"
import NotFound from "./Components/10-NotFound/404.jsx"


// ─────────────────────────────────────────────
// Helper: tema inicial (LIGHT por defecto)
// ─────────────────────────────────────────────
const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme")
    return storedTheme ? storedTheme : "light"
}


// Componente ¨Page¨ para envolver cada página y aplicar animaciones
function Page({ children }) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}>
            {children}
        </motion.main>
    )
}

// Animamos las rutas al cambiar de página
function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="*" element={<Page><NotFound /></Page>} />
                <Route path="/" element={<Page><Hero /></Page>} />
                <Route path="/services" element={<Page><Services /></Page>} />
                <Route path="/portfolio" element={<Page><Portfolio /></Page>} />
                <Route path="/team" element={<Page><Team /></Page>} />
                <Route path="/news" element={<Page><News /></Page>} />
                <Route path="/contact" element={<Page><Contact /></Page>} />
            </Routes>
        </AnimatePresence>
    )
}

// Componente principal con uso de Dark Mode + LocalStorage
function App() {

    // 🔹 MODIFICADO: estado inicial desde LocalStorage (light por defecto)
    const [theme, setTheme] = useState(getInitialTheme);

    // 🔹 MODIFICADO: sincroniza DOM + LocalStorage
    useEffect(() => {
        const root = document.documentElement

        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
    }, [theme])

    return (
        <HashRouter>
            <Header theme={theme} setTheme={setTheme} />
            <AnimatedRoutes />
            <Footer />
        </HashRouter>
    )
}

export default App
