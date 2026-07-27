import { useEffect } from "react"
import { useLocation } from "react-router-dom"


// Esta función tiene como fin resetear el scroll una vez que se cambia de ruta. Se implementó sobre todo para ProductDetail
export const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
