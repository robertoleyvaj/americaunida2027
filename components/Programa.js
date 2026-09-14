"use client";

import { useState } from "react";
import Link from "next/link";
import { precios } from "@/site.config";
import { mxn } from "@/lib/pricing";

// Ícono discreto de vestimenta (percha)
function HangerIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 6.5a1.6 1.6 0 1 1 1.6 1.6c-.6 0-1.1.5-1.1 1.1v.5L21 14c.6.4.9 1 .9 1.6 0 1-.8 1.6-1.8 1.6H4c-1 0-1.8-.6-1.8-1.6 0-.6.3-1.2.9-1.6l8.5-4.3"
            stroke="currentColor" strokeWidth="1.6" strokelinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DressChip({ label, tone = "navy" }) {
  const tones = {
    navy: "bg-navy/5 text-navy border-navy/10",
    gold: "bg-gold/15 text-gold-dark border-gold/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>
      <HangerIcon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

const dias = [
  {
    key: "jue",
    dia: "Jueves 12",
    titulo: "Bienvenida",
    color: "#3FA9F5",
    resumen: ["Registro", "Kit", "Rompehielo"],
    enfoque: "Llegada a Baja California, registro y primera convivencia.",
    sede: "Rosarito · hotel sede por confirmar",
    agenda: [
      "Llegada de participantes y check-in en el hotel sede (Rosarito).",
      "Registro y acreditaciones.",
      "Entrega del kit del congresista.",
      "Tiempo libre.",
      "Por la noche: Rompehielo América Unida 2027 — convivencia relajada en un espacio exterior del hotel sede.",
    ],
    dress: [{ label: "Casual elegante", tone: "navy" }],
    dressNote: "Viaja cómodo durante el día y cámbiate para una recepción relajada por la noche. Sin traje ni corbata.",
  },
  {
    key: "vie",
    dia: "Viernes 13",
    titulo: "Conferencias",
    color: "#2F9E6B",
    resumen: ["Inauguración", "3 conferencias", "Coffee break", "Gran Tenida Blanca"],
    enfoque: "Jornada académica principal.",
    sede: "Conferencias en centro de convenciones cercano a Rosarito · Gran Tenida Blanca en templo de Rosarito · sedes por confirmar",
    agenda: [
      "Traslado desde el hotel sede.",
      "Inauguración oficial.",
      "Tres conferencias magistrales.",
      "Coffee break.",
      "Comida.",
      "Regreso / tiempo libre.",
      "Tarde-noche: Gran Tenida Blanca, prevista en un templo de Rosarito.",
      "Después de la Tenida Blanca: noche libre.",
    ],
    conferencias: [
      "Tema por confirmar.",
      "Tema por confirmar.",
      "Tema por confirmar.",
    ],
    dress: [
      { label: "Conferencias · Semiformal", tone: "navy" },
      { label: "Gran Tenida Blanca · Formal", tone: "gold" },
    ],
  },
  {
    key: "sab",
    dia: "Sábado 14",
    titulo: "Trabajo y Gala",
    color: "#E8842B",
    resumen: ["Mesas de trabajo", "Plenaria", "Conclusiones", "Clausura", "Cena de Gala"],
    enfoque: "Continuación natural de las conferencias: del análisis a las conclusiones, y el gran cierre social.",
    sede: "Mesas cerca de Rosarito · Clausura y Cena de Gala en Baja California · sedes por confirmar",
    agenda: [
      "Inicio un poco más tarde que el viernes.",
      "Tres mesas de trabajo simultáneas, ligadas a los tres temas de las conferencias.",
      "Cada participante se integra a una mesa.",
      "Desarrollo de propuestas y conclusiones.",
      "Plenaria general.",
      "Presentación de las conclusiones de América Unida 2027.",
      "Comida ligera.",
      "Tiempo libre y preparación.",
      "Traslado a la sede de la Cena de Gala.",
      "Clausura oficial.",
      "Cena de Gala América Unida Baja California 2027 — música, convivencia y cierre del encuentro.",
    ],
    dress: [
      { label: "Mesas de trabajo · Semiformal", tone: "navy" },
      { label: "Cena de Gala · Gala / formal de noche", tone: "gold" },
    ],
    gala: true,
  },
  {
    key: "dom",
    dia: "Domingo 15",
    titulo: "Experiencia opcional",
    color: "#7C4DB8",
    resumen: ["Valle de Guadalupe", "Vinícolas", "Gastronomía"],
    precio: precios.valleGuadalupe,
    enfoque: "Extiende tu experiencia en Baja California.",
    sede: "Valle de Guadalupe",
    opcional: true,
    incluye: [
      "Transporte durante todo el recorrido.",
      "Visita a aproximadamente 3–4 vinícolas.",
      "Catas / degustaciones contempladas en el recorrido.",
      "Recorrido por el Valle de Guadalupe.",
      "Visita a un restaurante.",
      "Regreso en transporte del evento.",
    ],
    noIncluye: "La comida en el restaurante no está incluida (cada quien paga su consumo). Las compras en vinícolas o establecimientos corren por cuenta del participante.",
    dress: [{ label: "Casual y cómodo", tone: "navy" }],
    dressNote: "Ropa adecuada para caminar, clima del Valle y actividades al aire libre.",
  },
];

export default function Programa({ initial, hideHeader }) {
  const valid = dias.some((d) => d.key === initial) ? initial : "jue";
  const [active, setActive] = useState(valid);
  const dSel = dias.find((d) => d.key === active);

  return (
    <section id="programa" className={`bg-white scroll-mt-20 ${hideHeader ? "pt-10 pb-20 md:pt-12 md:pb-28" : "py-20 md:py-28"}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {!hideHeader && (
          <div className="max-w-2xl">
            <p className="kicker text-gold-dark">Qué vas a vivir</p>
            <h2 className="mt-3 font-heading text-navy text-3xl md:text-5xl font-bold">Cuatro días de encuentro</h2>
            <p className="mt-5 text-lg text-[#4a4a4a] leading-relaxed">
              Toca cada jornada para ver el detalle. Programa preliminar, sujeto a confirmación en sedes y horarios.
            </p>
          </div>
        )}
        <p className="text-sm text-[#888] mb-2">Toca cada jornada para ver su detalle.</p>

        {/* Las 4 "puertas" */}
        <div className="grid gap-4 md:grid-cols-4">
          {dias.map((d) => {
            const on = d.key === active;
            return (
              <button
                key={d.key}
                onClick={() => setActive(d.key)}
                aria-expanded={on}
                className={`text-left relative pl-5 pr-4 py-4 rounded-xl border transition-all ${
                  on ? "border-transparent bg-cloud shadow-md ring-1 ring-gold/40" : "border-gray-100 hover:bg-cloud/60"
                }`}
              >
                <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full" style={{ backgroundColor: d.color }} />
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold" style={{ color: d.color }}>{d.dia}</p>
                  {d.precio && (
                    <span className="text-[11px] font-bold text-gold-dark bg-gold/15 rounded-full px-2 py-0.5">
                      +{mxn(d.precio)}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mt-0.5">{d.titulo}</h3>
                <p className="mt-1.5 text-xs text-[#666] leading-relaxed">{d.resumen.join(" · ")}</p>
                <span className={`mt-2 inline-block text-[11px] font-semibold ${on ? "text-gold-dark" : "text-au-azul"}`}>
                  {on ? "Viendo detalle ↓" : "Ver detalle →"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel de detalle */}
        {dSel && (
          <div key={dSel.key} className="mt-6 rounded-2xl border border-gray-100 bg-cloud p-6 md:p-8 animate-fadeup">
            <div className="flex flex-wrap items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: dSel.color }} />
              <h3 className="font-heading text-navy text-2xl font-bold">{dSel.dia} — {dSel.titulo}</h3>
              {dSel.opcional && (
                <span className="text-xs font-semibold text-gold-dark bg-gold/15 rounded-full px-3 py-1">Opcional · +{mxn(dSel.precio)} MXN</span>
              )}
              {dSel.gala && (
                <span className="text-xs font-semibold text-white bg-navy rounded-full px-3 py-1">Gran cierre</span>
              )}
            </div>
            <p className="mt-2 text-[#4a4a4a]">{dSel.enfoque}</p>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {/* Agenda / incluye */}
              <div>
                <p className="kicker text-gold-dark text-[11px]">{dSel.opcional ? "Incluye" : "Agenda del día"}</p>
                <ul className="mt-3 space-y-2.5">
                  {(dSel.opcional ? dSel.incluye : dSel.agenda).map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[#3a3a3a]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full flex-none" style={{ backgroundColor: dSel.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {dSel.noIncluye && (
                  <p className="mt-4 text-xs text-[#777] bg-white border border-gray-100 rounded-lg p-3">
                    <b>No incluye:</b> {dSel.noIncluye}
                  </p>
                )}
              </div>

              {/* Columna derecha: conferencias / vestimenta / sede */}
              <div className="space-y-6">
                {dSel.conferencias && (
                  <div>
                    <p className="kicker text-gold-dark text-[11px]">Conferencias magistrales</p>
                    <div className="mt-3 space-y-2.5">
                      {dSel.conferencias.map((c, i) => (
                        <div key={i} className="rounded-lg bg-white border border-gray-100 p-3">
                          <div className="flex gap-2">
                            <span className="font-heading font-bold text-gold-dark text-sm">{i + 1}.</span>
                            <div>
                              <p className="text-sm text-navy font-medium leading-snug">{c}</p>
                              <p className="text-[11px] text-[#999] mt-1">Ponente por anunciar</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="kicker text-gold-dark text-[11px]">Código de vestimenta</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dSel.dress.map((dr, i) => <DressChip key={i} label={dr.label} tone={dr.tone} />)}
                  </div>
                  {dSel.dressNote && <p className="mt-2 text-xs text-[#777]">{dSel.dressNote}</p>}
                </div>

                <div>
                  <p className="kicker text-gold-dark text-[11px]">Sede</p>
                  <p className="mt-2 text-sm text-[#3a3a3a]">{dSel.sede}</p>
                </div>

                {dSel.opcional && (
                  <Link href="/inscripciones"
                        className="inline-block rounded-full bg-gold px-6 py-2.5 text-navy text-sm font-semibold hover:bg-gold-dark hover:text-white transition-colors">
                    Agregar en mi inscripción
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
