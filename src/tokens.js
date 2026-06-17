// ─── Shared design tokens & utilities ────────────────────────────────────────
// Single source of truth for constants used across components.

export const WA = "https://wa.me/522213619628?text=Hola%20quiero%20una%20app%20web%20para%20mi%20negocio";

export const OS_DESKTOP_STYLE = {
  background: "#EEF0EA",
  backgroundImage: "radial-gradient(circle, #D7DBD2 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

export const WIN_CHROME_BG = { background: "linear-gradient(to bottom,#E7E8E1,#DDDFD8)" };
export const SYSBAR_BG     = { background: "linear-gradient(to bottom,#F8F8F4,#EEF0EA)" };
export const SUBROW_BG     = { background: "linear-gradient(to bottom,#F6F7F1,#EEEDE9)" };

// App accent colors — per DESIGN_TOKENS.json (no orange)
export const APP_COLOR = {
  crm:       "#2563EB",
  cocina:    "#B91C1C",
  clinica:   "#0F766E",
  operacion: "#334155",
};

// Mac traffic lights
export const TL = { red: "#FF5F57", yellow: "#FEBC2E", green: "#28C840" };

export const COCINA_LABEL = {
  "Nuevo pedido":   "Nuevo",
  "En preparación": "Cocina",
  "Listo":          "Listo",
  "Entregado":      "Entregado",
};

// Stage color ramp: cold → blue → darker blue → green
export function pipelineColor(stageIndex, total) {
  const t = stageIndex / Math.max(total - 1, 1);
  if (t <= 0.25) return "#94A3B8";
  if (t <= 0.5)  return "#60A5FA";
  if (t <= 0.75) return "#2563EB";
  return "#22C55E";
}

export function statusColor(s = "") {
  const u = s.toUpperCase();
  if (/FINALIZ|ENTREGAD|GANADO|LISTO/.test(u))               return "#22C55E";
  if (/PROCESO|AGENDAD|COTIZAD|CONTACTAD|SURTIENDO/.test(u)) return "#F59E0B";
  if (/ALERTA|NEGOCIACI/.test(u))                            return "#DC2626";
  return "#94A3B8";
}
