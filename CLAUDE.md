# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Single-page Astro 7 site (Spanish, university political party — "ERES UNC"). React components for interactive widgets, Tailwind CSS v4 (Vite plugin), shadcn/ui (base-nova style), Lucide icons, `astro-icon`.

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
| `pnpm install` | package manager — `pnpm-lock.yaml` + `pnpm-workspace.yaml` are the source of truth; a stray `package-lock.json` also exists but is not the intended lockfile |
| `astro build` | outputs to `dist/` |
| `astro check` | type-check via `npm run astro -- check` (no dedicated script) |

No lint, format, or test scripts configured. Node >=22.12.0 required.

## Project structure

```
src/
├── pages/index.astro     # single page, imports the active section components below
├── components/           # .astro sections + .tsx React islands (see "Active vs. built-but-unwired")
│   └── ui/               # shadcn primitives (button, card, dialog)
├── data/representatives.ts
├── layouts/BaseLayout.astro
├── lib/
│   ├── utils.ts          # shadcn `cn()` helper
│   └── icons/index.ts    # Lucide icon barrel re-exports
└── styles/global.css     # Tailwind + shadcn theme vars
```

### Active vs. built-but-unwired components

`src/pages/index.astro` currently renders only: `HeroLanding`, `TresColumnas`, `Ventajas`, `CarruselCasos`, `ContactoForm`. **These active hero/carousel components are still scaffold placeholders** (English "LOREIPSUM"/"LANDING PAGE TEMPLATE" copy), not final content.

A larger set of fully-written, Spanish-content section components exists in `src/components/` but is **not currently imported anywhere**: `Mision.astro`, `Vision.astro`, `Valores.astro`, `PlanTrabajo.astro`, `PorQueEres.astro`, `PropuestaGrid.astro`, `QuienesSomos.astro`, `EventosTimeline.astro`, `TestimoniosSection.astro`, `RepresentativesCarousel.tsx` (+ `RepresentativeModal.tsx`, backed by `src/data/representatives.ts`), and `Hero.astro`/`HeroCarousel.tsx`. Don't assume a component is dead just because it's unimported — check whether it's finished, real-content work waiting to be wired in versus superseded scaffolding before deleting anything.

## Conventions

- **Path alias**: `@/*` → `./src/*` (tsconfig paths)
- **React islands**: only `ContactoForm` currently ships a client directive (`client:visible`). When adding interactivity, prefer `client:load` for above-the-fold/critical widgets and `client:visible` for below-the-fold carousels/forms — avoid `client:only` unless SSR is intentionally skipped.
- **Icons**: import from `@/lib/icons` (centralized Lucide barrel re-exports), not directly from `lucide-react` — add new icons to the barrel rather than importing ad hoc.
- **shadcn**: add components via `npx shadcn add <name>`; style is `base-nova`, no RSC. `components.json` aliases: `components`→`@/components`, `ui`→`@/components/ui`, `lib`→`@/lib`, `utils`→`@/lib/utils`, `hooks`→`@/hooks`.
- **Language**: all user-facing text is Spanish (placeholder scaffolding in currently-active components is the one exception — see above).
- **Theme**: light/dark via `.dark` class on `<html>`; CSS vars defined in `src/styles/global.css` under `@theme inline` and consumed as Tailwind color tokens (`bg-primary`, `text-muted-foreground`, etc.) rather than raw hex values.
