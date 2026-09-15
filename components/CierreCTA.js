import Link from "next/link";
import { site } from "@/site.config";

export default function CierreCTA() {
  return (
    <section id="info" className="relative bg-navy py-24 md:py-32 scroll-mt-20 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[50vh] w-[80vw] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
        <h2 className="font-heading text-white text-3xl md:text-5xl font-extrabold leading-tight">
          {site.claim}
        </h2>
        <p className="mt-5 text-white/70 text-lg">
          Las inscripciones aún no abren. Déjanos tu correo y serás de los primeros en
          enterarte cuando llegue el momento.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/inscripciones"
                className="rounded-full bg-gold px-8 py-3.5 text-navy font-semibold hover:bg-white transition-colors">
            Registra tu interés
          </Link>
        </div>
        <p className="mt-6 text-white/40 text-sm">{site.fechasTexto} · {site.sedeTexto}</p>
      </div>
    </section>
  );
}
