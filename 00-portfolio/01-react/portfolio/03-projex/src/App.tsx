import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./assets/styles/App.css";

import Header from "./Components/01-Header/Header.tsx";
import Hero from "./Components/02-Hero/Hero.tsx";
import Services from "./Components/03-Services/Services.tsx";
import Portfolio from "./Components/04-Portfolio/Portfolio.tsx";
import Team from "./Components/05-Team/Team.tsx";
import News from "./Components/06-News/News.tsx";
import Contact from "./Components/07-Contact/Contact.tsx";
import Footer from "./Components/08-Footer/Footer.tsx";
import NotFound from "./Components/NotFound/404.tsx";

const MotionMain = motion.main;

function Page({ children }) {
  return (
    <MotionMain
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </MotionMain>
  );
}

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