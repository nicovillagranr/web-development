// Importamos useEffect y useState para optimizar el uso del video segun contexto
import { useEffect, useState } from "react"
// Importamos Link para los botones del Hero
import { Link } from "react-router-dom"

// Importamos los assets necesarios
import HeroVideoWebm from "../../assets/images/1-Hero/bg-video.webm"
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import businessImg from "../../assets/images/1-Hero/business.webp"

function Hero() {
    // Usamos useEffect y useState para optimizar el uso del video segun contexto
    const [shouldUseStaticHero, setShouldUseStaticHero] = useState(false)

    // Detectamos preferencias de motion y data-saving para decidir si mostramos el video o la imagen estática
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

        const updateMediaPreferences = () => {
            setShouldUseStaticHero(mediaQuery.matches || Boolean(connection?.saveData))
        }

        updateMediaPreferences()
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", updateMediaPreferences)
        } else {
            mediaQuery.addListener(updateMediaPreferences)
        }
        connection?.addEventListener?.("change", updateMediaPreferences)

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", updateMediaPreferences)
            } else {
                mediaQuery.removeListener(updateMediaPreferences)
            }
            connection?.removeEventListener?.("change", updateMediaPreferences)
        }
    }, [])

    return (
        <section
            className="relative w-full min-h-[75vh] overflow-hidden flex items-center justify-center" aria-label="Hero Section">

            {/* Video background tablet + desktop (version original, conservada como referencia) */}
            {/* <video
                aria-hidden="true"
                poster={HeroImg}
                className="hidden md:block absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                src={HeroVideoWebm}
                autoPlay
                loop
                muted
                playsInline /> */}

            {/* Video optimizado: se desactiva con reduce-motion o save-data */}
            {!shouldUseStaticHero && (
                <video
                    aria-hidden="true"
                    poster={HeroImg}
                    className="hidden md:block absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata">
                    <source src={HeroVideoWebm} type="video/webm" />
                    {/* Fallback opcional para maxima compatibilidad cuando tengas el archivo mp4 */}
                    {/* <source src={HeroVideoMp4} type="video/mp4" /> */}
                </video>
            )}

            {/* Image background (mobile) */}
            <img src={HeroImg} alt="Hero background" className={`absolute inset-0 h-full w-full object-cover ${shouldUseStaticHero ? "block" : "md:hidden"}`} />

            {/* Overlay + blur */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

            {/* CONTENIDO */}
            <div className="w-[80%] relative z-10 flex flex-col items-center justify-start min-h-auto sm:flex-row sm:gap-10 mb-5 md:mb-0">
                {/* BLOQUE TEXTO */}
                <div className="w-full md:w-[50%] mt-10 sm:mt-0">
                    <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Digital products built to grow with your business</h1>

                    <h2 role="doc-subtitle" className="text-white text-lg sm:text-xl lg:text-2xl mt-3 leading-snug">
                        Design, performance and scalability — from day one.
                    </h2>

                    <p className="mt-4 mb-5 text-white text-base sm:text-lg max-w-md">
                        We help startups and small teams turn ideas into fast, accessible and scalable web products.
                        No bloated features. No shortcuts. Just solid foundations.
                    </p>

                    <div className="flex flex-col gap-5 sm:w-sm md:flex-row">
                        <Link
                            to="/team"
                            className="min-h-12 text-sm sm:text-base w-full bg-primary border-2 border-primary font-bold text-white rounded-md hover:bg-transparent transition-all flex items-center justify-center">
                            Our Team
                        </Link>

                        <Link
                            to="/contact"
                            className="min-h-12 text-sm sm:text-base w-full bg-primary border-2 border-primary font-bold text-white rounded-md hover:bg-transparent transition-all flex items-center justify-center">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* BLOQUE IMAGEN */}
                <div className="hidden sm:flex w-[40%] items-center justify-center">
                    <img width={400} height={200} draggable="false" src={businessImg} alt="Dispositivos Compatibles" />
                </div>
            </div>
        </section>
    )
}
export default Hero