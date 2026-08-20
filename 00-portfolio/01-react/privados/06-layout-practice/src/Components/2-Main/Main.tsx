// Import de estilos
import "./Main.css"

// Import de imagenes
import women from "../../assets/images/women.webp"

// Import de componentes
import Card from "../3-Card/Card"

// Import de datos
import { cardsData } from "../../data/cardsData"


function Main() {
    return (
        <main className="main">

            <section className="main__box-1" id="about">
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
                    <button className="box-1__btn" aria-label="Learn more about Glossy Touch">Learn More</button>
                </div>
            </section>


            <section className="main__box-2" id="services">


                {cardsData.map((card, index) => {
                    return (
                        <Card key={card.id} icon={card.icon} title={card.title} text={card.text} style={{ "--delay": `${(index + 1) * 0.1}s` }} />
                    )
                })}
            </section>

        </main>
    )
}
export default Main
