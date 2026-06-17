import { useState } from "react";
import { industries } from "../../data/industries";
import { WA } from "../../tokens";
import WinChrome from "../os/WinChrome";

export default function GiroPanel() {
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
