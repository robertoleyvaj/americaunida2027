import Link from "next/link";
import Image from "next/image";
import { site } from "@/site.config";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Fondo cinematográfico */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-[#04122b]" />
        <div className="absolute -top-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-au-azul/20 blur-3xl" />
        <div className="absolute bottom-0 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Isotipo grande como elemento gráfico (Arco + América) */}
      <div className="pointer-events-none absolute right-[-6%] top-1/2 -translate-y-1/2 w-[52vw] max-w-[560px] opacity-25 md:opacity-40">
        <Image src="/logo-isotipo.png" alt="" width={560} height={720} className="w-full h-auto" priority />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-28 md:py-32 w-full">
        <div className="max-w-3xl">
          <p className="kicker text-gold animate-fadeup">Zona 1 · CMI · Encuentro internacional</p>

          <h1 className="mt-4 font-heading font-extrabold text-white leading-[0.95] animate-fadeup">
            <span className="block text-5xl sm:text-6xl md:text-8xl tracking-tight">AMÉRICA UNIDA</span>
            <span className="block mt-2 text-xl sm:text-2xl md:text-4xl text-gold tracking-[0.12em]">BAJA CALIFORNIA 2027</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-white/85 font-light max-w-2xl animate-fadeup">
            {site.claim}
          </p>

          <p className="mt-4 text-sm md:text-base text-white/60 animate-fadeup">
            {site.fechasTexto} · {site.sedeTexto}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fadeup">
            <a href="#encuentro"
               className="rounded-full bg-gold px-7 py-3 text-navy font-semibold hover:bg-white transition-colors">
              Conoce el encuentro
            </a>
            <Link href="/inscripciones"
                  className="rounded-full border border-white/30 px-7 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              Inscríbete
            </Link>
          </div>

          <div className="mt-12 animate-fadeup">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Cuenta regresiva</p>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
