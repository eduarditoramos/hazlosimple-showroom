# Claude Implementation Brief — Fuentes, color y hero carrusel

## Objetivo

Aplicar el sistema visual definido en estos archivos al proyecto actual de HazloSimple OS.

El objetivo NO es agregar features. Es cerrar coherencia visual y comunicación de producto.

## Archivos a leer

1. `VISUAL_SYSTEM.md`
2. `DESIGN_TOKENS.json`
3. `MICRODEMO_SPECS.md`
4. `APP_ICONS_SPEC.md`

## Instrucción central

HazloSimple OS debe sentirse como un sistema completo, no como piezas bonitas pegadas.

No usar naranja como color rector. No usar naranja en CTA principal, fondos grandes ni barras. El naranja queda deprecado para esta versión.

## Aplicar

### 1. Fuentes

Usar:
- Inter para UI principal
- IBM Plex Mono para sistema/labels/badges

Importar en `index.html` si no está.

### 2. Tokens

Actualizar `tailwind.config.js` con los tokens de `DESIGN_TOKENS.json`.

### 3. Hero carrusel

El hero debe dejar de ser estático.

Crear hero tipo carrusel/ventana OS con 4 slides:

- CRM Simple
- Cocina / POS
- Clínica / Pacientes
- Control Operativo

Cada slide debe mostrar:
- promesa comercial
- métrica clave
- gráfica simple
- flujo del negocio
- registro vivo
- acción inmediata

Debe tener:
- tabs/dots por app
- flechas o controles
- botón `Abrir demo`
- si hay autoavance, que sea sutil; si no, basta con tabs/click

### 4. Microdemos

Aplicar `MICRODEMO_SPECS.md`.

No quiero solo listas. Cada demo debe mostrar conversión, avance o salud del negocio.

### 5. App icons

Aplicar `APP_ICONS_SPEC.md`.

Los iconos deben parecer apps instaladas con microdetalles, no botones con letras.

### 6. No romper

No agregar backend.
No agregar login.
No agregar base de datos.
No agregar pagos.
No agregar librerías nuevas.
No romper WhatsApp.
No romper selector de giro.
No romper demos internas.
No hacer deploy todavía.

## Criterio de aceptación

1. Home ya no parece landing.
2. Hero transmite sistema vivo.
3. Cada slide del hero muestra métrica + gráfica + registro vivo + acción.
4. CRM muestra conversión.
5. Cocina muestra venta/pedido.
6. Clínica muestra seguimiento de paciente.
7. Operación muestra stock/tareas.
8. Iconos de app tienen más diseño.
9. La paleta no depende del naranja.
10. Build pasa.
