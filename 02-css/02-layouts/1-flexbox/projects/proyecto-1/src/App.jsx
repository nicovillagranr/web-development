// Orden de los Imports

// 1. Librerías externas
import React from "react";

// 2. Estilos globales
import "./reset.css"
import "./App.css";

// 3. Lógica compartida


// 4. Componentes
import Header from "./components/header/Header.jsx";
import HomePage from "./components/contain/HomePage.jsx"
import Footer from "./components/footer/Footer.jsx"
// 5. Assets


function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}
export default App
