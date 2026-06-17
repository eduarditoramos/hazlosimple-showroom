import { OS_DESKTOP_STYLE } from "../../tokens";
import WinChrome from "./WinChrome";

export default function AppWindow({ children, onBack, title, badge, accentColor }) {
  return (
    <div className="min-h-screen" style={OS_DESKTOP_STYLE}>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
          <WinChrome
            onBack={onBack}
            title={title}
            right={
              badge ? (
                <span className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
                  style={accentColor
                    ? { borderColor: `${accentColor}30`, background: `${accentColor}10`, color: accentColor }
                    : { borderColor: "#CCD1C5", background: "#FBFAF6", color: "#667085" }}>
                  {badge}
                </span>
              ) : null
            }
          />
          {children}
        </div>
      </div>
    </div>
  );
}
