// Importamos React Router DOM para actualización de contenido dinámico
import { HashRouter, Routes, Route } from "react-router-dom";

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

function App() {
    return (
        <>
            <HashRouter>

                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Hero />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>

                <Footer />

            </HashRouter>
        </>
    )
}
export default App