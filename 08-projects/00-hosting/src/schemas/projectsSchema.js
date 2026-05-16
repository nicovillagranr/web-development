import { z } from 'zod';

export const ProjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    path: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    stack: z.array(z.string()),
    type: z.string(),
    status: z.string(),
    framework: z.string(),
    deploy: z.string(),
    repo: z.string(),
})

export const ProjectsSchema = z.array(ProjectSchema);
