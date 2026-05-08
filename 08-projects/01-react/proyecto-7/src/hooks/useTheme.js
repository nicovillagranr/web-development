import { useState, useEffect } from 'react'

/**
 * Hook personalizado para gestionar el tema (light / dark) de la app.
 *
 * Responsabilidades:
 *   1. Determinar el tema inicial (localStorage > preferencia del SO).
 *   2. Sincronizar el estado de React con el DOM (clase .dark en <html>).
 *   3. Persistir la preferencia del usuario en localStorage.
 *
 * Devuelve { isDark, toggleTheme } para que cualquier componente pueda
 * leer el estado y alternarlo (ej. ThemeToggle en el Header).
 */
export const useTheme = () => {
    // useState con función inicializadora: la función SOLO se ejecuta en
    // el primer render. Importante porque leer localStorage / matchMedia
    // en cada render sería innecesario y costoso.
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme')

        // Caso 1: el usuario ya eligió antes -> respetar su elección.
        // localStorage devuelve string ("dark" | "light") o null si nunca se guardó.
        if (savedTheme) {
            return savedTheme === 'dark' // convierte el string en booleano
        }

        // Caso 2: primera visita -> usar preferencia del sistema operativo.
        // matchMedia consulta una media query desde JS; .matches es boolean.
        // Si el SO está en dark mode -> arrancamos en dark.
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // Efecto: cada vez que cambia isDark, sincronizamos DOM y localStorage.
    // - documentElement = <html>. Tailwind v4 detecta la clase .dark en
    //   cualquier ancestro gracias al @custom-variant definido en App.css.
    // - localStorage.setItem persiste la elección entre recargas.
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [isDark]) // dependencia: el efecto corre cuando isDark cambia

    // Función que alterna el tema. Se la pasaremos al onClick del botón.
    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    // Devolvemos un OBJETO (no array) para que los consumidores desestructuren
    // por nombre: const { isDark, toggleTheme } = useTheme().
    // Más seguro que array si en el futuro añadimos más valores.
    return { isDark, toggleTheme }
}