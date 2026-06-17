import { WA } from "../../tokens";
import CommandCenter from "./CommandCenter";
import GiroPanel from "./GiroPanel";
import FAQPanel from "./FAQPanel";
import CTAFinal from "./CTAFinal";
import HazloSimpleBanner from "./HazloSimpleBanner";

const OS_BG = {
  background: "#EEF0EA",
  backgroundImage: "radial-gradient(circle, #D7DBD2 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

const CHIPS = [
  "Sin backend",
  "Sin login complicado",
  "Con WhatsApp",
  "A tu medida",
];

export default function OsHome({ demos, onOpenDemo }) {
  return (
    <div style={OS_BG}>

      {/* ── Above the fold: hero + command center ──────────────────────────── */}
      <div className="lg:grid lg:min-h-[calc(100vh-44px)]"
        style={{ gridTemplateColumns: "42% 58%" }}>

        {/* LEFT — Hero */}
        <div className="flex flex-col justify-center px-8 py-14
                        lg:px-10 lg:py-0 xl:px-16">

          {/* System pill */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5"
            style={{ borderColor: "#CCD1C5", background: "rgba(251,250,246,0.88)" }}>
            <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#16A34A" }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "#667085" }}>
              HazloSimple OS · 4 demos activas
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[38px] font-black leading-[1.06] tracking-tight
                         sm:text-[44px] lg:text-[42px] xl:text-[50px]"
            style={{ color: "#082B4C" }}>
            Tu negocio,
            <br />
            <span style={{ color: "#16A34A" }}>convertido en app.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "#4B5563" }}>
            Mini sistemas de ventas, cocina, clínica y operación. Cada demo muestra tu negocio con clientes, pedidos, citas y tareas en orden.
          </p>

          {/* Value chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CHIPS.map(chip => (
              <span key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium"
                style={{ borderColor: "#CCD1C5", background: "rgba(251,250,246,0.82)", color: "#667085" }}>
                <span className="font-bold" style={{ color: "#16A34A" }}>✓</span>
                {chip}
              </span>
            ))}
          </div>

          {/* System metadata */}
          <p className="mt-4 font-mono text-[9px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
            datos simulados · flujos tocables · cotización a medida
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={WA} rel="noreferrer" target="_blank"
              className="relative overflow-hidden rounded-xl px-6 py-3.5 text-[14px] font-semibold
                         text-white transition hover:opacity-90"
              style={{
                background: "linear-gradient(to bottom, #0d3560, #082B4C)",
                boxShadow: "0 4px 20px rgba(8,43,76,0.40), inset 0 1px 0 rgba(255,255,255,0.13)",
              }}>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/[0.09]" />
              Quiero una app para mi negocio →
            </a>
            <button
              className="rounded-xl border px-6 py-3.5 text-[14px] font-semibold transition hover:bg-black/5"
              style={{ borderColor: "#CCD1C5", background: "rgba(251,250,246,0.80)", color: "#102033" }}
              onClick={() => document.getElementById("command-center")?.scrollIntoView({ behavior: "smooth" })}
              type="button">
              Probar demos
            </button>
          </div>
        </div>

        {/* RIGHT — Command Center */}
        <div className="flex flex-col justify-center px-4 py-8 lg:py-6 lg:pr-8 xl:pr-10">
          <CommandCenter demos={demos} onOpenDemo={onOpenDemo} />
        </div>
      </div>

      {/* ── Below the fold ─────────────────────────────────────────────────── */}
      <GiroPanel />
      <FAQPanel />
      <CTAFinal />
      <HazloSimpleBanner />
    </div>
  );
}
