import { useState } from "react";
import { APP_COLOR, WA, SUBROW_BG, pipelineColor, statusColor } from "../../tokens";
import AppWindow from "../os/AppWindow";
import { ChevL, ChevR } from "../ui/Icons";
import StatusChip from "../ui/StatusChip";
import DemoKpiRow from "../ui/DemoKpiRow";
import DemoSectionLabel from "../ui/DemoSectionLabel";

const WA_BASE = "https://wa.me/522213619628?text=";

const CRM_EXTRA = {
  "crm-1": { prob: 72, timeline: ["WhatsApp respondido · Ayer 3:12 PM", "Cotización enviada · Hace 2 días", "Primer contacto · Hace 5 días"] },
  "crm-2": { prob: 45, timeline: ["Dudas de alcance · Hoy 11:00 AM", "Cotización enviada · Hace 3 días", "Primer contacto · Hace 8 días"] },
  "crm-3": { prob: 20, timeline: ["Solicitud de demo · Ayer", "Formulario llenado · Hace 2 días"] },
  "crm-4": { prob: 65, timeline: ["Aprobó flujo base · Hoy", "Reunión de alcance · Hace 3 días", "Demo presentada · Hace 7 días"] },
  "crm-5": { prob: 95, timeline: ["Propuesta aprobada · Hoy", "Negociación cerrada · Hace 2 días", "Demo presentada · Hace 5 días"] },
};

export default function CRMView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [stageFilter, setStageFilter] = useState("Todos");
  const [innerView, setInnerView] = useState("list");
  const [localFollowupDone, setLocalFollowupDone] = useState({});
  const [localTimeline, setLocalTimeline] = useState({});

  const color = APP_COLOR.crm;
  const filtered = stageFilter === "Todos" ? demo.records : demo.records.filter(r => r.stage === stageFilter);
  const extra = CRM_EXTRA[selectedRecord.id] || { prob: 0, timeline: [] };

  const isFollowupDone = Boolean(localFollowupDone[selectedRecord.id]) || Boolean(completedRecords[selectedRecord.id]);
  const pendingCount = Math.max(0, 3 - Object.keys(localFollowupDone).length);

  // Merge local + static timeline
  const localEvents = localTimeline[selectedRecord.id] || [];
  const mergedTimeline = [...localEvents, ...extra.timeline];

  const handleStageFilter = (stage) => {
    const newFiltered = stage === "Todos" ? demo.records : demo.records.filter(r => r.stage === stage);
    setStageFilter(stage);
    if (newFiltered.length > 0 && !newFiltered.find(r => r.id === selectedRecord.id)) {
      onSelectRecord(newFiltered[0]);
    }
  };

  const handleFollowup = () => {
    if (isFollowupDone) return;
    setLocalFollowupDone(p => ({ ...p, [selectedRecord.id]: true }));
    setLocalTimeline(p => ({
      ...p,
      [selectedRecord.id]: [
        "Seguimiento registrado · Ahora",
        ...(p[selectedRecord.id] || []),
      ],
    }));
    onAction();
  };

  const waLead = `${WA_BASE}${encodeURIComponent(`Hola ${selectedRecord.name.split(" ")[0]}, me comunico en seguimiento a tu cotización de ${selectedRecord.service}. ¿Tienes disponibilidad esta semana?`)}`;

  return (
    <AppWindow badge={`${demo.records.length} leads`} onBack={onBack} title="CRM Simple" accentColor={color}>
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
                onClick={() => handleStageFilter(stage)} type="button">
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
          <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
            Acciones de hoy · {pendingCount} pendientes
          </span>
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
        {/* LEFT — Lead list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="text-[13px]" style={{ color: "#98A2B3" }}>Sin leads en esta etapa.</p>
              <button className="mt-3 text-[12px] font-semibold transition hover:opacity-75"
                style={{ color }}
                onClick={() => handleStageFilter("Todos")} type="button">
                Ver todos
              </button>
            </div>
          ) : (
            filtered.map(lead => {
              const dot = statusColor(lead.status);
              const isSel = selectedRecord.id === lead.id;
              const ex = CRM_EXTRA[lead.id] || { prob: 0, timeline: [] };
              const isDone = Boolean(localFollowupDone[lead.id]) || Boolean(completedRecords[lead.id]);
              return (
                <button key={lead.id}
                  className="flex w-full items-center gap-3 border-b px-5 py-3.5 text-left transition last:border-b-0"
                  style={{ borderColor: "#CCD1C5", background: isSel ? `${color}06` : undefined }}
                  onClick={() => { onSelectRecord(lead); setInnerView("detail"); }} type="button">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: isDone ? "#16A34A" : dot }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold" style={{ color: "#102033" }}>{lead.name}</p>
                    <p className="truncate text-[12px]" style={{ color: "#667085" }}>{lead.service}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wide" style={{ color: isDone ? "#16A34A" : dot }}>
                      {isDone ? "Seguimiento registrado" : (completedRecords[lead.id] || lead.status)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[14px] font-bold tabular-nums" style={{ color: "#102033" }}>{lead.value}</p>
                    <p className="font-mono text-[9px]" style={{ color: "#98A2B3" }}>{ex.prob}% cierre</p>
                  </div>
                  <ChevR size={14} />
                </button>
              );
            })
          )}
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* RIGHT — Lead detail */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: `${color}05` }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Lead activo</p>
            <p className="mt-1 text-[17px] font-semibold leading-tight" style={{ color: "#102033" }}>{selectedRecord.name}</p>
            <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{selectedRecord.service}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip
                label={isFollowupDone ? "Seguimiento registrado" : (completedRecords[selectedRecord.id] || selectedRecord.status)}
                color={isFollowupDone ? "#16A34A" : statusColor(selectedRecord.status)}
              />
              <span className="text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</span>
            </div>
          </div>

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

          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Próxima acción</p>
            <p className="mt-1 text-[12px] font-medium" style={{ color: "#102033" }}>{selectedRecord.nextAction}</p>
          </div>

          {mergedTimeline.length > 0 && (
            <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
              <p className="mb-2.5 font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Historial</p>
              <div className="flex flex-col gap-2.5">
                {mergedTimeline.map((ev, i) => (
                  <div key={`${ev}-${i}`} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: i === 0 ? color : "#CCD1C5" }} />
                    <p className="text-[11px] leading-snug" style={{ color: i === 0 ? "#102033" : "#98A2B3" }}>{ev}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-b px-5 py-3" style={{ borderColor: "#CCD1C5" }}>
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
            <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
          </div>

          <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
            <button
              className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
              disabled={isFollowupDone} onClick={handleFollowup}
              style={{
                background: isFollowupDone ? "#334155" : `linear-gradient(to bottom,${color}cc,${color})`,
                boxShadow: isFollowupDone ? undefined : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.14)`,
                opacity: isFollowupDone ? 0.65 : 1,
                cursor: isFollowupDone ? "default" : "pointer",
              }} type="button">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
              {isFollowupDone ? "↗ Seguimiento registrado" : "↗ Registrar seguimiento"}
            </button>
            <a href={waLead} rel="noreferrer" target="_blank"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-semibold transition hover:bg-white"
              style={{ borderColor: `${color}30`, color, background: `${color}05` }}>
              ↗ Seguimiento por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Módulos activos */}
      <div className="border-t" style={{ borderColor: "#CCD1C5" }}>
        <DemoSectionLabel>Módulos activos</DemoSectionLabel>
        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#CCD1C5" }}>
          {[
            { label: "Pipeline", value: demo.kpis.find(k => k.label === "Venta estimada")?.value ?? "$87k", sub: `${demo.stages.length} etapas activas`, icon: "↗" },
            { label: "Recordatorios", value: String(pendingCount), sub: "seguimientos pendientes hoy", icon: "△" },
            { label: "Reportes", value: "21%", sub: "tasa de conversión actual", icon: "#" },
          ].map((m) => (
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
