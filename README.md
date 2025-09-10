# RAG Pipeline Dashboard

Modern Next.js (App Router) dashboard for monitoring and exploring a RAG pipeline. Built with TypeScript, Tailwind CSS v4, and shadcn/ui-style primitives.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-rag-pipeline-dashboard.vercel.app/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/KBURx0iiPsX)

## Live

- Vercel: https://v0-rag-pipeline-dashboard.vercel.app/
- GitHub Pages: https://asabla.github.io/v0-codex-copilot-test-repo/

## Stack

- Next.js 14 (App Router, static export)
- TypeScript, React 18
- Tailwind CSS v4, `tailwind-merge`, `clsx`
- Radix UI primitives and shadcn/ui-like component patterns

## Quick Start

Prereqs: Node 18.17+ and npm.

- Install: `npm ci`
- Dev server: `npm run dev` then open `http://localhost:3000`

### Production build

This repo is configured for static export (`output: "export"`).

- Build: `npm run build` (emits `out/`)
- Preview locally: `npx serve out` or any static file server

Note: `next start` targets the Node server output and is not used with static export.

## Project Structure

- `app/` – App Router entry (`layout.tsx`, `page.tsx`), global styles in `app/globals.css`
- `components/` – Reusable UI (`components/ui/*` primitives, `components/theme-provider.tsx`)
- `lib/` – Utilities (e.g., `lib/utils.ts` with `cn`)
- `public/` – Static assets
- `styles/` – Additional global CSS
- Config – `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `components.json`

## CI/CD

This project deploys to GitHub Pages on pushes to `main` and supports manual PR previews.

- Workflows live in `.github/workflows/*`
- Pages deploy sets `NEXT_PUBLIC_BASE_PATH` automatically so assets resolve under the repo path

See `docs/github-workflow.md` for details.

## Adding Components

Follow the existing patterns under `components/ui` with Tailwind utility classes and `cn` for composition. Prefer server components; add `"use client"` when using state, effects, or browser APIs.

See `docs/adding-a-new-component.md` for a step-by-step guide.

## Development

- Lint: `npm run lint`
- Tests: `npm run test` (Vitest)

## Notes

- Built and iterated with [v0.app](https://v0.app). Changes from v0 may sync here.
