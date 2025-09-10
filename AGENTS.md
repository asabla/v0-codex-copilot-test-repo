# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry (`layout.tsx`, `page.tsx`), global styles in `app/globals.css`.
- `components/`: Reusable UI. Primitives in `components/ui/*` (e.g., `button.tsx`, `card.tsx`), providers in `components/theme-provider.tsx`.
- `lib/`: Utilities (e.g., `lib/utils.ts` with `cn`).
- `public/`: Static assets (images, logos).
- `styles/`: Additional global CSS.
- Config: `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `components.json` (shadcn/ui).

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server.
- `npm run build`: Production build.
- `npm start`: Serve the production build.
- `npm run lint`: Run Next.js ESLint. Fix issues before opening a PR.
Note: `package-lock.json` is present; prefer `npm`. Use Node 18.17+.

## Coding Style & Naming Conventions
- Language: TypeScript, React (App Router). Use server components by default; add `"use client"` when needed.
- Indentation: 2 spaces; Prettier defaults. Keep imports sorted logically.
- Naming: Components PascalCase (`RAGDashboard`), files kebab/camel case (`theme-provider.tsx`, `utils.ts`).
- Styling: Tailwind CSS v4. Compose classes with `cn` from `lib/utils.ts`; avoid arbitrary duplication.
- Imports: Use path alias `@/*` (see `tsconfig.json`). Avoid `any`; prefer explicit types.

## Testing Guidelines
- No test runner configured yet. If adding tests:
  - Unit: Vitest or Jest, co-located as `*.test.ts(x)`.
  - E2E: Playwright. Place in `e2e/` or `tests/`.
  - Aim for coverage on utilities and key UI logic.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise, scoped (e.g., "Add card variant", "Fix chart tooltip"). Reference issues (`#123`) when relevant.
- PRs must include:
  - Summary of change and rationale.
  - Screenshots/GIFs for UI changes.
  - Checklist: `npm run lint` clean; no type errors locally; docs updated if config/env changed.

## Security & Configuration Tips
- Do not commit secrets. Use environment variables; expose only with `NEXT_PUBLIC_` when needed.
- `next.config.mjs` currently ignores TypeScript/ESLint errors during builds—still fix locally before merging.

## Agent-Specific Instructions
- Follow existing patterns in `components/ui` and `app/`. Keep changes minimal and focused.
- Prefer `npm`; avoid adding new dependencies without discussion.
- Use `@/*` aliases, Tailwind for styling, and keep code TypeScript‑strict.
