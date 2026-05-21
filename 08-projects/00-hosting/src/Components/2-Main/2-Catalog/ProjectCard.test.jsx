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
//   7. tech — stack agrupado en tools/frontend/backend
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
    stack: ["React 19", "Tailwind v4", "Vite"],
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

    // Test 8: el badge de estado muestra "Mantenimiento" cuando status no es "online"
    it("Renderiza el badge de estado 'Mantenimiento'", () => {
        const projectMaintenance = { ...mockProject, status: "maintenance" };
        render(<ProjectCard project={projectMaintenance} />);
        const maintenanceStatus = screen.getByText("Mantenimiento");
        expect(maintenanceStatus).toBeInTheDocument();
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
        const deployBadge = screen.getByText("$ deploy:");
        expect(deployBadge).toBeInTheDocument();
        expect(screen.getByText(mockProject.deploy)).toBeInTheDocument();
    })

    // Test 13: el badge de deploy no se renderiza si no hay deploy
    it("No renderiza el badge de deploy cuando no existe", () => {
        const projectSinDeploy = { ...mockProject, deploy: undefined };
        render(<ProjectCard project={projectSinDeploy} />);
        expect(screen.queryByText("$ deploy:")).toBeNull();
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
})
