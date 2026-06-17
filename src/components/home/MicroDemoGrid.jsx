import { useMemo, useState } from "react";
import { APP_COLOR } from "../../tokens";

const MICRO_APPS = [
  {
    id: "crm",
    demoIdx: 0,
    name: "CRM Simple",
    subtitle: "Ventas, leads y seguimiento",
    glyph: "C",
    kpis: [
      { value: "24", label: "Leads" },
      { value: "21%", label: "Conversion" },
      { value: "$87k", label: "Pipeline" },
    ],
    bars: [100, 75, 42, 21],
    flow: ["Lead", "Contacto", "Cotizado", "Cierre"],
    record: "Mariana Lopez · Cotizacion enviada",
    meta: "72% cierre",
    action: "Registrar seguimiento",
    done: "Seguimiento registrado",
  },
  {
    id: "cocina",
    demoIdx: 1,
    name: "Cocina / POS",
    subtitle: "Pedidos, cocina y ventas",
    glyph: "Co",
    kpis: [
      { value: "18", label: "Pedidos" },
      { value: "$8.4k", label: "Ventas" },
      { value: "2", label: "En cocina" },
    ],
    flow: ["Nuevo", "Cocina", "Listo", "Entregado"],
    record: "Mesa 4 · 08:12 min · $386",
    meta: "En cocina",
    action: "Marcar listo",
    done: "Listo",
  },
  {
    id: "clinica",
    demoIdx: 2,
    name: "Clinica",
    subtitle: "Agenda, pacientes e indicaciones",
    glyph: "+",
    kpis: [
      { value: "14", label: "Citas" },
      { value: "79%", label: "Confirmadas" },
      { value: "4", label: "Pendientes" },
    ],
    hours: [
      { time: "09", pct: 38 },
      { time: "11", pct: 62 },
      { time: "16", pct: 88 },
      { time: "18", pct: 48 },
    ],
    record: "Mariana Torres · 4:30 PM",
    meta: "Pendiente",
    action: "Enviar indicaciones",
    done: "Indicaciones enviadas",
  },
  {
    id: "operacion",
    demoIdx: 3,
    name: "Control Operativo",
    subtitle: "Pedidos, stock y tareas",
    glyph: "Op",
    kpis: [
      { value: "14", label: "Pedidos" },
      { value: "82%", label: "Avance" },
      { value: "4", label: "Stock bajo" },
    ],
    progress: [
      { label: "Pedidos", pct: 82 },
      { label: "Stock", pct: 34 },
      { label: "Tareas", pct: 68 },
    ],
    record: "Pedido #1042 · Ferreteria Lopez",
    meta: "Faltan 5 sensores",
    action: "Resolver pedido",
    done: "Pedido resuelto",
  },
];

function AppIcon({ app, color }) {
  return (
    <div
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
      style={{
        background: `linear-gradient(145deg, ${color}18, ${color}08)`,
        border: `1px solid ${color}24`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.68), 0 6px 16px ${color}10`,
      }}
    >
      <span className="text-[12px] font-black" style={{ color }}>
        {app.glyph}
      </span>
    </div>
  );
}

function KpiRow({ app, done }) {
  const kpis = app.id === "cocina" && done
    ? app.kpis.map((kpi) => kpi.label === "En cocina" ? { ...kpi, value: "1" } : kpi)
    : app.id === "clinica" && done
      ? app.kpis.map((kpi) => kpi.label === "Pendientes" ? { ...kpi, value: "3" } : kpi)
    : app.kpis;

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="rounded-lg px-2 py-2" style={{ background: "#F3F5EE" }}>
          <p className="text-[15px] font-black leading-none tabular-nums" style={{ color: "#102033" }}>
            {kpi.value}
          </p>
          <p className="mt-1 truncate text-[9px] font-medium leading-none" style={{ color: "#667085" }}>
            {kpi.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function CrmVisual({ app, color, done }) {
  return (
    <div className="space-y-2">
      {app.bars.map((pct, index) => (
        <div key={app.flow[index]} className="grid grid-cols-[62px_1fr_24px] items-center gap-2">
          <span className="text-[10px] font-medium" style={{ color: "#667085" }}>{app.flow[index]}</span>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: "#E5E8DF" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${index === 3 && done ? 34 : pct}%`, background: index === 3 ? "#16A34A" : color }}
            />
          </div>
          <span className="text-right font-mono text-[9px]" style={{ color: "#98A2B3" }}>{pct}</span>
        </div>
      ))}
    </div>
  );
}

function FlowVisual({ app, color, done }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {app.flow.map((step, index) => {
        const active = index <= (done ? 2 : 1);
        return (
          <div key={step} className="rounded-lg px-1.5 py-2 text-center" style={{ background: active ? `${color}12` : "#ECEFE7" }}>
            <div className="mx-auto h-1.5 w-7 rounded-full" style={{ background: active ? color : "#B8BFB0" }} />
            <p className="mt-1.5 truncate text-[9px] font-semibold" style={{ color: active ? color : "#667085" }}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ClinicVisual({ app, color }) {
  return (
    <div className="flex h-20 items-end gap-2">
      {app.hours.map((slot, index) => (
        <div key={slot.time} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-lg"
            style={{
              height: `${slot.pct}%`,
              background: index === 2 ? color : `${color}52`,
            }}
          />
          <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>{slot.time}h</span>
        </div>
      ))}
    </div>
  );
}

function OpsVisual({ app, color, done }) {
  return (
    <div className="space-y-2.5">
      {app.progress.map((item) => {
        const pct = done && item.label === "Stock" ? 58 : item.pct;
        return (
          <div key={item.label} className="grid grid-cols-[48px_1fr_28px] items-center gap-2">
            <span className="text-[10px] font-medium" style={{ color: "#667085" }}>{item.label}</span>
            <div className="h-2 overflow-hidden rounded-full" style={{ background: "#E5E8DF" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: item.label === "Stock" && !done ? "#D97706" : color }} />
            </div>
            <span className="text-right font-mono text-[9px]" style={{ color: "#98A2B3" }}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

function MiniVisual({ app, color, done }) {
  if (app.id === "crm") return <CrmVisual app={app} color={color} done={done} />;
  if (app.id === "cocina") return <FlowVisual app={app} color={color} done={done} />;
  if (app.id === "clinica") return <ClinicVisual app={app} color={color} />;
  return <OpsVisual app={app} color={color} done={done} />;
}

export default function MicroDemoGrid({ demos, onOpenDemo }) {
  const [doneMap, setDoneMap] = useState({});

  const apps = useMemo(
    () => MICRO_APPS.map((app) => ({ ...app, demo: demos[app.demoIdx] })).filter((app) => app.demo),
    [demos]
  );

  return (
    <section id="demos" className="mx-auto w-full max-w-6xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <div
        className="rounded-[26px] border px-4 py-5 shadow-[0_24px_80px_rgba(16,32,51,0.14)] sm:px-5 sm:py-6"
        style={{
          borderColor: "rgba(155,163,145,0.55)",
          background: "linear-gradient(180deg, rgba(255,253,247,0.98), rgba(246,247,242,0.96))",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "#667085" }}>
            MINI APPS PARA NEGOCIOS REALES
          </p>
          <h2 className="mt-2 text-[24px] font-black tracking-tight sm:text-[30px]" style={{ color: "#082B4C" }}>
            Prueba mini apps reales para tu negocio.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed" style={{ color: "#667085" }}>
            Ventas, pedidos, citas y tareas funcionando en una sola experiencia.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {apps.map((app) => {
            const done = Boolean(doneMap[app.id]);
            const color = APP_COLOR[app.id];

            return (
              <article
                key={app.id}
                className="flex min-h-[332px] min-w-0 flex-col rounded-[20px] border p-3.5"
                style={{
                  borderColor: `${color}20`,
                  background: "linear-gradient(180deg,#FFFFFF,#FAFAF6)",
                  boxShadow: "0 14px 34px rgba(16,32,51,0.09), inset 0 1px 0 rgba(255,255,255,0.86)",
                }}
              >
                <div className="flex items-start gap-3">
                  <AppIcon app={app} color={color} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[16px] font-black leading-tight" style={{ color: "#102033" }}>{app.name}</h3>
                    <p className="mt-0.5 text-[11px] leading-snug" style={{ color: "#667085" }}>{app.subtitle}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <KpiRow app={app} done={done} />
                </div>

                <div
                  className="mt-3 rounded-2xl border p-3"
                  style={{
                    borderColor: "#E0E4DA",
                    background: "linear-gradient(180deg,#F8F9F3,#EEF1E9)",
                  }}
                >
                  <MiniVisual app={app} color={color} done={done} />
                </div>

                <div
                  className="mt-3 rounded-2xl border px-3 py-2.5"
                  style={{ borderColor: "#E0E4DA", background: "#FFFDF7" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em]" style={{ color: "#98A2B3" }}>
                        Registro vivo
                      </p>
                      <p className="mt-1 truncate text-[12px] font-bold" style={{ color: "#102033" }}>
                        {app.record}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-1 text-[9px] font-bold"
                      style={{
                        background: done ? "#DCFCE7" : app.id === "operacion" || app.id === "cocina" || app.id === "clinica" ? "#FEF3C7" : `${color}12`,
                        color: done ? "#166534" : app.id === "operacion" || app.id === "cocina" || app.id === "clinica" ? "#92400E" : color,
                      }}
                    >
                      {done ? app.done : app.meta}
                    </span>
                  </div>
                  {app.id === "clinica" && done && (
                    <div
                      className="mt-2 rounded-lg px-2 py-1.5 text-[11px] font-bold"
                      style={{ background: `${color}10`, color }}
                    >
                      Indicaciones enviadas · Ahora
                    </div>
                  )}
                </div>

                <div className="mt-auto grid grid-cols-1 gap-2 pt-3">
                  <button
                    className="rounded-xl px-3 py-2.5 text-[12px] font-black text-white transition hover:opacity-90"
                    onClick={() => setDoneMap((cur) => ({ ...cur, [app.id]: true }))}
                    style={{
                      background: app.id === "operacion" ? "#102033" : `linear-gradient(180deg,${color}ee,${color})`,
                      boxShadow: app.id === "operacion" ? "0 8px 18px rgba(16,32,51,0.20)" : `0 8px 18px ${color}28`,
                    }}
                    type="button"
                  >
                    {done ? app.done : app.action}
                  </button>
                  <button
                    className="rounded-xl border px-3 py-2.5 text-[12px] font-bold transition hover:bg-white"
                    onClick={() => onOpenDemo(app.demo)}
                    style={{ borderColor: `${color}30`, color, background: `${color}08` }}
                    type="button"
                  >
                    Abrir demo
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
