import WinChrome from "../os/WinChrome";

export default function HazloSimpleBanner() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <a className="block overflow-hidden rounded-2xl border transition"
        href="https://hazlosimple.netlify.app/" rel="noreferrer" target="_blank"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 12px 36px rgba(16,32,51,0.10)" }}>
        <WinChrome title="hazlosimple.netlify.app ↗" />
        <div className="flex items-center justify-between gap-4 px-5 py-4" style={{ background: "#FBFAF6" }}>
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-[9px]"
              style={{ background: "#082B4C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 6px rgba(8,43,76,0.25)" }}>
              <span className="font-mono text-[10px] font-bold leading-none text-white">HS</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#102033" }}>HazloSimple</p>
              <p className="text-[12px] leading-snug" style={{ color: "#667085" }}>
                Páginas web, plantillas y herramientas simples para negocios reales.
              </p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-[11px]" style={{ color: "#98A2B3" }}>hazlosimple.netlify.app ↗</span>
        </div>
      </a>
    </div>
  );
}
