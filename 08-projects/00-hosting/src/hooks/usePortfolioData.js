import { useState, useEffect } from "react"
import { ProjectsSchema } from "../schemas/projectsSchema"
import { ProfileSchema } from "../schemas/profileSchema"

const API_BASE = "https://00-portfolio-projects-api.vercel.app"

export function usePortfolioData() {
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
                    const failed = []
                    if (!projectsRes.ok) failed.push(`projects:${projectsRes.status}`)
                    if (!profileRes.ok) failed.push(`profile:${profileRes.status}`)
                    throw new Error(`HTTP error — ${failed.join(", ")}`)
                }
                return Promise.all([projectsRes.json(), profileRes.json()])
            })
            .then(([projectsData, profileData]) => {
                const profile = ProfileSchema.parse(profileData)
                const projects = ProjectsSchema.parse(projectsData)
                setProjects(projects)
                setProfile(profile)
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
