"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MiniTopbar from "@/components/MiniTopbar";
import { precios, cuentaBancaria as BANCO } from "@/site.config";
import { mxn } from "@/lib/pricing";
import { supabase } from "@/lib/supabase";

const ESTADOS = {
  en_revision: { txt: "En revisión", cls: "bg-au-amarillo/20 text-[#8a6d18]" },
  confirmado: { txt: "Confirmado", cls: "bg-au-verde/15 text-[#1f7a52]" },
  rechazado: { txt: "Rechazado", cls: "bg-au-rojo/15 text-[#a12a2a]" },
};

export default function Panel() {
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [insc, setInsc] = useState(null);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [file, setFile] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState("");

  async function cargarPagos(id) {
    const { data } = await supabase.from("pagos").select("*").eq("user_id", id).order("created_at", { ascending: false });
    setPagos(data || []);
  }

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/ingresar"); return; }
      const id = session.user.id;
      setUid(id);
      const { data: ins } = await supabase.from("inscripciones").select("*").eq("id", id).single();
      setInsc(ins || null);
      await cargarPagos(id);
      setLoading(false);
    })();
  }, [router]);

  const logout = async () => { await supabase.auth.signOut(); router.push("/"); };

  const enviar = async (e) => {
    e.preventDefault();
    setMsg("");
    const m = parseInt(String(monto).replace(/[^0-9]/g, ""), 10);
    if (!m) { setMsg("Escribe el monto que pagaste."); return; }
    if (!file) { setMsg("Adjunta tu comprobante (foto o PDF)."); return; }
    setEnviando(true);
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${uid}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage.from("comprobantes").upload(path, file);
    if (upErr) { setMsg("No se pudo subir el comprobante: " + upErr.message); setEnviando(false); return; }
    const { error: insErr } = await supabase.from("pagos").insert({
      user_id: uid, monto: m, fecha: fecha || null, comprobante_url: path, estado: "en_revision",
    });
    if (insErr) { setMsg("No se pudo registrar el pago: " + insErr.message); setEnviando(false); return; }
    setMonto(""); setFecha(""); setFile(null);
    setMsg("¡Comprobante enviado! Queda en revisión.");
    await cargarPagos(uid);
    setEnviando(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-cloud">
        <MiniTopbar right={<span />} />
        <div className="mx-auto max-w-4xl px-5 py-20 text-center text-[#666]">Cargando tu panel…</div>
      </main>
    );
  }

  if (!insc) {
    return (
      <main className="min-h-screen bg-cloud">
        <MiniTopbar right={<button onClick={logout} className="hover:text-white">Cerrar sesión</button>} />
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <p className="text-navy font-heading font-bold text-lg">No encontramos tu inscripción</p>
          <p className="text-[#666] text-sm mt-2">Tu cuenta existe pero no tiene datos de inscripción. Escríbenos y lo resolvemos.</p>
          <Link href="/inscripciones" className="inline-block mt-5 rounded-full bg-gold px-6 py-2.5 text-navy font-semibold">Ir a inscripción</Link>
        </div>
      </main>
    );
  }

  const etapaObj = precios.etapas.find((e) => e.id === insc.etapa) || precios.etapas[0];
  const total = (insc.total || 0) + (insc.valle ? precios.valleGuadalupe : 0);
  const pagado = pagos.filter((p) => p.estado === "confirmado").reduce((a, p) => a + p.monto, 0);
  const enRevision = pagos.filter((p) => p.estado === "en_revision").reduce((a, p) => a + p.monto, 0);
  const restante = Math.max(0, total - pagado);
  const pct = total ? Math.round((pagado / total) * 100) : 0;
  const preventaOK = insc.etapa === "preventa" && pagado >= (insc.total || 0) / 2;
  const nombreCorto = (insc.nombre || "").split(" ")[0] || "hermano";

  return (
    <main className="min-h-screen bg-cloud">
      <MiniTopbar right={<button onClick={logout} className="hover:text-white">Cerrar sesión</button>} />

      <div className="mx-auto max-w-4xl px-5 md:px-8 py-8 md:py-12">
        <p className="kicker text-gold-dark">Mi inscripción</p>
        <h1 className="mt-1 font-heading text-navy text-2xl md:text-3xl font-bold">Hola, {nombreCorto} 👋</h1>
        <p className="text-[#666] text-sm mt-1">Aquí ves tu saldo, pagas por transferencia y subes tus comprobantes.</p>

        <div className="mt-6 space-y-5">
          {/* Saldo */}
          <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-navy to-navy-800">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {preventaOK
                ? <span className="inline-block bg-gold text-navy text-[11px] font-bold px-3 py-1 rounded-full">🏷️ Preventa asegurada</span>
                : <span className="inline-block bg-white/10 text-white text-[11px] font-semibold px-3 py-1 rounded-full">Etapa: {etapaObj.nombre}</span>}
              <span className="inline-block bg-white/10 text-white text-[11px] font-semibold px-3 py-1 rounded-full">Folio {insc.folio || "—"}</span>
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
                <p className="font-heading text-lg font-bold">{mxn(total)} MXN</p>
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
                  <p className="font-heading font-extrabold text-navy text-lg mt-0.5">{insc.folio || "—"}</p>
                  <p className="text-[11px] text-[#777] mt-1">Pon tu folio en el concepto para que identifiquemos tu pago.</p>
                </div>
              </dl>
              <p className="mt-4 text-xs text-[#999]">Puedes pagar todo de una vez o en abonos: cada transferencia se registra por separado.</p>
            </div>

            {/* Registrar pago */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <h2 className="font-heading text-navy text-lg font-bold">Registrar un pago</h2>
              <p className="text-sm text-[#666] mt-0.5 mb-4">Ya que transferiste, sube tu comprobante.</p>
              <form onSubmit={enviar} className="space-y-3">
                <label className="block">
                  <span className="text-xs font-medium text-[#555]">Monto pagado</span>
                  <input value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="$500"
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
                         onChange={(e) => setFile(e.target.files?.[0] || null)}
                         className="mt-1 w-full text-xs text-[#555] file:mr-3 file:rounded-full file:border-0 file:bg-navy file:text-white file:px-4 file:py-2 file:text-xs file:font-semibold" />
                </label>
                {msg && <p className="text-xs text-navy bg-cloud rounded-lg px-3 py-2">{msg}</p>}
                <button type="submit" disabled={enviando}
                        className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors disabled:opacity-60">
                  {enviando ? "Enviando…" : "Enviar comprobante"}
                </button>
                <p className="text-[11px] text-[#999] text-center">Queda "en revisión" hasta que la organización lo confirme.</p>
              </form>
            </div>
          </div>

          {/* Mis pagos */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-heading text-navy text-lg font-bold mb-3">Mis pagos</h2>
            {pagos.length === 0 ? (
              <p className="text-sm text-[#888]">Aún no has registrado pagos. Cuando transfieras, sube tu comprobante arriba.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#888] text-xs uppercase tracking-wide">
                    <th className="text-left font-semibold py-2">Fecha</th>
                    <th className="text-center font-semibold py-2">Estado</th>
                    <th className="text-right font-semibold py-2">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((p) => {
                    const est = ESTADOS[p.estado] || ESTADOS.en_revision;
                    return (
                      <tr key={p.id} className="border-t border-gray-100">
                        <td className="py-2.5">{p.fecha || new Date(p.created_at).toLocaleDateString("es-MX")}</td>
                        <td className="py-2.5 text-center">
                          <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${est.cls}`}>{est.txt}</span>
                        </td>
                        <td className="py-2.5 text-right font-heading font-semibold text-navy">{mxn(p.monto)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
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
