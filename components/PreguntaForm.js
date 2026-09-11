"use client";

import { useState } from "react";
import { site } from "@/site.config";

const conferencias = [
  "1 · AJEFismo y relevo generacional",
  "2 · De la Logia a la institución",
  "3 · Regularidad y reconocimiento masónico",
  "General / todas",
];

export default function PreguntaForm() {
  const [f, setF] = useState({ nombre: "", correo: "", tema: conferencias[0], mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Pregunta previa · ${f.tema}`;
    const body =
      `Nombre: ${f.nombre}\n` +
      `Correo: ${f.correo}\n` +
      `Conferencia: ${f.tema}\n\n` +
      `Pregunta / comentario:\n${f.mensaje}\n`;
    const url = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setEnviado(true);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-7">
      <h3 className="font-heading text-navy text-xl font-bold">Deja tu pregunta previa</h3>
      <p className="text-sm text-[#666] mt-1">
        ¿Hay algo que te gustaría que se abordara? Compártelo y los ponentes podrán tomarlo en cuenta al preparar su conferencia.
      </p>

      {enviado ? (
        <div className="mt-5 rounded-xl bg-au-verde/10 border border-au-verde/30 p-4 text-sm text-[#1f7a52]">
          Se abrió tu correo para enviar la pregunta a <b>{site.email}</b>. Si no se abrió, escríbenos directamente a ese correo. ¡Gracias!
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-[#555]">Nombre</span>
              <input value={f.nombre} onChange={set("nombre")} required
                     className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[#555]">Correo</span>
              <input type="email" value={f.correo} onChange={set("correo")} required
                     className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium text-[#555]">Conferencia</span>
            <select value={f.tema} onChange={set("tema")}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none">
              {conferencias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#555]">Tu pregunta o comentario</span>
            <textarea value={f.mensaje} onChange={set("mensaje")} required rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none resize-none" />
          </label>
          <button type="submit"
                  className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors">
            Enviar pregunta
          </button>
          <p className="text-[11px] text-[#999] text-center">Se enviará a {site.email}.</p>
        </form>
      )}
    </div>
  );
}
