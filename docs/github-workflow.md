# GitHub Workflow (CI/CD)

This repository deploys a static-exported Next.js site to GitHub Pages and supports manual PR previews.

## Overview

- Static export is enabled via `next.config.mjs` (`output: "export"`).
- GitHub Actions set `NEXT_PUBLIC_BASE_PATH` so assets resolve correctly under the repository path.
- Production deploy triggers on pushes to `main`.
- Optional PR preview can be triggered manually and cleaned up after merge.

## Workflows

Location: `.github/workflows/`

- `nextjs.yml` — Deploy to GitHub Pages on push to `main`.
  - Detects package manager (uses npm here).
  - Sets `NEXT_PUBLIC_BASE_PATH` to `/${repo}` except for user/organization pages repos (`*.github.io`).
  - Caches `.next/cache` to speed up builds.
  - Runs `next build` (static output in `out/` due to `output: "export"`).
  - Uploads the `out/` artifact and deploys with `actions/deploy-pages@v4`.

- `pr-preview.yml` — Manual PR preview deployment.
  - Triggered via “Run workflow” with a `pr-number` input.
  - Checks out the PR head, installs deps, builds, and exports static files to `out/`.
  - Publishes preview to `gh-pages` branch under `pr-{NUMBER}/` via `peaceiris/actions-gh-pages@v3`.
  - Comments the preview URL back to the PR.

- `pr-preview-cleanup.yml` — Cleanup after PR merge.
  - On `pull_request` closed + merged, removes `pr-{NUMBER}` folder from `gh-pages`.

## Environment Variables

- `NEXT_PUBLIC_BASE_PATH` — Set by workflows for Pages. Not required locally.
- Avoid committing secrets. If adding runtime config, prefix public values with `NEXT_PUBLIC_`.

## Vercel (Optional)

This project is also available on Vercel: https://v0-rag-pipeline-dashboard.vercel.app/

No Vercel-specific config is required in this repo; Vercel builds are managed in the project dashboard.

## Common Tasks

- Rerun a failed deploy: Re-run the workflow from the Actions tab.
- Preview a PR: Open `pr-preview.yml`, click “Run workflow”, enter the PR number.
- Remove a preview manually: Delete the `pr-{NUMBER}` folder from the `gh-pages` branch.

