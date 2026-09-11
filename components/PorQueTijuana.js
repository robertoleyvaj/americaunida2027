const cards = [
  { t: "La frontera", s: "El Arco, la Zona Río y la frontera más viva de América.", grad: "from-au-azul/80 to-navy" },
  { t: "Rosarito & Pacífico", s: "Resort frente al mar y atardeceres sobre el Pacífico.", grad: "from-au-azulclaro/80 to-navy" },
  { t: "Valle de Guadalupe", s: "Vinícolas, gastronomía y experiencia enológica.", grad: "from-au-morado/70 to-navy" },
  { t: "Cultura fronteriza", s: "Gente diversa, moderna y hospitalaria.", grad: "from-au-naranja/70 to-navy" },
];

export default function PorQueTijuana() {
  return (
    <section id="baja-california" className="bg-cloud py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="kicker text-gold-dark">Por qué Baja California</p>
          <h2 className="mt-3 font-heading text-navy text-3xl md:text-5xl font-bold">
            La sede también es la experiencia
          </h2>
          <p className="mt-5 text-lg text-[#4a4a4a] leading-relaxed">
            Baja California recibe a América con mar, frontera, modernidad y una
            de las mejores mesas del continente. Venir es parte del encuentro.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.t}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.grad} p-6 min-h-[190px] flex flex-col justify-end text-white group`}
            >
              {/* Aquí puedes poner una foto de fondo más adelante */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="relative">
                <h3 className="font-heading font-bold text-xl">{c.t}</h3>
                <p className="mt-1 text-sm text-white/80">{c.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
