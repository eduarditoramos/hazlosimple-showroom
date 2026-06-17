import { APP_COLOR } from "../../tokens";

export const APPS = [
  { id: "crm",       label: "CRM Simple",         glyph: "C",  demoIdx: 0, badge: "24", status: "3 seguimientos hoy"        },
  { id: "cocina",    label: "Cocina / POS",        glyph: "Co", demoIdx: 1, badge: "18", status: "2 pedidos en cocina"        },
  { id: "clinica",   label: "Clínica / Pacientes", glyph: "+",  demoIdx: 2, badge: "14", status: "4 indicaciones pendientes"  },
  { id: "operacion", label: "Control Operativo",   glyph: "Op", demoIdx: 3, badge: "4",  status: "1 alerta de stock"          },
];

const ICON_DECOR = {
  crm: (
    <div className="absolute bottom-2 left-0 right-0 flex items-end justify-center gap-[2px]">
      {[4, 7, 10, 13, 16].map((h, i) => (
        <div key={i} className="w-[3px] rounded-sm" style={{ height: h, background: "rgba(255,255,255,0.52)" }} />
      ))}
    </div>
  ),
  cocina: (
    <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-[3px]">
      <div className="h-[2px] w-10 rounded-full" style={{ background: "rgba(255,255,255,0.50)" }} />
      <div className="h-[2px] w-7 rounded-full" style={{ background: "rgba(255,255,255,0.30)" }} />
      <div className="h-[2px] w-8 rounded-full" style={{ background: "rgba(255,255,255,0.30)" }} />
    </div>
  ),
  clinica: (
    <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-[5px]">
      <div className="h-2 w-2 rounded-full" style={{ background: "rgba(34,197,94,0.90)" }} />
      <div className="h-2 w-2 rounded-full" style={{ background: "rgba(245,158,11,0.90)" }} />
      <div className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.38)" }} />
    </div>
  ),
  operacion: (
    <div className="absolute bottom-2 left-0 right-0 flex items-end justify-center gap-[3px]">
      {[13, 5, 10, 13].map((h, i) => (
        <div key={i} className="w-[4px] rounded-sm"
          style={{ height: h, background: i === 1 ? "rgba(245,158,11,0.92)" : "rgba(255,255,255,0.42)" }} />
      ))}
    </div>
  ),
};

function AppIcon({ app, active, onClick }) {
  const color = APP_COLOR[app.id];
  const glyphSize = app.glyph === "+" ? "text-[28px]" : app.glyph.length > 1 ? "text-[17px] font-extrabold" : "text-[24px]";
  return (
    <button className="group flex flex-col items-center gap-2 focus:outline-none" onClick={onClick} type="button">
      <div className="relative flex h-[72px] w-[72px] select-none items-center justify-center overflow-hidden rounded-[20px] transition-all duration-200 group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(155deg, ${color}cc 0%, ${color} 100%)`,
          boxShadow: active
            ? `0 0 0 2.5px white, 0 0 0 5px ${color}88, 0 14px 36px ${color}44`
            : "0 14px 32px rgba(16,32,51,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
          transform: active ? "translateY(-4px) scale(1.06)" : undefined,
        }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46%] rounded-t-[20px] bg-gradient-to-b from-white/32 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] rounded-b-[20px] bg-gradient-to-t from-black/15 to-transparent" />
        <span className={`relative z-10 -mt-3 font-bold text-white ${glyphSize}`}>{app.glyph}</span>
        {ICON_DECOR[app.id]}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[10px] font-semibold tracking-wide transition"
          style={{ color: active ? "#102033" : "#667085" }}>
          {app.label}
        </span>
        <span className="font-mono text-[8px] tracking-wider" style={{ color: active ? "#667085" : "#98A2B3" }}>
          {app.status}
        </span>
      </div>
    </button>
  );
}

export default function AppLauncher({ selected, onSelect }) {
  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {APPS.map(app => (
        <AppIcon key={app.id} app={app} active={selected === app.id} onClick={() => onSelect(app.id)} />
      ))}
    </div>
  );
}
