// Import de React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import de Componentes
import { Header, Home, Products, DetailsProduct, Footer } from "./features"

// Import de Estilos
import './assets/styles/App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/:id" element={<DetailsProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App
