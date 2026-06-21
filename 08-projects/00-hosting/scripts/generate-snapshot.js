// ─────────────────────────────────────────────────────────────────────────
// generate-snapshot.js — corre en tiempo de BUILD, en tu máquina (o CI).
//
// Qué hace:
//   1. Lee la URL de la API del mismo .env que usa la app (vía loadEnv de Vite).
//   2. Pide /projects y /profile UNA vez, aquí, antes de compilar.
//   3. Valida la respuesta con los MISMOS schemas de Zod que usa el hook.
//   4. Escribe el resultado en public/data-snapshot.json.
//
// Vite copia todo lo de public/ a dist/, así que el snapshot viaja al hosting
// junto al resto del build. En runtime, usePortfolioDataWithFallback lo lee
// SOLO si la API en vivo falla.
//
// Filosofía de errores: el snapshot es una RED DE SEGURIDAD, no un requisito.
// Si la API está caída justo cuando builds, NO rompemos el build — avisamos
// fuerte y seguimos (conservando el snapshot anterior si existe).
// ─────────────────────────────────────────────────────────────────────────

import { writeFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnv } from "vite"
import { ProjectsSchema } from "../src/schemas/projectsSchema.js"
import { ProfileSchema } from "../src/schemas/profileSchema.js"

const OUT = resolve(process.cwd(), "public/data-snapshot.json")
const TIMEOUT_MS = 8000 // en build damos más margen que en runtime; no hay un usuario esperando

// loadEnv lee el mismo .env que Vite: así el script y la app comparten
// exactamente la misma VITE_API_BASE (una sola fuente de verdad de la URL).
const env = loadEnv("production", process.cwd(), "VITE_")
const API_BASE = env.VITE_API_BASE

async function main() {
    if (!API_BASE) {
        warn("VITE_API_BASE no está definida; no se genera el snapshot.")
        return
    }

    try {
        const signal = AbortSignal.timeout(TIMEOUT_MS)
        const [projectsRes, profileRes] = await Promise.all([
            fetch(`${API_BASE}/projects`, { signal }),
            fetch(`${API_BASE}/profile`, { signal }),
        ])

        if (!projectsRes.ok || !profileRes.ok) {
            throw new Error(`HTTP — projects:${projectsRes.status} profile:${profileRes.status}`)
        }

        const [projectsData, profileData] = await Promise.all([
            projectsRes.json(),
            profileRes.json(),
        ])

        // Validamos con los mismos schemas que el hook. Si la API cambió de forma,
        // mejor que el build se queje aquí (en tu máquina) que servir basura.
        const snapshot = {
            generatedAt: new Date().toISOString(),
            projects: ProjectsSchema.parse(projectsData),
            profile: ProfileSchema.parse(profileData),
        }

        writeFileSync(OUT, JSON.stringify(snapshot, null, 2))
        console.log(`✓ snapshot: ${snapshot.projects.length} proyectos → ${OUT}`)
    } catch (err) {
        // No rompemos el build: preferimos seguir deployando aunque la API falle.
        warn(`no se pudo refrescar el snapshot: ${err.message}`)
        if (existsSync(OUT)) {
            console.warn("  → se conserva el snapshot anterior.")
        } else {
            console.warn("  → no hay snapshot previo; el fallback queda inactivo hasta el próximo build con la API arriba.")
        }
    }
}

function warn(msg) {
    console.warn(`⚠ snapshot: ${msg}`)
}

main()
