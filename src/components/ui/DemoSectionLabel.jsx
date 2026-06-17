export default function DemoSectionLabel({ children }) {
  return (
    <div className="border-b px-5 py-2" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
      <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "#98A2B3" }}>{children}</p>
    </div>
  );
}
