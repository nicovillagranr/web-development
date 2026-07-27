// EN ESTE ARCHIVO VAMOS A ESTANDARIZAR EL FETCH EN TODO EL PROYECTO PARA NO REPETIR CÓDIGO

// Import de Hooks
import { useEffect, useState } from "react"

// Hook genérico para hacer fetch de cualquier URL
export const useFetch = (url) => {
    // 3 estados: El dato cargando, el dato cuando llega, y cuando hay un error
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Si la URL cambia, reseteamos todo el estado inicial para no mostrar data vieja mientras carga la nueva
        setLoading(true)
        setData(null)
        setError(null)

        // AbortController nos permite CANCELAR el fetch si el componente se desmonta o la URL cambia antes de que llegue la respuesta
        const controller = new AbortController()

        const fetchData = async () => {
            try {
                // Le pasamos el signal al fetch: Así sabe que puede ser cancelado
                const response = await fetch(url, { signal: controller.signal })

                if (!response.ok) {
                    throw new Error("Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.")
                }

                const json = await response.json()
                setData(json)
                setLoading(false)
            } catch (err) {
                // Si fue una cancelación intencional, NO tocamos el estado:
                // el efecto vivo es quien debe mandar sobre loading/data/error
                if (err.name === "AbortError") return
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()

        // CleanUp: Se ejecuta cuando el componente se desmonta o cuando la URL cambia (Antes de volver a correr el efecto)
        return () => controller.abort()
    }, [url]) // <- El efecto se vuelve a ejecutar si cambia la URL
    return { loading, data, error }
}