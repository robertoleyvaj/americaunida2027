import Link from "next/link";

const dias = [
  { key: "jue", dia: "Jueves 12", color: "#3FA9F5", titulo: "Bienvenida", puntos: "Registro · Kit · Rompehielo" },
  { key: "vie", dia: "Viernes 13", color: "#2F9E6B", titulo: "Conferencias", puntos: "Inauguración · 3 conferencias · Gran Tenida Blanca" },
  { key: "sab", dia: "Sábado 14", color: "#E8842B", titulo: "Trabajo y Gala", puntos: "Mesas · Conclusiones · Clausura · Cena de Gala" },
  { key: "dom", dia: "Domingo 15", color: "#7C4DB8", titulo: "Experiencia opcional", puntos: "Valle de Guadalupe · Vinícolas", precio: "+$600" },
];

export default function ProgramaTeaser() {
  return (
    <section id="programa" className="bg-white py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="kicker text-gold-dark">Qué vas a vivir</p>
            <h2 className="mt-3 font-heading text-navy text-3xl md:text-5xl font-bold">Cuatro días de encuentro</h2>
            <p className="mt-5 text-lg text-[#4a4a4a] leading-relaxed">
              Trabajo, fraternidad y experiencia Baja California. Programa preliminar, sujeto a confirmación.
            </p>
          </div>
          <Link href="/programa"
                className="hidden md:inline-block rounded-full bg-navy px-6 py-3 text-white text-sm font-semibold hover:bg-navy-800 transition-colors">
            Ver programa completo →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {dias.map((d) => (
            <Link key={d.key} href={`/programa?d=${d.key}`}
                  className="group text-left relative pl-5 pr-4 py-4 rounded-xl border border-gray-100 hover:bg-cloud hover:shadow-md transition-all">
              <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full" style={{ backgroundColor: d.color }} />
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold" style={{ color: d.color }}>{d.dia}</p>
                {d.precio && <span className="text-[11px] font-bold text-gold-dark bg-gold/15 rounded-full px-2 py-0.5">{d.precio}</span>}
              </div>
              <h3 className="font-heading font-bold text-navy text-lg mt-0.5">{d.titulo}</h3>
              <p className="mt-1.5 text-xs text-[#666] leading-relaxed">{d.puntos}</p>
              <span className="mt-2 inline-block text-[11px] font-semibold text-au-azul group-hover:text-gold-dark">Ver detalle →</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/programa"
                className="inline-block rounded-full bg-navy px-6 py-3 text-white text-sm font-semibold">
            Ver programa completo →
          </Link>
        </div>
      </div>
    </section>
  );
}
