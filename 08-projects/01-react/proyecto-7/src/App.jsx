// Import de React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import de Lazy Loading
import { lazy, Suspense } from "react"

// Import de Data
import { ROUTES } from "./utils/constants"

// Import de Componentes
import { ScrollToTop } from "./utils/ScrollToTop"
import { Header } from "./Components/1-Header/Header"
import { Home } from "./Components/2-Main/1-Home/Home"
import { Products } from "./Components/2-Main/2-Products/Products"
import { DetailsProduct } from "./Components/2-Main/3-Details/DetailsProduct"
import { SearchResults } from "./Components/2-Main/6-SearchResults/SearchResults"
import { CartProvider } from "./Components/2-Main/5-CartContext/CartContext"
import Cart from "./Components/2-Main/4-Cart/Cart"
import { Footer } from "./Components/3-Footer/Footer"
const Help = lazy(() => import("./pages-static/Help/Help"))
const Shipping = lazy(() => import("./pages-static/Shipping/Shipping"))
const Contact = lazy(() => import("./pages-static/Contact/Contact"))
const Terms = lazy(() => import("./pages-static/Terms/Terms"))

// Import de Estilos
import './assets/styles/App.css'

function App() {
  return (
    <CartProvider>
      {/* // BrowserRouter para navegación entre páginas */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        {/* Componente para resetear el scroll */}
        <ScrollToTop />
        <Header />
        <main>
          <Suspense fallback={<h1>Cargando...</h1>}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.PRODUCT_DETAIL} element={<DetailsProduct />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.SEARCH} element={<SearchResults />} />
              <Route path={ROUTES.HELP} element={<Help />} />
              <Route path={ROUTES.SHIPPING} element={<Shipping />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.TERMS} element={<Terms />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}
export default App