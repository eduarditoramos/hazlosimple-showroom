import { WA, SYSBAR_BG } from "../../tokens";

const NAV = [
  ["Demos", "hero"],
  ["Giros", "giros"],
  ["Apps", "launcher"],
  ["Dudas", "dudas"],
];

export default function SystemBar({ onHome, onNavigate }) {
  return (
    <header className="sticky top-0 z-30"
      style={{ ...SYSBAR_BG, borderBottom: "1px solid #CCD1C5", boxShadow: "0 1px 4px rgba(16,32,51,0.06)" }}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">

        <button className="flex shrink-0 items-center gap-2.5 focus:outline-none" onClick={onHome} type="button">
          <div className="grid h-7 w-7 place-items-center overflow-hidden rounded-[7px]"
            style={{ background: "#082B4C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(8,43,76,0.30)" }}>
            <span className="font-mono text-[9px] font-bold leading-none text-white">HS</span>
          </div>
          <div className="hidden items-baseline gap-1.5 xs:flex sm:flex">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#102033" }}>
              HazloSimple
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: "#98A2B3" }}>OS</span>
          </div>
        </button>

        <nav className="hidden items-center sm:flex">
          {NAV.map(([label, section]) => (
            <button key={label}
              onClick={() => onNavigate(section)}
              className="rounded-md px-2.5 py-1.5 font-mono text-[11px] transition hover:bg-black/5 focus:outline-none"
              style={{ color: "#667085" }} type="button">
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            <div className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#22C55E", boxShadow: "0 0 0 2px rgba(34,197,94,0.22)" }} />
            <span className="font-mono text-[9px] tracking-widest" style={{ color: "#98A2B3" }}>ONLINE</span>
          </div>
          <a className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition hover:opacity-85 sm:px-3.5"
            href={WA} rel="noreferrer" target="_blank"
            style={{ background: "linear-gradient(to bottom,#3A3B3F,#1F2023)", boxShadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)" }}>
            Quiero mi app
          </a>
        </div>
      </div>
    </header>
  );
}
