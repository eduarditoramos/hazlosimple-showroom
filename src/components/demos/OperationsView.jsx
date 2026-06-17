import { useState } from "react";
import { APP_COLOR, statusColor } from "../../tokens";
import AppWindow from "../os/AppWindow";
import { ChevL, ChevR } from "../ui/Icons";
import StatusChip from "../ui/StatusChip";
import StockBar from "../ui/StockBar";
import DemoKpiRow from "../ui/DemoKpiRow";
import DemoSectionLabel from "../ui/DemoSectionLabel";

const WA_BASE = "https://wa.me/522213619628?text=";

const INITIAL_TASKS = [
  { id: "t1", label: "Reabastecer sensores (Pedido #1042)", owner: "Ana", priority: "Alta", done: false },
  { id: "t2", label: "Asignar ruta Pedido #1043", owner: "Luis", priority: "Media", done: false },
  { id: "t3", label: "Cerrar evidencia de entrega #1044", owner: "Mara", priority: "Baja", done: true },
  { id: "t4", label: "Aprobar y asignar Pedido #1045", owner: "Diego", priority: "Media", done: false },
];

export default function OperationsView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [innerView, setInnerView] = useState("list");
  const [localTasks, setLocalTasks] = useState(INITIAL_TASKS);
  const [localActivity, setLocalActivity] = useState({});
  const [resolvedAlerts, setResolvedAlerts] = useState({});

  const color = APP_COLOR.operacion;

  const isAlertActive = (order) =>
    Boolean(order.stockAlert?.includes("ALERTA")) && !resolvedAlerts[order.id];

  const alerts = demo.records.filter(r => isAlertActive(r));
  const isResolved = Boolean(resolvedAlerts[selectedRecord.id]) || Boolean(completedRecords[selectedRecord.id]);
  const currentAlert = isAlertActive(selectedRecord);

  const orderActivity = localActivity[selectedRecord.id] || [];
  const allActivity = [
    ...orderActivity,
    { ev: `Pedido asignado a ${selectedRecord.owner}`, t: "Hoy 9:00 AM" },
    { ev: "Stock verificado en bodega", t: "Ayer 4:30 PM" },
    { ev: "Pedido aprobado por admin", t: "Hace 2 días" },
  ];

  const pendingTasks = localTasks.filter(t => !t.done).length;

  const toggleTask = (taskId) => {
    const task = localTasks.find(t => t.id === taskId);
    if (!task) return;
    const newDone = !task.done;
    setLocalTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: newDone } : t));
    setLocalActivity(p => ({
      ...p,
      [selectedRecord.id]: [
        { ev: `${task.label.slice(0, 38)}… ${newDone ? "completada" : "reabierta"}`, t: "Ahora" },
        ...(p[selectedRecord.id] || []),
      ],
    }));
  };

  const handleResolve = () => {
    if (isResolved) return;
    setResolvedAlerts(p => ({ ...p, [selectedRecord.id]: true }));
    setLocalActivity(p => ({
      ...p,
      [selectedRecord.id]: [
        { ev: `${currentAlert ? "Alerta resuelta" : "Estado actualizado"} · ${selectedRecord.order}`, t: "Ahora" },
        ...(p[selectedRecord.id] || []),
      ],
    }));
    onAction();
  };

  const waOrder = `${WA_BASE}${encodeURIComponent(`${selectedRecord.order} asignado a ${selectedRecord.owner} — favor de confirmar recepción y avance del pedido.`)}`;

  return (
    <AppWindow
      badge={alerts.length > 0 ? `${alerts.length} alerta${alerts.length > 1 ? "s" : ""}` : undefined}
      onBack={onBack} title="Control Operativo" accentColor={color}
    >
      {alerts.length > 0 && (
        <div className="flex items-center justify-between gap-3 border-b px-5 py-2.5"
          style={{ background: "rgba(245,158,11,0.07)", borderColor: "#E0E4DA" }}>
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
            Tareas urgentes · {localTasks.filter(t => !t.done && t.priority === "Alta").length} altas
          </span>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2" style={{ background: "#F6F7F1" }}>
          {localTasks.filter(t => !t.done).slice(0, 2).map((task) => (
            <div key={task.id} className="flex items-start gap-2.5 rounded-2xl border px-4 py-3" style={{ borderColor: "#E0E4DA", background: "#FFFFFF", boxShadow: "0 8px 20px rgba(16,32,51,0.045)" }}>
              <button
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                style={{ borderColor: "#CCD1C5", background: "white" }}
                onClick={() => toggleTask(task.id)} type="button"
              />
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
        {/* LEFT — Order list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <DemoSectionLabel>Pedidos abiertos · {demo.records.length}</DemoSectionLabel>
          <div className="space-y-2 p-3">
          {demo.records.map(order => {
            const isLow = isAlertActive(order);
            const dot = statusColor(order.status);
            const isSel = selectedRecord.id === order.id;
            return (
              <button key={order.id}
                className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition"
                style={isSel
                  ? { borderColor: `${color}38`, background: `${color}07`, boxShadow: `0 10px 28px ${color}12` }
                  : { borderColor: isLow ? "rgba(245,158,11,0.28)" : "#E0E4DA", background: "#FFFFFF", boxShadow: "0 8px 20px rgba(16,32,51,0.045)" }}
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
                  <StatusChip
                    label={resolvedAlerts[order.id] ? "Resuelto" : (completedRecords[order.id] || order.status)}
                    color={resolvedAlerts[order.id] ? "#16A34A" : dot}
                  />
                </div>
                <ChevR size={14} />
              </button>
            );
          })}
          </div>
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* RIGHT — Order detail */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color: "#102033" }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          <div className="m-3 rounded-2xl border px-5 py-4" style={{ borderColor: `${color}22`, background: `linear-gradient(180deg,${color}07,#FFFFFF)`, boxShadow: "0 12px 30px rgba(16,32,51,0.07)" }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Pedido activo</p>
            <p className="mt-1 text-[17px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.order}</p>
            <p className="text-[12px]" style={{ color: "#667085" }}>{selectedRecord.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip
                label={isResolved ? "Resuelto" : (completedRecords[selectedRecord.id] || selectedRecord.status)}
                color={isResolved ? "#16A34A" : statusColor(selectedRecord.status)}
              />
              <span className="text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</span>
            </div>
          </div>

          <div className="mx-3 mb-3 grid overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: "#E0E4DA", background: "#FFFFFF" }}>
            <div className="border-r px-4 py-3" style={{ borderColor: "#E0E4DA" }}>
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Responsable</p>
              <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.owner}</p>
            </div>
            <div className="px-4 py-3">
              <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Sucursal</p>
              <p className="mt-1 text-[13px] font-semibold" style={{ color: "#102033" }}>Central</p>
            </div>
          </div>

          <div className="mx-3 mb-3 rounded-2xl border px-5 py-3" style={{ borderColor: "#E0E4DA", background: "#FAFAF6" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Productos</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.products}</p>
          </div>

          {currentAlert && !isResolved && (
            <div className="mx-3 mb-3 rounded-2xl border px-5 py-3" style={{ borderColor: "rgba(245,158,11,0.22)", background: "rgba(245,158,11,0.04)" }}>
              <p className="mb-1.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Alerta de stock</p>
              <div className="rounded-xl border px-3 py-2.5"
                style={{ borderColor: "rgba(245,158,11,0.30)", background: "rgba(245,158,11,0.08)" }}>
                <p className="text-[12px] font-semibold" style={{ color: "#B45309" }}>{selectedRecord.stockAlert}</p>
              </div>
            </div>
          )}

          {isResolved && (
            <div className="mx-3 mb-3 rounded-2xl border px-5 py-3" style={{ borderColor: "#16A34A30", background: "#16A34A06" }}>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                style={{ borderColor: "#16A34A30", background: "#16A34A08" }}>
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#16A34A" }} />
                <p className="text-[12px] font-semibold" style={{ color: "#16A34A" }}>Alerta resuelta · Ahora</p>
              </div>
            </div>
          )}

          <div className="mx-3 mb-3 rounded-2xl border px-5 py-3" style={{ borderColor: "#E0E4DA", background: "#FFFFFF" }}>
            <p className="mb-2.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Actividad reciente</p>
            <div className="flex flex-col gap-2">
              {allActivity.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: i === 0 && orderActivity.length > 0 ? "#16A34A" : i === 0 ? "#F59E0B" : "#CCD1C5" }} />
                  <div>
                    <p className="text-[11px]" style={{ color: i < 2 ? "#102033" : "#98A2B3" }}>{a.ev}</p>
                    <p className="font-mono text-[9px]" style={{ color: "#CCD1C5" }}>{a.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 px-5 pb-5 pt-2">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
              disabled={isResolved} onClick={handleResolve}
              style={{
                background: isResolved
                  ? "linear-gradient(to bottom,#33415599,#334155bb)"
                  : "linear-gradient(to bottom,#334155,#102033)",
                boxShadow: isResolved ? undefined
                  : "0 4px 16px rgba(16,32,51,0.35), inset 0 1px 0 rgba(255,255,255,0.14)",
                opacity: isResolved ? 0.7 : 1,
                cursor: isResolved ? "default" : "pointer",
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {isResolved ? "▣ Estado actualizado"
                : currentAlert ? "▣ Resolver alerta"
                : "▣ Actualizar estado"}
            </button>
            <a href={waOrder} rel="noreferrer" target="_blank"
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
            Tareas del equipo · {pendingTasks} pendientes
          </p>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2" style={{ background: "#F6F7F1" }}>
          {localTasks.map((task, i) => (
            <div key={task.id}
              className="flex items-start gap-3 rounded-2xl border px-4 py-3"
              style={{ borderColor: "#E0E4DA", background: task.done ? "#F6F7F1" : "white", boxShadow: task.done ? undefined : "0 8px 20px rgba(16,32,51,0.045)" }}>
              <button
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                style={{
                  borderColor: task.done ? "#22C55E" : "#CCD1C5",
                  background: task.done ? "#22C55E" : "white",
                }}
                onClick={() => toggleTask(task.id)} type="button">
                {task.done && <span className="text-[8px] font-bold text-white">✓</span>}
              </button>
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
