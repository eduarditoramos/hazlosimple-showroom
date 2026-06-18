import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "hazlosimple_install_banner_dismissed";
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SHOW_DELAY_MS = 2800;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !("MSStream" in window);
}

function wasDismissed() {
  try {
    const ts = localStorage.getItem(STORAGE_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < DISMISS_MS;
  } catch {
    return false;
  }
}

function saveDismiss() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

/* ── Mini HS app icon (replicates the PWA icon inline) ────────────── */
function AppIcon() {
  return (
    <div
      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[14px]"
      style={{ background: "#082B4C", boxShadow: "0 4px 14px rgba(8,43,76,0.30), inset 0 1px 0 rgba(255,255,255,0.10)" }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <text x="16" y="23"
          textAnchor="middle"
          fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
          fontWeight="900"
          fontSize="17"
          fill="white"
          letterSpacing="-0.5"
        >HS</text>
        <circle cx="26" cy="6" r="4.5" fill="#16A34A" />
        <circle cx="26" cy="6" r="2.5" fill="#4ADE80" />
      </svg>
    </div>
  );
}

/* ── X close button ───────────────────────────────────────────────── */
function CloseBtn({ onClick }) {
  return (
    <button
      aria-label="Cerrar"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition hover:bg-black/[0.06]"
      onClick={onClick}
      style={{ color: "#98A2B3" }}
      type="button"
    >
      <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
      </svg>
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function InstallPrompt() {
  const [phase, setPhase] = useState(null);   // null | "android" | "ios"
  const [visible, setVisible] = useState(false);
  const deferredRef = useRef(null);

  useEffect(() => {
    if (isStandalone() || wasDismissed()) return;

    const ios = isIosDevice();

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      deferredRef.current = e;
      setTimeout(() => { setPhase("android"); setVisible(true); }, SHOW_DELAY_MS);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // iOS never fires beforeinstallprompt — show instructional banner instead
    let iosTimer;
    if (ios) {
      iosTimer = setTimeout(() => { setPhase("ios"); setVisible(true); }, SHOW_DELAY_MS);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      clearTimeout(iosTimer);
    };
  }, []);

  const dismiss = () => { setVisible(false); saveDismiss(); };

  const handleInstall = async () => {
    if (!deferredRef.current) return;
    deferredRef.current.prompt();
    const { outcome } = await deferredRef.current.userChoice;
    if (outcome === "accepted") setVisible(false);
    deferredRef.current = null;
  };

  if (!phase) return null;

  const isAndroid = phase === "android";

  return (
    /* Fixed bottom sheet — z-[9999] floats above everything, no layout impact */
    <div
      aria-label="Instalar HazloSimple OS"
      className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center px-3 pb-5 sm:px-4 sm:pb-8"
      role="dialog"
      style={{
        transform: visible ? "translateY(0)" : "translateY(116%)",
        transition: "transform 0.34s cubic-bezier(0.32, 0.72, 0, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl sm:max-w-md"
        style={{
          background: "#FFFDF7",
          border: "1px solid #CCD1C5",
          boxShadow: "0 28px 72px rgba(16,32,51,0.20), 0 4px 18px rgba(16,32,51,0.10), inset 0 1px 0 rgba(255,255,255,0.90)",
        }}
      >
        {/* Drag pill */}
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-[3px] w-8 rounded-full" style={{ background: "#CCD1C5" }} />
        </div>

        <div className="flex items-start gap-3.5 px-4 pb-5 pt-2">
          <AppIcon />

          <div className="min-w-0 flex-1">
            {/* Headline row */}
            <div className="flex items-start justify-between gap-2">
              <p className="text-[14px] font-bold leading-tight" style={{ color: "#102033" }}>
                {isAndroid ? "Instala HazloSimple OS" : "Instala HazloSimple OS en tu iPhone"}
              </p>
              <CloseBtn onClick={dismiss} />
            </div>

            {/* Subtext */}
            <p className="mt-1 text-[12px] leading-snug" style={{ color: "#667085" }}>
              {isAndroid
                ? "Guárdala en tu pantalla de inicio y ábrela como app."
                : "Toca Compartir » y luego Agregar a pantalla de inicio."}
            </p>

            {/* iOS visual cue */}
            {!isAndroid && (
              <div className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                style={{ background: "rgba(11,95,255,0.06)", border: "1px solid rgba(11,95,255,0.12)" }}>
                <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14" style={{ color: "#0B5FFF", flexShrink: 0 }}>
                  <path d="M7 1v8M4.5 3.5L7 1l2.5 2.5M2 10v2.5h10V10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                </svg>
                <span className="font-mono text-[9px] font-medium" style={{ color: "#0B5FFF" }}>
                  Safari → Compartir → Agregar a pantalla de inicio
                </span>
              </div>
            )}

            {/* CTA */}
            <button
              className="mt-3 w-full rounded-xl py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90 active:opacity-80"
              onClick={isAndroid ? handleInstall : dismiss}
              style={{
                background: isAndroid
                  ? "linear-gradient(to bottom, #16A34A, #15803D)"
                  : "linear-gradient(to bottom, #0d3560, #082B4C)",
                boxShadow: isAndroid
                  ? "0 4px 14px rgba(22,163,74,0.30), inset 0 1px 0 rgba(255,255,255,0.14)"
                  : "0 4px 14px rgba(8,43,76,0.28), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
              type="button"
            >
              {isAndroid ? "Instalar app" : "Entendido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
