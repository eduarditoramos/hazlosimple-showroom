export function ChevL({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevR({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/*
  AppProductIcon — inline SVG icons for each mini app.
  Uses currentColor so parent controls base color.
  Operación has a hardcoded amber bar (#F59E0B) per APP_ICONS_SPEC.md
  ("barras de inventario, una barra amber como alerta").
*/
export function AppProductIcon({ type, size = 20 }) {
  const p = { width: size, height: size, fill: "none", viewBox: "0 0 20 20", "aria-hidden": "true" };

  /* CRM — 4 ascending vertical bars = pipeline / conversión */
  if (type === "crm") return (
    <svg {...p}>
      <rect x="1" y="14" width="3.5" height="4.5" rx="0.75" fill="currentColor" opacity="0.50" />
      <rect x="5.5" y="10.5" width="3.5" height="8" rx="0.75" fill="currentColor" opacity="0.58" />
      <rect x="10" y="7" width="3.5" height="11.5" rx="0.75" fill="currentColor" opacity="0.76" />
      <rect x="14.5" y="3.5" width="3.5" height="15" rx="0.75" fill="currentColor" />
    </svg>
  );

  /* Cocina / POS — 3 horizontal bold lines = comanda / ticket */
  if (type === "cocina") return (
    <svg {...p}>
      <rect x="3" y="4.5" width="14" height="3" rx="1.5" fill="currentColor" />
      <rect x="3" y="9.5" width="11" height="3" rx="1.5" fill="currentColor" opacity="0.62" />
      <rect x="3" y="14.5" width="7.5" height="3" rx="1.5" fill="currentColor" opacity="0.38" />
    </svg>
  );

  /* Clínica — bold cross = médico / expediente */
  if (type === "clinica") return (
    <svg {...p}>
      <rect x="8.25" y="2" width="3.5" height="16" rx="1.75" fill="currentColor" />
      <rect x="2" y="8.25" width="16" height="3.5" rx="1.75" fill="currentColor" />
    </svg>
  );

  /* Control Operativo — 4 vertical bars, one amber = inventario con alerta */
  if (type === "operacion") return (
    <svg {...p}>
      <rect x="1" y="6.5" width="3.5" height="12" rx="0.75" fill="currentColor" opacity="0.82" />
      <rect x="5.5" y="13.5" width="3.5" height="5" rx="0.75" fill="#F59E0B" /> {/* alerta stock bajo */}
      <rect x="10" y="9" width="3.5" height="9.5" rx="0.75" fill="currentColor" opacity="0.65" />
      <rect x="14.5" y="4" width="3.5" height="14.5" rx="0.75" fill="currentColor" opacity="0.88" />
    </svg>
  );

  return null;
}
