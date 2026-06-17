export const demos = [
  {
    id: "crm-simple",
    title: "CRM Simple",
    industry: "Ventas y seguimiento",
    description: "Pipeline comercial para leads, propuestas y próximas acciones.",
    frase: "No pierdas clientes por falta de seguimiento.",
    metric: "24 prospectos",
    status: "Activo",
    accent: "indigo",
    insight: "3 prospectos necesitan seguimiento hoy para no enfriarse.",
    actionLabel: "Marcar seguimiento",
    completedLabel: "Hecho ✓",
    toast: "Seguimiento registrado ✅",
    completedStatus: "SEGUIMIENTO REGISTRADO",
    buttonLabel: "Probar CRM →",
    homePreview: [
      { label: "Lead", value: "Mariana López" },
      { label: "Valor", value: "$18,500" },
      { label: "Estado", value: "Cotización enviada" },
      { label: "Próxima acción", value: "Llamar hoy 4:30 PM" }
    ],
    modules: ["Clientes", "Pipeline", "Recordatorios"],
    modulosFull: ["Leads", "Pipeline", "Seguimientos", "Cotizaciones", "Recordatorios", "Dashboard", "WhatsApp", "Reportes"],
    beforeAfter: {
      before: "Clientes en WhatsApp, notas sueltas en libretas y seguimientos olvidados.",
      now: "Todos los prospectos, etapas y próximas acciones en una sola pantalla."
    },
    kpis: [
      { label: "Prospectos", value: "24" },
      { label: "Seguimientos", value: "9" },
      { label: "Cotizaciones", value: "7" },
      { label: "Venta estimada", value: "$87k" }
    ],
    stages: ["Nuevo", "Contactado", "Cotizado", "Negociación", "Ganado"],
    records: [
      {
        id: "crm-1",
        name: "Mariana López",
        service: "CRM para equipo comercial",
        stage: "Contactado",
        status: "CONTACTADO",
        value: "$18,500",
        notes: "Quiere demo para su equipo de ventas esta semana.",
        nextAction: "Confirmar cita hoy 4:30 PM."
      },
      {
        id: "crm-2",
        name: "Grupo Norte",
        service: "Seguimiento para sucursales",
        stage: "Cotizado",
        status: "COTIZADO",
        value: "$32,000",
        notes: "Interesados en tablero para sucursales y reportes simples.",
        nextAction: "Resolver dudas de alcance operativo."
      },
      {
        id: "crm-3",
        name: "Dra. Valeria Soto",
        service: "Agenda y clientes",
        stage: "Nuevo",
        status: "NUEVO",
        value: "$12,800",
        notes: "Pidió ejemplo para agenda y pacientes recurrentes.",
        nextAction: "Agendar llamada de descubrimiento."
      },
      {
        id: "crm-4",
        name: "Casa Rivera",
        service: "App de servicios",
        stage: "Negociación",
        status: "NEGOCIACION",
        value: "$24,000",
        notes: "Ya aprobó flujo base; falta definir fecha de arranque.",
        nextAction: "Enviar plan de implementación."
      },
      {
        id: "crm-5",
        name: "Clínica Santa Fe",
        service: "Portal de citas",
        stage: "Ganado",
        status: "GANADO",
        value: "$41,500",
        notes: "Cliente aprobó propuesta y quiere iniciar el lunes.",
        nextAction: "Preparar arranque y checklist."
      }
    ]
  },
  {
    id: "restaurante-cafeteria",
    title: "Restaurante / cafetería",
    industry: "Alimentos y bebidas",
    description: "Pedidos, cocina y tickets para una operación diaria más clara.",
    frase: "Pedidos claros, cocina ordenada y corte visible.",
    metric: "18 pedidos",
    status: "Demo",
    accent: "ember",
    insight: "La cocina tiene 5 pedidos activos y 2 listos para entregar.",
    actionLabel: "Marcar como listo",
    completedLabel: "Hecho ✓",
    toast: "Pedido listo ✅",
    completedStatus: "LISTO",
    buttonLabel: "Probar restaurante →",
    homePreview: [
      { label: "Mesa / pedido", value: "Mesa 4" },
      { label: "Productos", value: "2 enchiladas + café" },
      { label: "Total", value: "$386" },
      { label: "Cocina", value: "En preparación" }
    ],
    modules: ["Mesas", "Cocina", "Tickets"],
    modulosFull: ["Pedidos", "Mesas", "Cocina", "Corte del día", "Inventario básico", "Pagos", "Reportes"],
    beforeAfter: {
      before: "Pedidos en libretas, comandas perdidas entre mesas y corte manual confuso.",
      now: "Cada pedido tiene estado, monto, nota de cocina y cierre automático."
    },
    kpis: [
      { label: "Pedidos hoy", value: "18" },
      { label: "Mesas activas", value: "7" },
      { label: "Ticket prom.", value: "$214" },
      { label: "Ventas", value: "$8.4k" }
    ],
    stages: ["Nuevo pedido", "En preparación", "Listo", "Entregado"],
    records: [
      {
        id: "rest-1",
        name: "Mesa 4",
        products: "2 enchiladas, café americano, pan dulce",
        paymentMethod: "Tarjeta",
        stage: "En preparación",
        status: "EN PREPARACION",
        value: "$386",
        notes: "Sin cebolla en una orden. Café al final.",
        nextAction: "Avisar a barra cuando cocina termine el plato fuerte."
      },
      {
        id: "rest-2",
        name: "Mostrador 18",
        products: "Latte deslactosado, sandwich para llevar",
        paymentMethod: "Efectivo",
        stage: "Nuevo pedido",
        status: "NUEVO PEDIDO",
        value: "$148",
        notes: "Cliente espera en barra.",
        nextAction: "Confirmar pago y pasar a preparación."
      },
      {
        id: "rest-3",
        name: "Mesa 2",
        products: "Chilaquiles, jugo verde, capuchino",
        paymentMethod: "Tarjeta",
        stage: "Listo",
        status: "LISTO",
        value: "$520",
        notes: "Comanda completa esperando mesero.",
        nextAction: "Entregar y cerrar cuenta."
      },
      {
        id: "rest-4",
        name: "Pedido app 07",
        products: "Bowl de pollo, agua mineral",
        paymentMethod: "Transferencia",
        stage: "Entregado",
        status: "ENTREGADO",
        value: "$240",
        notes: "Pedido recogido en barra sin pendientes.",
        nextAction: "Registrar satisfacción del cliente."
      }
    ]
  },
  {
    id: "servicios-web-app",
    title: "Agenda + Clientes",
    industry: "Citas y seguimiento",
    description: "Agenda, fichas de cliente e indicaciones claras para dar seguimiento.",
    frase: "Agenda, ficha e indicaciones por paciente.",
    metric: "14 citas hoy",
    status: "Simulado",
    accent: "indigo",
    insight: "4 clientes necesitan indicaciones antes de su cita.",
    actionLabel: "Enviar indicaciones",
    completedLabel: "Hecho ✓",
    toast: "Indicaciones enviadas ✅",
    completedStatus: "INDICACIONES ENVIADAS",
    buttonLabel: "Probar agenda →",
    homePreview: [
      { label: "Cliente / paciente", value: "Mariana Torres" },
      { label: "Servicio", value: "Consulta inicial" },
      { label: "Hora", value: "4:30 PM" },
      { label: "Indicaciones", value: "Pendientes" }
    ],
    modules: ["Agenda", "Clientes", "Indicaciones"],
    modulosFull: ["Agenda", "Ficha de paciente", "Indicaciones", "Archivos", "Recordatorios", "Seguimiento", "Dashboard", "WhatsApp"],
    beforeAfter: {
      before: "Citas por mensaje, indicaciones olvidadas y pacientes sin seguimiento real.",
      now: "Cada paciente tiene ficha, cita agendada, indicaciones y próximo paso claro."
    },
    kpis: [
      { label: "Citas hoy", value: "14" },
      { label: "Clientes activos", value: "84" },
      { label: "Seguimientos", value: "18" },
      { label: "Ingresos", value: "$14.6k" }
    ],
    stages: ["Nuevo", "Agendado", "En proceso", "Finalizado"],
    records: [
      {
        id: "svc-1",
        name: "Mariana Torres",
        service: "Consulta inicial",
        time: "4:30 PM",
        instructions: "Traer estudios previos y llegar 10 minutos antes.",
        stage: "Agendado",
        status: "AGENDADO",
        value: "$950",
        notes: "Primera visita. Preguntó por opciones de seguimiento.",
        nextAction: "Enviar indicaciones y confirmar asistencia."
      },
      {
        id: "svc-2",
        name: "José Ramírez",
        service: "Revisión de avance",
        time: "5:00 PM",
        instructions: "Enviar fotos del avance antes de la cita.",
        stage: "En proceso",
        status: "EN PROCESO",
        value: "$650",
        notes: "Cliente recurrente con dudas sobre el plan.",
        nextAction: "Confirmar motivo de consulta."
      },
      {
        id: "svc-3",
        name: "Fernanda Cruz",
        service: "Resultado pendiente",
        time: "6:15 PM",
        instructions: "Completar formulario previo.",
        stage: "En proceso",
        status: "EN PROCESO",
        value: "$800",
        notes: "Ya está en sala de espera.",
        nextAction: "Registrar notas de la sesión."
      },
      {
        id: "svc-4",
        name: "Carlos Vega",
        service: "Entrega de indicaciones",
        time: "3:00 PM",
        instructions: "Llevar comprobante de pago.",
        stage: "Finalizado",
        status: "FINALIZADO",
        value: "$1,200",
        notes: "Cita completada sin pendientes.",
        nextAction: "Programar seguimiento mensual."
      },
      {
        id: "svc-5",
        name: "Laura Méndez",
        service: "Nueva cita",
        time: "7:00 PM",
        instructions: "Confirmar disponibilidad.",
        stage: "Nuevo",
        status: "NUEVO",
        value: "$750",
        notes: "Referida por cliente activo.",
        nextAction: "Confirmar hora y datos de contacto."
      }
    ]
  },
  {
    id: "control-operativo",
    title: "Control Operativo",
    industry: "Operación interna",
    description: "Tablero operativo para pedidos, stock, responsables y tareas del día.",
    frase: "Stock, tareas y alertas sin perseguir al equipo.",
    metric: "14 abiertos",
    status: "Activo",
    accent: "ink",
    insight: "2 pedidos dependen de stock bajo antes de poder entregarse.",
    actionLabel: "Marcar como listo",
    completedLabel: "Hecho ✓",
    toast: "Pedido actualizado ✅",
    completedStatus: "LISTO",
    buttonLabel: "Probar operación →",
    homePreview: [
      { label: "Pedido", value: "Pedido #1042" },
      { label: "Cliente", value: "Ferretería López" },
      { label: "Monto", value: "$2,450" },
      { label: "Stock", value: "Bajo: 5 productos" }
    ],
    modules: ["Pedidos", "Inventario", "Tareas"],
    modulosFull: ["Inventario", "Tareas", "Alertas de stock", "Responsables", "Sucursales", "Reportes", "Dashboard"],
    beforeAfter: {
      before: "Todo depende de preguntar por WhatsApp y perseguir al equipo para saber qué pasó.",
      now: "Alertas, tareas y responsables visibles en un solo tablero sin perseguir a nadie."
    },
    kpis: [
      { label: "Pedidos abiertos", value: "14" },
      { label: "Stock bajo", value: "4" },
      { label: "Ventas", value: "$126k" },
      { label: "Tareas", value: "9" }
    ],
    stages: ["Pedido nuevo", "Surtiendo", "Listo", "Entregado"],
    records: [
      {
        id: "ops-1",
        order: "Pedido #1042",
        name: "Ferretería López",
        products: "12 kits de instalación, 4 sensores",
        owner: "Ana",
        stockAlert: "ALERTA: stock bajo — 5 piezas",
        stage: "Surtiendo",
        status: "SURTIENDO",
        value: "$2,450",
        notes: "Faltan sensores para completar el pedido.",
        nextAction: "Confirmar stock y liberar surtido."
      },
      {
        id: "ops-2",
        order: "Pedido #1043",
        name: "Clínica Santa María",
        products: "8 paquetes de mantenimiento",
        owner: "Luis",
        stockAlert: "Stock completo",
        stage: "Listo",
        status: "LISTO",
        value: "$1,280",
        notes: "Pedido empacado; espera ruta.",
        nextAction: "Asignar horario de entrega."
      },
      {
        id: "ops-3",
        order: "Pedido #1044",
        name: "Restaurante El Portal",
        products: "20 consumibles, 2 equipos",
        owner: "Mara",
        stockAlert: "Stock completo",
        stage: "Entregado",
        status: "ENTREGADO",
        value: "$3,900",
        notes: "Cliente recibió sin observaciones.",
        nextAction: "Cerrar evidencia de entrega."
      },
      {
        id: "ops-4",
        order: "Pedido #1045",
        name: "Taller Gutiérrez",
        products: "Refacciones y kit de limpieza",
        owner: "Diego",
        stockAlert: "Stock completo",
        stage: "Pedido nuevo",
        status: "PEDIDO NUEVO",
        value: "$860",
        notes: "Pedido recién aprobado por administración.",
        nextAction: "Asignar responsable de surtido."
      }
    ]
  }
];
