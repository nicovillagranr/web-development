# Frontend Learning Repository

This repository tracks my frontend learning path with a practical and progressive structure.
The goal is to build strong fundamentals, document technical decisions, and evolve projects
into portfolio-ready work for a first frontend developer role.

## Fast Navigation

- Main documentation index: `00-docs/README.md`
- Repository overview: `00-docs/00-overview/readme.md`
- Quick return guide: `00-docs/00-overview/retoma-rapida.md`
- Naming rules: `00-docs/00-overview/naming-conventions.md`
- Session memory log: `00-docs/00-overview/session-log.md`

## Repository Structure

- `00-docs/`: core docs, standards, decisions, and overview.
- `01-git/`: Git and GitHub learning material.
- `02-html/`: semantic HTML and accessibility-focused practice.
- `03-css/`: architecture, layouts, frameworks, and template practice.
- `04-javascript/`: fundamentals, DOM, OOP, async, libraries, and projects.
- `05-typescript/`: TypeScript learning path (module base created).
- `06-react/`: React learning path and applied projects.
- `07-projects/`: applied projects area.
- `08-playground/`: experiments, spikes, and quick tests.
- `09-docker/`: Docker learning material and operational guides.
- `config/`: shared config reference files.
- `root/`: legacy project documentation files.

## Working Rules

- Semantic HTML and accessibility first.
- Progressive complexity over one-shot complexity.
- Keep decisions documented.
- Prioritize readability and maintainability.

## Local Run

This repo contains multiple independent projects.

1. Open a project folder that contains `package.json`.
2. Install dependencies with `npm install`.
3. Run scripts such as `npm run dev`, `npm run lint`, or `npm run build`.

## Repo Health Check

Use this command to get a quick structural audit:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/repo-health.ps1
```

## Current Focus

The current focus is repository hardening:

- align root documentation and real folder structure
- enforce root-level git/editor defaults
- normalize naming conventions with low-risk changes first
