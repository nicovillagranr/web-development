// Link de react-router para navegar dentro de la App
import { Link } from "react-router-dom"

// Animaciones
import { motion } from "framer-motion"

// Hook
import { useMediaPreferences } from "./useMediaPreferences"

// Datos de animaciones
import {
    containerVariants,
    itemVariants,
    imageVariants,
} from "./heroVariants"

// Assets
import HeroVideoWebm from "../../assets/images/1-Hero/bg-video.webm"
import HeroVideoMp4 from "../../assets/images/1-Hero/bg-video.mp4"
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import businessImg from "../../assets/images/1-Hero/business.webp"

function Hero() {
    const shouldUseStaticHero = useMediaPreferences()

    // Cuando reduce-motion/saveData está activo,
    // se evita la animación inicial.
    const initialState = shouldUseStaticHero ? false : "hidden"

    return (
        <section className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden" aria-label="Hero Section">
            {/* Video: solo renderiza si NO hay reduce-motion/saveData */}
            {!shouldUseStaticHero && (
                <video
                    aria-hidden="true"
                    poster={HeroImg}
                    className="absolute inset-0 block h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata">
                    <source src={HeroVideoWebm} type="video/webm" />
                    <source src={HeroVideoMp4} type="video/mp4" />
                </video>
            )}

            {/* Overlay — gradiente + blur para suavizar compresión del video */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10 backdrop-blur-sm" />

            {/* Línea decorativa vertical */}
            <div className="absolute top-0 bottom-0 left-[8%] hidden w-px bg-linear-to-b from-transparent via-white/15 to-transparent xl:block"
                aria-hidden="true" />

            {/* CONTENIDO */}
            <div className="relative z-10 flex w-[80%] flex-col items-center justify-start py-16 sm:flex-row sm:gap-10 sm:py-0">
                {/* BLOQUE TEXTO */}
                <motion.div className="w-full md:w-[55%]" variants={containerVariants} initial={initialState} animate="visible">
                    {/* Badge con dot animado */}
                    <motion.span variants={itemVariants} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                            {!shouldUseStaticHero && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            )}
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>

                        Web & Product Studio
                    </motion.span>

                    {/* H1 */}
                    <motion.h1 variants={itemVariants} className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
                        Digital products built to{" "}
                        <span className="text-primary">grow</span>{" "}
                        with your business
                    </motion.h1>

                    {/* Subtítulo */}
                    <motion.h2 role="doc-subtitle" variants={itemVariants} className="mt-3 text-lg leading-snug font-light text-white/80 sm:text-xl lg:text-2xl">
                        Design, performance and scalability — from day one.
                    </motion.h2>

                    {/* Descripción */}
                    <motion.p variants={itemVariants} className="mt-4 mb-8 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                        We help startups and small teams turn ideas into fast,
                        accessible and scalable web products. No bloated
                        features. No shortcuts. Just solid foundations.
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:w-sm md:flex-row">
                        {/* CTA Principal */}
                        <Link to="/contact" className="flex min-h-12 w-full items-center justify-center rounded-md border-2 border-primary bg-primary text-sm font-bold text-white transition-all hover:bg-transparent hover:text-white sm:text-base">
                            Contact Us
                        </Link>

                        {/* CTA Secundario */}
                        <Link to="/team" className="flex min-h-12 w-full items-center justify-center rounded-md border-2 border-white/60 bg-transparent text-sm font-bold text-white transition-all hover:bg-white hover:text-dark sm:text-base">
                            Meet the Team
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Imagen derecha */}
                <motion.div className="hidden w-[45%] items-center justify-center sm:flex" variants={imageVariants} initial={initialState} animate="visible">
                    <div className="relative">
                        {/* Halo con color de marca */}
                        <div className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
                        <img
                            loading="lazy"
                            decoding="async"
                            width={300}
                            height={300}
                            draggable="false"
                            src={businessImg}
                            alt="Compatible devices"
                            className="relative drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
