import { useState } from "react";
import WinChrome from "../os/WinChrome";

const FAQ_ITEMS = [
  {
    q: "¿Es una app de verdad o solo una página?",
    a: "Es una app web: funciona desde navegador, se puede abrir en celular, compartir por link y guardar como acceso directo. Si necesitas publicarla en App Store o Play Store, se cotiza aparte."
  },
  {
    q: "¿La app se adapta a mi negocio?",
    a: "Sí. Partimos de una base según tu giro: clínica, restaurante, CRM, operación, despacho, tienda o servicios. Después ajustamos módulos, textos, colores y flujo."
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. La idea de HazloSimple es que puedas usarla como una herramienta de trabajo: clientes, citas, pedidos, tareas, archivos, reportes o seguimientos."
  },
  {
    q: "¿Qué incluye una app sencilla?",
    a: "Una pantalla principal, módulos según tu negocio, diseño responsive, datos de ejemplo, botones de contacto y una estructura clara para mostrar cómo operaría tu negocio."
  },
  {
    q: "¿Tiene login, base de datos o pagos?",
    a: "Puede tenerlos, pero no todos los proyectos los necesitan desde el inicio. Primero hacemos una versión simple para validar el flujo. Funciones avanzadas se cotizan aparte."
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance. Una demo sirve para visualizar tu idea; una app real se cotiza según módulos, usuarios, datos, automatizaciones e integraciones."
  },
  {
    q: "¿Puedo recibir pedidos, citas o solicitudes por WhatsApp?",
    a: "Sí. Podemos conectar botones y flujos para que el cliente mande información por WhatsApp. Automatizaciones avanzadas se cotizan según necesidad."
  },
  {
    q: "¿Se puede conectar con facturación, pagos o sistemas externos?",
    a: "Sí, pero eso ya entra como integración personalizada y requiere revisar proveedor, API, permisos y costo."
  },
];

export default function FAQPanel() {
  const [open, setOpen] = useState(null);
  return (
    <div id="dudas" className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "#CCD1C5", background: "#FFFDF7", boxShadow: "0 24px 80px rgba(16,32,51,0.16)" }}>
        <WinChrome
          title="Dudas antes de pedir tu app"
          right={
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>
              {FAQ_ITEMS.length} preguntas
            </span>
          }
        />
        <div className="border-b px-5 py-4" style={{ borderColor: "#CCD1C5", background: "#F6F7F1" }}>
          <p className="text-[13px] leading-relaxed" style={{ color: "#667085" }}>
            Sin tecnicismos. Esto es lo que normalmente pregunta un negocio antes de cotizar.
          </p>
        </div>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="border-b last:border-b-0" style={{ borderColor: "#CCD1C5" }}>
            <button
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-black/[0.02] focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)} type="button">
              <p className="text-[13px] font-semibold leading-snug" style={{ color: "#102033" }}>
                {item.q}
              </p>
              <span className="mt-0.5 shrink-0 font-mono text-[12px] transition-transform duration-200"
                style={{ color: "#98A2B3", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                +
              </span>
            </button>
            {open === i && (
              <div className="border-t px-5 pb-4 pt-3" style={{ borderColor: "#CCD1C5", background: "#F9F9F5" }}>
                <p className="text-[13px] leading-relaxed" style={{ color: "#667085" }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
