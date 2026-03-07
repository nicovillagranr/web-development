import TitleWatcher from "./Components/TitleWatcher/TitleWatcher"

import Header from "./Components/1-Header/Header"
import Main from "./Components/2-Main/Main"
import Footer from "./Components/4-Footer/Footer"

import "./assets/styles/reset.css"
import "./assets/fonts/Baloo_2/font.css"
import './assets/styles/App.css'
function App() {

  return (
    <>
      <TitleWatcher />
      <Header />
      <Main />
      <Footer />
    </>
  )
}
export default App
