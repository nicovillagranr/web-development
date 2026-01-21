// Importamos Link para los botones del Hero
import { Link } from "react-router-dom"

// Importamos los assets necesarios
import HeroVideo from "../../assets/images/1-Hero/bg-video.mp4"
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import LaptopsImg from "../../assets/images/1-Hero/laptops.webp"

function Hero() {
    return (
        <section className="relative w-full min-h-[75vh] overflow-hidden flex items-center justify-center" aria-label="Hero Section">

            {/* Video background */}
            <video aria-hidden="true"
                poster="/images/hero.webp"
                className="hidden md:block absolute inset-0 h-full w-full object-cover motion-reduce:hidden" src={HeroVideo} autoPlay loop muted playsInline />

            {/* Image background (mobile) */}
            <img
                src={HeroImg}
                alt="Hero background"
                className="absolute inset-0 h-full w-full md:hidden object-cover" />

            {/* Overlay + blur */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

            {/* Contenido */}
            <div className="relative z-10 min-h-[50vh] px-5 gap-0 flex flex-col items-center justify-between sm:flex-row sm:gap-10">

                <div className="w-full min-h-full mt-15">
                    <h1 className="text-white text-5xl font-bold">One Page</h1>

                    <h2 className="text-white text-2xl">Is all that you need</h2>

                    <p className="mt-3 mb-3 text-white sm:text-lg sm:w-sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Accusantium, atque a fugit quasi soluta optio dolores ut temporibus
                        cum. Possimus consequuntur ab vero repellat! Quo.
                    </p>

                    <div className="flex flex-col gap-5 sm:w-sm md:flex-row">
                        <Link to="/team"
                            className="min-h-10 w-full bg-[#ff5959] border-2 border-[#ff5959] font-bold text-white rounded-md
                            hover:bg-transparent transition-all duration-300 ease-in-out flex items-center justify-center">
                            Our Team
                        </Link>

                        <Link to="/contact" className="min-h-10 w-full border-2 border-[#ff5959] font-bold text-white rounded-md
                        hover:bg-[#ff5959] transition-all duration-300 ease-in-out
                            flex items-center justify-center">
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <img draggable="false" className="w-sm" src={LaptopsImg} alt="Dispositivos Compatibles" />
                </div>

            </div>
        </section>
    )
}

export default Hero
