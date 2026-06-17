import MiniKpi from "./MiniKpi";

export default function DemoKpiRow({ kpis, color }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b px-5 py-3" style={{ borderColor: "#D8DCD2", background: "#F6F7F1" }}>
      {kpis.map(k => (
        <MiniKpi key={k.label} label={k.label} value={k.value} color={color} />
      ))}
    </div>
  );
}
