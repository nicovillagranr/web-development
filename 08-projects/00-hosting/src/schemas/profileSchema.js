import { z } from "zod";

// Schema de validación con Zod para la respuesta de /profile. Misma idea que
// projectsSchema: los datos vienen de una API externa, así que se validan en
// runtime con ProfileSchema.parse() antes de consumirlos. Si la forma no
// coincide, el error salta aquí y no en mitad del render.
export const ProfileSchema = z.object({
    name: z.string(),
    email: z.email(),
    github: z.string(),
    linkedin: z.string(),
    role: z.string(),
    based: z.string(),
    years: z.number(),
    availability: z.string(),
    stack: z.object({
        languages: z.array(z.string()),
        frontend: z.array(z.string()),
        styling: z.array(z.string()),
        testing: z.array(z.string()),
        tools: z.array(z.string()),
        copilots: z.array(z.string())
    }),
    intro: z.object({
        about: z.string(),
        stack: z.string()
    }),
    philosophy: z.string()
})
