import { useState, useEffect, useRef } from "react";
import { WA, SUBROW_BG } from "../../tokens";
import WinChrome from "../os/WinChrome";
import { ChevL, ChevR } from "../ui/Icons";
import { APPS } from "./AppLauncher";

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

export default function HeroCarousel({ demos, onOpenDemo }) {
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
      <WinChrome
        title="HazloSimple OS · App Showroom"
        right={
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#22C55E" }} />
            <span className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>4 DEMOS ACTIVAS</span>
          </div>
        }
      />

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

      <div className="grid md:grid-cols-[1fr_1px_272px]">
        <div className="p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {slide.metrics.map(m => (
              <div key={m.label} className="flex flex-col rounded-xl border px-3 py-2.5 text-center"
                style={{ borderColor: "#CCD1C5", background: "#FFFDF7" }}>
                <span className="font-mono text-[7px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{m.label}</span>
                <span className="mt-0.5 text-[16px] font-bold tabular-nums" style={{ color: slide.color }}>{m.value}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "#CCD1C5", background: slide.colorSoft + "50" }}>
            <HeroChart slide={slide} />
          </div>
          <p className="mt-3 text-[11px] font-medium italic" style={{ color: "#667085" }}>
            {slide.frase}
          </p>
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

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
