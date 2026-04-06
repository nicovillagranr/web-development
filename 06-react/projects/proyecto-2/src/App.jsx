// Import de React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import de Componentes
import { Main, NavBar } from "./Components"

// Import de Estilos
import './assets/styles/App.css'

function App() {

  return (
    <BrowserRouter> {/* Habilita el sistema de rutas en toda la app */}
      <NavBar /> {/* Fuera de Routes para que aparezca en todas las páginas */}
      <Routes> {/* Contenedor donde se renderizan las rutas */}
        <Route path="/" element={<Main />} /> {/* Asocia una ruta / con un componente Home */}
        {/* <Route path="/about" element={<About />} /> Asocia la ruta /about con el componente About */}
      </Routes>
    </BrowserRouter>
  )
}
export default App