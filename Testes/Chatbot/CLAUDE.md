# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (uses pnpm; fallback: npm i)
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build
```

> This project was generated from Figma Make. The original Figma design is at:  
> https://www.figma.com/design/fSYFfAKlWESclLwbBYrSYs/Fluxo-conversacional-de-bot

## Architecture

Single-page React app (Vite + TypeScript + Tailwind CSS v4) structured as a fictional health-insurance website with an embedded chatbot widget.

**Entry point:** `src/main.tsx` → renders `src/app/App.tsx`

**Two top-level concerns in `App.tsx`:**
1. The landing page — all JSX and data arrays live in a single file (plans, benefits, testimonials, nav links). No routing; fully static.
2. `<ChatWidget />` rendered at the bottom, overlaid via `position: fixed`.

**`src/app/components/ChatWidget.tsx`** — self-contained floating chat widget:
- State: `isOpen` (panel visibility), `messages[]`, `isTyping`, `initialized` (delays first bot message until first open)
- All response logic lives in `handleResponse(userOption)` — a single `switch` on the option string. Adding new conversation branches means adding cases here and new `options[]` arrays in `addBotMessage` calls.
- The floating button sits at `fixed bottom-6 right-6 z-50`; the chat panel at `fixed bottom-24 right-6 z-50`.

**`src/app/components/figma/ImageWithFallback.tsx`** — drop-in `<img>` replacement that renders a grey placeholder SVG on load error. Use this instead of `<img>` for any user-supplied or remote images.

**`src/app/components/ui/`** — full shadcn/ui component library (pre-installed, import as needed).

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js` file; configuration is done in CSS.
- CSS entry: `src/styles/index.css` imports `fonts.css`, `tailwind.css` (Tailwind + `tw-animate-css`), and `theme.css`.
- `theme.css` defines all CSS custom properties (`--background`, `--primary`, etc.) consumed by shadcn/ui components via `@theme inline`.
- `default_shadcn_theme.css` at root is the reference/backup for the default shadcn token values.
- Brand color in use: **teal** (`teal-500`/`teal-600`/`teal-700`). Keep new UI consistent with this palette.
- Do **not** add a `tailwind.config.js` or modify `postcss.config.mjs` — Tailwind v4 handles everything through the Vite plugin.
