import { useState, useEffect } from "react"

const API_BASE = "https://00-portfolio-projects-api.vercel.app"

export function useProjects() {
    const [projects, setProjects] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        Promise.all([
            fetch(`${API_BASE}/projects`, { signal: controller.signal }),
            fetch(`${API_BASE}/profile`, { signal: controller.signal })
        ])
            .then(([projectsRes, profileRes]) => {
                if (!projectsRes.ok || !profileRes.ok) {
                    throw new Error(`HTTP error! status: ${projectsRes.status}`)
                }
                return Promise.all([projectsRes.json(), profileRes.json()])
            })
            .then(([projectsData, profileData]) => {
                setProjects(projectsData)
                setProfile(profileData)
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

    return { projects, profile, loading, error }
}
