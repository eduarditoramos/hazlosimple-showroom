import { WA } from "../../tokens";
import WinChrome from "../os/WinChrome";

export default function CTAFinal() {
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
