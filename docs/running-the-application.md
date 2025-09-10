# Running the Application

## Requirements

- Node 18.17+ (Node 20 recommended)
- npm (prefer npm over other package managers in this repo)

## Install

- `npm ci`

## Develop

- `npm run dev`
- Open `http://localhost:3000`

Notes:
- Most components are server components by default. Add `"use client"` only when using state/effects or browser APIs.
- Tailwind CSS v4 is configured; use `cn` from `lib/utils.ts` to compose classes.

## Build

This repo uses static export.

- `npm run build` — outputs static site to `out/`

## Preview Production Build Locally

Serve the `out/` directory using any static file server, for example:

- `npx serve out`
- or `python3 -m http.server --directory out 3000`

Note: `npm start` / `next start` is not used for static export outputs.

## Environment Variables

- Public variables must be prefixed with `NEXT_PUBLIC_`.
- For GitHub Pages builds, `NEXT_PUBLIC_BASE_PATH` is set automatically by the workflow so that assets resolve under the repository path.

