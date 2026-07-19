# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
├── pages/index.astro     # single page, imports and orders all sections
├── components/           # .astro sections + .tsx React islands
│   ├── ui/                # shadcn primitives (button, card, dialog)
│   └── animate-ui/        # components vendored from the animate-ui registry (components.json)
├── data/representatives.ts  # typed data array driving RepresentativesCarousel + RepresentativeModal
├── hooks/                 # shared React hooks (e.g. use-is-in-view.tsx, wraps motion's useInView)
├── layouts/BaseLayout.astro  # html shell: header/nav, scroll-reactive navbar script, footer
├── lib/
│   ├── utils.ts            # shadcn `cn()` helper
│   └── icons/index.ts      # single re-export barrel for all lucide-react icons in use
└── styles/global.css      # Tailwind + shadcn theme vars
```

`src/pages/index.astro` is the only page — it composes section components (`QuienesSomos`, `PropuestaGrid`, `NoticiasSection`, `EventosTimeline`, `TestimoniosSection`, etc.) in render order. Each section owns its own content/layout; there's no shared section wrapper beyond `BaseLayout`. Nav anchors in `BaseLayout.astro` (`#equipo`, `#propuesta`, `#calendario`, `#testimonios`, `#contacto`) target `id`s set inside the corresponding section components, so renaming a section's root `id` breaks in-page navigation.

## Conventions

- **Path alias**: `@/*` → `./src/*` (tsconfig paths)
- **React islands**: use `client:load` (hero, form) or `client:visible` (carousels) — do not use `client:only` unless SSR is intentionally skipped
- **Icons**: import from `@/lib/icons` (barrel re-export), not directly from `lucide-react`, so the icon set stays centralized
- **shadcn**: add components via `npx shadcn add <name>`; style is `base-nova`, no RSC; registries include `@animate-ui` (see `components.json`)
- **Language**: all user-facing text is Spanish
- **Theme**: light/dark via `.dark` class on `<html>`; CSS vars in `global.css`

## Notes

- `AGENTS.md` mirrors this file's content for non-Claude agent tooling — keep both in sync when editing either.
