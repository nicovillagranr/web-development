import { z } from 'zod';

// Schema de validación con Zod. La API es una fuente externa: nada garantiza
// que su respuesta tenga siempre la forma esperada. Por eso usePortfolioData
// llama a ProjectsSchema.parse() antes de usar los datos — si un campo falta o
// llega con otro tipo, Zod lanza un error de inmediato (fail-fast) en vez de
// dejar que un dato corrupto se propague y rompa el render más adelante.
// Los dos lenguajes que una card puede declarar. Viven aquí porque son la
// frontera: el schema los exige y ProjectCard los usa para decidir en qué grupo
// va el chip. Una sola fuente de verdad para las dos cosas.
export const LANGUAGES = ["JavaScript", "TypeScript"];

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
}).refine(
    // El lenguaje viaja DENTRO de `stack`, así que ningún tipo lo protege: para
    // Zod es un string más del array. Y un typo ("Typescript") no daría error —
    // simplemente el chip no se pintaría, porque ProjectCard descarta en
    // silencio las techs que no reconoce. Este refine convierte ese fallo
    // silencioso en uno ruidoso: exactamente un lenguaje por proyecto, ni cero
    // (me olvidé de ponerlo) ni dos (lo puse mal escrito y añadí el correcto).
    (project) => project.stack.filter((tech) => LANGUAGES.includes(tech)).length === 1,
    { message: `stack debe declarar exactamente un lenguaje (${LANGUAGES.join(" | ")})` }
)

export const ProjectsSchema = z.array(ProjectSchema);
