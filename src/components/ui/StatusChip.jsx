export default function StatusChip({ label, color }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      <span className="h-1 w-1 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
