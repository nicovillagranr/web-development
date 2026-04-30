// Import de React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import de Componentes
import { ScrollToTop } from "./Components/ScrollToTop"
import { Header } from "./Components/1-Header/Header"
import { Home } from "./Components/2-Main/1-Home/Home"
import { Products } from "./Components/2-Main/2-Products/Products"
import { DetailsProduct } from "./Components/2-Main/3-Details/DetailsProduct"
import { Footer } from "./Components/3-Footer/Footer"

// Import de Estilos
import './assets/styles/App.css'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
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