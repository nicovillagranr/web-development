import type { ReactNode } from "react"

import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import "./Layout.css"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}
export default Layout;
