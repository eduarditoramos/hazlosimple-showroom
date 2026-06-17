import { TL } from "../../tokens";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div aria-live="polite" className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4" role="status">
      <div className="flex items-center gap-2.5 rounded-2xl px-5 py-3"
        style={{
          background: "#102033",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.20)",
        }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: TL.green }} />
        <p className="text-[13px] font-semibold text-white">{message}</p>
      </div>
    </div>
  );
}
