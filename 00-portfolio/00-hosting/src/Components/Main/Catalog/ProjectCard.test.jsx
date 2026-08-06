import { render, screen, within } from '@testing-library/react';
import ProjectCard from './ProjectCard';

// Al testear ProjectCard, nos enfocamos de ir en orden de visibilidad de la Card de arriba hacia abajo. Para hacerlo de forma simple, vamos a testear cada elemento de la Card en un test separado, siguiendo el orden de importancia y visibilidad:

// Esto servirá muchísimo a modo de aprendizaje para aprender a usar Vitest y React Testing Library, y también para tener una buena base de tests que luego podremos ampliar con casos más complejos (como testear interacciones, estados, etc).

// El orden de los elementos a testear sería el siguiente:

//   1. Img ✅ (ya lo tenemos — incluye lazy/eager)
//   2. GitHub icon (sobre la imagen) — líneas 75-84, desktop, solo si image && repo
//   3. type — badge superior izquierdo
//   4. status — badge superior derecho ("Online" / "Mantenimiento")
//   5. name — <h3>
//   6. description — <p>
//   7. tech — stack agrupado en language/tools/frontend/backend
//      (el lenguaje viaja dentro del array `stack` y va en su propia fila, arriba)
//   8. deploy — badge bajo el stack
//   9. Botón abrir (desktop) — líneas 127-137
//   10. GitHub icon (desktop, sin imagen) — líneas 138-147, solo si repo && !image
//   11. Botón abrir (mobile) — líneas 151-159
//   12. GitHub icon (mobile) — líneas 161-170, solo si repo


const mockProject = {
    id: 1,
    name: "Projex Landing",
    path: "/proyecto-3",
    image: "https://res.cloudinary.com/dzj8q3l6c/image/upload/v1700000000/portfolio/projex_landing.png",
    description: "Landing page para una agencia de proyectos",
    stack: ["JavaScript", "React 19", "Tailwind v4", "Vite"],
    type: "landing",
    status: "online",
    deploy: "Vercel",
    repo: "https://github.com/nico/projex"
}

describe("ProjectCard", () => {
    // Test 1: la imagen del proyecto se renderiza con su src
    it("Renderiza la imagen del proyecto", () => {
        // Arrange: Preparar los datos: Ya están arriba como mockProject

        // Act: Renderizar el componente con los datos de prueba
        render(<ProjectCard project={mockProject} />)

        // Assert: Verificar que la imagen se renderiza correctamente
        const img = screen.getByRole("img", { name: "Preview de Projex Landing" });
        // toBeTruthy() verifica que el elemento existe en el documento
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toBe(mockProject.image);
    })

    // Test 2: lazy loading cuando priority es false o no se proporciona
    it("Usa lazy loading cuando no recibe priority", () => {
        render(<ProjectCard project={mockProject} />);
        const img = screen.getByRole("img", { name: "Preview de Projex Landing" });
        expect(img.getAttribute("loading")).toBe("lazy");
        expect(img.getAttribute("fetchpriority")).toBe(null); // No debe tener fetchpriority
    })

    // Test 3: eager loading cuando priority es true
    it("Usa eager loading cuando recibe priority=true", () => {
        render(<ProjectCard project={mockProject} priority={true} />);
        const img = screen.getByRole("img", { name: "Preview de Projex Landing" });
        expect(img.getAttribute("loading")).toBe("eager");
        expect(img.getAttribute("fetchpriority")).toBe("high");
    })

    // Test 4: el icono de GitHub se renderiza sobre la imagen cuando hay image y repo
    it("Renderiza el icono de GitHub sobre la imagen", () => {
        // Renderizar con imagen y repo
        render(<ProjectCard project={mockProject} />);
        const img = screen.getByRole("img", { name: "Preview de Projex Landing" });
        const githubIcon = within(img.parentElement).getByRole("link", { name: `Repositorio de ${mockProject.name} en GitHub` });
        expect((githubIcon).getAttribute("href")).toBe(mockProject.repo);
    })

    // Test 5: el icono de GitHub no se renderiza sobre la imagen si no hay imagen
    it("No renderiza el icono de GitHub sobre la imagen si no hay imagen", () => {
        const projectSinImagen = { ...mockProject, image: null };
        render(<ProjectCard project={projectSinImagen} />);
        const img = screen.queryByRole("img", { name: "Preview de Projex Landing" });
        expect(img).toBeNull(); // No debe haber imagen por lo tanto no debe haber icono sobre la imagen
    })

    // Test 6: el badge de tipo (type) se renderiza con su texto
    it("Renderiza el badge de tipo del proyecto", () => {
        render(<ProjectCard project={mockProject} />);
        const typeBadge = screen.getByText(mockProject.type);
        expect(typeBadge).toBeInTheDocument();
    })

    // Test 7: el badge de estado muestra "Online" cuando status es "online"
    it("Renderiza el badge de estado 'Online'", () => {
        render(<ProjectCard project={mockProject} />);
        const onlineStatus = screen.getByText("Online");
        expect(onlineStatus).toBeInTheDocument();
    })

    // Test 8: el badge de estado muestra "En desarrollo" cuando status no es "online"
    it("Renderiza el badge de estado 'En desarrollo'", () => {
        const projectEnDesarrollo = { ...mockProject, status: "in-progress" };
        render(<ProjectCard project={projectEnDesarrollo} />);
        const enDesarrolloStatus = screen.getByText("En desarrollo");
        expect(enDesarrolloStatus).toBeInTheDocument();
    })

    // Test 9: el nombre del proyecto se renderiza en un <h3>
    it("Renderiza el nombre del proyecto en un h3", () => {
        render(<ProjectCard project={mockProject} />);
        const projectName = screen.getByRole("heading", { name: mockProject.name, level: 3 })
        expect(projectName).toBeInTheDocument();
    })

    // Test 10: la descripción del proyecto se renderiza en un <p>
    it("Renderiza la descripción del proyecto en un p", () => {
        render(<ProjectCard project={mockProject} />);
        const projectDescription = screen.getByText(mockProject.description);
        expect(projectDescription.tagName).toBe("P")
        // expect(projectDescription).toBeInTheDocument(); // si la línea de arriba entrega error no hay necesidad de usar toBeInTheDocument() porque si el elemento no existe el test ya va a fallar, pero si queremos ser más explícitos podemos dejarlo para verificar que el elemento realmente se renderiza en el DOM.
    })

    // Test 11: se renderiza un chip por cada tecnología del stack
    it("Renderiza un chip por cada tech del stack", () => {
        render(<ProjectCard project={mockProject} />);
        const stackSection = screen.getByLabelText("Stack tecnológico");
        mockProject.stack.forEach((tech) => {
            expect(within(stackSection).getByText(tech)).toBeInTheDocument();
        })
    })

    // Test 12: el badge de deploy se renderiza con su header y valor
    it("Renderiza el badge de deploy con su header y valor", () => {
        render(<ProjectCard project={mockProject} />);
        const deployBadge = screen.getByText("deploy");
        expect(deployBadge).toBeInTheDocument();
        expect(screen.getByText(mockProject.deploy)).toBeInTheDocument();
    })

    // Test 13: el badge de deploy no se renderiza si no hay deploy
    it("No renderiza el badge de deploy cuando no existe", () => {
        const projectSinDeploy = { ...mockProject, deploy: undefined };
        render(<ProjectCard project={projectSinDeploy} />);
        expect(screen.queryByText("deploy")).toBeNull();
    })

    // Test 14: los enlaces para abrir la demo (desktop + mobile) tienen href y atributos correctos
    it("Renderiza enlaces para abrir la demo con href y atributos correctos", () => {
        render(<ProjectCard project={mockProject} />);
        const links = screen.getAllByRole("link", { name: `Abrir demo de ${mockProject.name}` });
        expect(links).toHaveLength(2); // Desktop y Mobile
        links.forEach((link) => {
            expect(link).toHaveAttribute("href", "/proyecto-3/");
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        })
    })

    // Test 15: se renderizan 2 enlaces al repo (desktop + mobile) cuando no hay imagen
    it("Renderiza 2 enlaces al repo cuando no hay imagen", () => {
        const projectsSinImagen = { ...mockProject, image: null };
        render(<ProjectCard project={projectsSinImagen} />);
        // Se crea una variable extrayendo los 2 enlaces
        const links = screen.getAllByRole("link", { name: `Repositorio de ${mockProject.name} en GitHub` });
        // Se esperan 2 enlaces
        expect(links).toHaveLength(2);
        // Se recorre el array links buscando el atributo hrefN
        links.forEach((link) => {
            expect(link).toHaveAttribute("href", mockProject.repo);
        })
    })

    // Test 16: No se renderiza ningún enlace al repo cuando no hay repo
    it("No renderiza enlaces al repo cuando no hay repo", () => {
        // Se crea un proyecto sin repo usando el spread
        const projectSinRepo = { ...mockProject, repo: null };
        // Lo renderizamos con la nueva variable
        render(<ProjectCard project={projectSinRepo} />);
        // Se crea una variable extrayendo los 2 enlaces
        const links = screen.queryAllByRole("link", { name: `Repositorio de ${mockProject.name} en GitHub` });
        // Se espera que no se renderice ninguno
        expect(links).toHaveLength(0);
    })

    // Test 17: la fila del lenguaje se renderiza con su header y su chip
    it("Renderiza la fila del lenguaje con su header y su chip", () => {
        render(<ProjectCard project={mockProject} />);
        // La cabecera de la columna la pinta GROUP_LABEL, que traduce la clave
        // inglesa del grupo ("language") a la etiqueta que se lee ("lenguaje")
        expect(screen.getByText("lenguaje")).toBeInTheDocument();
        const stackSection = screen.getByLabelText("Stack tecnológico");
        expect(within(stackSection).getByText("JavaScript")).toBeInTheDocument();
    })

    // Test 18: el mismo hueco sirve para TypeScript — es el caso que estrena el chip azul
    it("Renderiza TypeScript cuando es el lenguaje del proyecto", () => {
        const projectEnTs = { ...mockProject, stack: ["TypeScript", "React 19"] };
        render(<ProjectCard project={projectEnTs} />);
        const stackSection = screen.getByLabelText("Stack tecnológico");
        expect(within(stackSection).getByText("TypeScript")).toBeInTheDocument();
        // Y el otro lenguaje NO aparece: son excluyentes
        expect(within(stackSection).queryByText("JavaScript")).toBeNull();
    })

    // Test 19: sin lenguaje en el stack no hay fila, y el componente no rompe.
    // El schema ya exige el lenguaje, pero el componente no debe confiar en eso:
    // los datos llegan de una API y el fallback del snapshot puede ser viejo.
    it("No renderiza la fila del lenguaje cuando el stack no declara ninguno", () => {
        const projectSinLenguaje = { ...mockProject, stack: ["React 19", "Vite"] };
        render(<ProjectCard project={projectSinLenguaje} />);
        expect(screen.queryByText("lenguaje")).toBeNull();
        // El resto del stack sigue pintándose con normalidad
        expect(screen.getByText("frontend")).toBeInTheDocument();
    })

    // Test 20: la tarjeta de este propio sitio (path "/") no enlaza a la demo,
    // porque su demo es la página en la que ya estás: su acción es el código.
    it("La tarjeta de este sitio enlaza al repo en vez de a la demo", () => {
        const esteSitio = { ...mockProject, name: "Este sitio", path: "/" };
        render(<ProjectCard project={esteSitio} />);
        // No queda ningún enlace "Abrir demo de…"
        expect(screen.queryAllByRole("link", { name: "Abrir demo de Este sitio" })).toHaveLength(0);
        // Y los dos que hay (escritorio + móvil) apuntan al repo
        const links = screen.getAllByRole("link", { name: "Ver el código de Este sitio en GitHub" });
        expect(links).toHaveLength(2);
        links.forEach((link) => expect(link).toHaveAttribute("href", mockProject.repo));
    })

    // Test 21: y no se duplica el enlace al repo. En las demás tarjetas el icono de
    // GitHub sobre la imagen es la vía al código; aquí la acción ya lo es, así que
    // ese icono no se pinta y no hay dos enlaces al mismo destino.
    it("La tarjeta de este sitio no duplica el enlace al repo", () => {
        const esteSitio = { ...mockProject, name: "Este sitio", path: "/" };
        render(<ProjectCard project={esteSitio} />);
        expect(screen.queryAllByRole("link", { name: "Repositorio de Este sitio en GitHub" })).toHaveLength(0);
    })

    // Test 22: Zod y Vitest tienen que pintarse. Son el stack de la tarjeta de este
    // sitio, y hasta ahora no estaban en TECH_GROUP: se descartaban en silencio.
    it("Renderiza los chips de Zod y Vitest", () => {
        const conZodYVitest = { ...mockProject, stack: ["JavaScript", "React 19", "Zod", "Vitest"] };
        render(<ProjectCard project={conZodYVitest} />);
        const stackSection = screen.getByLabelText("Stack tecnológico");
        expect(within(stackSection).getByText("Zod")).toBeInTheDocument();
        expect(within(stackSection).getByText("Vitest")).toBeInTheDocument();
    })
})
