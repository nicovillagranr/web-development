const projectsContainer = document.getElementById("projects");
const projectCountRef = document.getElementById("project-count");
const onlineCountRef = document.getElementById("online-count");
const updatedAtRef = document.getElementById("updated-at");
const yearRef = document.getElementById("year");

if (yearRef) {
    yearRef.textContent = String(new Date().getFullYear());
}

if (updatedAtRef) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    updatedAtRef.textContent = `${day}/${month}/${now.getFullYear()}`;
}

fetch("./projects.json")
    .then((res) => res.json())
    .then((projects) => {
        if (projectCountRef) {
            projectCountRef.textContent = String(projects.length);
        }

        if (onlineCountRef) {
            onlineCountRef.textContent = String(projects.filter((p) => p.status === "online").length);
        }

        if (projectsContainer) {
            const fragment = document.createDocumentFragment();

            projects.forEach((project, index) => {
                const card = document.createElement("a");
                card.className = "project-card";
                card.href = project.path.endsWith("/") ? project.path : `${project.path}/`;
                card.style.setProperty("--delay", `${80 + index * 70}ms`);
                card.setAttribute("aria-label", `Abrir ${project.name}`);

                const statusClass = project.status === "online" ? "status online" : "status";
                const statusLabel = project.status === "online" ? "Online" : "Mantenimiento";

                card.innerHTML = `
                    <div class="project-top">
                        <span class="badge">${project.type}</span>
                        <span class="${statusClass}">${statusLabel}</span>
                    </div>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-bottom">
                        <span class="stack">${project.stack}</span>
                        <span class="project-open">Abrir</span>
                    </div>
                `;

                fragment.appendChild(card);
            });

            projectsContainer.appendChild(fragment);
        }
    })
    .catch(() => {
        if (projectsContainer) {
            projectsContainer.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
        }
    });
