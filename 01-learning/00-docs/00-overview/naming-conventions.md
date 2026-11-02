# Naming Conventions

This file defines directory and file naming rules for the repository.

## Directory Naming

- Use lowercase.
- Use kebab-case for general folders: `module-name`.
- Keep numeric prefixes for ordered learning blocks: `01-git`, `02-html`.
- Avoid mixed styles in the same level (`snake_case` vs `kebab-case`).
- Avoid typos in stable paths.

## File Naming

- Markdown docs: `README.md` or `readme.md` only when inherited from legacy content.
- React components: `PascalCase.tsx` (`PascalCase.jsx` in projects not yet migrated to TypeScript).
- Hooks: `useSomething.ts` (`useSomething.js` in projects not yet migrated).
- Utility modules: `camelCase.ts` (`camelCase.js` in projects not yet migrated).

## Project Location

Where a project should live (drill vs portfolio, one-project-one-folder rule, `package.json.name` requirements) is defined in [`projects-location-policy.md`](./projects-location-policy.md).

## Current Normalization Status

- Completed: `01-learning/01-git/04-cheatsheets` (fixed typo from `04-cheasheets`).
- Closed (2026-07-26): legacy path names in the Three.js practice folders — the whole
  folder left this repo (see `01-learning/04-javascript/readme.md`), so there is nothing to rename.
- Closed (2026-11-02): duplicated project labels in `01-learning/06-react/05-projects` — that folder is
  now `06-react/projects/`, and `check-duplicate-projects.ps1` finds no duplicates in it.


