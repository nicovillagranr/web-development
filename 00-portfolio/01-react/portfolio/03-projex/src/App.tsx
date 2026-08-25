// HashRouter: Es el contenedor que habilita el sistema de rutas de React Router. En este caso, las URLs quedarán con el hash (#)
// Esto es especialmente útil para sitios estáticos porque el servidor no necesita saber qué hacer con /portfolio.
import { HashRouter } from "react-router-dom";

// Routes: Es el contenedor de todas las rutas. "Aquí le voy a decir a React qué páginas existen."
// Route: Define una ruta individual. "Cuando la URL sea /services, renderiza Services dentro de Page."
import { Routes, Route } from "react-router-dom";

// useLocation: Proporciona información para saber dónde estás actualmente dentro del arbol de rutas. "/" -> "/services": Necesito hacer un efecto de transición
import { useLocation } from "react-router-dom";

// ReactNode: Es un tipo de dato de React que representa cualquier cosa que pueda ser renderizada en un componente, por ejemplo, un componente, un texto, un elemento HTML, etc.
import type { ReactNode } from "react";

// Framer Motion para que los cambios de rutas no se vean de golpe, sino que con una animación programada
import { AnimatePresence, motion } from "framer-motion";

// Estilos
import "./assets/styles/App.css";

// Componentes
import Header from "./Components/01-Header/Header.tsx";
import Hero from "./Components/02-Hero/Hero.tsx";
import Services from "./Components/03-Services/Services.tsx";
import Portfolio from "./Components/04-Portfolio/Portfolio.tsx";
import Team from "./Components/05-Team/Team.tsx";
import News from "./Components/06-News/News.tsx";
import Contact from "./Components/07-Contact/Contact.tsx";
import Footer from "./Components/08-Footer/Footer.tsx";
import NotFound from "./Components/NotFound/404.tsx";

// Props que puede recibir el componente Page.
// children representa el contenido que se coloca dentro de las etiquetas <Page></Page>.
// Al estar tipado como ReactNode, puede recibir cualquier contenido que React pueda renderizar.
type PageProps = {
  children: ReactNode;
};

// Componente que envuelve el contenido de cada ruta.
// Su función es aplicar una animación común a todas las páginas.
// Este componente usa Framer Motion para animar la entrada y salida
// del contenido cuando cambia la ruta.
function Page({ children }: PageProps) {
  return (
    <motion.main
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}>
      {children}
    </motion.main>
  );
}

// Componente que contiene y gestiona las rutas de la aplicación.
// useLocation permite obtener la ubicación actual para que el cambio de ruta pueda ser detectado y utilizado junto con Framer Motion
// para realizar las transiciones entre páginas.
function AnimatedRoutes() {
  const location = useLocation();
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
  );
}

// Componente principal de la aplicación
// HashRouter: Habilita el sistema de rutas de React Router.
// Header y footer quedan fijos fuera del sistema de rutas animadas
// AnimatedRoutes: Contiene y gestiona las rutas de la aplicación
function App() {
  return (
    <HashRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  );
}

export default App;
