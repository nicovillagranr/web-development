import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { useMediaPreferences } from "./useMediaPreferences"
import { containerVariants, itemVariants, imageVariants } from "./heroVariants"

import HeroVideoWebm from "../../assets/images/1-Hero/bg-video.webm"
import HeroVideoMp4 from "../../assets/images/1-Hero/bg-video.mp4"
import HeroImg from "../../assets/images/1-Hero/hero.webp"
import businessImg from "../../assets/images/1-Hero/business.webp"

function Hero() {
    const shouldUseStaticHero = useMediaPreferences()

    // Cuando reduce-motion está activo, los elementos arrancan directamente en "visible"
    const animateState = shouldUseStaticHero ? "visible" : undefined

    return (
        <section
            className="relative w-full min-h-[75vh] overflow-hidden flex items-center justify-center"
            aria-label="Hero Section"
        >
            {/* Video: solo renderiza si NO hay reduce-motion/saveData, y Tailwind lo muestra solo en desktop */}
            {!shouldUseStaticHero && (
                <video
                    aria-hidden="true"
                    poster={HeroImg}
                    className="block absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src={HeroVideoWebm} type="video/webm" />
                    <source src={HeroVideoMp4} type="video/mp4" />
                </video>
            )}


            {/* Overlay — gradiente + blur para suavizar compresión del video */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10 backdrop-blur-sm" />

            {/* Línea decorativa vertical — tensión espacial */}
            <div
                className="absolute left-[8%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/15 to-transparent hidden xl:block"
                aria-hidden="true"
            />

            {/* CONTENIDO */}
            <div className="w-[80%] relative z-10 flex flex-col items-center justify-start sm:flex-row sm:gap-10 py-16 sm:py-0">

                {/* BLOQUE TEXTO con staggered reveal */}
                <motion.div
                    className="w-full md:w-[55%]"
                    variants={containerVariants}
                    initial="hidden"
                    animate={animateState ?? "visible"}
                >
                    {/* Badge con dot animado */}
                    <motion.span
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold tracking-widest uppercase backdrop-blur-sm"
                    >
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                            {!shouldUseStaticHero && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            )}
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                        </span>
                        Web &amp; Product Studio
                    </motion.span>

                    {/* H1 con palabra clave en color primario */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                    >
                        Digital products built to{" "}
                        <span className="text-primary">grow</span>{" "}
                        with your business
                    </motion.h1>

                    <motion.h2
                        role="doc-subtitle"
                        variants={itemVariants}
                        className="text-white/80 text-lg sm:text-xl lg:text-2xl mt-3 leading-snug font-light"
                    >
                        Design, performance and scalability — from day one.
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="mt-4 mb-8 text-white/70 text-sm sm:text-base max-w-md leading-relaxed"
                    >
                        We help startups and small teams turn ideas into fast, accessible
                        and scalable web products. No bloated features. No shortcuts.
                        Just solid foundations.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col gap-3 sm:w-sm md:flex-row"
                    >
                        {/* CTA Principal */}
                        <Link
                            to="/contact"
                            className="min-h-12 text-sm sm:text-base w-full bg-primary border-2 border-primary font-bold text-white rounded-md hover:bg-transparent hover:text-white transition-all flex items-center justify-center"
                        >
                            Contact Us
                        </Link>

                        {/* CTA Secundario */}
                        <Link
                            to="/team"
                            className="min-h-12 text-sm sm:text-base w-full bg-transparent border-2 border-white/60 font-bold text-white rounded-md hover:bg-white hover:text-dark transition-all flex items-center justify-center"
                        >
                            Meet the Team
                        </Link>
                    </motion.div>
                </motion.div>

                {/* BLOQUE IMAGEN con entrada desde la derecha */}
                <motion.div
                    className="hidden sm:flex w-[45%] items-center justify-center"
                    variants={imageVariants}
                    initial="hidden"
                    animate={animateState ?? "visible"}
                >
                    <div className="relative">
                        {/* Halo con color de marca */}
                        <div
                            className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-3xl"
                            aria-hidden="true"
                        />
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
