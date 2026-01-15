// Importamos React Router DOM para actualización de contenido dinámico
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
// HashRouter usado por compatibilidad con hosting estático (GitHub Pages).
// En entorno productivo con control de servidor se usaría BrowserRouter.


// Importamos Framer Motion para animar flujo de contenido
import { AnimatePresence, motion } from "framer-motion"


// Importamos estilos
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


function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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


function App() {
    return (
        <HashRouter>
            <Header />
            <AnimatedRoutes />
            <Footer />
        </HashRouter>
    )
}
export default App