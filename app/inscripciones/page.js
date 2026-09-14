"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MiniTopbar from "@/components/MiniTopbar";
import DemoBanner from "@/components/DemoBanner";
import { precios } from "@/site.config";
import { mxn, etapaVigente } from "@/lib/pricing";
import { supabase } from "@/lib/supabase";

function traducirError(msg = "") {
  const m = msg.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered")) return "Ese correo ya tiene una cuenta. Inicia sesión.";
  if (m.includes("password") && m.includes("6")) return "La contraseña debe tener al menos 6 caracteres.";
  if (m.includes("valid email") || m.includes("invalid email")) return "El correo no es válido.";
  return "No se pudo crear la cuenta: " + msg;
}

export default function Inscripciones() {
  const router = useRouter();
  const etapa = etapaVigente();
  const idx = precios.etapas.findIndex((e) => e.id === etapa.id);
  const ahorro = precios.oficial - etapa.precio;
  const pct = Math.round((ahorro / precios.oficial) * 100);

  const [valle, setValle] = useState(false);
  const [form, setForm] = useState({ nombre: "", grado: "Maestro", logiaSimbolica: "", granLogia: "", telefono: "", email: "", pass: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const total = etapa.precio + (valle ? precios.valleGuadalupe : 0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // 1) Crear el acceso (correo + contraseña)
    const { data, error: signErr } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.pass,
    });
    if (signErr) { setError(traducirError(signErr.message)); setLoading(false); return; }
    const user = data.user;
    if (!user) { setError("No se pudo crear la cuenta. Intenta de nuevo."); setLoading(false); return; }
    if (!data.session) {
      // Confirmación de correo activada: no hay sesión para guardar los datos.
      setError("Tu cuenta se creó, pero falta confirmar tu correo. Revisa tu bandeja y luego inicia sesión.");
      setLoading(false);
      return;
    }
    // 2) Guardar los datos de la inscripción
    const { error: insErr } = await supabase.from("inscripciones").insert({
      id: user.id,
      nombre: form.nombre,
      grado: form.grado,
      logia_simbolica: form.logiaSimbolica,
      gran_logia: form.granLogia,
      telefono: form.telefono,
      email: form.email.trim(),
      etapa: etapa.id,
      total: etapa.precio,
      valle,
    });
    if (insErr) { setError("Cuenta creada, pero no se guardaron los datos: " + insErr.message); setLoading(false); return; }
    router.push("/panel");
  };

  return (
    <main className="min-h-screen bg-cloud">
      <DemoBanner />
      <MiniTopbar right={<Link href="/ingresar" className="hover:text-white">Ya tengo cuenta</Link>} />

      <div className="mx-auto max-w-5xl px-5 md:px-8 py-10 md:py-14 grid gap-8 md:grid-cols-2">
        {/* Izquierda */}
        <div>
          <p className="kicker text-gold-dark">Inscripción</p>
          <h1 className="mt-2 font-heading text-navy text-3xl md:text-4xl font-bold">Asegura tu lugar</h1>

          {/* Tarjeta de descuento de pronto pago */}
          <div className="mt-5 rounded-2xl p-6 text-white bg-gradient-to-br from-navy to-navy-800 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
            <div className="relative">
              <span className="inline-block bg-au-verde/20 text-[#7ee0ad] border border-au-verde/40 text-[11px] font-bold px-3 py-1 rounded-full">
                🔥 Precio de {etapa.nombre.toLowerCase()} · por tiempo limitado
              </span>
              <div className="mt-4 flex items-end gap-3 flex-wrap">
                {ahorro > 0 && <span className="text-white/50 text-2xl font-heading line-through">{mxn(precios.oficial)}</span>}
                <span className="font-heading text-5xl font-extrabold text-gold leading-none">{mxn(etapa.precio)}</span>
                <span className="text-white/60 text-sm mb-1">MXN</span>
              </div>
              {ahorro > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 bg-au-verde text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  Ahorras {mxn(ahorro)} · {pct}% de descuento
                </div>
              )}
              <p className="mt-4 text-sm text-white/75 leading-relaxed">
                {etapa.id === "preventa"
                  ? "Aparta hoy con la mitad ($1,500) o paga completo — en ambos casos conservas este precio. Tienes hasta el 9 de agosto de 2027 para liquidar el resto a tu ritmo."
                  : "Este es el precio vigente hoy. Conforme avancen las fechas, el precio sube. Asegúralo apartando ahora."}
              </p>
            </div>
          </div>

          {/* Escalera de precios */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-2">El precio sube conforme pasan las fechas</p>
            <div className="space-y-2">
              {precios.etapas.map((et, i) => {
                const current = i === idx;
                const past = i < idx;
                const save = precios.oficial - et.precio;
                return (
                  <div key={et.id}
                       className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                         current ? "border-gold bg-white shadow-md ring-1 ring-gold/30"
                         : past ? "border-gray-200 bg-white/40 opacity-60" : "border-gray-200 bg-white/70"
                       }`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-lg ${current ? "text-gold-dark" : "text-gray-300"}`}>{current ? "●" : past ? "✓" : "○"}</span>
                      <div>
                        <p className="font-heading font-bold text-navy text-sm">{et.nombre} {current && <span className="text-gold-dark">· hoy</span>}</p>
                        <p className="text-xs text-[#777]">{et.condicion}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {save > 0 && <p className={`text-[11px] font-semibold ${current ? "text-au-verde" : "text-[#999]"}`}>ahorras {mxn(save)}</p>}
                      <p className="font-heading font-extrabold text-navy">{mxn(et.precio)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add-on Valle */}
          <button type="button" onClick={() => setValle((v) => !v)}
                  className={`mt-5 w-full text-left rounded-2xl border p-5 transition-all ${
                    valle ? "border-gold bg-white shadow-md ring-1 ring-gold/30" : "border-gray-200 bg-white hover:shadow-sm"
                  }`}>
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 h-5 w-5 flex-none rounded-md border flex items-center justify-center ${valle ? "bg-gold border-gold" : "border-gray-300"}`}>
                {valle && <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-navy" fill="currentColor"><path d="M7.5 13.5 4 10l1.4-1.4 2.1 2.1L14.6 3.6 16 5z" /></svg>}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading font-bold text-navy text-sm">Experiencia Valle de Guadalupe — Domingo 15</p>
                  <span className="font-heading font-extrabold text-gold-dark whitespace-nowrap">+{mxn(precios.valleGuadalupe)}</span>
                </div>
                <p className="text-xs text-[#666] mt-1">Transporte + recorrido por 3–4 vinícolas + catas + visita gastronómica. Extiende tu experiencia en Baja California.</p>
                <p className="text-[11px] text-[#999] mt-1.5">La comida en el restaurante y las compras personales no están incluidas.</p>
              </div>
            </div>
          </button>

          <div className="mt-4 rounded-xl bg-navy text-white/90 p-4 text-sm">
            <p className="font-semibold text-white mb-1">Pago por transferencia</p>
            <p>Pagas por transferencia a la cuenta de la Gran Logia y subes tu comprobante en tu panel. Puedes pagar todo de una vez o en abonos, a tu ritmo.</p>
          </div>
        </div>

        {/* Derecha */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <p className="kicker text-gold-dark text-[11px]">Resumen</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#555]">Precio de lista</span>
                <span className="text-[#999] line-through">{mxn(precios.oficial)}</span>
              </div>
              {ahorro > 0 && (
                <div className="flex justify-between">
                  <span className="text-au-verde">Descuento {etapa.nombre.toLowerCase()}</span>
                  <span className="text-au-verde font-medium">−{mxn(ahorro)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#555]">Inscripción · {etapa.nombre}</span>
                <span className="font-medium text-navy">{mxn(etapa.precio)}</span>
              </div>
              {valle && (
                <div className="flex justify-between">
                  <span className="text-[#555]">Experiencia Valle de Guadalupe</span>
                  <span className="font-medium text-navy">{mxn(precios.valleGuadalupe)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                <span className="font-heading font-bold text-navy">Total</span>
                <span className="font-heading font-extrabold text-navy text-lg">{mxn(total)} <span className="text-xs text-[#999]">MXN</span></span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-7">
            <h2 className="font-heading text-navy text-xl font-bold">Crea tu cuenta</h2>
            <p className="text-sm text-[#666] mt-1">Con tu cuenta podrás ver tu saldo y pagar a tu ritmo.</p>
            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <Field label="Nombre completo" value={form.nombre} onChange={set("nombre")} required />
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-[#555]">Grado</span>
                  <select value={form.grado} onChange={set("grado")}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none">
                    <option>Aprendiz</option>
                    <option>Compañero</option>
                    <option>Maestro</option>
                    <option>Otro</option>
                  </select>
                </label>
                <Field label="Teléfono" type="tel" value={form.telefono} onChange={set("telefono")} required />
              </div>
              <Field label="Logia simbólica" value={form.logiaSimbolica} onChange={set("logiaSimbolica")} required />
              <Field label="Gran Logia" value={form.granLogia} onChange={set("granLogia")} required />
              <Field label="Correo electrónico" type="email" value={form.email} onChange={set("email")} required />
              <Field label="Contraseña (mínimo 6 caracteres)" type="password" value={form.pass} onChange={set("pass")} required />

              {error && <p className="text-sm text-au-rojo bg-au-rojo/10 border border-au-rojo/30 rounded-lg px-3 py-2">{error}</p>}

              <button type="submit" disabled={loading}
                      className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors mt-2 disabled:opacity-60">
                {loading ? "Creando cuenta…" : "Crear cuenta y continuar"}
              </button>
              <p className="text-xs text-[#999] text-center">
                ¿Ya tienes cuenta? <Link href="/ingresar" className="text-au-azul underline">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[#555]">{label}</span>
      <input type={type} value={value} onChange={onChange} required={required}
             className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
    </label>
  );
}
