## Stack

Single-page Astro 7 site (Spanish, university political party). React components for interactive widgets, Tailwind CSS v4 (Vite plugin), shadcn/ui (base-nova style), Lucide icons, `astro-icon`.

## Dev server

Background mode (required for agent use):

```sh
astro dev --background
astro dev status
astro dev stop
astro dev logs
```

## Key commands

| Command | Notes |
|---|---|
| `pnpm install` | package manager (pnpm-lock.yaml present) |
| `astro build` | outputs to `dist/` |
| `astro check` | type-check via `npm run astro -- check` |

No lint, format, or test scripts configured. Node >=22.12.0 required.

## Project structure

```
src/
├── pages/index.astro     # single page, imports all sections
├── components/           # .astro sections + .tsx React islands
│   └── ui/               # shadcn primitives (button, card, dialog)
├── data/representatives.ts
├── layouts/BaseLayout.astro
├── lib/
│   ├── utils.ts          # shadcn `cn()` helper
│   └── icons/index.ts    # Lucide icon barrel re-exports
└── styles/global.css     # Tailwind + shadcn theme vars
```

## Conventions

- **Path alias**: `@/*` → `./src/*` (tsconfig paths)
- **React islands**: use `client:load` (hero, form) or `client:visible` (carousels) — do not use `client:only` unless SSR is intentionally skipped
- **Icons**: import from `@/lib/icons` (centralized Lucide barrel re-exports), not directly from `lucide-react`
- **shadcn**: add components via `npx shadcn add <name>`; style is `base-nova`, no RSC
- **Language**: all user-facing text is Spanish
- **Theme**: light/dark via `.dark` class on `<html>`; CSS vars in `global.css`
