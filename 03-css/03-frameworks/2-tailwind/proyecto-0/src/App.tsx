// Import de estilos
import "./assets/styles/App.css"

// Import de React Router
import { Routes, Route } from "react-router-dom"

// Import de la data a recorrer
import { games } from "./data/";

// Import de componentes
import { Header } from "./Components/Header/Header";
import { VideoGameGrid } from "./Components/Hero";
import { About } from "./Components/About/About"

// A la hora de aplicar Tailwind el orden debe ser:
// layout -> display -> spacing -> border -> colors -> text -> effects -> transitions -> transforms -> interactivity -> svg

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VideoGameGrid games={games} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}
export default App