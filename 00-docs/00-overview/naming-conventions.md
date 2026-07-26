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
- React components: `PascalCase.jsx`.
- Hooks: `useSomething.js` or `useSomething.jsx`.
- Utility modules: `camelCase.js`.

## Project Location

Where a project should live (drill vs portfolio, one-project-one-folder rule, `package.json.name` requirements) is defined in [`projects-location-policy.md`](./projects-location-policy.md).

## Current Normalization Status

- Completed: `01-git/04-cheatsheets` (fixed typo from `04-cheasheets`).
- Closed (2026-07-26): legacy path names in the Three.js practice folders — the whole
  folder left this repo (see `04-javascript/readme.md`), so there is nothing to rename.
- Pending review in later phases:
  - duplicated project labels in `06-react/05-projects`


