import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePortfolioData } from "./usePortfolioData";

const mockProfile = {
    name: "Nicolás Villagrán",
    email: "nicovillagranroses@gmail.com",
    github: "https://github.com/nicovillagranr",
    linkedin: "https://www.linkedin.com/in/nico-villagran/",
    role: "Frontend Developer",
    based: "Santiago de Chile",
    years: 2,
    availability: "open_to_work",
    stack: {
        languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
        frontend: ["React", "React Router", "Framer Motion", "Zod"],
        styling: ["Tailwind", "Bootstrap", "CSS Modules", "BEM", "Sass", "Less"],
        testing: ["Vitest", "Testing Library"],
        tools: ["Git", "Vite", "npm", "ESLint", "Prettier", "Docker"],
        copilots: ["Claude Code", "Claude Design"]
    },
    // OJO: `intro` tiene que traer los CUATRO campos que exige ProfileSchema.
    // Si falta alguno, Zod lanza dentro del .then() del hook, la ejecución salta
    // al .catch() y setProjects() no llega a correr nunca — con lo que el test
    // que falla es el de `projects`, señalando al sitio equivocado.
    intro: {
        about: "Desarrollador frontend basado en Santiago.",
        stackHeading: "Cómo trabajo",
        stack: "Cada herramienta de este stack la elegí por una razón.",
        stackPillars: [
            { label: "Pienso", items: ["el problema primero"] },
            { label: "Pruebo", items: ["los caminos que rompen"] }
        ]
    },
    philosophy: "Nunca dejar de aprender"
}

const mockProjects = [
    {
        id: 1,
        name: "Projex Landing",
        path: "/proyecto-3",
        image: null,
        description: "Landing page para una agencia de proyectos",
        stack: ["React", "Tailwind"],
        type: "landing",
        status: "online",
        framework: "React",
        deploy: "https://example.com/projex",
        repo: "https://github.com/nico/projex"
    }
]

// Construye una respuesta HTTP falsa con la forma que espera el hook:
// .ok, .status y .json() (que devuelve una promesa, igual que fetch real).
function fakeResponse(body, { ok = true, status = 200 } = {}) {
    return Promise.resolve({
        ok,
        status,
        json: () => Promise.resolve(body),
    });
}

describe("usePortfolioData", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("empieza en estado loading con projects vacío", () => {
        // ARRANGE: fetch que nunca resuelve → congela el hook en su primer instante
        global.fetch = vi.fn(() => new Promise(() => {}));

        // ACT
        const { result } = renderHook(() => usePortfolioData());

        // ASSERT: estado inicial
        expect(result.current.loading).toBe(true);
        expect(result.current.projects).toEqual([]);
        expect(result.current.profile).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it("carga projects y profile cuando la API responde OK", async () => {
        // ARRANGE: fetch que devuelve datos según la URL pedida
        global.fetch = vi.fn((url) =>
            url.includes("/projects")
                ? fakeResponse(mockProjects)
                : fakeResponse(mockProfile)
        );

        // ACT
        const { result } = renderHook(() => usePortfolioData());

        // ASSERT: esperamos a que termine la carga asíncrona
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.projects).toEqual(mockProjects);
        expect(result.current.profile).toEqual(mockProfile);
        expect(result.current.error).toBeNull();
    });

    it("reporta error cuando la API responde con fallo HTTP", async () => {
        // ARRANGE: /projects falla con 500, /profile responde OK
        global.fetch = vi.fn((url) =>
            url.includes("/projects")
                ? fakeResponse(null, { ok: false, status: 500 })
                : fakeResponse(mockProfile)
        );

        // ACT
        const { result } = renderHook(() => usePortfolioData());

        // ASSERT
        await waitFor(() => expect(result.current.error).not.toBeNull());

        expect(result.current.loading).toBe(false);
        expect(result.current.error.message).toContain("projects:500");
    });

    it("aborta el fetch al desmontar el componente", () => {
        // ARRANGE: fetch colgado + espía sobre AbortController.abort
        global.fetch = vi.fn(() => new Promise(() => {}));
        const abortSpy = vi.spyOn(AbortController.prototype, "abort");

        // ACT: montamos y desmontamos antes de que el fetch termine
        const { unmount } = renderHook(() => usePortfolioData());
        unmount();

        // ASSERT: el cleanup del useEffect llamó a abort()
        expect(abortSpy).toHaveBeenCalled();
    });

});

