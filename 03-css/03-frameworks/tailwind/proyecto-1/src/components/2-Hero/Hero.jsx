// Importamos link de React Router DOM
import { Link } from "react-router-dom"


// Importamos la imagen de fondo
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import LaptopsImg from "../../assets/images/1-Hero/laptops.webp"

function Hero() {
    return (
        // Hero | Background corporativo de la empresa
        <section
            style={{ backgroundImage: `url(${HeroImg})` }}
            className="relative w-full min-h-[90vh] bg-cover bg-center flex items-center justify-center">

            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm w-full flex items-center justify-center">

                <div className="min-h-[50vh] px-5 gap-0 flex flex-col items-center justify-between sm:flex-row sm:gap-10">

                    <div className="w-full min-h-full mt-15">
                        <h1 className="text-white text-5xl font-bold cursor-pointer">One Page</h1>
                        <h2 className="text-white text-2xl">Is all that you need</h2>
                        <p className="mt-3 mb-3 text-white sm:text-lg sm:w-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, atque a fugit quasi soluta optio dolores ut temporibus cum. Possimus consequuntur ab vero repellat! Quo.</p>

                        <div className="flex flex-col gap-5 sm:w-sm md:flex-row">
                            <Link
                                to="/team"
                                className="h-8 w-full bg-[#ff5959] font-bold text-white rounded-md
                                hover:bg-transparent hover:border-2 hover:border-[#ff5959]
                                transition-all duration-150 ease flex items-center justify-center">
                                Our Team
                            </Link>

                            <Link
                                to="/contact"
                                className="h-8 w-full border-2 border-[#ff5959] font-bold text-white rounded-md
                            hover:bg-[#ff5959] transition-all duration-150 ease
                                flex items-center justify-center">
                                Contact Us
                            </Link>

                        </div>
                    </div>

                    <div className="w-full min-h-auto flex items-center justify-center">
                        <img draggable="false" className="w-sm" src={LaptopsImg} alt="Dispositivos Compatibles" />
                    </div>

                </div>

            </div>

        </section>
    )
}
export default Hero