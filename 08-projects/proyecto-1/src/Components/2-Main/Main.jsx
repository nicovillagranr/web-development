import Card from "../3-Card/Card"

import "./Main.css"
import women from "../../assets/images/women.webp"
import wandIcon from "../../assets/icons/wand-magic-sparkles-solid-full.svg"
import boltIcon from "../../assets/icons/bolt-solid-full.svg"
import mobileIcon from "../../assets/icons/mobile-screen-solid-full.svg"
import paintbrushIcon from "../../assets/icons/paintbrush-solid-full.svg"
import lockIcon from "../../assets/icons/user-lock-solid-full.svg"
import rocketIcon from "../../assets/icons/rocket-solid-full.svg"
function Main() {
    return (
        <main className="main">

            <div className="main__box-1" id="about">
                <picture>
                    <source srcSet={women} type="image/webp" />
                    <img
                        src={women}
                        alt="Imagen de Portada"
                        width="740"
                        height="400"
                        className="box-1__img"
                    />
                </picture>


                <div className="box-1__text">
                    <h1 className="box-1__title">Welcome to the Future</h1>
                    <p className="box-1__p">Experience cutting-edge glass morphism design that brings depth and elegance to modern web interfaces. Clean, translucent, and beautifully interactive.</p>
                    <button className="box-1__btn">Learn More</button>
                </div>
            </div>


            <div className="main__box-2" id="services">

                <Card
                    icon={<img src={wandIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Modern Design"
                    text="Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.">
                </Card>

                <Card
                    icon={<img src={boltIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Fast Performance"
                    text="Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices">
                </Card>

                <Card
                    icon={<img src={mobileIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Responsive"
                    text="Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.">
                </Card>

                <Card
                    icon={<img src={paintbrushIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Interactive UI"
                    text="Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.">
                </Card>

                <Card
                    icon={<img src={lockIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Secure & Safe"
                    text="Built with modern security standards and best practices to ensure your data and user privacy are protected.">
                </Card>

                <Card
                    icon={<img src={rocketIcon} alt="" aria-hidden="true" className="card__icon-svg" />}
                    title="Easy Integration"
                    text="Simple to implement and customize for any project with clean, well-documented code and flexible components.">
                </Card>

            </div>

        </main>
    )
}
export default Main
