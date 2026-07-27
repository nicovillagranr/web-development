// Importamos useEffect y useState para optimizar el uso del video segun contexto
import { useEffect, useState } from "react"
// Importamos Link para los botones del Hero
import { Link } from "react-router-dom"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Hero.css"

// Importamos los assets necesarios
import HeroVideoWebm from "../../../assets/images/1-Hero/bg-video.webm"
import HeroVideoMp4 from "../../../assets/images/1-Hero/bg-video.mp4"

import HeroImg from "../../../assets/images/1-Hero/hero.webp"
import businessImg from "../../../assets/images/1-Hero/business.webp"

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
        <section className="hero" aria-label="Hero Section">

            {/* Video optimizado: se desactiva con reduce-motion o save-data */}
            {!shouldUseStaticHero && (
                <video
                    aria-hidden="true"
                    poster={HeroImg}
                    className="hero__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata">
                    <source src={HeroVideoWebm} type="video/webm" />

                    {/* Fallback opcional para maxima compatibilidad con otros navegadores*/}
                    <source src={HeroVideoMp4} type="video/mp4" />
                </video>
            )}

            {/* Image background (mobile) */}
            <img src={HeroImg} alt="" aria-hidden="true" className={`hero__image ${shouldUseStaticHero ? "hero__image--visible" : "hero__image--hidden"}`} />

            {/* Overlay + blur */}
            <div className="hero__overlay" />

            {/* CONTENIDO */}
            <div className="hero__content">
                {/* BLOQUE TEXTO */}
                <div className="hero__text-block">
                    <h1 className="hero__title">Digital products built to grow with your business</h1>

                    <h2 role="doc-subtitle" className="hero__subtitle">
                        Design, performance and scalability — from day one.
                    </h2>

                    <p className="hero__description">
                        We help startups and small teams turn ideas into fast, accessible and scalable web products.
                        No bloated features. No shortcuts. Just solid foundations.
                    </p>

                    <div className="hero__buttons">
                        <Link
                            to="/team"
                            className="hero__button">
                            Our Team
                        </Link>

                        <Link
                            to="/contact"
                            className="hero__button">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* BLOQUE IMAGEN */}
                <div className="hero__image-block">
                    <img width={400} height={200} draggable="false" src={businessImg} alt="Laptop and tablet showing a business dashboard" />
                </div>
            </div>
        </section>
    )
}
export default Hero
