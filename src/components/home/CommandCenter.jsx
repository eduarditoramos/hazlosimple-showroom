import { useState } from "react";
import { WA, APP_COLOR } from "../../tokens";
import WinChrome from "../os/WinChrome";

const CC_APPS = [
  {
    id: "crm",
    glyph: "C",
    label: "CRM Simple",
    chaos: "Prospectos sin seguimiento",
    metrics: [
      { label: "Leads", value: "24" },
      { label: "Conversión", value: "21%" },
      { label: "Pipeline", value: "$87k" },
      { label: "Hoy", value: "3 seguim." },
    ],
    chartType: "funnel",
    chart: [
      { label: "Leads", count: 24, pct: 100 },
      { label: "Contactados", count: 18, pct: 75 },
      { label: "Cotizados", count: 7, pct: 29 },
      { label: "Ganados", count: 5, pct: 21 },
    ],
    flow: ["Leads", "Contactados", "Cotizados", "Ganados"],
    activeFlow: 1,
    record: {
      tag: "LEAD CALIENTE",
      name: "Mariana López",
      sub: "CRM para equipo comercial",
      value: "$18,500",
      status: "Cotización enviada",
      statusColor: "#F59E0B",
      next: "Llamar hoy 4:30 PM",
      extra: "72% probabilidad de cierre",
    },
    action: "↗ Registrar seguimiento",
    demoIdx: 0,
  },
  {
    id: "cocina",
    glyph: "Co",
    label: "Cocina / POS",
    chaos: "Pedidos, cocina y cobros sin orden",
    metrics: [
      { label: "Pedidos hoy", value: "18" },
      { label: "Vendido", value: "$8.4k" },
      { label: "Ticket prom.", value: "$214" },
      { label: "En cocina", value: "2" },
    ],
    chartType: "vbars",
    chart: [
      { label: "10h", val: 950, max: 3100 },
      { label: "12h", val: 2200, max: 3100 },
      { label: "14h", val: 3100, max: 3100 },
      { label: "16h", val: 2150, max: 3100 },
    ],
    flow: ["Nuevo", "Cocina", "Listo", "Entregado"],
    activeFlow: 1,
    record: {
      tag: "COMANDA ACTIVA",
      name: "Mesa 4",
      sub: "08:12 min en cocina",
      value: "$386",
      status: "En cocina",
      statusColor: "#F59E0B",
      next: "2 enchiladas · 1 café americano",
      extra: "Nota: sin cebolla",
    },
    action: "✓ Marcar listo",
    demoIdx: 1,
  },
  {
    id: "clinica",
    glyph: "+",
    label: "Clínica / Pacientes",
    chaos: "Citas, expedientes e indicaciones dispersas",
    metrics: [
      { label: "Citas hoy", value: "14" },
      { label: "Confirmadas", value: "79%" },
      { label: "Ind. pend.", value: "4" },
      { label: "Estimado", value: "$14.6k" },
    ],
    chartType: "hbars",
    chart: [
      { label: "Confirmadas", pct: 79, alert: false },
      { label: "Pendientes", pct: 21, alert: true },
      { label: "Ind. enviadas", pct: 71, alert: false },
      { label: "Ind. pend.", pct: 29, alert: true },
    ],
    flow: ["Agenda", "Consulta", "Indicaciones", "Seguimiento"],
    activeFlow: 2,
    record: {
      tag: "PRÓXIMA CITA",
      name: "Mariana Torres",
      sub: "Consulta inicial",
      value: "4:30 PM",
      status: "Indicaciones pendientes",
      statusColor: "#F59E0B",
      next: "Expediente abierto",
      extra: "Estudios previos disponibles",
    },
    action: "✚ Enviar indicaciones",
    demoIdx: 2,
  },
  {
    id: "operacion",
    glyph: "Op",
    label: "Control Operativo",
    chaos: "Pedidos, stock y responsables sin control",
    metrics: [
      { label: "Pedidos abiertos", value: "14" },
      { label: "Avance", value: "82%" },
      { label: "Stock bajo", value: "4" },
      { label: "Tareas pend.", value: "9" },
    ],
    chartType: "stock",
    chart: [
      { label: "Sensores", pct: 12, alert: true },
      { label: "Kits", pct: 88, alert: false },
      { label: "Consumibles", pct: 72, alert: false },
      { label: "Empaques", pct: 45, alert: false },
    ],
    flow: ["Pedido", "Responsable", "Stock", "Entrega"],
    activeFlow: 2,
    record: {
      tag: "PEDIDO ACTIVO",
      name: "Pedido #1042",
      sub: "Ferretería López",
      value: "$2,450",
      status: "Surtiendo",
      statusColor: "#F59E0B",
      next: "Ana responsable · 5 sensores faltantes",
      extra: "Alerta: stock bajo detectado",
    },
    action: "▣ Resolver pedido",
    demoIdx: 3,
  },
];

function MiniChart({ app }) {
  const color = APP_COLOR[app.id];

  if (app.chartType === "funnel") {
    return (
      <div className="flex flex-col gap-2">
        {app.chart.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className="w-20 text-right text-[10px]" style={{ color: "#98A2B3" }}>{d.label}</span>
            <div className="flex-1 overflow-hidden rounded-full" style={{ background: "#EEF0EA", height: 7 }}>
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${d.pct}%`,
                  background: i === app.chart.length - 1 ? "#16A34A" : `${color}${i === 0 ? "ff" : i === 1 ? "cc" : "88"}`,
                }} />
            </div>
            <span className="w-5 text-right text-[11px] font-bold tabular-nums" style={{ color: "#102033" }}>{d.count}</span>
          </div>
        ))}
      </div>
    );
  }

  if (app.chartType === "vbars") {
    const maxVal = Math.max(...app.chart.map(d => d.val));
    return (
      <div className="flex h-[90px] items-end gap-2">
        {app.chart.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t-md transition-all"
              style={{
                height: `${Math.round((d.val / maxVal) * 70)}px`,
                background: d.val === maxVal ? color : `${color}66`,
              }} />
            <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>{d.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (app.chartType === "hbars" || app.chartType === "stock") {
    return (
      <div className="flex flex-col gap-2.5">
        {app.chart.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-20 text-right text-[10px]" style={{ color: d.alert ? "#B45309" : "#98A2B3" }}>
              {d.label}
            </span>
            <div className="flex-1 overflow-hidden rounded-full" style={{ background: "#EEF0EA", height: 6 }}>
              <div className="h-full rounded-full"
                style={{ width: `${d.pct}%`, background: d.alert ? "#F59E0B" : color }} />
            </div>
            <span className="w-8 text-right font-mono text-[9px] tabular-nums"
              style={{ color: d.alert ? "#B45309" : "#667085" }}>
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function CommandCenter({ demos, onOpenDemo }) {
  const [activeId, setActiveId] = useState("crm");
  const [actionDone, setActionDone] = useState({});

  const app = CC_APPS.find(a => a.id === activeId);
  const color = APP_COLOR[activeId];
  const demo = demos[app.demoIdx];
  const isDone = Boolean(actionDone[activeId]);

  const handleAction = () => {
    setActionDone(prev => ({ ...prev, [activeId]: true }));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div id="apps" className="overflow-hidden rounded-[28px] border"
      style={{ borderColor: "rgba(155,163,145,0.58)", background: "linear-gradient(180deg,#FFFDF7,#F7F8F2)", boxShadow: "0 34px 100px rgba(16,32,51,0.20), inset 0 1px 0 rgba(255,255,255,0.90)" }}>

      {/* Window chrome */}
      <WinChrome
        title="HazloSimple OS · Command Center"
        right={
          <button
            className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-88"
            style={{
              background: `linear-gradient(to bottom,${color}dd,${color})`,
              boxShadow: `0 2px 8px ${color}44, inset 0 1px 0 rgba(255,255,255,0.16)`,
            }}
            onClick={() => onOpenDemo(demo)} type="button"
          >
            {app.action.split(" ")[0]} Abrir demo
          </button>
        }
      />

      {/* 3-col layout */}
      <div className="grid gap-3 p-3 md:grid-cols-[176px_1fr_238px]">

        {/* LEFT — App dock (navy) */}
        <div className="overflow-hidden rounded-2xl" style={{ background: "#082B4C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
          <div className="border-b px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#475569" }}>
              Apps
            </span>
          </div>
          {CC_APPS.map((a) => {
            const c = APP_COLOR[a.id];
            const active = activeId === a.id;
            const glyphSize = a.glyph.length > 1 ? "text-[10px] font-extrabold" : "text-[14px] font-bold";
            return (
              <button
                key={a.id}
                className="flex w-full items-center gap-3 px-3 py-3.5 text-left transition"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: active ? "rgba(255,255,255,0.07)" : "transparent",
                  boxShadow: active ? "inset 3px 0 0 #16A34A" : undefined,
                }}
                onClick={() => setActiveId(a.id)} type="button"
              >
                {/* Icon */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: active ? c : "rgba(255,255,255,0.06)",
                    boxShadow: active ? `0 2px 10px ${c}55` : undefined,
                  }}>
                  <span className={`leading-none ${glyphSize}`} style={{ color: active ? "white" : c }}>
                    {a.glyph}
                  </span>
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold leading-tight"
                    style={{ color: active ? "white" : "#94A3B8" }}>
                    {a.label}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] leading-tight" style={{ color: "#475569" }}>
                    {a.chaos}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Bottom stat: key metric of active app */}
          <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="font-mono text-[7px] uppercase tracking-widest" style={{ color: "#475569" }}>
              {app.metrics[0].label}
            </p>
            <p className="mt-1 text-[24px] font-bold tabular-nums leading-none" style={{ color }}>
              {app.metrics[0].value}
            </p>
          </div>
        </div>

        {/* CENTER — Metrics + chart + flow */}
        <div className="rounded-2xl border p-3" style={{ borderColor: "#E0E4DA", background: "#FFFFFF", boxShadow: "0 12px 34px rgba(16,32,51,0.08)" }}>

          {/* Chaos label */}
          <div className="rounded-xl px-4 py-2.5" style={{ background: `${color}08` }}>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
              <span className="text-[11px] font-semibold" style={{ color }}>
                {app.chaos}
              </span>
            </div>
          </div>

          {/* KPI grid */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {app.metrics.map((m, i) => (
              <div
                key={m.label}
                className="flex flex-col rounded-xl px-4 py-3"
                style={{ background: "#F4F6EF", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.74)" }}>
                <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>
                  {m.label}
                </span>
                <span className="mt-1 text-[26px] font-bold leading-none tabular-nums" style={{ color: "#102033" }}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="mt-3 rounded-xl px-4 py-4" style={{ background: "#F8F9F3" }}>
            <p className="mb-3 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>
              {app.chartType === "funnel" ? "Pipeline de conversión"
                : app.chartType === "vbars" ? "Ventas por hora"
                : app.chartType === "hbars" ? "Agenda de hoy"
                : "Niveles de stock"}
            </p>
            <MiniChart app={app} />
          </div>

          {/* Flow pipeline */}
          <div className="mt-3 rounded-xl px-4 py-4" style={{ background: "#F8F9F3" }}>
            <p className="mb-2.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>
              Flujo operativo
            </p>
            <div className="flex items-center gap-0">
              {app.flow.map((step, i) => {
                const isActive = i === app.activeFlow;
                const isDone = i < app.activeFlow;
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{
                          background: isActive ? color : isDone ? "#16A34A" : "#E8EAE3",
                          boxShadow: isActive ? `0 0 0 3px ${color}28` : undefined,
                        }}>
                        {isDone
                          ? <span className="text-[9px] font-bold text-white">✓</span>
                          : <span className="text-[9px] font-bold"
                              style={{ color: isActive ? "white" : "#98A2B3" }}>{i + 1}</span>
                        }
                      </div>
                      <span className="mt-1.5 text-center text-[10px] font-medium"
                        style={{ color: isActive ? color : isDone ? "#16A34A" : "#98A2B3" }}>
                        {step}
                      </span>
                    </div>
                    {i < app.flow.length - 1 && (
                      <div className="mb-4 h-px w-6"
                        style={{ background: i < app.activeFlow ? "#16A34A" : "#CCD1C5" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — Live record + action */}
        <div className="flex flex-col overflow-hidden rounded-2xl border" style={{ borderColor: "#E0E4DA", background: "#FFFFFF", boxShadow: "0 12px 34px rgba(16,32,51,0.08)" }}>

          {/* Record header */}
          <div className="border-b px-5 py-3" style={{ borderColor: "#E0E4DA", background: "#F6F7F2" }}>
            <span className="font-mono text-[8px] font-semibold uppercase tracking-widest" style={{ color }}>
              {app.record.tag}
            </span>
          </div>

          {/* Record body */}
          <div className="flex-1 p-4">
            <div className="rounded-xl border p-4"
              style={{ borderColor: `${color}28`, background: `${color}05` }}>
              <p className="text-[16px] font-bold leading-tight" style={{ color: "#102033" }}>
                {app.record.name}
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{app.record.sub}</p>
              <p className="mt-3 text-[28px] font-black tabular-nums leading-none" style={{ color: "#102033" }}>
                {app.record.value}
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#F59E0B" }} />
                  <span className="text-[12px] font-semibold" style={{ color: "#102033" }}>
                    {app.record.status}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#CBD5E1" }} />
                  <span className="text-[11px] leading-snug" style={{ color: "#667085" }}>{app.record.next}</span>
                </div>
                <p className="font-mono text-[9px]" style={{ color: "#94A3B8" }}>{app.record.extra}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "#CCD1C5" }}>
            <button
              className="relative mb-2.5 w-full overflow-hidden rounded-xl py-2.5 text-[13px] font-semibold text-white transition"
              disabled={isDone}
              onClick={handleAction}
              style={{
                background: isDone
                  ? "#334155"
                  : `linear-gradient(to bottom, ${color}dd, ${color})`,
                boxShadow: isDone ? undefined : `0 4px 14px ${color}44, inset 0 1px 0 rgba(255,255,255,0.16)`,
                opacity: isDone ? 0.65 : 1,
                cursor: isDone ? "default" : "pointer",
              }}
              type="button"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {isDone ? "✓ Acción registrada" : app.action}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="rounded-xl border py-2 text-[11px] font-semibold transition hover:bg-white"
                style={{ borderColor: `${color}30`, color, background: `${color}06` }}
                onClick={() => onOpenDemo(demo)} type="button"
              >
                Ver demo →
              </button>
              <a
                className="rounded-xl py-2 text-center text-[11px] font-semibold text-white transition hover:opacity-85"
                href={WA} rel="noreferrer" target="_blank"
                style={{ background: "#082B4C" }}
              >
                Quiero esta app
              </a>
            </div>
            <button
              className="mt-2 w-full rounded-xl border py-2 text-[11px] font-semibold transition hover:bg-white"
              onClick={() => scrollToSection("demos")}
              style={{ borderColor: "#CCD1C5", color: "#334155", background: "#FBFAF6" }}
              type="button"
            >
              Ver todas las apps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
