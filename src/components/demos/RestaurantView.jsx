import { useState } from "react";
import { APP_COLOR, SUBROW_BG, COCINA_LABEL, statusColor } from "../../tokens";
import AppWindow from "../os/AppWindow";
import { ChevL } from "../ui/Icons";
import StatusChip from "../ui/StatusChip";
import DemoKpiRow from "../ui/DemoKpiRow";

const WA_BASE = "https://wa.me/522213619628?text=";

const REST_INVENTORY = [
  { item: "Pan dulce", level: 12, ok: false },
  { item: "Café americano", level: 78, ok: true },
  { item: "Agua mineral", level: 45, ok: true },
  { item: "Enchiladas congeladas", level: 8, ok: false },
];

export default function RestaurantView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [stageFilter, setStageFilter] = useState("En preparación");
  const [innerView, setInnerView] = useState("list");
  const [localStages, setLocalStages] = useState(
    () => Object.fromEntries(demo.records.map(r => [r.id, r.stage]))
  );
  const [localActivity, setLocalActivity] = useState({});

  const color = APP_COLOR.cocina;

  const getStage = (order) => localStages[order.id] || order.stage;
  const currentStage = getStage(selectedRecord);
  const isAlreadyListo = currentStage === "Listo" || currentStage === "Entregado";
  const isMarkedListo = Boolean(completedRecords[selectedRecord.id]) || isAlreadyListo;

  const stageCount = (stage) => demo.records.filter(r => getStage(r) === stage).length;
  const orderActivity = localActivity[selectedRecord.id] || [];

  const handleStageFilter = (stage) => {
    setStageFilter(stage);
    const newFiltered = demo.records.filter(r => getStage(r) === stage);
    if (newFiltered.length > 0 && !newFiltered.find(r => r.id === selectedRecord.id)) {
      onSelectRecord(newFiltered[0]);
    }
  };

  const handleMarkListo = () => {
    if (isAlreadyListo || completedRecords[selectedRecord.id]) return;
    setLocalStages(p => ({ ...p, [selectedRecord.id]: "Listo" }));
    setLocalActivity(p => ({
      ...p,
      [selectedRecord.id]: [
        { ev: `${selectedRecord.name} marcada como lista`, t: "Ahora" },
        ...(p[selectedRecord.id] || []),
      ],
    }));
    onAction();
  };

  const waOrder = `${WA_BASE}${encodeURIComponent(`${selectedRecord.name} — su pedido por ${selectedRecord.value} está listo para recoger. Gracias.`)}`;

  return (
    <AppWindow badge={`${demo.records.length} pedidos`} onBack={onBack} title="Cocina / POS" accentColor={color}>
      <div className="flex flex-wrap items-center gap-2 border-b px-5 py-3" style={{ ...SUBROW_BG, borderColor: "#CCD1C5" }}>
        {demo.stages.map(stage => {
          const count = stageCount(stage);
          const active = stageFilter === stage;
          return (
            <button key={stage}
              className="rounded-full border px-3 py-1.5 text-[11px] font-semibold transition"
              style={active
                ? { background: color, borderColor: color, color: "white" }
                : { background: "white", borderColor: "#CCD1C5", color: "#667085" }}
              onClick={() => handleStageFilter(stage)} type="button">
              {COCINA_LABEL[stage] || stage} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
        <span className="ml-auto hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>{demo.frase}</span>
      </div>

      <DemoKpiRow kpis={demo.kpis} color={color} />

      <div className="grid md:grid-cols-[1fr_1px_280px]">
        {/* LEFT — Order grid */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <div className="border-b px-5 py-1.5" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
            <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
              Tablero de comandas · {demo.records.length} pedidos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3">
            {demo.records.map(order => {
              const stage = getStage(order);
              const dot = statusColor(order.status);
              const isSel = selectedRecord.id === order.id;
              const isActive = stageFilter === "Todos" || stage === stageFilter;
              const displayLabel = COCINA_LABEL[stage] || stage;
              return (
                <button key={order.id}
                  className="flex flex-col rounded-xl border p-3 text-left transition"
                  style={isSel
                    ? { borderColor: `${color}50`, background: `${color}08`, boxShadow: `0 0 0 2px ${color}22` }
                    : { borderColor: "#CCD1C5", background: isActive ? "white" : "#F9F9F5", opacity: isActive ? 1 : 0.55 }}
                  onClick={() => { onSelectRecord(order); setInnerView("detail"); }} type="button">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wide" style={{ color: "#102033" }}>{order.name}</p>
                    <div className="h-2 w-2 rounded-full"
                      style={{ background: stage === "Listo" || stage === "Entregado" ? "#16A34A" : dot }} />
                  </div>
                  <p className="flex-1 text-[10px] leading-snug" style={{ color: "#667085" }}>
                    {order.products.split(",").slice(0, 2).join(",")}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{order.value}</span>
                    <StatusChip
                      label={completedRecords[order.id] || displayLabel}
                      color={stage === "Listo" || stage === "Entregado" ? "#16A34A" : dot}
                    />
                  </div>
                  <p className="mt-1 font-mono text-[8px]" style={{ color: "#98A2B3" }}>{order.paymentMethod}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* RIGHT — Comanda detail */}
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
            <StatusChip
              label={completedRecords[selectedRecord.id] || (COCINA_LABEL[currentStage] || currentStage)}
              color={isAlreadyListo ? "#16A34A" : statusColor(selectedRecord.status)}
            />
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

          {orderActivity.length > 0 && (
            <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
              <p className="mb-2 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Actividad</p>
              <div className="flex flex-col gap-2">
                {orderActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#16A34A" }} />
                    <p className="text-[11px]" style={{ color: "#102033" }}>
                      {a.ev} <span style={{ color: "#98A2B3" }}>· {a.t}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
              disabled={isMarkedListo} onClick={handleMarkListo}
              style={{
                background: isMarkedListo ? "#334155" : `linear-gradient(to bottom,${color}cc,${color})`,
                boxShadow: isMarkedListo ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
                opacity: isMarkedListo ? 0.65 : 1,
                cursor: isMarkedListo ? "default" : "pointer",
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {isMarkedListo ? "✓ Pedido listo" : "✓ Marcar listo"}
            </button>
            <a href={waOrder} rel="noreferrer" target="_blank"
              className="flex w-full items-center justify-center rounded-xl border py-2 text-[12px] font-semibold transition hover:bg-white"
              style={{ borderColor: `${color}30`, color, background: `${color}05` }}>
              Avisar por WhatsApp →
            </a>
          </div>
        </div>
      </div>

      {/* Corte del día + inventario */}
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
