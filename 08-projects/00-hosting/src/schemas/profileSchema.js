import { z } from "zod";

// Los shema se usan para validar los datos que se reciben en el backend, y para generar la documentación de la API con OpenAPI (Swagger).
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
