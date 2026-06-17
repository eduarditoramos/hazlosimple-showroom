import { useState } from "react";
import { APP_COLOR, statusColor } from "../../tokens";
import AppWindow from "../os/AppWindow";
import { ChevL } from "../ui/Icons";
import StatusChip from "../ui/StatusChip";
import DemoKpiRow from "../ui/DemoKpiRow";
import DemoSectionLabel from "../ui/DemoSectionLabel";

const WA_BASE = "https://wa.me/522213619628?text=";

const CLINICA_EXTRA = {
  "svc-1": { archivos: ["Estudios previos.pdf", "Receta mayo.pdf"], recordatorio: "Seguimiento en 7 días" },
  "svc-2": { archivos: ["Foto de avance.jpg"], recordatorio: "Llamada de seguimiento en 3 días" },
  "svc-3": { archivos: ["Formulario previo.pdf"], recordatorio: "Entregar resultados pendientes" },
  "svc-4": { archivos: ["Comprobante de pago.pdf", "Resumen sesión.pdf"], recordatorio: "Seguimiento mensual en 30 días" },
  "svc-5": { archivos: [], recordatorio: "Confirmar disponibilidad de cita" },
};

const TABS = [
  { id: "datos", label: "Datos" },
  { id: "indicaciones", label: "Indicaciones" },
  { id: "archivos", label: "Archivos" },
  { id: "seguimiento", label: "Seguimiento" },
];

export default function AgendaView({ completedRecords, demo, onAction, onBack, onSelectRecord, selectedRecord }) {
  const [innerView, setInnerView] = useState("list");
  const [activeTab, setActiveTab] = useState("datos");
  const [localSentSet, setLocalSentSet] = useState({});
  const [localSeguimiento, setLocalSeguimiento] = useState({});

  const color = APP_COLOR.clinica;
  const extra = CLINICA_EXTRA[selectedRecord.id] || { archivos: [], recordatorio: "" };

  const isSent = Boolean(localSentSet[selectedRecord.id]) || Boolean(completedRecords[selectedRecord.id]);
  const sentCount = Object.keys(localSentSet).length;
  const pendingIndicaciones = Math.max(0, 4 - sentCount);

  const seguimientoEvents = localSeguimiento[selectedRecord.id] || [];

  const handleSendIndicaciones = () => {
    if (isSent) return;
    setLocalSentSet(p => ({ ...p, [selectedRecord.id]: true }));
    setLocalSeguimiento(p => ({
      ...p,
      [selectedRecord.id]: [
        "Indicaciones enviadas · Ahora",
        ...(p[selectedRecord.id] || []),
      ],
    }));
    onAction();
  };

  const waPatient = `${WA_BASE}${encodeURIComponent(`Hola ${selectedRecord.name.split(" ")[0]}, tus indicaciones de hoy ya están disponibles. Cualquier duda estamos aquí.`)}`;

  const ActionButton = () => (
    <button
      className="relative w-full overflow-hidden rounded-xl py-3 text-[13px] font-semibold text-white transition"
      disabled={isSent} onClick={handleSendIndicaciones}
      style={{
        background: isSent ? "linear-gradient(to bottom,#334155,#1F2937)" : `linear-gradient(to bottom,${color}dd,${color})`,
        boxShadow: isSent ? "inset 0 1px 0 rgba(255,255,255,0.10)" : `0 4px 16px ${color}44, inset 0 1px 0 rgba(255,255,255,0.16)`,
        opacity: 1,
        cursor: isSent ? "default" : "pointer",
      }} type="button">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/12" />
      {isSent ? "✚ Indicaciones enviadas" : "✚ Enviar indicaciones"}
    </button>
  );

  return (
    <AppWindow badge="hoy" onBack={onBack} title="Clínica · Agenda / Pacientes" accentColor={color}>
      <div className="flex items-center justify-between border-b px-5 py-2.5"
        style={{ background: `${color}08`, borderColor: "#CCD1C5" }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: color }} />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest" style={{ color }}>
            Agenda de hoy
          </span>
          {pendingIndicaciones > 0 && (
            <span className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold"
              style={{ background: `${color}20`, color }}>
              {pendingIndicaciones} ind. pend.
            </span>
          )}
        </div>
        <span className="hidden font-mono text-[8px] italic sm:inline" style={{ color: "#98A2B3" }}>{demo.frase}</span>
      </div>

      <DemoKpiRow kpis={demo.kpis} color={color} />

      <div className="grid md:grid-cols-[1fr_1px_304px]">
        {/* LEFT — Agenda list */}
        <div className={innerView === "detail" ? "hidden md:block" : "block"}>
          <DemoSectionLabel>Citas del día · {demo.records.length} total</DemoSectionLabel>
          <div className="space-y-2 p-3">
          {demo.records.map(appt => {
            const dot = statusColor(appt.status);
            const isSel = selectedRecord.id === appt.id;
            const apptSent = Boolean(localSentSet[appt.id]) || Boolean(completedRecords[appt.id]);
            return (
              <button key={appt.id}
                className="grid w-full grid-cols-[64px_12px_1fr] items-start gap-3 rounded-2xl border px-4 py-3 text-left transition"
                style={isSel
                  ? { borderColor: `${color}3a`, background: `${color}08`, boxShadow: `0 10px 28px ${color}12` }
                  : { borderColor: "#E0E4DA", background: "#FFFFFF", boxShadow: "0 8px 20px rgba(16,32,51,0.045)" }}
                onClick={() => { onSelectRecord(appt); setInnerView("detail"); setActiveTab("datos"); }} type="button">
                <span className="pt-0.5 font-mono text-[12px] font-semibold tabular-nums" style={{ color: "#102033" }}>{appt.time}</span>
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ background: apptSent ? "#16A34A" : dot }} />
                <div>
                  <p className="text-[14px] font-semibold" style={isSel ? { color } : { color: "#102033" }}>{appt.name}</p>
                  <p className="mt-0.5 text-[12px]" style={{ color: "#667085" }}>{appt.service}</p>
                  <StatusChip
                    label={apptSent ? "Indicaciones enviadas" : (completedRecords[appt.id] || appt.status)}
                    color={apptSent ? "#16A34A" : dot}
                  />
                </div>
              </button>
            );
          })}
          </div>
        </div>

        <div className="hidden md:block" style={{ background: "#CCD1C5" }} />

        {/* RIGHT — Patient detail */}
        <div className={innerView === "list" ? "hidden md:flex md:flex-col" : "flex flex-col"}>
          <button className="flex items-center gap-1.5 border-b px-5 py-3 text-[13px] font-medium md:hidden"
            style={{ borderColor: "#CCD1C5", color }}
            onClick={() => setInnerView("list")} type="button">
            <ChevL size={15} /> Atrás
          </button>

          <div className="m-3 rounded-2xl border px-5 py-4" style={{ borderColor: `${color}24`, background: `linear-gradient(180deg,${color}08,#FFFFFF)`, boxShadow: "0 12px 30px rgba(16,32,51,0.07)" }}>
            <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color }}>Paciente</p>
            <p className="mt-1 text-[17px] font-semibold" style={{ color: "#102033" }}>{selectedRecord.name}</p>
            <p className="text-[12px]" style={{ color }}>{selectedRecord.service}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusChip
                label={isSent ? "Indicaciones enviadas" : (completedRecords[selectedRecord.id] || selectedRecord.status)}
                color={isSent ? "#16A34A" : statusColor(selectedRecord.status)}
              />
              <span className="font-mono text-[16px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.time}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mx-3 mb-3 flex rounded-2xl border p-1" style={{ borderColor: "#E0E4DA", background: "#F0F1EC" }}>
            {TABS.map(tab => (
              <button key={tab.id}
                className="flex-1 rounded-xl py-2.5 font-mono text-[9px] font-bold uppercase tracking-wider transition"
                style={activeTab === tab.id
                  ? { color, background: "white", boxShadow: "0 6px 16px rgba(16,32,51,0.08)" }
                  : { color: "#667085", background: "transparent" }}
                onClick={() => setActiveTab(tab.id)} type="button">
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Datos */}
          {activeTab === "datos" && (
            <div className="flex flex-col">
              <div className="grid grid-cols-2 border-b" style={{ borderColor: "#CCD1C5" }}>
                <div className="border-r px-4 py-3" style={{ borderColor: "#E0E4DA" }}>
                  <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Valor de cita</p>
                  <p className="mt-0.5 text-[18px] font-bold tabular-nums" style={{ color: "#102033" }}>{selectedRecord.value}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Hora</p>
                  <p className="mt-0.5 font-mono text-[15px] font-bold tabular-nums" style={{ color }}>{selectedRecord.time}</p>
                </div>
              </div>
              <div className="mx-3 mb-3 rounded-2xl border px-5 py-3" style={{ borderColor: "#E0E4DA", background: "#FFFFFF" }}>
                <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Notas</p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#667085" }}>{selectedRecord.notes}</p>
              </div>
              <div className="mx-3 mb-3 rounded-2xl border px-5 py-2.5" style={{ borderColor: "#E0E4DA", background: "#FAFAF6" }}>
                <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>Próxima acción</p>
                <p className="mt-0.5 text-[12px] font-medium" style={{ color: "#102033" }}>{selectedRecord.nextAction}</p>
              </div>
              <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl px-4 py-2.5" style={{ background: `${color}06` }}>
                <span className="font-mono text-[8px]" style={{ color: "#98A2B3" }}>Ver también:</span>
                {["Indicaciones", "Archivos", "Seguimiento"].map(t => (
                  <button key={t}
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[8px] font-semibold transition hover:opacity-80"
                    style={{ borderColor: `${color}30`, color, background: `${color}0a` }}
                    onClick={() => setActiveTab(t.toLowerCase())} type="button">{t}</button>
                ))}
              </div>
              <div className="mt-auto border-t px-5 pb-4 pt-3" style={{ borderColor: "#CCD1C5" }}>
                <ActionButton />
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
              {isSent && (
                <div className="flex items-center gap-2 rounded-xl border px-4 py-3"
                  style={{ borderColor: "#16A34A30", background: "#16A34A08" }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#16A34A" }} />
                  <p className="text-[12px] font-medium" style={{ color: "#16A34A" }}>
                    Indicaciones enviadas · Ahora
                  </p>
                </div>
              )}
              <ActionButton />
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
              <div className="mt-4 border-t pt-3" style={{ borderColor: "#CCD1C5" }}>
                <ActionButton />
              </div>
            </div>
          )}

          {/* Tab: Seguimiento */}
          {activeTab === "seguimiento" && (
            <div className="flex flex-col gap-3 px-5 py-4">
              {seguimientoEvents.length > 0 && (
                <div className="flex flex-col gap-2">
                  {seguimientoEvents.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl border px-4 py-3"
                      style={{ borderColor: "#16A34A30", background: "#16A34A08" }}>
                      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "#16A34A" }} />
                      <p className="text-[12px] font-medium" style={{ color: "#16A34A" }}>{ev}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="rounded-xl border px-4 py-3.5" style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: "#102033" }}>{extra.recordatorio}</p>
                    <p className="mt-1 font-mono text-[9px]" style={{ color: "#98A2B3" }}>Para: {selectedRecord.name}</p>
                  </div>
                </div>
              </div>
              <a href={waPatient} rel="noreferrer" target="_blank"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-semibold transition hover:bg-white"
                style={{ borderColor: `${color}30`, color, background: `${color}05` }}>
                Enviar recordatorio por WhatsApp
              </a>
              <ActionButton />
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
}
