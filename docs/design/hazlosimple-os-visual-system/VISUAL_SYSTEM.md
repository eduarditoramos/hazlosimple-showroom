# HazloSimple OS — Sistema de fuentes y color

## Concepto rector

HazloSimple OS no es una landing con demos. Es un pequeño sistema operativo visual donde se abren mini apps para negocios reales.

La estética debe sentirse como:

**Mac OS clásico refinado + iPhone OS táctil + software de negocio moderno.**

No debe sentirse como:
- landing SaaS genérica
- dashboard corporativo frío
- Canva
- neón / gamer / cyberpunk
- piezas visuales pegadas
- sistema naranja

## Regla principal de color

**No usar naranja como color rector.**

El naranja no debe dominar el sistema. Para esta versión, se elimina como color principal. Si aparece, debe ser mínimo y solo como señal secundaria heredada de marca, nunca como fondo grande, CTA principal, barra o color dominante.

La identidad debe vivir en:

- navy profundo
- verde HazloSimple
- off-white cálido
- charcoal
- colores por app

---

## Fuentes

### Fuente principal

**Inter**

Uso:
- títulos
- párrafos
- botones
- datos grandes
- textos principales
- UI general

Por qué:
- se ve moderna
- se lee bien
- transmite software real
- funciona en dashboards, apps y sitios premium

CSS recomendado:

```css
font-family: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Fuente de sistema

**IBM Plex Mono**

Uso:
- SystemBar
- labels
- badges
- estados
- window titles
- microcopy de sistema
- números pequeños
- etiquetas de módulos

Por qué:
- da sensación de consola/sistema operativo
- se ve editorial y premium
- no se siente hacker si se usa con moderación

CSS recomendado:

```css
font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Regla de uso

No usar mono en todo.

La mono es condimento de sistema, no cuerpo principal.

Correcto:
- `HAZLOSIMPLE OS`
- `ONLINE`
- `CRM`
- `CONVERSIÓN`
- `STOCK BAJO`
- `4 DEMOS ACTIVAS`

Incorrecto:
- todo el hero en mono
- párrafos largos en mono
- descripciones comerciales en mono

---

## Import de fuentes

Agregar en `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

## Paleta global

### Sistema base

| Token | Hex | Uso |
|---|---:|---|
| `os.bg` | `#EEF0EA` | Fondo general del OS |
| `os.bgDeep` | `#E1E5DA` | Profundidad / zonas secundarias |
| `os.grid` | `#D7DBD2` | Dot grid muy sutil |
| `window.paper` | `#FBFAF6` | Ventanas principales |
| `window.header` | `#E7E8E1` | Header de ventanas |
| `window.border` | `#CCD1C5` | Bordes de ventanas |
| `window.shadow` | `rgba(16,32,51,0.16)` | Sombras premium |
| `text.primary` | `#102033` | Texto principal |
| `text.secondary` | `#667085` | Texto secundario |
| `text.muted` | `#98A2B3` | Texto apagado |
| `surface.soft` | `#F6F7F1` | Paneles suaves |
| `surface.white` | `#FFFDF7` | Blanco cálido |

### Marca / acciones

| Token | Hex | Uso |
|---|---:|---|
| `brand.navy` | `#082B4C` | Identidad fuerte HazloSimple |
| `brand.green` | `#16A34A` | Energía / negocio vivo |
| `action.primary` | `#0B5FFF` | CTA principal si se requiere azul |
| `action.primaryHover` | `#0847C2` | Hover CTA |
| `button.charcoal` | `#1F2328` | Botón oscuro tipo sistema |
| `button.charcoalHover` | `#111827` | Hover botón oscuro |

### Estados

| Token | Hex | Uso |
|---|---:|---|
| `state.success` | `#22C55E` | Online / listo / completado |
| `state.warning` | `#F59E0B` | En proceso / alerta media |
| `state.danger` | `#DC2626` | Urgente / stock crítico |
| `state.info` | `#0EA5E9` | Info / sistema |

---

## Colores por app

Cada app debe tener acento propio y reconocerse en 3 segundos.

### CRM / Ventas

| Token | Hex |
|---|---:|
| `app.crm.primary` | `#2563EB` |
| `app.crm.deep` | `#1E3A8A` |
| `app.crm.soft` | `#DBEAFE` |
| `app.crm.graph` | `#60A5FA` |

Sensación:
- Salesforce simple
- ventas
- pipeline
- conversión
- seguimiento

### Cocina / POS

| Token | Hex |
|---|---:|
| `app.cocina.primary` | `#B91C1C` |
| `app.cocina.deep` | `#7F1D1D` |
| `app.cocina.soft` | `#FEE2E2` |
| `app.cocina.accent` | `#FB7185` |

Sensación:
- POS
- comanda
- cocina
- venta diaria
- urgencia controlada

### Clínica / Pacientes

| Token | Hex |
|---|---:|
| `app.clinica.primary` | `#0F766E` |
| `app.clinica.deep` | `#134E4A` |
| `app.clinica.soft` | `#CCFBF1` |
| `app.clinica.accent` | `#38BDF8` |

Sensación:
- salud
- paciente
- agenda médica
- indicaciones
- confianza

### Operación / ERP

| Token | Hex |
|---|---:|
| `app.operacion.primary` | `#334155` |
| `app.operacion.deep` | `#0F172A` |
| `app.operacion.soft` | `#E2E8F0` |
| `app.operacion.alert` | `#F59E0B` |

Sensación:
- ERP / Odoo simple
- inventario
- tareas
- responsables
- stock bajo

---

## Botones y símbolos

No usar emojis coloridos grandes. Usar símbolos sobrios Unicode.

### CRM

- Icono principal: `C`
- Símbolo auxiliar: `↗`
- Botón: `↗ Registrar seguimiento`
- Estado: `● Seguimiento hoy`
- Labels: `LEADS`, `PIPELINE`, `CIERRE`, `CONVERSIÓN`

### Cocina / POS

- Icono principal: `Co`
- Símbolo auxiliar: `✓`
- Botón: `✓ Marcar listo`
- Estado: `● En cocina`
- Labels: `MESA`, `TICKET`, `COCINA`, `VENTAS`

### Clínica / Pacientes

- Icono principal: `+`
- Símbolo auxiliar: `✚`
- Botón: `✚ Enviar indicaciones`
- Estado: `● Indicaciones pendientes`
- Labels: `CITA`, `FICHA`, `PACIENTE`, `SEGUIMIENTO`

### Control Operativo

- Icono principal: `Op`
- Símbolo auxiliar: `▣`
- Botón: `▣ Resolver pedido`
- Estado: `⚠ Stock bajo`
- Labels: `STOCK`, `TAREA`, `RESPONSABLE`, `AVANCE`

---

## Semáforos Mac

Usar solo en ventanas:

- Rojo: `#FF5F57`
- Amarillo: `#FEBC2E`
- Verde: `#28C840`

No usar esos colores como paleta de app. Solo para window chrome.

---

## Hero carrusel

El hero debe ser vivo, no estático.

Debe tener:
- ventana principal de sistema
- slide activo
- tabs/dots para CRM, Cocina, Clínica, Operación
- flechas o controles
- botón `Abrir demo`
- cada slide con métrica, gráfica simple, registro activo y acción

Headline recomendado:
**Tu negocio, convertido en app.**

Subheadline:
**Prueba mini sistemas de ventas, cocina, clínica y operación. Cada demo muestra cómo se vería tu negocio con clientes, pedidos, citas y tareas en orden.**

Microline:
**4 demos activas · flujos tocables · datos simulados · cotización a medida**

---

## Regla comercial

Cada demo debe responder:

1. ¿Qué caos ordena?
2. ¿Qué dato importante muestra?
3. ¿Qué gráfica demuestra avance/conversión?
4. ¿Qué acción permite hacer?
5. ¿Por qué un negocio pagaría por esto?

Si una demo no responde eso, no sirve.

