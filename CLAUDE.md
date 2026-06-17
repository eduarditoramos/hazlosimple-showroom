# HazloSimple OS — Project Rules

HazloSimple OS Showroom no es una landing page.
Es un product showroom / command center donde prospectos prueban mini apps de negocio.

El producto vende control visible:
- CRM: control de ventas, conversión y seguimiento.
- Cocina / POS: control de pedidos, cocina y venta diaria.
- Clínica / Pacientes: control de citas, ficha e indicaciones.
- Control Operativo: control de pedidos, stock, responsables y tareas.

La Home debe mostrar negocios funcionando, no datos decorativos.

## Non-negotiables
- No backend.
- No login.
- No database.
- No payments.
- No new libraries unless explicitly approved.
- Do not break WhatsApp CTAs.
- Do not break GiroPanel.
- Do not break PWA/meta/manifest.
- Do not make generic SaaS landing pages.
- Do not make generic cards.
- Do not overuse monospace.
- Do not use orange as a dominant brand/system color.
- Do not use emojis as UI icons.
- Use sober Unicode symbols or inline SVG.

## Visual Direction
Modern business software + subtle Mac/iOS inspiration, not literal fake Mac cosplay.

Use:
- navy
- green
- off-white
- charcoal
- app-specific accents

Typography:
- Inter/system sans for UI and content.
- IBM Plex Mono only for tiny labels, badges and system metadata.

## Home v2 Goal
Home v2 should be a Command Center:
- clear hero
- live carousel / active system preview
- four mini apps showing real business flow
- metrics + charts + live record + action
- app dock/launcher
- GiroPanel
- HazloSimple banner

## Demo Requirements
Every microdemo must answer:
1. What chaos does it solve?
2. What key metric does it show?
3. What chart/flow proves progress?
4. What live record is active?
5. What action should the user take?
6. Why would a business pay for this?

CRM:
Show conversion, pipeline, follow-ups, probability, sales value.

Cocina / POS:
Show orders by state, sales today, active ticket, prep time, delayed order.

Clínica / Pacientes:
Show agenda, patient file, confirmations, pending instructions, follow-up.

Control Operativo:
Show stock alert, orders, responsible person, tasks, operational progress.

## Workflow
Before major UI changes:
- Explain plan briefly.
- Prefer component extraction over patching App.jsx.
- Run npm run build.
- Report files changed and git status.
