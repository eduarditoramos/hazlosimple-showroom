import { WA } from "../../tokens";

export default function CTAFinal() {
  const scrollToDemos = () =>
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="cta" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #0d3560 0%, #082B4C 60%, #061f38 100%)",
          boxShadow: "0 32px 80px rgba(8,43,76,0.40), 0 8px 24px rgba(8,43,76,0.20)",
        }}>

        {/* Dot texture overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />

        <div className="relative px-6 py-10 text-center text-white sm:px-12 sm:py-14">

          {/* System pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
            style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)" }}>
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#16A34A" }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.55)" }}>
              HazloSimple OS · Apps para negocios reales
            </span>
          </div>

          {/* Headline */}
          <h2 className="mx-auto max-w-xl text-[26px] font-black leading-[1.1] tracking-tight text-white sm:text-[34px]">
            Apps que ordenan tu negocio.{" "}
            <span style={{ color: "#4ADE80" }}>Datos que impulsan tu crecimiento.</span>
          </h2>

          {/* CTAFinal trust copy - force light text on navy */}
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)", opacity: 1 }}>
            Sin backend complejo · Sin login complicado · Sin instalaciones · Demo funcional
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={WA} rel="noreferrer" target="_blank"
              className="relative w-full overflow-hidden rounded-xl px-7 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90 sm:w-auto"
              style={{
                background: "linear-gradient(to bottom, #16A34A, #15803D)",
                boxShadow: "0 4px 20px rgba(22,163,74,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                minHeight: "48px",
              }}>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-xl bg-white/[0.10]" />
              Quiero mi app a medida →
            </a>
            <button
              className="w-full rounded-xl border px-7 py-3.5 text-[14px] font-semibold transition sm:w-auto"
              style={{
                color: "rgba(255,255,255,0.92)",
                borderColor: "rgba(255,255,255,0.32)",
                backgroundColor: "rgba(255,255,255,0.08)",
                opacity: 1,
                minHeight: "48px",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onClick={scrollToDemos}
              type="button">
              Ver mini apps
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Sin backend", "Sin login complicado", "Sin instalaciones", "Con WhatsApp"].map(label => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-bold" style={{ color: "#4ADE80" }}>✓</span>
                <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.50)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
