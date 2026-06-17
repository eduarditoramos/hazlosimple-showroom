import { useState } from "react";
import { OS_DESKTOP_STYLE, APP_COLOR } from "../../tokens";
import AppLauncher, { APPS } from "./AppLauncher";
import HeroCarousel from "./HeroCarousel";
import ActiveConsole, { CONSOLE_TITLE, PROBE_BTN } from "./ActiveConsole";
import GiroPanel from "./GiroPanel";
import FAQPanel from "./FAQPanel";
import CTAFinal from "./CTAFinal";
import HazloSimpleBanner from "./HazloSimpleBanner";

export default function OsHome({ demos, onOpenDemo }) {
  const [activeApp, setActiveApp] = useState("crm");
  const app = APPS.find(a => a.id === activeApp);
  const demo = app ? demos[app.demoIdx] : null;

  return (
    <div className="min-h-screen" style={OS_DESKTOP_STYLE}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <div id="hero" className="mb-6">
          <HeroCarousel demos={demos} onOpenDemo={onOpenDemo} />
        </div>

        <div id="launcher" className="mb-4 overflow-hidden rounded-2xl border px-6 py-5"
          style={{ borderColor: "#CCD1C5", background: "rgba(251,250,246,0.92)", boxShadow: "0 12px 36px rgba(16,32,51,0.10)" }}>
          <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em]" style={{ color: "#98A2B3" }}>
            Elige una app
          </p>
          <AppLauncher selected={activeApp} onSelect={setActiveApp} />
        </div>

        {demo && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: APP_COLOR[activeApp] }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: APP_COLOR[activeApp] }}>
                  {CONSOLE_TITLE[activeApp]}
                </span>
              </div>
              <button
                className="rounded-lg px-3 py-1 font-mono text-[11px] font-semibold text-white transition hover:opacity-88"
                style={{
                  background: "linear-gradient(to bottom,#5047DC,#4338CA)",
                  boxShadow: "0 2px 8px rgba(67,56,202,0.40), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
                onClick={() => onOpenDemo(demo)} type="button"
              >
                {PROBE_BTN[activeApp]}
              </button>
            </div>
            <ActiveConsole appId={activeApp} demo={demo} onOpenDemo={onOpenDemo} />
          </div>
        )}
      </div>

      <GiroPanel />
      <FAQPanel />
      <CTAFinal />
      <HazloSimpleBanner />
    </div>
  );
}
