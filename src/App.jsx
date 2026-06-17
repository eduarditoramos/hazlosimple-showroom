import { useEffect, useRef, useState } from "react";
import { demos } from "./data/demos";
import { industries } from "./data/industries";

// ─── Constants & design tokens ────────────────────────────────────────────────

const WA = "https://wa.me/522213619628?text=Hola%20quiero%20una%20app%20web%20para%20mi%20negocio";

const OS_DESKTOP_STYLE = {
  background: "#EEF0EA",
  backgroundImage: "radial-gradient(circle, #D7DBD2 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

const WIN_CHROME_BG = { background: "linear-gradient(to bottom,#E7E8E1,#DDDFD8)" };
const SYSBAR_BG = { background: "linear-gradient(to bottom,#F8F8F4,#EEF0EA)" };
const SUBROW_BG = { background: "linear-gradient(to bottom,#F6F7F1,#EEEDE9)" };

// App accent colors — per DESIGN_TOKENS.json (no orange)
const APP_COLOR = {
  crm:       "#2563EB",
  cocina:    "#B91C1C",
  clinica:   "#0F766E",
  operacion: "#334155",
};

// Mac traffic lights
const TL = { red: "#FF5F57", yellow: "#FEBC2E", green: "#28C840" };

// Stage color ramp: cold → blue → darker blue → green
function pipelineColor(stageIndex, total) {
  const t = stageIndex / Math.max(total - 1, 1);
  if (t <= 0.25) return "#94A3B8";
  if (t <= 0.5)  return "#60A5FA";
  if (t <= 0.75) return "#2563EB";
  return "#22C55E";
}

function statusColor(s = "") {
  const u = s.toUpperCase();
  if (/FINALIZ|ENTREGAD|GANADO|LISTO/.test(u))              return "#22C55E";
  if (/PROCESO|AGENDAD|COTIZAD|CONTACTAD|SURTIENDO/.test(u)) return "#F59E0B";
  if (/ALERTA|NEGOCIACI/.test(u))                            return "#DC2626";
  return "#94A3B8";
}

const COCINA_LABEL = {
  "Nuevo pedido": "Nuevo", "En preparación": "Cocina",
  "Listo": "Listo", "Entregado": "Entregado",
};

// ─── SVG icons ────────────────────────────────────────────────────────────────

function ChevL({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevR({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Window chrome ────────────────────────────────────────────────────────────

function TrafficLights({ onBack }) {
  return (
    <div className="flex items-center gap-1.5">
      <button className="h-3 w-3 rounded-full transition hover:brightness-90 focus:outline-none"
        onClick={onBack} style={{ background: TL.red }} title="Cerrar" type="button" />
      <div className="h-3 w-3 rounded-full" style={{ background: TL.yellow }} />
      <div className="h-3 w-3 rounded-full" style={{ background: TL.green }} />
    </div>
  );
}

function WinChrome({ onBack, right, title }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5"
      style={{ ...WIN_CHROME_BG, borderBottom: "1px solid #CCD1C5" }}>
      {onBack ? <TrafficLights onBack={onBack} /> : (
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full" style={{ background: TL.red }} />
          <div className="h-3 w-3 rounded-full" style={{ background: TL.yellow }} />
          <div className="h-3 w-3 rounded-full" style={{ background: TL.green }} />
        </div>
      )}
      <span className="font-mono text-[11px] font-medium tracking-wide" style={{ color: "#98A2B3" }}>{title}</span>
      <div className="flex min-w-[80px] items-center justify-end">{right ?? null}</div>
    </div>
  );
}

// ─── SystemBar ────────────────────────────────────────────────────────────────

function SystemBar({ onHome, onNavigate }) {
  const NAV = [
    ["Demos", "hero"],
    ["Giros", "giros"],
    ["Apps", "launcher"],
    ["Dudas", "dudas"],
  ];
  return (
    <header className="sticky top-0 z-30"
      style={{ ...SYSBAR_BG, borderBottom: "1px solid #CCD1C5", boxShadow: "0 1px 4px rgba(16,32,51,0.06)" }}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">

        <button className="flex shrink-0 items-center gap-2.5 focus:outline-none" onClick={onHome} type="button">
          <div className="grid h-7 w-7 place-items-center overflow-hidden rounded-[7px]"
            style={{ background: "#082B4C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(8,43,76,0.30)" }}>
            <span className="font-mono text-[9px] font-bold leading-none text-white">HS</span>
          </div>
          <div className="hidden items-baseline gap-1.5 xs:flex sm:flex">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#102033" }}>
              HazloSimple
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: "#98A2B3" }}>OS</span>
          </div>
        </button>

        <nav className="hidden items-center sm:flex">
          {NAV.map(([label, section]) => (
            <button key={label}
              onClick={() => onNavigate(section)}
              className="rounded-md px-2.5 py-1.5 font-mono text-[11px] transition hover:bg-black/5 focus:outline-none"
              style={{ color: "#667085" }} type="button">
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            <div className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#22C55E", boxShadow: "0 0 0 2px rgba(34,197,94,0.22)" }} />
            <span className="font-mono text-[9px] tracking-widest" style={{ color: "#98A2B3" }}>ONLINE</span>
          </div>
          <a className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition hover:opacity-85 sm:px-3.5"
            href={WA} rel="noreferrer" target="_blank"
            style={{ background: "linear-gradient(to bottom,#3A3B3F,#1F2023)", boxShadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)" }}>
            Quiero mi app
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── App Launcher icons ───────────────────────────────────────────────────────

const APPS = [
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

function AppLauncher({ selected, onSelect }) {
  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {APPS.map(app => (
        <AppIcon key={app.id} app={app} active={selected === app.id} onClick={() => onSelect(app.id)} />
      ))}
    </div>
  );
}

// ─── Shared mini-components ───────────────────────────────────────────────────

function MiniKpi({ label, value, color }) {
  return (
    <div className="flex shrink-0 flex-col rounded-xl border px-3 py-2.5 text-center"
      style={{ borderColor: "#CCD1C5", background: "#FFFDF7" }}>
      <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{label}</span>
      <span className="mt-0.5 text-[15px] font-semibold tabular-nums" style={color ? { color } : { color: "#102033" }}>
        {value}
      </span>
    </div>
  );
}

function StockBar({ low }) {
  return (
    <div className="flex h-1.5 w-16 overflow-hidden rounded-full" style={{ background: "#E2E8F0" }}>
      <div className="h-full rounded-full"
        style={{ width: low ? "28%" : "88%", background: low ? "#DC2626" : "#22C55E" }} />
    </div>
  );
}

function StatusChip({ label, color }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      <span className="h-1 w-1 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

// ─── CRM Console ──────────────────────────────────────────────────────────────

function CRMConsole({ demo }) {
  const [selId, setSelId] = useState(demo.records[0].id);
  const sel = demo.records.find(r => r.id === selId);
  const color = APP_COLOR.crm;

  return (
    <>
      <div className="border-b px-5 py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color }}>Pipeline activo</span>
          <span className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>{demo.records.length} oportunidades</span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full border" style={{ borderColor: "#CCD1C5" }}>
          {demo.stages.map((stage, i) => {
            const count = demo.records.filter(r => r.stage === stage).length;
            if (!count) return null;
            return (
              <div key={stage} className="h-full border-r border-white/20 last:border-r-0"
                style={{ width: `${(count / demo.records.length) * 100}%`, background: pipelineColor(i, demo.stages.length) }} />
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {demo.stages.map((stage, i) => {
            const n = demo.records.filter(r => r.stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: pipelineColor(i, demo.stages.length) }} />
                <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>{stage} {n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b px-4 py-2.5" style={{ borderColor: "#CCD1C5" }}>
        {demo.kpis.map(k => <MiniKpi key={k.label} label={k.label} value={k.value} color={color} />)}
      </div>
      <div className="grid sm:grid-cols-[1fr_1px_252px]">
        <div>
          {demo.records.map(lead => {
            const dot = statusColor(lead.status);
            const isSel = selId === lead.id;
            return (
              <button key={lead.id}
                className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}08` : undefined }}
                onClick={() => setSelId(lead.id)} type="button">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold" style={{ color: isSel ? color : "#102033" }}>{lead.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wide" style={{ color: "#98A2B3" }}>{lead.stage}</p>
                </div>
                <span className="shrink-0 text-[13px] font-bold tabular-nums" style={{ color: "#102033" }}>{lead.value}</span>
                <ChevR size={13} className="shrink-0" />
              </button>
            );
          })}
        </div>
        <div className="hidden sm:block" style={{ background: "#CCD1C5" }} />
        {sel && (
          <div className="hidden flex-col gap-3 p-4 sm:flex" style={{ background: `${color}04` }}>
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Lead caliente</span>
              <p className="mt-1.5 text-[15px] font-semibold" style={{ color: "#102033" }}>{sel.name}</p>
              <StatusChip label={sel.status} color={statusColor(sel.status)} />
            </div>
            <p className="text-[21px] font-bold tabular-nums" style={{ color: "#102033" }}>{sel.value}</p>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Próxima acción</p>
              <p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{sel.nextAction}</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
              <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: "#667085" }}>{sel.notes}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Cocina Console ───────────────────────────────────────────────────────────

function CocinaConsole({ demo }) {
  const [selId, setSelId] = useState(demo.records[0].id);
  const sel = demo.records.find(r => r.id === selId);
  const color = APP_COLOR.cocina;

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto border-b px-4 py-2.5" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        {demo.stages.map(stage => {
          const count = demo.records.filter(r => r.stage === stage).length;
          const isCurrent = sel?.stage === stage;
          return (
            <div key={stage}
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide"
              style={isCurrent
                ? { borderColor: `${color}50`, background: `${color}12`, color }
                : { borderColor: "#CCD1C5", background: "white", color: "#98A2B3" }}>
              {isCurrent && <div className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
              {COCINA_LABEL[stage] || stage}
              <span className="opacity-60">{count}</span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3 border-b p-4 sm:grid-cols-4" style={{ borderColor: "#CCD1C5" }}>
        {demo.records.map(order => {
          const isSel = selId === order.id;
          const dot = statusColor(order.status);
          return (
            <button key={order.id}
              className="flex flex-col rounded-xl border p-3 text-left transition"
              style={isSel
                ? { borderColor: `${color}40`, background: `${color}06` }
                : { borderColor: "#CCD1C5", background: "white" }}
              onClick={() => setSelId(order.id)} type="button">
              <div className="mb-2 h-[3px] w-full rounded-full" style={{ background: dot }} />
              <p className="font-mono text-[10px] font-bold uppercase tracking-wide" style={{ color: "#102033" }}>{order.name}</p>
              <p className="mt-1.5 text-[11px] leading-snug" style={{ color: "#667085" }}>{order.products.split(",")[0]}…</p>
              <div className="mt-auto pt-2.5">
                <p className="text-[15px] font-bold tabular-nums" style={{ color: "#102033" }}>{order.value}</p>
                <StatusChip label={COCINA_LABEL[order.stage] || order.stage} color={dot} />
              </div>
            </button>
          );
        })}
      </div>
      {sel && (
        <div className="flex items-start justify-between gap-4 border-b px-5 py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
          <div className="min-w-0">
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Comanda activa</p>
            <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>{sel.name} · {sel.paymentMethod}</p>
            <p className="mt-0.5 text-[11px]" style={{ color: "#667085" }}>{sel.notes}</p>
          </div>
          <span className="shrink-0 text-[20px] font-bold tabular-nums" style={{ color: "#102033" }}>{sel.value}</span>
        </div>
      )}
    </>
  );
}

// ─── Clínica Console ──────────────────────────────────────────────────────────

function ClinicaConsole({ demo }) {
  const [selId, setSelId] = useState(demo.records[0].id);
  const sel = demo.records.find(r => r.id === selId);
  const color = APP_COLOR.clinica;

  return (
    <>
      <div className="flex items-center justify-between border-b px-5 py-2.5"
        style={{ background: `${color}08`, borderColor: "#CCD1C5" }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: color }} />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest" style={{ color }}>Agenda de hoy</span>
        </div>
        <span className="font-mono text-[11px] font-semibold" style={{ color: "#102033" }}>
          {demo.kpis.find(k => k.label === "Ingresos")?.value}
          <span className="ml-1 text-[9px] font-normal" style={{ color: "#98A2B3" }}>estimado</span>
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b px-4 py-2.5" style={{ borderColor: "#CCD1C5" }}>
        {demo.kpis.map(k => <MiniKpi key={k.label} label={k.label} value={k.value} color={color} />)}
      </div>
      <div className="grid sm:grid-cols-[1fr_1px_220px]">
        <div>
          {demo.records.map(appt => {
            const dot = statusColor(appt.status);
            const isSel = selId === appt.id;
            return (
              <button key={appt.id}
                className="grid w-full grid-cols-[58px_10px_1fr] items-start gap-3 border-b px-4 py-3 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                onClick={() => setSelId(appt.id)} type="button">
                <span className="pt-0.5 font-mono text-[12px] font-semibold tabular-nums" style={{ color: "#102033" }}>{appt.time}</span>
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
                <div>
                  <p className="text-[13px] font-semibold" style={isSel ? { color } : { color: "#102033" }}>{appt.name}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: "#667085" }}>{appt.service}</p>
                  <StatusChip label={appt.status} color={dot} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="hidden sm:block" style={{ background: "#CCD1C5" }} />
        {sel && (
          <div className="hidden flex-col gap-3 p-4 sm:flex" style={{ background: `${color}04` }}>
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Paciente</span>
              <p className="mt-1.5 text-[15px] font-semibold" style={{ color: "#102033" }}>{sel.name}</p>
              <p className="mt-0.5 text-[12px]" style={{ color }}>{sel.service}</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Hora</p>
              <p className="mt-0.5 font-mono text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{sel.time}</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Indicaciones</p>
              <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: "#667085" }}>{sel.instructions}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Operación Console ────────────────────────────────────────────────────────

function OperacionConsole({ demo }) {
  const [selId, setSelId] = useState(demo.records[0].id);
  const sel = demo.records.find(r => r.id === selId);
  const color = APP_COLOR.operacion;
  const alerts = demo.records.filter(r => r.stockAlert?.includes("ALERTA"));

  return (
    <>
      {alerts.length > 0 && (
        <div className="flex items-center gap-2.5 border-b px-5 py-2.5"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "#CCD1C5" }}>
          <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: "#F59E0B" }} />
          <p className="text-[12px] font-semibold" style={{ color: "#B45309" }}>
            {alerts.length} alerta{alerts.length > 1 ? "s" : ""} de stock
            <span className="ml-2 font-normal opacity-60">
              {alerts[0].order} · {alerts[0].stockAlert.replace("ALERTA: ", "")}
            </span>
          </p>
        </div>
      )}
      <div className="flex gap-2 overflow-x-auto border-b px-4 py-2.5" style={{ borderColor: "#CCD1C5" }}>
        {demo.kpis.map(k => <MiniKpi key={k.label} label={k.label} value={k.value} />)}
      </div>
      <div className="grid sm:grid-cols-[1fr_1px_240px]">
        <div>
          {demo.records.map(order => {
            const isLow = order.stockAlert?.includes("ALERTA");
            const dot = statusColor(order.status);
            const isSel = selId === order.id;
            return (
              <button key={order.id}
                className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                onClick={() => setSelId(order.id)} type="button">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[13px] font-semibold" style={{ color: "#102033" }}>{order.order}</p>
                    {isLow && <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#F59E0B" }} />}
                  </div>
                  <p className="truncate text-[11px]" style={{ color: "#667085" }}>{order.name} · {order.owner}</p>
                  <StockBar low={isLow} />
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13px] font-bold tabular-nums" style={{ color: "#102033" }}>{order.value}</p>
                  <StatusChip label={order.status} color={dot} />
                </div>
                <ChevR size={13} />
              </button>
            );
          })}
        </div>
        <div className="hidden sm:block" style={{ background: "#CCD1C5" }} />
        {sel && (
          <div className="hidden flex-col gap-3 p-4 sm:flex" style={{ background: `${color}03` }}>
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Pedido activo</span>
              <p className="mt-1.5 text-[15px] font-semibold" style={{ color: "#102033" }}>{sel.order}</p>
              <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{sel.name}</p>
            </div>
            <p className="text-[21px] font-bold tabular-nums" style={{ color: "#102033" }}>{sel.value}</p>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Responsable</p>
              <p className="mt-0.5 text-[13px] font-semibold" style={{ color: "#102033" }}>{sel.owner}</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Productos</p>
              <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: "#667085" }}>{sel.products}</p>
            </div>
            {sel.stockAlert?.includes("ALERTA") && (
              <div className="rounded-xl border px-3 py-2.5"
                style={{ borderColor: "rgba(245,158,11,0.30)", background: "rgba(245,158,11,0.08)" }}>
                <p className="text-[11px] font-semibold" style={{ color: "#B45309" }}>{sel.stockAlert}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const CONSOLE_TITLE = {
  crm: "CRM Simple", cocina: "Cocina / POS",
  clinica: "Clínica / Pacientes", operacion: "Control Operativo",
};
const PROBE_BTN = {
  crm: "↗ Abrir demo", cocina: "✓ Abrir demo",
  clinica: "✚ Abrir demo", operacion: "▣ Abrir demo",
};

function ActiveConsole({ appId, demo, onOpenDemo }) {
  const color = APP_COLOR[appId];
  return (
    <div className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
      <WinChrome
        title={CONSOLE_TITLE[appId]}
        right={
          <button className="rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold transition hover:opacity-70"
            style={{ color }} onClick={() => onOpenDemo(demo)} type="button">
            {PROBE_BTN[appId]}
          </button>
        }
      />
      {appId === "crm"       && <CRMConsole demo={demo} />}
      {appId === "cocina"    && <CocinaConsole demo={demo} />}
      {appId === "clinica"   && <ClinicaConsole demo={demo} />}
      {appId === "operacion" && <OperacionConsole demo={demo} />}
    </div>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: "crm",
    name: "CRM Simple",
    frase: "Ventas que no se enfrían.",
    color: "#2563EB",
    colorSoft: "#DBEAFE",
    metrics: [
      { label: "LEADS", value: "24" },
      { label: "CONVERSIÓN", value: "21%" },
      { label: "PIPELINE", value: "$87k" },
      { label: "SEGUIMIENTOS", value: "3 hoy" },
    ],
    chartType: "funnel",
    chart: [
      { label: "Leads", count: 24, pct: 100 },
      { label: "Contactados", count: 18, pct: 75 },
      { label: "Cotizados", count: 7, pct: 29 },
      { label: "Ganados", count: 5, pct: 21 },
    ],
    record: {
      tag: "LEAD CALIENTE",
      name: "Mariana López",
      sub: "CRM para equipo comercial",
      value: "$18,500",
      status: "Cotización enviada",
      next: "Llamar hoy 4:30 PM",
      extra: "Probabilidad de cierre: 72%",
    },
    action: "↗ Registrar seguimiento",
  },
  {
    id: "cocina",
    name: "Cocina / POS",
    frase: "Pedidos claros, venta diaria visible.",
    color: "#B91C1C",
    colorSoft: "#FEE2E2",
    metrics: [
      { label: "PEDIDOS HOY", value: "18" },
      { label: "VENDIDO", value: "$8.4k" },
      { label: "TICKET PROM.", value: "$214" },
      { label: "EN COCINA", value: "2" },
    ],
    chartType: "bars",
    chart: [
      { label: "10h", val: 950, max: 3100 },
      { label: "12h", val: 2200, max: 3100 },
      { label: "14h", val: 3100, max: 3100 },
      { label: "16h", val: 2150, max: 3100 },
    ],
    record: {
      tag: "COMANDA ACTIVA",
      name: "Mesa 4",
      sub: "08:12 min en cocina",
      value: "$386",
      status: "En cocina",
      next: "2 enchiladas · 1 café americano",
      extra: "Nota: sin cebolla",
    },
    action: "✓ Marcar listo",
  },
  {
    id: "clinica",
    name: "Clínica / Pacientes",
    frase: "Citas e indicaciones sin perderse en WhatsApp.",
    color: "#0F766E",
    colorSoft: "#CCFBF1",
    metrics: [
      { label: "CITAS HOY", value: "14" },
      { label: "CONFIRMADAS", value: "79%" },
      { label: "INDICACIONES PEND.", value: "4" },
      { label: "ESTIMADO", value: "$14.6k" },
    ],
    chartType: "hbars",
    chart: [
      { label: "Confirmadas", count: 11, pct: 79, alert: false },
      { label: "Pendientes", count: 3, pct: 21, alert: true },
      { label: "Ind. enviadas", count: 10, pct: 71, alert: false },
      { label: "Ind. pend.", count: 4, pct: 29, alert: true },
    ],
    record: {
      tag: "PRÓXIMA CITA",
      name: "Mariana Torres",
      sub: "Consulta inicial",
      value: "4:30 PM",
      status: "Agendada",
      next: "Indicaciones pendientes",
      extra: "Expediente: estudios previos",
    },
    action: "✚ Enviar indicaciones",
  },
  {
    id: "operacion",
    name: "Control Operativo",
    frase: "Detecta dónde se atora tu operación.",
    color: "#334155",
    colorSoft: "#E2E8F0",
    metrics: [
      { label: "PEDIDOS ABIERTOS", value: "14" },
      { label: "AVANCE", value: "82%" },
      { label: "STOCK BAJO", value: "4" },
      { label: "TAREAS PEND.", value: "9" },
    ],
    chartType: "stock",
    chart: [
      { label: "Sensores", pct: 12, alert: true },
      { label: "Kits", pct: 88, alert: false },
      { label: "Consumibles", pct: 72, alert: false },
      { label: "Empaques", pct: 45, alert: false },
    ],
    record: {
      tag: "PEDIDO ACTIVO",
      name: "Pedido #1042",
      sub: "Ferretería López",
      value: "$2,450",
      status: "Surtiendo",
      next: "Responsable: Ana · 5 sensores faltantes",
      extra: "⚠ Stock bajo detectado",
    },
    action: "▣ Resolver pedido",
  },
];

function HeroChart({ slide }) {
  if (slide.chartType === "bars") {
    const maxVal = Math.max(...slide.chart.map(d => d.val));
    return (
      <div>
        <p className="mb-2 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
          Ventas por hora
        </p>
        <div className="flex h-20 items-end gap-1.5">
          {slide.chart.map(d => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[7px]" style={{ color: "#98A2B3" }}>
                ${(d.val / 1000).toFixed(1)}k
              </span>
              <div className="w-full rounded-t-md" style={{ height: `${(d.val / maxVal) * 56}px`, background: `${slide.color}cc` }} />
              <span className="font-mono text-[7px]" style={{ color: "#98A2B3" }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (slide.chartType === "hbars") {
    return (
      <div>
        <p className="mb-2 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
          Agenda de hoy
        </p>
        <div className="flex flex-col gap-2">
          {slide.chart.map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="w-24 font-mono text-[8px]" style={{ color: d.alert ? "#B45309" : "#98A2B3" }}>
                {d.label}
              </span>
              <div className="flex-1 overflow-hidden rounded-full" style={{ background: "#E2E8F0", height: 6 }}>
                <div className="h-full rounded-full"
                  style={{ width: `${d.pct}%`, background: d.alert ? "#F59E0B" : slide.color }} />
              </div>
              <span className="w-5 font-mono text-[8px] text-right" style={{ color: "#102033" }}>{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (slide.chartType === "stock") {
    return (
      <div>
        <p className="mb-2 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
          Niveles de stock
        </p>
        <div className="flex flex-col gap-2">
          {slide.chart.map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="w-20 font-mono text-[8px]" style={{ color: d.alert ? "#B45309" : "#98A2B3" }}>
                {d.label}
              </span>
              <div className="flex-1 overflow-hidden rounded-full" style={{ background: "#E2E8F0", height: 6 }}>
                <div className="h-full rounded-full"
                  style={{ width: `${d.pct}%`, background: d.alert ? "#F59E0B" : slide.color }} />
              </div>
              <span className="w-8 font-mono text-[8px] text-right" style={{ color: d.alert ? "#B45309" : "#102033" }}>
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // funnel (CRM default)
  const funnelColors = ["#93C5FD", "#60A5FA", "#2563EB", "#22C55E"];
  return (
    <div>
      <p className="mb-2 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
        Pipeline de conversión
      </p>
      <div className="flex flex-col gap-2">
        {slide.chart.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-20 font-mono text-[8px] text-right" style={{ color: "#98A2B3" }}>{d.label}</span>
            <div className="flex-1 overflow-hidden rounded-full" style={{ background: "#E2E8F0", height: 7 }}>
              <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: funnelColors[i] }} />
            </div>
            <span className="w-4 font-mono text-[8px] font-bold" style={{ color: "#102033" }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroCarousel({ onOpenDemo }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [actionDone, setActionDone] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const slide = HERO_SLIDES[activeIdx];
  const app = APPS[activeIdx];
  const demo = demos[app.demoIdx];
  const isDone = Boolean(actionDone[activeIdx]);

  const handleAction = () => {
    setActionDone(prev => ({ ...prev, [activeIdx]: true }));
    setPaused(true);
    setTimeout(() => setPaused(false), 3000);
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Window chrome */}
      <WinChrome
        title="HazloSimple OS · App Showroom"
        right={
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#22C55E" }} />
            <span className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>4 DEMOS ACTIVAS</span>
          </div>
        }
      />

      {/* Headline */}
      <div className="border-b px-6 py-5 sm:px-8" style={{ borderColor: "#CCD1C5" }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: "#16A34A" }}>
          HazloSimple OS
        </p>
        <h1 className="mt-2 text-[26px] font-bold leading-[1.1] tracking-tight sm:text-[34px]"
          style={{ color: "#102033" }}>
          Tu negocio, convertido en app.
        </h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed" style={{ color: "#667085" }}>
          Prueba mini sistemas de ventas, cocina, clínica y operación. Cada demo muestra cómo se vería tu negocio con clientes, pedidos, citas y tareas en orden.
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
          4 demos activas · flujos tocables · datos simulados · cotización a medida
        </p>
      </div>

      {/* Tab strip + arrow controls */}
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        <div className="flex flex-1 flex-wrap gap-1.5">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide transition"
              style={i === activeIdx
                ? { background: s.color, borderColor: s.color, color: "white" }
                : { background: "white", borderColor: "#CCD1C5", color: "#667085" }}
              onClick={() => setActiveIdx(i)} type="button"
            >
              {i === activeIdx && <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.65)" }} />}
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg border transition hover:bg-white"
            style={{ borderColor: "#CCD1C5", color: "#667085" }}
            onClick={() => setActiveIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            type="button" aria-label="Anterior"
          >
            <ChevL size={14} />
          </button>
          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg border transition hover:bg-white"
            style={{ borderColor: "#CCD1C5", color: "#667085" }}
            onClick={() => setActiveIdx(i => (i + 1) % HERO_SLIDES.length)}
            type="button" aria-label="Siguiente"
          >
            <ChevR size={14} />
          </button>
        </div>
      </div>

      {/* Slide content: 2-col */}
      <div className="grid md:grid-cols-[1fr_1px_272px]">

        {/* Left: metrics + chart */}
        <div className="p-5">
          {/* Metric strip */}
          <div className="mb-4 flex flex-wrap gap-2">
            {slide.metrics.map(m => (
              <div key={m.label} className="flex flex-col rounded-xl border px-3 py-2.5 text-center"
                style={{ borderColor: "#CCD1C5", background: "#FFFDF7" }}>
                <span className="font-mono text-[7px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{m.label}</span>
                <span className="mt-0.5 text-[16px] font-bold tabular-nums" style={{ color: slide.color }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="rounded-xl border p-4" style={{ borderColor: "#CCD1C5", background: slide.colorSoft + "50" }}>
            <HeroChart slide={slide} />
          </div>

          <p className="mt-3 text-[11px] font-medium italic" style={{ color: "#667085" }}>
            {slide.frase}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* Right: live record + action */}
        <div className="flex flex-col border-t md:border-t-0" style={{ borderColor: "#CCD1C5" }}>
          <div className="flex-1 p-4">
            <div className="rounded-xl border p-4"
              style={{ borderColor: `${slide.color}28`, background: `${slide.color}04` }}>
              <span className="font-mono text-[8px] font-semibold uppercase tracking-widest"
                style={{ color: slide.color }}>
                {slide.record.tag}
              </span>
              <p className="mt-2 text-[17px] font-semibold" style={{ color: "#102033" }}>{slide.record.name}</p>
              <p className="text-[12px]" style={{ color: "#667085" }}>{slide.record.sub}</p>
              <p className="mt-1 text-[23px] font-bold tabular-nums" style={{ color: "#102033" }}>{slide.record.value}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#F59E0B" }} />
                  <span className="text-[11px]" style={{ color: "#667085" }}>{slide.record.status}</span>
                </div>
                <p className="text-[11px]" style={{ color: "#667085" }}>{slide.record.next}</p>
                <p className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>{slide.record.extra}</p>
              </div>
            </div>
          </div>

          {/* CTA area */}
          <div className="border-t p-4" style={{ borderColor: "#CCD1C5" }}>
            <button
              className="relative mb-2.5 w-full overflow-hidden rounded-xl py-2.5 text-[13px] font-semibold text-white transition disabled:cursor-default"
              disabled={isDone}
              onClick={handleAction}
              style={{
                background: isDone ? "#334155" : `linear-gradient(to bottom,${slide.color}dd,${slide.color})`,
                boxShadow: isDone ? undefined : `0 4px 14px ${slide.color}44, inset 0 1px 0 rgba(255,255,255,0.15)`,
                opacity: isDone ? 0.7 : 1,
              }}
              type="button"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {isDone ? "✓ Acción registrada" : slide.action}
            </button>
            <div className="flex gap-2">
              <button
                className="flex-1 rounded-xl border py-2 text-[11px] font-semibold transition hover:bg-white"
                style={{ borderColor: `${slide.color}30`, color: slide.color, background: `${slide.color}06` }}
                onClick={() => onOpenDemo(demo)} type="button"
              >
                Ver demo completa →
              </button>
              <a className="flex-1 rounded-xl py-2 text-center text-[11px] font-semibold text-white transition hover:opacity-85"
                href={WA} rel="noreferrer" target="_blank"
                style={{ background: "#082B4C" }}>
                Quiero esta app
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 border-t py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        {HERO_SLIDES.map((s, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} type="button" aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 20 : 6, height: 6,
              background: i === activeIdx ? s.color : "#CCD1C5",
            }} />
        ))}
      </div>
    </div>
  );
}

// ─── GiroPanel ────────────────────────────────────────────────────────────────

function GiroPanel() {
  const [sel, setSel] = useState(null);

  return (
    <div id="giros" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
        <WinChrome
          title="Selector de giro — ¿A qué giro pertenece tu negocio?"
          right={
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
              {industries.length} giros
            </span>
          }
        />

        <div className="p-5 sm:p-6">
          <p className="text-[15px] font-semibold" style={{ color: "#102033" }}>¿A qué te dedicas?</p>
          <p className="mt-1 text-[12px]" style={{ color: "#667085" }}>
            Elige tu giro para ver módulos y un ejemplo de app a tu medida.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {industries.map(ind => {
              const active = sel?.id === ind.id;
              return (
                <button key={ind.id}
                  className="rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition"
                  style={active
                    ? { background: "#2563EB", borderColor: "#2563EB", color: "white" }
                    : { borderColor: "#CCD1C5", background: "#FBFAF6", color: "#667085" }}
                  onClick={() => setSel(active ? null : ind)} type="button">
                  {ind.label}
                </button>
              );
            })}
          </div>

          {sel && (
            <div className="mt-5 overflow-hidden rounded-xl border"
              style={{ borderColor: "#CCD1C5", boxShadow: "0 12px 36px rgba(16,32,51,0.10)" }}>
              <div className="flex items-center justify-between border-b px-4 py-2.5"
                style={{ background: "linear-gradient(to bottom,#E7E8E1,#DDDFD8)", borderColor: "#CCD1C5" }}>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: "#16A34A" }} />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "#16A34A" }}>
                    {sel.label}
                  </span>
                </div>
                <button className="font-mono text-[11px] transition hover:opacity-60" style={{ color: "#98A2B3" }}
                  onClick={() => setSel(null)} type="button">✕</button>
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[14px] font-medium leading-relaxed" style={{ color: "#102033" }}>{sel.frase}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {sel.modulos.map(m => (
                      <span key={m} className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
                        style={{ borderColor: "#CCD1C5", background: "#FBFAF6", color: "#667085" }}>{m}</span>
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{sel.ejemplo}</p>
                </div>
                <div className="flex items-end">
                  <a className="inline-flex shrink-0 items-center rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white shadow-md transition hover:opacity-90"
                    href={sel.whatsapp} rel="noreferrer" target="_blank"
                    style={{
                      background: "linear-gradient(to bottom,#0a6bff,#0B5FFF)",
                      boxShadow: "0 4px 14px rgba(11,95,255,0.40), inset 0 1px 0 rgba(255,255,255,0.14)",
                    }}>
                    {sel.buttonLabel} →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HazloSimple Banner ───────────────────────────────────────────────────────

function HazloSimpleBanner() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <a className="block overflow-hidden rounded-2xl border transition"
        href="https://hazlosimple.netlify.app/" rel="noreferrer" target="_blank"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 12px 36px rgba(16,32,51,0.10)" }}>
        <WinChrome title="hazlosimple.netlify.app ↗" />
        <div className="flex items-center justify-between gap-4 px-5 py-4" style={{ background: "#FBFAF6" }}>
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-[9px]"
              style={{ background: "#082B4C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 6px rgba(8,43,76,0.25)" }}>
              <span className="font-mono text-[10px] font-bold leading-none text-white">HS</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#102033" }}>HazloSimple</p>
              <p className="text-[12px] leading-snug" style={{ color: "#667085" }}>
                Páginas web, plantillas y herramientas simples para negocios reales.
              </p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-[11px]" style={{ color: "#98A2B3" }}>hazlosimple.netlify.app ↗</span>
        </div>
      </a>
    </div>
  );
}

// ─── OS Home ──────────────────────────────────────────────────────────────────

function OsHome({ onOpenDemo }) {
  const [activeApp, setActiveApp] = useState("crm");
  const app = APPS.find(a => a.id === activeApp);
  const demo = app ? demos[app.demoIdx] : null;

  return (
    <div className="min-h-screen" style={OS_DESKTOP_STYLE}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero Carousel */}
        <div id="hero" className="mb-6">
          <HeroCarousel onOpenDemo={onOpenDemo} />
        </div>

        {/* App launcher tray */}
        <div id="launcher" className="mb-4 overflow-hidden rounded-2xl border px-6 py-5"
          style={{ borderColor: "#CCD1C5", background: "rgba(251,250,246,0.92)", boxShadow: "0 12px 36px rgba(16,32,51,0.10)" }}>
          <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em]" style={{ color: "#98A2B3" }}>
            Elige una app
          </p>
          <AppLauncher selected={activeApp} onSelect={setActiveApp} />
        </div>

        {/* Active microdemo console */}
        {demo && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: APP_COLOR[activeApp] }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: APP_COLOR[activeApp] }}>
                  {CONSOLE_TITLE[activeApp]}
                </span>
              </div>
              <button
                className="rounded-lg px-3 py-1 font-mono text-[11px] font-semibold text-white transition hover:opacity-88"
                style={{
                  background: "linear-gradient(to bottom,#5047DC,#4338CA)",
                  boxShadow: "0 2px 8px rgba(67,56,202,0.40), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
                onClick={() => onOpenDemo(demo)} type="button"
              >
                {PROBE_BTN[activeApp]}
              </button>
            </div>
            <ActiveConsole appId={activeApp} demo={demo} onOpenDemo={onOpenDemo} />
          </div>
        )}
      </div>

      <GiroPanel />
      <FAQPanel />
      <CTAFinal />
      <HazloSimpleBanner />
    </div>
  );
}

// ─── App Window (full demos) ──────────────────────────────────────────────────

function AppWindow({ children, onBack, title, badge, accentColor }) {
  return (
    <div className="min-h-screen" style={OS_DESKTOP_STYLE}>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
          <WinChrome
            onBack={onBack}
            title={title}
            right={
              badge ? (
                <span className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
                  style={accentColor
                    ? { borderColor: `${accentColor}30`, background: `${accentColor}10`, color: accentColor }
                    : { borderColor: "#CCD1C5", background: "#FBFAF6", color: "#667085" }}>
                  {badge}
                </span>
              ) : null
            }
          />
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Demo sub-components ──────────────────────────────────────────────────────

function DemoSectionLabel({ children }) {
  return (
    <div className="border-b px-5 py-2" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
      <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{children}</p>
    </div>
  );
}

function DemoField({ label, value }) {
  return (
    <div className="border-b px-5 py-3 last:border-b-0" style={{ borderColor: "#CCD1C5" }}>
      <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{label}</p>
      <p className="mt-1 text-[14px] font-medium" style={{ color: "#102033" }}>{value}</p>
    </div>
  );
}

function DemoKpiRow({ kpis, color }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
      {kpis.map(k => (
        <div key={k.label} className="shrink-0 rounded-xl border px-3.5 py-2.5 text-center"
          style={{ borderColor: "#CCD1C5", background: "#FFFDF7" }}>
          <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{k.label}</p>
          <p className="mt-0.5 text-[16px] font-semibold tabular-nums"
            style={color ? { color } : { color: "#102033" }}>{k.value}</p>
        </div>
      ))}
    </div>
  );
}

function GlossyAction({ label, completed, onAction, color }) {
  const bg = completed ? "#334155" : (color || APP_COLOR.crm);
  return (
    <div className="px-5 pb-6 pt-4">
      <button
        className="relative w-full overflow-hidden rounded-xl py-3.5 text-[14px] font-semibold text-white shadow-md transition disabled:opacity-55"
        disabled={completed}
        onClick={onAction}
        style={{
          background: `linear-gradient(to bottom,${bg}cc,${bg})`,
          boxShadow: completed ? undefined : `0 4px 16px ${bg}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
        }}
        type="button"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
        {label}
      </button>
    </div>
  );
}

// ─── Static enrichment data (demo content, no backend) ───────────────────────

const CRM_EXTRA = {
  "crm-1": { prob: 72, timeline: ["WhatsApp respondido · Ayer 3:12 PM", "Cotización enviada · Hace 2 días", "Primer contacto · Hace 5 días"] },
  "crm-2": { prob: 45, timeline: ["Dudas de alcance · Hoy 11:00 AM", "Cotización enviada · Hace 3 días", "Primer contacto · Hace 8 días"] },
  "crm-3": { prob: 20, timeline: ["Solicitud de demo · Ayer", "Formulario llenado · Hace 2 días"] },
  "crm-4": { prob: 65, timeline: ["Aprobó flujo base · Hoy", "Reunión de alcance · Hace 3 días", "Demo presentada · Hace 7 días"] },
  "crm-5": { prob: 95, timeline: ["Propuesta aprobada · Hoy", "Negociación cerrada · Hace 2 días", "Demo presentada · Hace 5 días"] },
};

const CLINICA_EXTRA = {
  "svc-1": { archivos: ["Estudios previos.pdf", "Receta mayo.pdf"], recordatorio: "Seguimiento en 7 días" },
  "svc-2": { archivos: ["Foto de avance.jpg"], recordatorio: "Llamada de seguimiento en 3 días" },
  "svc-3": { archivos: ["Formulario previo.pdf"], recordatorio: "Entregar resultados pendientes" },
  "svc-4": { archivos: ["Comprobante de pago.pdf", "Resumen sesión.pdf"], recordatorio: "Seguimiento mensual en 30 días" },
  "svc-5": { archivos: [], recordatorio: "Confirmar disponibilidad de cita" },
};

const REST_INVENTORY = [
  { item: "Pan dulce", level: 12, ok: false },
  { item: "Café americano", level: 78, ok: true },
  { item: "Agua mineral", level: 45, ok: true },
  { item: "Enchiladas congeladas", level: 8, ok: false },
];

const OPS_TASKS = [
  { id: "t1", label: "Reabastecer sensores (Pedido #1042)", owner: "Ana", priority: "Alta", done: false },
  { id: "t2", label: "Asignar ruta Pedido #1043", owner: "Luis", priority: "Media", done: false },
  { id: "t3", label: "Cerrar evidencia de entrega #1044", owner: "Mara", priority: "Baja", done: true },
  { id: "t4", label: "Aprobar y asignar Pedido #1045", owner: "Diego", priority: "Media", done: false },
];

// ─── Full Demo Views ──────────────────────────────────────────────────────────

function CRMView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [stageFilter, setStageFilter] = useState("Todos");
  const [innerView, setInnerView] = useState("list");
  const completed = Boolean(completedRecords[selectedRecord.id]);
  const color = APP_COLOR.crm;
  const filtered = stageFilter === "Todos" ? demo.records : demo.records.filter(r => r.stage === stageFilter);
  const extra = CRM_EXTRA[selectedRecord.id] || { prob: 0, timeline: [] };

  return (
    <AppWindow badge={`${demo.records.length} leads`} onBack={onBack} title="CRM Simple" accentColor={color}>
      {/* Pipeline header with frase */}
      <div className="border-b px-5 py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color }}>Pipeline activo</span>
          <span className="hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>"{demo.frase}"</span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full border" style={{ borderColor: "#CCD1C5" }}>
          {demo.stages.map((stage, i) => {
            const count = demo.records.filter(r => r.stage === stage).length;
            if (!count) return null;
            return (
              <div key={stage} className="h-full border-r border-white/20 last:border-r-0"
                style={{ width: `${(count / demo.records.length) * 100}%`, background: pipelineColor(i, demo.stages.length) }} />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Todos", ...demo.stages].map(stage => {
            const count = stage === "Todos" ? demo.records.length : demo.records.filter(r => r.stage === stage).length;
            const active = stageFilter === stage;
            return (
              <button key={stage}
                className="rounded-full border px-3 py-1 text-[11px] font-semibold transition"
                style={active
                  ? { background: color, borderColor: color, color: "white" }
                  : { background: "white", borderColor: "#CCD1C5", color: "#667085" }}
                onClick={() => setStageFilter(stage)} type="button">
                {stage} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <DemoKpiRow kpis={demo.kpis} color={color} />

      {/* Acciones de hoy */}
      <div className="border-b" style={{ borderColor: "#CCD1C5" }}>
        <div className="border-b px-5 py-1.5" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
          <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Acciones de hoy · 3 pendientes</span>
        </div>
        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#CCD1C5" }}>
          {[
            { label: "Llamar a Grupo Norte", badge: "Hoy", bc: "#F59E0B" },
            { label: "Cotización · Mariana López", badge: "Urgente", bc: "#DC2626" },
            { label: "Follow-up · Clínica S. Fe", badge: "Listo", bc: "#22C55E" },
          ].map((a, i) => (
            <div key={i} className="flex flex-col gap-1.5 px-4 py-3" style={{ borderColor: "#CCD1C5" }}>
              <span className="inline-flex w-fit rounded-full px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-wide"
                style={{ background: `${a.bc}18`, color: a.bc }}>{a.badge}</span>
              <p className="text-[11px] font-medium leading-snug" style={{ color: "#102033" }}>{a.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_296px]">
        {/* Lead list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          {filtered.map(lead => {
            const dot = statusColor(lead.status);
            const isSel = selectedRecord.id === lead.id;
            const ex = CRM_EXTRA[lead.id] || { prob: 0, timeline: [] };
            return (
              <button key={lead.id}
                className="flex w-full items-center gap-3 border-b px-5 py-3.5 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                onClick={() => { onSelectRecord(lead); setInnerView("detail"); }} type="button">
                <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: dot }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold" style={{ color: "#102033" }}>{lead.name}</p>
                  <p className="truncate text-[12px]" style={{ color: "#667085" }}>{lead.service}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wide" style={{ color: dot }}>
                    {completedRecords[lead.id] || lead.status}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{lead.value}</p>
                  <p className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>{ex.prob}% cierre</p>
                </div>
                <ChevR size={14} />
              </button>
            );
          })}
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* Detail panel */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          {/* Lead header */}
          <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: `${color}05` }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Lead activo</p>
            <p className="mt-1 text-[17px] font-semibold leading-tight" style={{ color: "#102033" }}>{selectedRecord.name}</p>
            <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{selectedRecord.service}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip label={completedRecords[selectedRecord.id] || selectedRecord.status} color={statusColor(selectedRecord.status)} />
              <span className="text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</span>
            </div>
          </div>

          {/* Probabilidad de cierre */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Prob. de cierre</p>
              <span className="font-mono text-[13px] font-bold"
                style={{ color: extra.prob >= 70 ? "#16A34A" : extra.prob >= 40 ? "#F59E0B" : "#98A2B3" }}>
                {extra.prob}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#E2E8F0" }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${extra.prob}%`, background: extra.prob >= 70 ? "#16A34A" : extra.prob >= 40 ? "#F59E0B" : "#94A3B8" }} />
            </div>
          </div>

          {/* Próxima acción */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Próxima acción</p>
            <p className="mt-1 text-[12px] font-medium" style={{ color: "#102033" }}>{selectedRecord.nextAction}</p>
          </div>

          {/* Timeline */}
          {extra.timeline.length > 0 && (
            <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
              <p className="mb-2.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Historial</p>
              <div className="flex flex-col gap-2.5">
                {extra.timeline.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: i === 0 ? color : "#CCD1C5" }} />
                    <p className="text-[11px] leading-snug" style={{ color: i === 0 ? "#102033" : "#98A2B3" }}>{ev}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notas */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
            <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition disabled:opacity-55"
              disabled={completed} onClick={onAction}
              style={{
                background: completed ? "#334155" : `linear-gradient(to bottom,${color}cc,${color})`,
                boxShadow: completed ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {completed ? "↗ Seguimiento registrado" : "↗ Registrar seguimiento"}
            </button>
            <a href={WA} rel="noreferrer" target="_blank"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-semibold transition hover:bg-white"
              style={{ borderColor: `${color}30`, color, background: `${color}05` }}>
              ↗ Seguimiento por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Módulos activos: Pipeline / Recordatorios / Reportes */}
      <div className="border-t" style={{ borderColor: "#CCD1C5" }}>
        <div className="border-b px-5 py-1.5" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
          <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Módulos activos</span>
        </div>
        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#CCD1C5" }}>
          {[
            { label: "Pipeline", value: demo.kpis.find(k => k.label === "Venta estimada")?.value ?? "$87k", sub: `${demo.stages.length} etapas activas`, icon: "↗" },
            { label: "Recordatorios", value: "3", sub: "seguimientos pendientes hoy", icon: "△" },
            { label: "Reportes", value: "21%", sub: "tasa de conversión actual", icon: "#" },
          ].map((m, i) => (
            <div key={m.label} className="flex flex-col px-4 py-3.5" style={{ borderColor: "#CCD1C5", background: "#F9F9F5" }}>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-[11px]">{m.icon}</span>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-wider" style={{ color: "#667085" }}>{m.label}</p>
              </div>
              <p className="text-[18px] font-bold tabular-nums" style={{ color }}>{m.value}</p>
              <p className="mt-0.5 text-[10px]" style={{ color: "#98A2B3" }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

function RestaurantView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [stageFilter, setStageFilter] = useState("En preparación");
  const [innerView, setInnerView] = useState("list");
  const completed = Boolean(completedRecords[selectedRecord.id]);
  const color = APP_COLOR.cocina;
  const filtered = demo.records.filter(r => r.stage === stageFilter);

  return (
    <AppWindow badge={`${demo.records.length} pedidos`} onBack={onBack} title="Cocina / POS" accentColor={color}>
      {/* Stage tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b px-5 py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        {demo.stages.map(stage => {
          const count = demo.records.filter(r => r.stage === stage).length;
          const active = stageFilter === stage;
          return (
            <button key={stage}
              className="rounded-full border px-3 py-1.5 text-[11px] font-semibold transition"
              style={active
                ? { background: color, borderColor: color, color: "white" }
                : { background: "white", borderColor: "#CCD1C5", color: "#667085" }}
              onClick={() => setStageFilter(stage)} type="button">
              {COCINA_LABEL[stage] || stage} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
        <span className="ml-auto hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>{demo.frase}</span>
      </div>

      <DemoKpiRow kpis={demo.kpis} color={color} />

      <div className="grid md:grid-cols-[1fr_1px_280px]">
        {/* Order cards — tablero 2×2 siempre visible */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <div className="border-b px-5 py-1.5" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
            <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
              Tablero de comandas · {demo.records.length} pedidos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3">
            {demo.records.map(order => {
              const dot = statusColor(order.status);
              const isSel = selectedRecord.id === order.id;
              const isActive = stageFilter === "Todos" || order.stage === stageFilter;
              return (
                <button key={order.id}
                  className="flex flex-col rounded-xl border p-3 text-left transition"
                  style={isSel
                    ? { borderColor: `${color}50`, background: `${color}08`, boxShadow: `0 0 0 2px ${color}22` }
                    : { borderColor: "#CCD1C5", background: isActive ? "white" : "#F9F9F5", opacity: isActive ? 1 : 0.65 }}
                  onClick={() => { onSelectRecord(order); setInnerView("detail"); }} type="button">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wide" style={{ color: "#102033" }}>{order.name}</p>
                    <div className="h-2 w-2 rounded-full" style={{ background: dot }} />
                  </div>
                  <p className="flex-1 text-[10px] leading-snug" style={{ color: "#667085" }}>
                    {order.products.split(",").slice(0, 2).join(",")}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{order.value}</span>
                    <StatusChip label={completedRecords[order.id] || (COCINA_LABEL[order.stage] || order.stage)} color={dot} />
                  </div>
                  <p className="mt-1 font-mono text-[8px]" style={{ color: "#98A2B3" }}>{order.paymentMethod}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* Comanda detail */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5", background: `${color}05` }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Comanda activa</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="font-mono text-[15px] font-bold uppercase" style={{ color: "#102033" }}>{selectedRecord.name}</p>
              <p className="text-[20px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</p>
            </div>
            <StatusChip label={completedRecords[selectedRecord.id] || selectedRecord.status} color={statusColor(selectedRecord.status)} />
          </div>
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Productos</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#102033" }}>{selectedRecord.products}</p>
          </div>
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Nota de cocina</p>
            <p className="mt-1 text-[12px]" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
          </div>
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Método de pago</p>
            <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.paymentMethod}</p>
          </div>
          <div className="px-5 pb-5 pt-4">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition disabled:opacity-55"
              disabled={completed} onClick={onAction}
              style={{
                background: completed ? "#334155" : `linear-gradient(to bottom,${color}cc,${color})`,
                boxShadow: completed ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {completed ? "✓ Pedido listo" : "✓ Marcar listo"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: corte del día + inventario básico */}
      <div className="grid border-t sm:grid-cols-2" style={{ borderColor: "#CCD1C5" }}>
        <div className="border-b p-4 sm:border-b-0 sm:border-r" style={{ borderColor: "#CCD1C5", background: "#F9F9F5" }}>
          <p className="mb-3 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Corte del día</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {demo.kpis.map(k => (
              <div key={k.label} className="flex flex-col">
                <span className="font-mono text-[7px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{k.label}</span>
                <span className="mt-0.5 text-[15px] font-bold tabular-nums" style={{ color }}>{k.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4" style={{ background: "#F9F9F5" }}>
          <p className="mb-3 font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Inventario básico</p>
          <div className="flex flex-col gap-2">
            {REST_INVENTORY.map(it => (
              <div key={it.item} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: it.ok ? "#22C55E" : "#F59E0B" }} />
                <span className="flex-1 text-[11px]" style={{ color: "#667085" }}>{it.item}</span>
                <div className="flex h-1.5 w-14 overflow-hidden rounded-full" style={{ background: "#E2E8F0" }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${it.level}%`, background: it.ok ? "#22C55E" : "#F59E0B" }} />
                </div>
                <span className="w-6 font-mono text-[8px] tabular-nums" style={{ color: "#98A2B3" }}>{it.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

function AgendaView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [innerView, setInnerView] = useState("list");
  const [activeTab, setActiveTab] = useState("datos");
  const completed = Boolean(completedRecords[selectedRecord.id]);
  const color = APP_COLOR.clinica;
  const extra = CLINICA_EXTRA[selectedRecord.id] || { archivos: [], recordatorio: "" };

  const TABS = [
    { id: "datos", label: "Datos" },
    { id: "indicaciones", label: "Indicaciones" },
    { id: "archivos", label: "Archivos" },
    { id: "seguimiento", label: "Seguimiento" },
  ];

  return (
    <AppWindow badge="hoy" onBack={onBack} title="Clínica · Agenda / Pacientes" accentColor={color}>
      {/* Frase + header */}
      <div className="flex items-center justify-between border-b px-5 py-2.5"
        style={{ background: `${color}08`, borderColor: "#CCD1C5" }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: color }} />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest" style={{ color }}>Agenda de hoy</span>
        </div>
        <span className="hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>{demo.frase}</span>
      </div>

      <DemoKpiRow kpis={demo.kpis} color={color} />

      <div className="grid md:grid-cols-[1fr_1px_304px]">
        {/* Agenda list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <DemoSectionLabel>Citas del día · {demo.records.length} total</DemoSectionLabel>
          {demo.records.map(appt => {
            const dot = statusColor(appt.status);
            const isSel = selectedRecord.id === appt.id;
            return (
              <button key={appt.id}
                className="grid w-full grid-cols-[64px_12px_1fr] items-start gap-3 border-b px-5 py-3.5 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                onClick={() => { onSelectRecord(appt); setInnerView("detail"); setActiveTab("datos"); }} type="button">
                <span className="pt-0.5 font-mono text-[12px] font-semibold tabular-nums" style={{ color: "#102033" }}>{appt.time}</span>
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
                <div>
                  <p className="text-[14px] font-semibold" style={isSel ? { color } : { color: "#102033" }}>{appt.name}</p>
                  <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{appt.service}</p>
                  <StatusChip label={completedRecords[appt.id] || appt.status} color={dot} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* Patient ficha with tabs */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          {/* Patient header */}
          <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: `${color}05` }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Paciente</p>
            <p className="mt-1 text-[17px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.name}</p>
            <p className="text-[12px]" style={{ color }}>{selectedRecord.service}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip label={completedRecords[selectedRecord.id] || selectedRecord.status} color={statusColor(selectedRecord.status)} />
              <span className="font-mono text-[16px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.time}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "#CCD1C5", background: "#F0F1EC" }}>
            {TABS.map(tab => (
              <button key={tab.id}
                className="flex-1 py-3 font-mono text-[9px] font-bold uppercase tracking-wider transition"
                style={activeTab === tab.id
                  ? { color, borderBottom: `2.5px solid ${color}`, background: "white", boxShadow: `0 -2px 0 0 ${color}22 inset` }
                  : { color: "#667085", borderBottom: "2.5px solid transparent", background: "transparent" }}
                onClick={() => setActiveTab(tab.id)} type="button">
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Datos */}
          {activeTab === "datos" && (
            <div className="flex flex-col">
              <div className="grid grid-cols-2 border-b" style={{ borderColor: "#CCD1C5" }}>
                <div className="border-r px-4 py-3" style={{ borderColor: "#CCD1C5" }}>
                  <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Valor de cita</p>
                  <p className="mt-0.5 text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Hora</p>
                  <p className="mt-0.5 font-mono text-[15px] font-bold tabular-nums" style={{ color }}>{selectedRecord.time}</p>
                </div>
              </div>
              <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
                <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
              </div>
              <div className="border-b px-5 py-2.5" style={{ borderColor: "#CCD1C5" }}>
                <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Próxima acción</p>
                <p className="mt-0.5 text-[12px] font-medium" style={{ color: "#102033" }}>{selectedRecord.nextAction}</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5" style={{ background: `${color}06` }}>
                <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>Ver también:</span>
                {["Indicaciones", "Archivos", "Seguimiento"].map(t => (
                  <button key={t}
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[8px] font-semibold transition hover:opacity-80"
                    style={{ borderColor: `${color}30`, color, background: `${color}0a` }}
                    onClick={() => setActiveTab(t.toLowerCase())} type="button">{t}</button>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Indicaciones */}
          {activeTab === "indicaciones" && (
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="rounded-xl border p-4" style={{ borderColor: `${color}30`, background: `${color}05` }}>
                <p className="mb-1 font-mono text-[8px] uppercase tracking-wider" style={{ color }}>Indicaciones</p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#102033" }}>{selectedRecord.instructions}</p>
              </div>
              <button
                className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition disabled:opacity-55"
                disabled={completed} onClick={onAction}
                style={{
                  background: completed ? "#334155" : `linear-gradient(to bottom,${color}cc,${color})`,
                  boxShadow: completed ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
                }} type="button">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
                {completed ? "✚ Indicaciones enviadas" : "✚ Enviar indicaciones"}
              </button>
            </div>
          )}

          {/* Tab: Archivos */}
          {activeTab === "archivos" && (
            <div className="px-5 py-4">
              <p className="mb-3 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Archivos del paciente</p>
              {extra.archivos.length === 0 ? (
                <p className="text-[12px]" style={{ color: "#98A2B3" }}>Sin archivos cargados.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {extra.archivos.map(f => (
                    <div key={f} className="flex items-center gap-3 rounded-xl border px-4 py-3"
                      style={{ borderColor: "#CCD1C5", background: "#F9F9F5" }}>
                      <span className="font-mono text-[11px] font-bold" style={{ color }}>▣</span>
                      <span className="text-[12px] font-medium" style={{ color: "#102033" }}>{f}</span>
                    </div>
                  ))}
                  <p className="mt-1 font-mono text-[9px]" style={{ color: "#98A2B3" }}>
                    Archivos simulados · en la app real se suben desde el celular
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Seguimiento */}
          {activeTab === "seguimiento" && (
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="rounded-xl border px-4 py-3.5" style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: "#102033" }}>{extra.recordatorio}</p>
                    <p className="mt-1 font-mono text-[9px]" style={{ color: "#98A2B3" }}>Para: {selectedRecord.name}</p>
                  </div>
                </div>
              </div>
              <a href={WA} rel="noreferrer" target="_blank"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-semibold transition hover:bg-white"
                style={{ borderColor: `${color}30`, color, background: `${color}05` }}>
                Enviar recordatorio por WhatsApp
              </a>
            </div>
          )}

          {/* Primary action always visible (except when it's shown inside a tab) */}
          {activeTab !== "indicaciones" && (
            <div className="mt-auto border-t px-5 pb-4 pt-3" style={{ borderColor: "#CCD1C5" }}>
              <button
                className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
                disabled={completed} onClick={onAction}
                style={{
                  background: completed
                    ? `linear-gradient(to bottom,${color}88,${color}99)`
                    : `linear-gradient(to bottom,${color}dd,${color})`,
                  boxShadow: completed ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.16)`,
                  opacity: completed ? 0.7 : 1,
                }} type="button">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
                {completed ? "✚ Indicaciones enviadas" : "✚ Enviar indicaciones"}
              </button>
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
}

function OperationsView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [innerView, setInnerView] = useState("list");
  const completed = Boolean(completedRecords[selectedRecord.id]);
  const color = APP_COLOR.operacion;
  const alerts = demo.records.filter(r => r.stockAlert?.includes("ALERTA"));

  return (
    <AppWindow
      badge={alerts.length > 0 ? `${alerts.length} alerta${alerts.length > 1 ? "s" : ""}` : undefined}
      onBack={onBack} title="Control Operativo" accentColor="#F59E0B"
    >
      {/* Alert banner + frase */}
      {alerts.length > 0 && (
        <div className="flex items-center justify-between gap-3 border-b px-5 py-2.5"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "#CCD1C5" }}>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: "#F59E0B" }} />
            <p className="text-[12px] font-semibold" style={{ color: "#B45309" }}>
              {alerts.length} alerta{alerts.length > 1 ? "s" : ""} de stock
              <span className="ml-2 font-normal opacity-60">
                {alerts[0].order} — {alerts[0].stockAlert.replace("ALERTA: ", "")}
              </span>
            </p>
          </div>
          <span className="hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>{demo.frase}</span>
        </div>
      )}

      <DemoKpiRow kpis={demo.kpis} />

      {/* Tareas urgentes inline */}
      <div className="border-b" style={{ borderColor: "#CCD1C5" }}>
        <div className="border-b px-5 py-1.5" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
          <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
            Tareas urgentes · {OPS_TASKS.filter(t => !t.done && t.priority === "Alta").length} altas
          </span>
        </div>
        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "#CCD1C5" }}>
          {OPS_TASKS.filter(t => !t.done).slice(0, 2).map((task, i) => (
            <div key={task.id} className="flex items-start gap-2.5 px-4 py-3" style={{ borderColor: "#CCD1C5" }}>
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border"
                style={{ borderColor: "#CCD1C5", background: "white" }} />
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-snug" style={{ color: "#102033" }}>{task.label}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>{task.owner}</span>
                  <span className="rounded-full px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase"
                    style={{
                      background: task.priority === "Alta" ? "rgba(220,38,38,0.10)" : "rgba(245,158,11,0.10)",
                      color: task.priority === "Alta" ? "#DC2626" : "#B45309",
                    }}>{task.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_284px]">
        {/* Orders list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <DemoSectionLabel>Pedidos abiertos · {demo.records.length}</DemoSectionLabel>
          {demo.records.map(order => {
            const isLow = order.stockAlert?.includes("ALERTA");
            const dot = statusColor(order.status);
            const isSel = selectedRecord.id === order.id;
            return (
              <button key={order.id}
                className="flex w-full items-center gap-3 border-b px-5 py-3.5 text-left transition last:border-b-0"
                style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                onClick={() => { onSelectRecord(order); setInnerView("detail"); }} type="button">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[14px] font-semibold" style={{ color: "#102033" }}>{order.order}</p>
                    {isLow && <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#F59E0B" }} />}
                  </div>
                  <p className="text-[12px]" style={{ color: "#667085" }}>{order.name} · {order.owner}</p>
                  <StockBar low={isLow} />
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{order.value}</p>
                  <StatusChip label={completedRecords[order.id] || order.status} color={dot} />
                </div>
                <ChevR size={14} />
              </button>
            );
          })}
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* Detail panel */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color: "#102033" }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          {/* Order header */}
          <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: `${color}04` }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Pedido activo</p>
            <p className="mt-1 text-[17px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.order}</p>
            <p className="text-[12px]" style={{ color: "#667085" }}>{selectedRecord.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip label={completedRecords[selectedRecord.id] || selectedRecord.status} color={statusColor(selectedRecord.status)} />
              <span className="text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</span>
            </div>
          </div>

          {/* Responsable + sucursal */}
          <div className="grid grid-cols-2 border-b" style={{ borderColor: "#CCD1C5" }}>
            <div className="border-r px-4 py-3" style={{ borderColor: "#CCD1C5" }}>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Responsable</p>
              <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.owner}</p>
            </div>
            <div className="px-4 py-3">
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Sucursal</p>
              <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>Central</p>
            </div>
          </div>

          {/* Productos */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Productos</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.products}</p>
          </div>

          {/* Stock alert */}
          {selectedRecord.stockAlert?.includes("ALERTA") && (
            <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
              <p className="mb-1.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Alerta de stock</p>
              <div className="rounded-xl border px-3 py-2.5"
                style={{ borderColor: "rgba(245,158,11,0.30)", background: "rgba(245,158,11,0.08)" }}>
                <p className="text-[12px] font-semibold" style={{ color: "#B45309" }}>{selectedRecord.stockAlert}</p>
              </div>
            </div>
          )}

          {/* Actividad reciente */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="mb-2.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Actividad reciente</p>
            <div className="flex flex-col gap-2">
              {[
                { ev: `Pedido asignado a ${selectedRecord.owner}`, t: "Hoy 9:00 AM" },
                { ev: "Stock verificado en bodega", t: "Ayer 4:30 PM" },
                { ev: "Pedido aprobado por admin", t: "Hace 2 días" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: i === 0 ? "#F59E0B" : "#CCD1C5" }} />
                  <div>
                    <p className="text-[11px]" style={{ color: i === 0 ? "#102033" : "#98A2B3" }}>{a.ev}</p>
                    <p className="font-mono text-[9px]" style={{ color: "#CCD1C5" }}>{a.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes + action */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
          </div>
          <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
              disabled={completed} onClick={onAction}
              style={{
                background: completed
                  ? "linear-gradient(to bottom,#33415599,#334155bb)"
                  : selectedRecord.stockAlert?.includes("ALERTA")
                    ? "linear-gradient(to bottom,#D97706cc,#D97706)"
                    : "linear-gradient(to bottom,#082B4Cdd,#082B4C)",
                boxShadow: completed ? undefined
                  : selectedRecord.stockAlert?.includes("ALERTA")
                    ? "0 4px 16px rgba(217,119,6,0.40), inset 0 1px 0 rgba(255,255,255,0.14)"
                    : "0 4px 16px rgba(8,43,76,0.35), inset 0 1px 0 rgba(255,255,255,0.14)",
                opacity: completed ? 0.7 : 1,
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {completed ? "▣ Estado actualizado"
                : selectedRecord.stockAlert?.includes("ALERTA") ? "▣ Resolver alerta"
                : "▣ Actualizar estado"}
            </button>
            <a href={WA} rel="noreferrer" target="_blank"
              className="flex w-full items-center justify-center rounded-xl border py-2.5 text-[12px] font-semibold transition hover:bg-white"
              style={{ borderColor: "#CCD1C5", color: "#334155" }}>
              Escalar por WhatsApp →
            </a>
          </div>
        </div>
      </div>

      {/* Tareas del equipo */}
      <div className="border-t" style={{ borderColor: "#CCD1C5" }}>
        <div className="border-b px-5 py-2.5" style={{ background: "#F6F7F1", borderColor: "#CCD1C5" }}>
          <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
            Tareas del equipo · {OPS_TASKS.filter(t => !t.done).length} pendientes
          </p>
        </div>
        <div className="grid sm:grid-cols-2">
          {OPS_TASKS.map((task, i) => (
            <div key={task.id}
              className={`flex items-start gap-3 border-b px-5 py-3 ${i % 2 === 0 ? "sm:border-r" : ""} ${i >= OPS_TASKS.length - 2 ? "sm:border-b-0" : ""}`}
              style={{ borderColor: "#CCD1C5", background: task.done ? "#F6F7F1" : "white" }}>
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border"
                style={{
                  borderColor: task.done ? "#22C55E" : "#CCD1C5",
                  background: task.done ? "#22C55E" : "white",
                }}>
                {task.done && <span className="text-[8px] font-bold text-white">✓</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium leading-snug"
                  style={{ color: task.done ? "#98A2B3" : "#102033", textDecoration: task.done ? "line-through" : undefined }}>
                  {task.label}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>{task.owner}</span>
                  <span className="rounded-full px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase"
                    style={{
                      background: task.priority === "Alta" ? "rgba(220,38,38,0.1)" : task.priority === "Media" ? "rgba(245,158,11,0.1)" : "rgba(148,163,184,0.1)",
                      color: task.priority === "Alta" ? "#DC2626" : task.priority === "Media" ? "#B45309" : "#94A3B8",
                    }}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "¿Es una app de verdad o solo una página?",
    a: "Es una app web: funciona desde navegador, se puede abrir en celular, compartir por link y guardar como acceso directo. Si necesitas publicarla en App Store o Play Store, se cotiza aparte."
  },
  {
    q: "¿La app se adapta a mi negocio?",
    a: "Sí. Partimos de una base según tu giro: clínica, restaurante, CRM, operación, despacho, tienda o servicios. Después ajustamos módulos, textos, colores y flujo."
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. La idea de HazloSimple es que puedas usarla como una herramienta de trabajo: clientes, citas, pedidos, tareas, archivos, reportes o seguimientos."
  },
  {
    q: "¿Qué incluye una app sencilla?",
    a: "Una pantalla principal, módulos según tu negocio, diseño responsive, datos de ejemplo, botones de contacto y una estructura clara para mostrar cómo operaría tu negocio."
  },
  {
    q: "¿Tiene login, base de datos o pagos?",
    a: "Puede tenerlos, pero no todos los proyectos los necesitan desde el inicio. Primero hacemos una versión simple para validar el flujo. Funciones avanzadas se cotizan aparte."
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance. Una demo sirve para visualizar tu idea; una app real se cotiza según módulos, usuarios, datos, automatizaciones e integraciones."
  },
  {
    q: "¿Puedo recibir pedidos, citas o solicitudes por WhatsApp?",
    a: "Sí. Podemos conectar botones y flujos para que el cliente mande información por WhatsApp. Automatizaciones avanzadas se cotizan según necesidad."
  },
  {
    q: "¿Se puede conectar con facturación, pagos o sistemas externos?",
    a: "Sí, pero eso ya entra como integración personalizada y requiere revisar proveedor, API, permisos y costo."
  },
];

function FAQPanel() {
  const [open, setOpen] = useState(null);
  return (
    <div id="dudas" className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
        <WinChrome
          title="Dudas antes de pedir tu app"
          right={
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
              {FAQ_ITEMS.length} preguntas
            </span>
          }
        />
        <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
          <p className="text-[13px] leading-relaxed" style={{ color: "#667085" }}>
            Sin tecnicismos. Esto es lo que normalmente pregunta un negocio antes de cotizar.
          </p>
        </div>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="border-b last:border-b-0" style={{ borderColor: "#CCD1C5" }}>
            <button
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-black/[0.02] focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)} type="button">
              <p className="text-[13px] font-semibold leading-snug" style={{ color: "#102033" }}>
                {item.q}
              </p>
              <span className="mt-0.5 shrink-0 font-mono text-[12px] transition-transform duration-200"
                style={{ color: "#98A2B3", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                +
              </span>
            </button>
            {open === i && (
              <div className="border-t px-5 pb-4 pt-3" style={{ borderColor: "#CCD1C5", background: "#F9F9F5" }}>
                <p className="text-[13px] leading-relaxed" style={{ color: "#667085" }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────────────────

function CTAFinal() {
  return (
    <div id="cta" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
        <WinChrome title="¿Listo para convertir tu negocio en app?" />
        <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: "#16A34A" }}>
            HazloSimple · Apps para negocios reales
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-[24px] font-bold leading-[1.15] tracking-tight sm:text-[30px]"
            style={{ color: "#102033" }}>
            ¿Quieres ver tu negocio convertido en app?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed" style={{ color: "#667085" }}>
            Cuéntame tu giro y te digo qué módulos tendría sentido construir primero.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={WA} rel="noreferrer" target="_blank"
              className="relative w-full overflow-hidden rounded-xl px-6 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90 sm:w-auto"
              style={{
                background: "linear-gradient(to bottom,#082B4C,#0a3a60)",
                boxShadow: "0 4px 18px rgba(8,43,76,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/10" />
              Quiero mi app →
            </a>
            <button
              className="w-full rounded-xl border px-6 py-3.5 text-[14px] font-semibold transition hover:bg-black/5 sm:w-auto"
              style={{ borderColor: "#CCD1C5", color: "#102033" }}
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              type="button">
              Ver demos
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {[
              ["✓", "Sin backend"],
              ["✓", "Sin login complicado"],
              ["✓", "Sin tecnicismos"],
              ["✓", "Con WhatsApp"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] font-bold" style={{ color: "#16A34A" }}>{icon}</span>
                <span className="font-mono text-[10px]" style={{ color: "#98A2B3" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

function DemoSurface(props) {
  const { demo } = props;
  if (demo.id === "crm-simple")            return <CRMView {...props} />;
  if (demo.id === "restaurante-cafeteria") return <RestaurantView {...props} />;
  if (demo.id === "servicios-web-app")     return <AgendaView {...props} />;
  return <OperationsView {...props} />;
}

function App() {
  const [view, setView] = useState("home");
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [completedRecords, setCompletedRecords] = useState({});
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  const openDemo = (demo) => {
    setSelectedDemo(demo);
    setSelectedRecord(demo.records[0]);
    setView("demo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setView("home");
    setSelectedDemo(null);
    setSelectedRecord(null);
  };

  const handleNavigate = (sectionId) => {
    const scrollTo = () =>
      requestAnimationFrame(() =>
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      );
    if (view !== "home") {
      setView("home");
      setSelectedDemo(null);
      setSelectedRecord(null);
      setTimeout(scrollTo, 80);
    } else {
      scrollTo();
    }
  };

  const completeAction = () => {
    if (!selectedDemo || !selectedRecord) return;
    setCompletedRecords(cur => ({ ...cur, [selectedRecord.id]: selectedDemo.completedStatus }));
    showToast(selectedDemo.toast);
  };

  return (
    <div className="min-h-screen" style={{ color: "#102033" }}>
      <SystemBar onHome={goHome} onNavigate={handleNavigate} />
      {view === "home" && <OsHome onOpenDemo={openDemo} />}
      {view === "demo" && selectedDemo && selectedRecord && (
        <DemoSurface
          completedRecords={completedRecords}
          demo={selectedDemo}
          onAction={completeAction}
          onBack={goHome}
          onSelectRecord={setSelectedRecord}
          selectedRecord={selectedRecord}
        />
      )}
      <Toast message={toast} />
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message }) {
  if (!message) return null;
  return (
    <div aria-live="polite" className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4" role="status">
      <div className="flex items-center gap-2.5 rounded-2xl px-5 py-3"
        style={{
          background: "#102033",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.20)",
        }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: TL.green }} />
        <p className="text-[13px] font-semibold text-white">{message}</p>
      </div>
    </div>
  );
}

export default App;
