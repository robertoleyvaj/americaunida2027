"use client";

import { useState } from "react";
import Link from "next/link";
import MiniTopbar from "@/components/MiniTopbar";
import { site } from "@/site.config";
import { supabase } from "@/lib/supabase";
import { notificar } from "@/lib/notify";

export default function RegistraTuInteres() {
  const [form, setForm] = useState({ nombre: "", email: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    if (!nombre || !email) { setError("Escribe tu nombre y tu correo."); return; }
    setLoading(true);
    // Guardar en la lista de interesados
    const { error: insErr } = await supabase.from("interesados").insert({ nombre, email });
    if (insErr) {
      const m = (insErr.message || "").toLowerCase();
      if (m.includes("duplicate") || m.includes("unique")) {
        // Ya estaba en la lista: lo tratamos como éxito.
        setListo(true); setLoading(false); return;
      }
      setError("No se pudo registrar tu interés: " + insErr.message);
      setLoading(false);
      return;
    }
    // Aviso por correo (no bloquea)
    notificar({ tipo: "interes", nombre, email });
    setListo(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-cloud">
      <MiniTopbar right={<Link href="/" className="hover:text-white">Volver al inicio</Link>} />

      <div className="mx-auto max-w-xl px-5 md:px-8 py-14 md:py-20">
        <div className="text-center">
          <p className="kicker text-gold-dark">Próximamente</p>
          <h1 className="mt-2 font-heading text-navy text-3xl md:text-4xl font-bold">
            Las inscripciones aún no abren
          </h1>
          <p className="mt-4 text-[#4a4a4a] leading-relaxed">
            Estamos afinando los últimos detalles del encuentro. Déjanos tu nombre y
            tu correo, y serás de los primeros en enterarte cuando abramos el registro,
            con la fecha, la sede y los precios oficiales.
          </p>
        </div>

        {listo ? (
          <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-au-verde/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-au-verde" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></svg>
            </div>
            <h2 className="mt-4 font-heading text-navy text-xl font-bold">¡Listo, quedaste registrado!</h2>
            <p className="mt-2 text-sm text-[#666]">
              Te avisaremos por correo en cuanto abramos las inscripciones. Gracias por tu interés
              en <b>América Unida · Baja California 2027</b>.
            </p>
            <Link href="/" className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-white text-sm font-semibold hover:bg-navy-800 transition-colors">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-[#555]">Nombre</span>
                <input type="text" value={form.nombre} onChange={set("nombre")} required
                       className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-[#555]">Correo electrónico</span>
                <input type="email" value={form.email} onChange={set("email")} required
                       className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
              </label>

              {error && <p className="text-sm text-au-rojo bg-au-rojo/10 border border-au-rojo/30 rounded-lg px-3 py-2">{error}</p>}

              <button type="submit" disabled={loading}
                      className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors disabled:opacity-60">
                {loading ? "Registrando…" : "Registrar mi interés"}
              </button>
              <p className="text-xs text-[#999] text-center">
                Solo usaremos tu correo para avisarte sobre el encuentro.
              </p>
            </form>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-[#999]">{site.fechasTexto} · {site.sedeTexto}</p>
      </div>
    </main>
  );
}
