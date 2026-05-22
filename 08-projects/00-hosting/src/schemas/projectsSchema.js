import { z } from 'zod';

// Schema de validación con Zod. La API es una fuente externa: nada garantiza
// que su respuesta tenga siempre la forma esperada. Por eso usePortfolioData
// llama a ProjectsSchema.parse() antes de usar los datos — si un campo falta o
// llega con otro tipo, Zod lanza un error de inmediato (fail-fast) en vez de
// dejar que un dato corrupto se propague y rompa el render más adelante.
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
