import { useRef, useState } from "react";
import { TL } from "./tokens";
import { demos } from "./data/demos";
import SystemBar from "./components/os/SystemBar";
import OsHome from "./components/home/OsHome";
import CRMView from "./components/demos/CRMView";
import RestaurantView from "./components/demos/RestaurantView";
import AgendaView from "./components/demos/AgendaView";
import OperationsView from "./components/demos/OperationsView";

function DemoSurface(props) {
  const { demo } = props;
  if (demo.id === "crm-simple")            return <CRMView {...props} />;
  if (demo.id === "restaurante-cafeteria") return <RestaurantView {...props} />;
  if (demo.id === "servicios-web-app")     return <AgendaView {...props} />;
  return <OperationsView {...props} />;
}

function Toast({ message }) {
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

function App() {
  const [view, setView] = useState("home");
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [completedRecords, setCompletedRecords] = useState({});
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  const openDemo = (demo) => {
    setSelectedDemo(demo);
    setSelectedRecord(demo.records[0]);
    setView("demo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setView("home");
    setSelectedDemo(null);
    setSelectedRecord(null);
  };

  const handleNavigate = (sectionId) => {
    const scrollTo = () =>
      requestAnimationFrame(() =>
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      );
    if (view !== "home") {
      setView("home");
      setSelectedDemo(null);
      setSelectedRecord(null);
      setTimeout(scrollTo, 80);
    } else {
      scrollTo();
    }
  };

  const completeAction = () => {
    if (!selectedDemo || !selectedRecord) return;
    setCompletedRecords(cur => ({ ...cur, [selectedRecord.id]: selectedDemo.completedStatus }));
    showToast(selectedDemo.toast);
  };

  return (
    <div className="min-h-screen" style={{ color: "#102033" }}>
      <SystemBar onHome={goHome} onNavigate={handleNavigate} />
      {view === "home" && <OsHome demos={demos} onOpenDemo={openDemo} />}
      {view === "demo" && selectedDemo && selectedRecord && (
        <DemoSurface
          completedRecords={completedRecords}
          demo={selectedDemo}
          onAction={completeAction}
          onBack={goHome}
          onSelectRecord={setSelectedRecord}
          selectedRecord={selectedRecord}
        />
      )}
      <Toast message={toast} />
    </div>
  );
}

export default App;
