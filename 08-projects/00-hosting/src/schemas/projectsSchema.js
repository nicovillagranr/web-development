import { z } from 'zod';

// Los shcema se usan para validar los datos que se reciben en el backend, y para generar la documentación de la API con OpenAPI (Swagger).
export const ProjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    path: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    stack: z.array(z.string()),
    type: z.string(),
    status: z.string(),
    framework: z.string().optional(),
    deploy: z.string().optional(),
    repo: z.string().optional(),
})

export const ProjectsSchema = z.array(ProjectSchema);
