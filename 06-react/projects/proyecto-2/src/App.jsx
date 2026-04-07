// Import de React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import de Componentes
import { Header, Main, Footer } from "./Components"

// Import de Estilos
import './assets/styles/App.css'

function App() {

  return (
    <BrowserRouter> {/* Habilita el sistema de rutas en toda la app */}
      <Header /> {/* Fuera de Routes para que aparezca en todas las páginas */}
      <Routes> {/* Contenedor donde se renderizan las rutas */}
        <Route path="/" element={<Main />} /> {/* Asocia la ruta / con el componente Home */}
      </Routes>
      <Footer /> {/* Fuera de Routes para que aparezca en todas las páginas */}
    </BrowserRouter>
  )
}
export default App