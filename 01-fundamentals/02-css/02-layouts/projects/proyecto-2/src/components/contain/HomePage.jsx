import Sidebar from "../sidebar/Sidebar.jsx";
import Card from "../card/Card.jsx"

import "./HomePage.css"

function HomePage() {
    return (
        <>
            <main className="main">
                <Sidebar />
                <div className="main__container">
                    <div className="container__cards">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </main>
        </>
    )
}
export default HomePage