import { useState, useEffect } from "react"

const API = "https://00-portfolio-projects-api.vercel.app/projects"

export function useProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        // AbortController para cancelar la petición si el componente se desmonta
        const controller = new AbortController()


        fetch(API, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setProjects(data)
                setLoading(false)
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err)
                    setLoading(false)
                }
            })
        return () => {
            controller.abort()
        }
    }, [])

    return { projects, loading, error }
}
