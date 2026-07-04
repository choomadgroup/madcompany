---
name: Vite root at project root causes ENOSPC
description: Setting Vite's `root` config to the whole workspace/project root (instead of a subfolder) can crash the dev server with a file-watcher limit error.
---

When `index.html` lives at the project root (not inside a `client/` subfolder), Vite's `root` config must point to the project root too. But this makes Vite's dev server file watcher scan the entire project tree by default, including heavy directories like `node_modules`, `.git`, and any local pnpm content-addressable store folders (e.g. `.local/share/pnpm/store`) — these can contain far more files than the OS's `inotify` watch limit allows, crashing the server with:

```
Error: ENOSPC: System limit for number of file watchers reached
```

**Why:** the crash happens specifically because deep dependency stores are exposed under the watched root; this is easy to miss because the dev server appears to start fine on the first run.

**How to apply:** whenever Vite's `root` is the project root, add `server.watch.ignored` in `vite.config.ts` excluding at minimum: `**/node_modules/**`, `**/.git/**`, `**/.cache/**`, `**/.local/**`, `**/dist/**`, and any backup/vendor directories. Do this proactively any time `root` is changed to a broader scope than before — don't wait for the crash to appear.
