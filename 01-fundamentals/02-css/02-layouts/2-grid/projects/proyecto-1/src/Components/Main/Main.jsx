import Card from "../Card/Card"

import "./Main.css"
import women from "../../assets/img/women.jpg"
function Main() {
    return (
        <main className="main">

            <div className="main__box-1">
                <img src={women} alt="Imagen de Portada" className="box-1__img" />
                <div className="box-1__text">
                    <h1 className="box-1__title">Welcome to the Future</h1>
                    <p className="box-1__p">Experience cutting-edge glass morphism design that brings depth and elegance to modern web interfaces. Clean, translucent, and beautifuly interactive.</p>
                    <button className="box-1__btn">Learn More</button>
                </div>
            </div>


            <div className="main__box-2">

                <Card
                    icon={<i class="fa-solid fa-wand-magic-sparkles"></i>}
                    title="Modern Desing"
                    text="Beatiful glass morphism effects with backdrop blir and translucent elements that create depth and visual hierarchy.">
                </Card>

                <Card
                    icon={<i class="fa-solid fa-bolt"></i>}
                    title="Fast Performance"
                    text="Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices">
                </Card>

                <Card
                    icon={<i class="fa-solid fa-mobile-screen"></i>}
                    title="Responsive"
                    text="Fully responsive design that adapts beatifully to any screen size, from mobile phones to desktop displays.">
                </Card>

                <Card
                    icon={<i class="fa-solid fa-paintbrush"></i>}
                    title="Interactive UI"
                    text="Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.">
                </Card>

                <Card
                    icon={<i class="fa-solid fa-lock"></i>}
                    title="Secure & Safe"
                    text="Built with modern security standards and best practices to ensure your data and user privacy are protected.">
                </Card>

                <Card
                    icon={<i class="fa-solid fa-rocket"></i>}
                    title="Easy Integration"
                    text="Simple to implement and customize for any project with clean, well-documented code and flexible components.">
                </Card>

            </div>

        </main>
    )
}
export default Main