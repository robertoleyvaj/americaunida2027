"use client";

import { useState } from "react";
import Link from "next/link";
import MiniTopbar from "@/components/MiniTopbar";
import DemoBanner from "@/components/DemoBanner";
import { precios, cuentaBancaria as BANCO } from "@/site.config";
import { mxn } from "@/lib/pricing";

// Datos de ejemplo (se reemplazan por los reales al conectar la base de datos)
const DEMO = {
  nombre: "Juan",
  folio: "AU-0001",
  total: 3000,
  etapaId: "preventa",
};

export default function Panel() {
  const [pagos, setPagos] = useState([
    { fecha: "18 dic 2026", monto: 1000, estado: "Confirmado", ref: "Transferencia" },
    { fecha: "05 dic 2026", monto: 500, estado: "Confirmado", ref: "Transferencia" },
  ]);
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [archivo, setArchivo] = useState("");

  const pagado = pagos.filter((p) => p.estado === "Confirmado").reduce((a, p) => a + p.monto, 0);
  const enRevision = pagos.filter((p) => p.estado === "En revisión").reduce((a, p) => a + p.monto, 0);
  const restante = Math.max(0, DEMO.total - pagado);
  const pct = Math.round((pagado / DEMO.total) * 100);

  const enviar = (e) => {
    e.preventDefault();
    const m = parseInt(String(monto).replace(/[^0-9]/g, ""), 10);
    if (!m) return;
    setPagos([{ fecha: fecha || "hoy", monto: m, estado: "En revisión", ref: archivo || "Comprobante" }, ...pagos]);
    setMonto(""); setFecha(""); setArchivo("");
  };

  return (
    <main className="min-h-screen bg-cloud">
      <DemoBanner />
      <MiniTopbar right={<Link href="/" className="hover:text-white">Cerrar sesión</Link>} />

      <div className="mx-auto max-w-4xl px-5 md:px-8 py-8 md:py-12">
        <p className="kicker text-gold-dark">Mi inscripción</p>
        <h1 className="mt-1 font-heading text-navy text-2xl md:text-3xl font-bold">Hola, {DEMO.nombre} 👋</h1>
        <p className="text-[#666] text-sm mt-1">Aquí ves tu saldo, pagas por transferencia y subes tus comprobantes.</p>

        <div className="mt-6 space-y-5">
          {/* Saldo */}
          <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-navy to-navy-800">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block bg-gold text-navy text-[11px] font-bold px-3 py-1 rounded-full">🏷️ Preventa asegurada</span>
              <span className="inline-block bg-white/10 text-white text-[11px] font-semibold px-3 py-1 rounded-full">Folio {DEMO.folio}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/60">Restante por pagar</p>
                <p className="font-heading text-4xl font-extrabold text-gold">{mxn(restante)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-white/60">Pagado</p>
                <p className="font-heading text-lg font-bold">{mxn(pagado)}</p>
                <p className="text-xs uppercase tracking-widest text-white/60 mt-2">Total</p>
                <p className="font-heading text-lg font-bold">{mxn(DEMO.total)} MXN</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-white/15 mt-4 overflow-hidden">
              <div className="h-full bg-gold rounded-full" style={{ width: pct + "%" }} />
            </div>
            {enRevision > 0 && (
              <p className="text-xs text-white/70 mt-3">
                Tienes <b className="text-gold">{mxn(enRevision)}</b> en revisión. Se sumará a tu saldo cuando la organización lo confirme.
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2 items-start">
            {/* Datos para transferir */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <h2 className="font-heading text-navy text-lg font-bold">Datos para tu transferencia</h2>
              <p className="text-sm text-[#666] mt-0.5 mb-4">Haz tu depósito o transferencia a esta cuenta.</p>
              <dl className="space-y-3 text-sm">
                <Dato k="Banco" v={BANCO.banco} />
                <Dato k="Titular" v={BANCO.titular} />
                <Dato k="Cuenta" v={BANCO.cuenta} mono />
                <Dato k="Sucursal" v={BANCO.sucursal} mono />
                <Dato k="CLABE" v={BANCO.clabe} mono />
                <div className="rounded-xl bg-gold/10 border border-gold/30 p-3">
                  <p className="text-xs text-[#555]">Concepto / referencia (¡importante!)</p>
                  <p className="font-heading font-extrabold text-navy text-lg mt-0.5">{DEMO.folio}</p>
                  <p className="text-[11px] text-[#777] mt-1">Pon tu folio en el concepto para que identifiquemos tu pago.</p>
                </div>
              </dl>
              <p className="mt-4 text-xs text-[#999]">Puedes pagar todo de una vez o en abonos: cada transferencia se registra por separado.</p>
            </div>

            {/* Registrar pago / subir comprobante */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <h2 className="font-heading text-navy text-lg font-bold">Registrar un pago</h2>
              <p className="text-sm text-[#666] mt-0.5 mb-4">Ya que transferiste, sube tu comprobante.</p>
              <form onSubmit={enviar} className="space-y-3">
                <label className="block">
                  <span className="text-xs font-medium text-[#555]">Monto pagado</span>
                  <input value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="$500" required
                         className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[#555]">Fecha del pago</span>
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                         className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[#555]">Comprobante (foto o PDF)</span>
                  <input type="file" accept="image/*,application/pdf"
                         onChange={(e) => setArchivo(e.target.files?.[0]?.name || "")}
                         className="mt-1 w-full text-xs text-[#555] file:mr-3 file:rounded-full file:border-0 file:bg-navy file:text-white file:px-4 file:py-2 file:text-xs file:font-semibold" />
                </label>
                <button type="submit"
                        className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors">
                  Enviar comprobante
                </button>
                <p className="text-[11px] text-[#999] text-center">Queda "en revisión" hasta que la organización lo confirme.</p>
              </form>
            </div>
          </div>

          {/* Mis pagos */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-heading text-navy text-lg font-bold mb-3">Mis pagos</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#888] text-xs uppercase tracking-wide">
                  <th className="text-left font-semibold py-2">Fecha</th>
                  <th className="text-left font-semibold py-2">Comprobante</th>
                  <th className="text-center font-semibold py-2">Estado</th>
                  <th className="text-right font-semibold py-2">Monto</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-2.5">{p.fecha}</td>
                    <td className="py-2.5 text-[#555]">{p.ref}</td>
                    <td className="py-2.5 text-center">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        p.estado === "Confirmado" ? "bg-au-verde/15 text-[#1f7a52]" : "bg-au-amarillo/20 text-[#8a6d18]"
                      }`}>{p.estado}</span>
                    </td>
                    <td className="py-2.5 text-right font-heading font-semibold text-navy">{mxn(p.monto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Etapas */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-heading text-navy text-lg font-bold">Etapas de precio</h2>
            <p className="text-sm text-[#666] mt-0.5 mb-4">Entre más pronto pagas, menos cuesta.</p>
            <div className="grid gap-3 md:grid-cols-3">
              {precios.etapas.map((et) => (
                <div key={et.id}
                     className={`relative rounded-xl border p-4 ${et.id === DEMO.etapaId ? "border-gold ring-2 ring-gold/25" : "border-gray-200"}`}>
                  {et.id === DEMO.etapaId && (
                    <span className="absolute -top-2 right-3 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">TU ETAPA</span>
                  )}
                  <p className="font-heading font-bold text-navy text-sm">{et.nombre}</p>
                  <p className="font-heading font-extrabold text-navy text-xl my-1">{mxn(et.precio)}</p>
                  <p className="text-xs text-[#777]">{et.condicion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Dato({ k, v, mono }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
      <dt className="text-[#777]">{k}</dt>
      <dd className={`font-semibold text-navy text-right ${mono ? "font-mono text-xs" : ""}`}>{v}</dd>
    </div>
  );
}
