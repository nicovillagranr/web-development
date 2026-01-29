// Importamos Link para los botones del Hero
import { Link } from "react-router-dom"

// Importamos los assets necesarios
import HeroVideo from "../../assets/images/1-Hero/bg-video.mp4"
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import businessImg from "../../assets/images/1-Hero/business.webp"

function Hero() {
    return (
        <section
            className="relative w-full min-h-[75vh] overflow-hidden flex items-center justify-center"
            aria-label="Hero Section"
        >
            {/* Video background tablet + desktop */}
            <video
                aria-hidden="true"
                poster={HeroImg}
                className="hidden md:block absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                src={HeroVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Image background (mobile) */}
            <img
                src={HeroImg}
                alt="Hero background"
                className="absolute inset-0 h-full w-full md:hidden object-cover"
            />

            {/* Overlay + blur */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

            {/* CONTENIDO */}
            <div className="w-[80%] relative z-10 flex flex-col items-center justify-start min-h-auto sm:flex-row sm:gap-10 mb-5 md:mb-0">
                {/* BLOQUE TEXTO */}
                <div
                    className="
                        w-full
                        md:w-[50%]
                        mt-10
                        sm:mt-0
                        /* 🔧 CAMBIO 3: eliminado min-h-full */
                    "
                >
                    <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Digital products built to grow with your business
                    </h1>

                    <h2 className="text-white text-lg sm:text-xl lg:text-2xl mt-3 leading-snug">
                        Design, performance and scalability — from day one.
                    </h2>

                    <p className="mt-4 mb-5 text-white text-base sm:text-lg max-w-md">
                        We help startups and small teams turn ideas into fast, accessible and scalable web products.
                        No bloated features. No shortcuts. Just solid foundations.
                    </p>

                    <div className="flex flex-col gap-5 sm:w-sm md:flex-row">
                        <Link
                            to="/team"
                            className="min-h-12 text-sm sm:text-base w-full bg-[#ff5959] border-2 border-[#ff5959] font-bold text-white rounded-md hover:bg-transparent transition-all flex items-center justify-center"
                        >
                            Our Team
                        </Link>

                        <Link
                            to="/contact"
                            className="min-h-12 text-sm sm:text-base w-full bg-[#ff5959] border-2 border-[#ff5959] font-bold text-white rounded-md hover:bg-transparent transition-all flex items-center justify-center"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* BLOQUE IMAGEN */}
                <div className="hidden sm:flex w-[40%] items-center justify-center">
                    <img
                        draggable="false"
                        className="w-sm"
                        src={businessImg}
                        alt="Dispositivos Compatibles"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero