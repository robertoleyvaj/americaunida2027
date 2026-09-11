import AuLines from "./AuLines";

export default function Manifiesto() {
  return (
    <section className="relative bg-navy py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0">
        <AuLines animate={false} className="opacity-40" />
      </div>
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <p className="kicker text-gold">Tierra de encuentro</p>
        <p className="mt-6 font-heading text-white text-2xl md:text-4xl leading-snug font-semibold">
          Baja California fue construida —y se sigue construyendo— por personas
          que llegaron de todas partes.
        </p>
        <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed">
          De muchos orígenes, un mismo encuentro. Aquí la frontera no divide:
          une. Por eso América Unida encuentra en Baja California el lugar
          perfecto para reunir a los hermanos de toda América.
        </p>
      </div>
    </section>
  );
}
