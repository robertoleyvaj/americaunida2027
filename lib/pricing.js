import { precios } from "@/site.config";

// Formatea a pesos MXN sin decimales: 3000 -> "$3,000"
export function mxn(n) {
  return "$" + Math.round(n).toLocaleString("es-MX");
}

// Devuelve la etapa de precio vigente según una fecha (por defecto, hoy)
export function etapaVigente(fecha = new Date()) {
  const t = fecha.getTime();
  const preventa = precios.etapas[0];
  if (t < new Date(preventa.limite).getTime()) return preventa;
  const etapa2 = precios.etapas[1];
  if (t < new Date(etapa2.limite).getTime()) return etapa2;
  return precios.etapas[2];
}

// Cuota mensual estimada para un restante y número de meses
export function cuotaMensual(restante, meses) {
  return Math.ceil(restante / meses);
}
