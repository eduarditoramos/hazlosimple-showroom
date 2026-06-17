export default function MiniKpi({ label, value, color }) {
  return (
    <div className="flex shrink-0 flex-col rounded-xl border px-3 py-2.5 text-center"
      style={{ borderColor: "#CCD1C5", background: "#FFFDF7" }}>
      <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{label}</span>
      <span className="mt-0.5 text-[15px] font-semibold tabular-nums" style={color ? { color } : { color: "#102033" }}>
        {value}
      </span>
    </div>
  );
}
