import { useState, useEffect } from "react"
import { ProjectsSchema } from "../schemas/projectsSchema"
import { ProfileSchema } from "../schemas/profileSchema"

// ─────────────────────────────────────────────────────────────────────────
// Variante de usePortfolioData con RED DE SEGURIDAD (snapshot).
//
// Misma idea que el hook original (pedir /projects y /profile, validar con Zod,
// cancelar al desmontar), pero con dos diferencias para que el sitio no se rompa
// si la API en vivo falla:
//   1. Timeout: si Vercel no responde en TIMEOUT_MS, lo damos por colgado.
//   2. Snapshot: ante cualquier fallo del camino en vivo, leemos un JSON
//      horneado en el build (`public/data-snapshot.json`) que vive en el MISMO
//      host que la app, así que siempre está disponible.
//
// Comparar este archivo con `usePortfolioData.js` para ver el "antes/después".
// ─────────────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_BASE
const TIMEOUT_MS = 4000 // si Vercel no responde en 4s, lo damos por colgado → snapshot

export function usePortfolioData() {
    const [projects, setProjects] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // `stale` (opcional): true cuando lo que ves viene del snapshot del build,
    // no de la API en vivo. Te permite mostrar un aviso discreto si quisieras.
    const [stale, setStale] = useState(false)

    useEffect(() => {
        // Este controller existe SOLO para cancelar al desmontar el componente.
        // El timeout es un mecanismo aparte, para no confundir "el usuario se fue"
        // con "Vercel está colgado" — dos abortos con significados distintos.
        const controller = new AbortController()

        // --- Camino principal: la API en vivo ----------------------------
        // Devuelve datos validados, o LANZA ante CUALQUIER fallo:
        // status !ok, red caída, timeout, o JSON que no pasa el schema de Zod.
        async function fetchLive() {
            // AbortSignal.any aborta si dispara CUALQUIERA de los dos:
            //   controller.signal      → desmontaje
            //   AbortSignal.timeout(…) → Vercel tardó demasiado
            const signal = AbortSignal.any([
                controller.signal,
                AbortSignal.timeout(TIMEOUT_MS),
            ])

            const [projectsRes, profileRes] = await Promise.all([
                fetch(`${API_BASE}/projects`, { signal }),
                fetch(`${API_BASE}/profile`, { signal }),
            ])

            if (!projectsRes.ok || !profileRes.ok) {
                const failed = []
                if (!projectsRes.ok) failed.push(`projects:${projectsRes.status}`)
                if (!profileRes.ok) failed.push(`profile:${profileRes.status}`)
                throw new Error(`HTTP error — ${failed.join(", ")}`)
            }

            const [projectsData, profileData] = await Promise.all([
                projectsRes.json(),
                profileRes.json(),
            ])

            return {
                projects: ProjectsSchema.parse(projectsData),
                profile: ProfileSchema.parse(profileData),
            }
        }

        // --- Red de seguridad: el snapshot horneado en el build ----------
        // Vive en el MISMO host que la app (Hostinger): si la página cargó,
        // este archivo está. También se valida con Zod — si el snapshot
        // estuviera corrupto, preferimos el error a mostrar basura.
        async function fetchSnapshot() {
            const res = await fetch("/data-snapshot.json", { signal: controller.signal })
            if (!res.ok) throw new Error(`snapshot:${res.status}`)
            const data = await res.json()
            return {
                projects: ProjectsSchema.parse(data.projects),
                profile: ProfileSchema.parse(data.profile),
            }
        }

        // --- Orquestación: en vivo, y si no, snapshot --------------------
        async function load() {
            try {
                const data = await fetchLive()
                setProjects(data.projects)
                setProfile(data.profile)
                setLoading(false)
            } catch {
                // Si el aborto vino del DESMONTAJE, el componente ya no existe:
                // no toques el estado y sal en silencio.
                if (controller.signal.aborted) return

                // Cualquier otro fallo (500, timeout, red, Zod) → intenta el snapshot.
                try {
                    const data = await fetchSnapshot()
                    if (controller.signal.aborted) return
                    setProjects(data.projects)
                    setProfile(data.profile)
                    setStale(true)
                    setLoading(false)
                } catch (snapErr) {
                    // Si hasta el snapshot falla, ahí sí no hay nada que mostrar.
                    if (controller.signal.aborted) return
                    setError(snapErr)
                    setLoading(false)
                }
            }
        }

        load()

        return () => {
            controller.abort()
        }
    }, [])

    return { projects, profile, loading, error, stale }
}
