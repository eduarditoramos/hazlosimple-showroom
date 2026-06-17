export default function StockBar({ low }) {
  return (
    <div className="flex h-1.5 w-16 overflow-hidden rounded-full" style={{ background: "#E2E8F0" }}>
      <div className="h-full rounded-full"
        style={{ width: low ? "28%" : "88%", background: low ? "#DC2626" : "#22C55E" }} />
    </div>
  );
}
