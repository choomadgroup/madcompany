---
name: Deregister artifact to plain root+client/ layout
description: Steps and pitfalls when a user manually moves a project out of the artifacts/ multi-artifact convention into a plain root + client/ folder layout.
---

When a user removes an artifact registration and restructures a project so the
app package.json lives at the workspace root (instead of under `artifacts/<name>/`),
the following must be done manually — none of it happens automatically:

1. **Workflow**: the old artifact-managed workflow disappears entirely (not just
   renamed). Use `configureWorkflow` to create a fresh one (e.g. `Start application`)
   pointing at the root `dev` script and the port the app actually listens on.
2. **Config file paths**: any config that referenced `src/...` relative to the old
   app root (vite.config.ts aliases/root, tsconfig `include`/`paths`, tailwind
   `content` globs) must be updated to point at the new subfolder (e.g. `client/src`).
3. **PORT/BASE_PATH env vars**: artifact-based scaffolds often hard-require
   `process.env.PORT` / `process.env.BASE_PATH` and throw if missing, because the
   artifact system injected them. Once deregistered, nothing injects them anymore —
   give them sensible defaults (e.g. `PORT ?? "5000"`, `BASE_PATH ?? "/"`) instead of
   throwing.
4. **pnpm-workspace.yaml `packages:`**: remove globs pointing at directories that no
   longer exist (e.g. `artifacts/*`, `lib/*`) — leaving them is harmless but stale.
5. **Dangling workspace deps**: when a package.json is merged/moved, check for
   `workspace:*` deps pointing at packages that no longer exist in the monorepo
   (e.g. a shared api-client lib) — these break `pnpm install`.
6. **Root-level tooling deps** (typescript, prettier, etc.) can silently disappear
   if the moved-up package.json fully replaces the original root package.json rather
   than merging into it. Verify `tsc`/`prettier` still resolve after install.
7. **Stale nested node_modules**: if the app folder had its own `node_modules`
   before the package.json moved to the root, delete it — a leftover nested
   `node_modules` can shadow the real workspace root install during Node module
   resolution.
8. **Clear `node_modules/.vite` cache** after root/alias changes — a stale vite
   dep-optimization cache built under the old path layout can cause confusing
   "Invalid hook call" / duplicate-React errors even when only one React copy is
   actually installed. This is a caching artifact, not a real duplicate-dependency bug.
