import { useState } from "react";
import { APP_COLOR, SUBROW_BG, COCINA_LABEL, pipelineColor, statusColor } from "../../tokens";
import WinChrome from "../os/WinChrome";
import { ChevR } from "../ui/Icons";
import MiniKpi from "../ui/MiniKpi";
import StatusChip from "../ui/StatusChip";
import StockBar from "../ui/StockBar";

export const CONSOLE_TITLE = {
  crm: "CRM Simple", cocina: "Cocina / POS",
  clinica: "Clínica / Pacientes", operacion: "Control Operativo",
};
export const PROBE_BTN = {
  crm: "↗ Abrir demo", cocina: "✓ Abrir demo",
  clinica: "✚ Abrir demo", operacion: "▣ Abrir demo",
};

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

export default function ActiveConsole({ appId, demo, onOpenDemo }) {
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
