# AGENTS.md - HazloSimple OS

## Project context

HazloSimple OS Showroom is a React + Vite + Tailwind product showroom for custom mini business apps.

It is not a generic landing page.
It is not a backend app.
It is not a SaaS template.

The goal is to sell the idea of custom web apps for real businesses through a premium interactive showroom.

## Non-negotiables

Do not change:

- `src/App.jsx`
- `src/components/demos/CRMView.jsx`
- `src/components/demos/RestaurantView.jsx`
- `src/components/demos/AgendaView.jsx`
- `src/components/demos/OperationsView.jsx`
- `index.html`
- `public/*`
- PWA/meta/manifest

Do not:

- install libraries
- add backend
- add login
- add database
- add payments
- use emojis
- use orange as a dominant color
- redesign demos internally
- make generic SaaS cards
- make fake Mac cosplay
- commit unless explicitly asked

## Visual direction

Use:

- Inter/system sans as the dominant typography
- IBM Plex Mono only for tiny labels
- navy, green, off-white, charcoal
- app-specific accents in moderation
- sober unicode symbols or inline SVG
- clean premium product UI

Avoid:

- table-like UI
- too many borders
- too many mono labels
- large orange buttons
- empty panels
- decorative-only components

## Current task target

The next task is limited to:

1. Fix Home navigation.
2. Add a premium `MicroDemoGrid` section.
3. Connect Home buttons to real section ids.
4. Keep demos internal logic untouched.

Allowed files:

- `src/components/home/OsHome.jsx`
- `src/components/home/CommandCenter.jsx`
- `src/components/home/MicroDemoGrid.jsx`
- `src/components/home/*` only if needed for navigation
- `src/components/ui/*` only if needed
- `src/tokens.js` only if strictly needed

Expected ids:

- `#apps` = CommandCenter
- `#demos` = MicroDemoGrid
- `#giros` = GiroPanel wrapper
- `#dudas` = FAQPanel wrapper

Required validation:

- run `npm run build`
- report modified files
- report `git status`
- do not commit
