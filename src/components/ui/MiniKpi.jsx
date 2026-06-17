export default function MiniKpi({ label, value, color }) {
  return (
    <div className="flex shrink-0 flex-col rounded-2xl border px-3.5 py-2.5 text-center"
      style={{ borderColor: "#E0E4DA", background: "linear-gradient(180deg,#FFFFFF,#FAFAF6)", boxShadow: "0 8px 22px rgba(16,32,51,0.06), inset 0 1px 0 rgba(255,255,255,0.85)" }}>
      <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{label}</span>
      <span className="mt-0.5 text-[15px] font-semibold tabular-nums" style={color ? { color } : { color: "#102033" }}>
        {value}
      </span>
    </div>
  );
}
