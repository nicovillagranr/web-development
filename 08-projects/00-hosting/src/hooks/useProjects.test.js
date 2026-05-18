import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useProjects } from "./useProjects";

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
        frontend: ["React", "Vue", "Angular"],
        styling: ["CSS", "Sass", "Tailwind"],
        tools: ["Git", "Docker"]
    }
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
        status: "done",
        framework: "React",
        deploy: "https://example.com/projex",
        repo: "https://github.com/nico/projex"
    }
]
