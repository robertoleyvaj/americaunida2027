const items = [
  {
    color: "#2453C6",
    titulo: "Integración y fraternidad",
    texto:
      "Reunir hermanos de distintas jurisdicciones y regiones para convivir y fortalecer vínculos.",
  },
  {
    color: "#2F9E6B",
    titulo: "Conferencias e ideas",
    texto:
      "Tres grandes temas presentados por ponentes, para pensar juntos el futuro de la fraternidad.",
  },
  {
    color: "#E8842B",
    titulo: "Mesas de trabajo",
    texto:
      "Análisis en mesas simultáneas que producen conclusiones conjuntas de América Unida.",
  },
  {
    color: "#7C4DB8",
    titulo: "Experiencia Baja California",
    texto:
      "Vivir la sede: mar, cultura fronteriza, gastronomía y el Valle de Guadalupe.",
  },
];

import Image from "next/image";

export default function QueEs() {
  return (
    <section id="encuentro" className="bg-white py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex justify-center mb-14">
          <Image src="/logo-isotipo.png" alt="América Unida"
                 width={200} height={260} className="h-32 md:h-40 w-auto" />
        </div>
        <div className="max-w-2xl">
          <p className="kicker text-gold-dark">Qué es América Unida</p>
          <h2 className="mt-3 font-heading text-navy text-3xl md:text-5xl font-bold">
            Un encuentro de integración y fraternidad
          </h2>
          <p className="mt-5 text-lg text-[#4a4a4a] leading-relaxed">
            América Unida es el encuentro de la Confederación Masónica
            Interamericana en su Zona 1. Un espacio para compartir ideas,
            analizar temas y estrechar lazos entre las regiones participantes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.titulo}
              className="group rounded-2xl border border-gray-100 bg-cloud p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <span
                className="block h-1.5 w-10 rounded-full mb-5"
                style={{ backgroundColor: it.color }}
              />
              <h3 className="font-heading font-bold text-navy text-lg">
                {it.titulo}
              </h3>
              <p className="mt-2 text-sm text-[#555] leading-relaxed">
                {it.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
