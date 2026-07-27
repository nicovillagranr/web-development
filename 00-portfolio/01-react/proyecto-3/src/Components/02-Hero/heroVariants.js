// Variantes para el bloque de texto (staggered reveal)
export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        }
    }
}

// Cada hijo del contenedor (badge, h1, h2, p, botones)
export const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
}

// Imagen: entrada desde la derecha
export const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
    }
}
