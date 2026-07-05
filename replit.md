# Rawon Marketing Site

A marketing/landing site for the Rawon Discord music multi-bot. Includes a home page, a Discord permission calculator, and documentation pages (Getting Started, Configuration). Supports multiple languages via a custom `LocaleContext`.

## Tech Stack

- **React 19** + **Vite 7** + **TypeScript 5.9**
- **Material UI (MUI 5)** for core layout components
- **Tailwind CSS v3** + **shadcn/ui (Radix UI)** for docs/UI components
- **wouter** for client-side routing
- **@tanstack/react-query** for data fetching
- **framer-motion** for animations
- **pnpm** for package management

## Project Structure

```
client/src/
  pages/
    public/     # Home page, 404, etc.
    docs/       # Getting Started, Configuration docs
  components/
    public/     # Public-facing components
    ui/         # shadcn/ui components
  locales/      # Translation files (multi-language support)
public/         # Static assets (icons, manifest)
```

## How to Run

```bash
pnpm install   # install dependencies
pnpm run dev   # start dev server on $PORT (default 5000)
```

The dev server binds to `0.0.0.0` and is accessible via the Replit preview pane.

## Build

```bash
pnpm run build   # outputs to dist/public/
```

## User Preferences

<!-- Add user preferences here -->
