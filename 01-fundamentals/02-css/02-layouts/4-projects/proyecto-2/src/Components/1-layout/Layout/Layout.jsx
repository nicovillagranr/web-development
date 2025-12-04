import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import "./Layout.css"

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}
export default Layout;
