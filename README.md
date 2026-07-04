# Rawon — Marketing Site

Marketing/landing site for **Rawon**, a Discord music (multi-)bot. Built with React + Vite.

## Run & Operate

- `pnpm run dev` — start the dev server (port 5000)
- `pnpm run build` — production build (output in `dist/public`)
- `pnpm run serve` — preview the production build
- `pnpm run typecheck` — typecheck the project

## Stack

- Vite 7 + React 19 + TypeScript 5.9
- MUI (Material UI) for core layout/components, Tailwind CSS + shadcn/radix UI primitives for the docs/utility pages
- `wouter` for client-side routing
- `framer-motion` for animations
- Multi-language support via a custom locale system (`client/src/locales`)

## Where things live

- `index.html` — app entry HTML (at project root)
- `client/src/main.tsx` — app entry point
- `client/src/App.tsx` — routes
- `client/src/pages/public/` — public-facing pages (Home, Permission Calculator, 404)
- `client/src/pages/docs/` — documentation pages (Getting Started, Configuration)
- `client/src/components/public/` — shared public components (NavigationBar, InlineCode)
- `client/src/components/ui/` — shadcn/radix UI primitives
- `client/src/locales/` — translation strings per language
- `client/src/contexts/LocaleContext.tsx` — active locale provider/hook
- `public/` — static assets (icons, manifest, favicon)
- `vite.config.ts` — Vite config (root points to project root, alias `@` → `client/src`)

## Gotchas

- Vite's dev server watches the whole project root — `node_modules`, `.git`, `.local`, `.cache`, and `dist` are excluded via `server.watch.ignored` in `vite.config.ts` to avoid hitting the OS file-watcher limit (ENOSPC).
- Only one workflow/port is used: **Start application** on port 5000. Don't add extra workflows/artifacts.
