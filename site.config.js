// ============================================================
//  CONFIGURACIÓN DEL SITIO — edita aquí los datos del evento
// ============================================================

export const site = {
  // Fecha y hora de INICIO del evento (cuenta regresiva)
  fechaInicio: "2027-08-12T09:00:00-07:00",
  fechasTexto: "12 – 15 de agosto de 2027",
  sedeTexto: "Baja California, México",

  // Claim / frase principal (slogan por definir)
  claim: "De toda América venimos. En Baja California nos encontramos.",

  // Correo del evento
  email: "americaunida2027@gmail.com",
};

// ---------- PRECIOS E INSCRIPCIÓN (Fase 3) ----------
// Etapas de precio "early bird". Las fechas están en horario de Tijuana.
export const precios = {
  moneda: "MXN",
  oficial: 4219,
  etapas: [
    {
      id: "preventa",
      nombre: "Preventa",
      precio: 3000,
      // condición: cubrir al menos la mitad antes de esta fecha
      limite: "2027-01-01T00:00:00-07:00",
      condicion: "Paga al menos la mitad ($1,500) antes del 1 de enero de 2027.",
    },
    {
      id: "etapa2",
      nombre: "Etapa 2",
      precio: 3500,
      desde: "2027-01-01T00:00:00-07:00",
      limite: "2027-05-31T00:00:00-07:00",
      condicion: "Del 1 de enero al 30 de mayo de 2027.",
    },
    {
      id: "oficial",
      nombre: "Precio oficial",
      precio: 4219,
      desde: "2027-05-31T00:00:00-07:00",
      limite: "2027-08-09T23:59:00-07:00",
      condicion: "Del 31 de mayo al 9 de agosto de 2027.",
    },
  ],
  // Fecha límite para liquidar el total (todas las etapas)
  limiteLiquidar: "2027-08-09T23:59:00-07:00",
  // Formas de pago que ofrece el evento
  formasPago: ["Liquidar todo", "Abono libre", "Plan automático (mensual)"],
  // Actividad opcional (add-on)
  valleGuadalupe: 600,
};
