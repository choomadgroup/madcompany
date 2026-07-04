# Rawon — Marketing Site

Marketing/landing site for **Rawon**, a Discord music (multi-)bot. Lets visitors learn about the bot, invite it to their server, calculate permissions, and read setup docs.

## Run & Operate

- `pnpm run dev` — start the dev server (port 5000)
- `pnpm run build` — production build (output in `dist/public`)
- `pnpm run serve` — preview the production build
- `pnpm run typecheck` — typecheck the project

## Stack

- Vite 7 + React 19 + TypeScript 5.9
- MUI (Material UI) for core layout/components, Tailwind CSS + shadcn/radix UI primitives for docs/utility pages
- `wouter` for client-side routing
- `framer-motion` for animations
- Multi-language support via a custom locale system (`client/src/locales`, 13 languages)

## Where things live

- `index.html` — app entry HTML (project root)
- `client/src/main.tsx` — app entry point
- `client/src/App.tsx` — routes
- `client/src/pages/public/` — public-facing pages (Home, Permission Calculator, 404)
- `client/src/pages/docs/` — documentation pages (Getting Started, Configuration)
- `client/src/components/public/` — shared public components (NavigationBar, InlineCode)
- `client/src/components/ui/` — shadcn/radix UI primitives
- `client/src/locales/` — translation strings per language
- `client/src/contexts/LocaleContext.tsx` — active locale provider/hook
- `public/` — static assets (icons, manifest, favicon)
- `vite.config.ts` — Vite config (root = project root, alias `@` → `client/src`)

## Architecture decisions

- This is a single-artifact static site (no backend/API/DB) — plain Vite + React, no server framework.
- `index.html` and static assets (`public/`, `components.json`) live at the project root even though source code lives under `client/src/` — this was a manual restructure by the user away from the original artifact-based layout.
- Vite's `root` is set to the project root (not `client/`) to match where `index.html` lives; the `@` alias still points into `client/src` for imports.

## Product

- Landing page introducing Rawon (Discord music bot)
- Permission calculator page for generating bot invite permissions
- Docs pages: Getting Started, Configuration
- Multi-language UI (13 locales)

## User preferences

- Only ever run **one** workflow/console/port (5000). Do not create extra workflows or artifacts.
- Don't over-explain or proactively investigate — just fix what's broken and confirm briefly.
- User (Madrols) communicates in Indonesian, casual/direct tone; keep responses short.
- User frequently moves/renames/deletes files manually between sessions — always check `git status` for uncommitted moves before assuming the tree matches what was last built.

## Gotchas

- Vite's dev server watches the whole project root — `node_modules`, `.git`, `.local`, `.cache`, and `dist` are excluded via `server.watch.ignored` in `vite.config.ts` to avoid hitting the OS file-watcher limit (ENOSPC).
- Occasional stale "Invalid hook call" console errors appear transiently during Vite dependency re-optimization/HMR reloads right after a restart — these clear on their own once the page settles; only investigate further if they persist after a fresh reload with `node_modules/.vite` cleared.
- After the user manually moves/renames pages or components, re-check `App.tsx` imports/routes, `NavigationBar.tsx` links, and any in-page `<Link>`s referencing the old paths.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
