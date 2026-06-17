import { TL, WIN_CHROME_BG } from "../../tokens";

function TrafficLights({ onBack }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button className="h-3 w-3 rounded-full transition hover:brightness-90 focus:outline-none"
        onClick={onBack} style={{ background: TL.red }} title="Cerrar" type="button" />
      <div className="h-3 w-3 rounded-full" style={{ background: TL.yellow }} />
      <div className="h-3 w-3 rounded-full" style={{ background: TL.green }} />
    </div>
  );
}

export default function WinChrome({ onBack, right, title, shortTitle }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5"
      style={{ ...WIN_CHROME_BG, borderBottom: "1px solid #CCD1C5" }}>
      {onBack ? <TrafficLights onBack={onBack} /> : (
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-3 w-3 rounded-full" style={{ background: TL.red }} />
          <div className="h-3 w-3 rounded-full" style={{ background: TL.yellow }} />
          <div className="h-3 w-3 rounded-full" style={{ background: TL.green }} />
        </div>
      )}
      <div className="min-w-0 flex-1 text-center">
        {shortTitle ? (
          <>
            <span className="block truncate font-mono text-[11px] font-medium tracking-wide sm:hidden"
              style={{ color: "#98A2B3" }}>{shortTitle}</span>
            <span className="hidden truncate font-mono text-[11px] font-medium tracking-wide sm:block"
              style={{ color: "#98A2B3" }}>{title}</span>
          </>
        ) : (
          <span className="block truncate font-mono text-[11px] font-medium tracking-wide"
            style={{ color: "#98A2B3" }}>{title}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-end" style={{ minWidth: "80px" }}>
        {right ?? null}
      </div>
    </div>
  );
}
