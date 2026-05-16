import { z } from "zod";

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
        frontend: z.array(z.string()),
        styling: z.array(z.string()),
        tools: z.array(z.string())
    })
})
