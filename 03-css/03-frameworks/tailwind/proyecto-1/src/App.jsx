// Importamos React Router DOM para actualización de contenido dinámico
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

// Importamos Framer Motion para animar flujo de contenido
import { AnimatePresence, motion } from "framer-motion"

// Importamos estilos globales
import './assets/styles/App.css'

// Importamos componentes
import Header from "./Components/01-Header/Header.jsx"
import Hero from "./Components/02-Hero/Hero.jsx"
import Services from "./Components/03-Services/Services.jsx"
import Portfolio from "./Components/04-Portfolio/Portfolio.jsx"
import Team from "./Components/05-Team/Team.jsx"
import News from "./Components/06-News/News.jsx"
import Contact from "./Components/07-Contact/Contact.jsx"
import Footer from "./Components/08-Footer/Footer.jsx"
import NotFound from "./Components/NotFound/404.jsx"



// Componente ¨Page¨ para envolver cada página y aplicar animaciones
function Page({ children }) {
    return (
        <motion.main
            role="main"
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
