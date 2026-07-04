---
name: Next.js-to-Vite migration tsconfig pitfall
description: fullstack_copy_frontend.sh can generate a tsconfig.json for the new react-vite artifact that extends/references monorepo files that don't actually exist in this workspace, breaking the Vite dev server.
---

When migrating an imported Next.js app to a react-vite artifact via `fullstack_copy_frontend.sh`, the generated `artifacts/<app>/tsconfig.json` may contain:

```json
"extends": "../../tsconfig.base.json",
"references": [{ "path": "../../lib/api-client-react" }]
```

These assume a `lib/api-client-react` package and root `tsconfig.base.json` exist — but in a pure-frontend migration (no backend/API routes needed), neither may exist. This doesn't fail `pnpm install`, but it does break the Vite dev server at runtime: esbuild's tsconfig resolution throws `failed to resolve "extends"` as a transient 500 on some/all module transforms, which can look like a confusing partial-rendering bug (e.g. some page sections silently missing) rather than an obvious build error.

**Why:** The scaffold's tsconfig pattern assumes every artifact has a sibling `lib/api-client-react` and shared root `tsconfig.base.json`, which is only true when an api-server + codegen pipeline was actually set up for the app.

**How to apply:** After running `fullstack_copy_frontend.sh` for a pure-frontend (no API) migration, check whether `tsconfig.base.json` and any referenced `lib/*` packages actually exist at the paths used in the generated tsconfig. If not, rewrite the artifact's tsconfig.json to be self-contained (inline the compilerOptions instead of extending, drop the `references` array) rather than leaving a dangling extends/reference.
