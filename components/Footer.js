import Link from "next/link";
import Image from "next/image";
import { site } from "@/site.config";

export default function Footer() {
  return (
    <footer className="bg-[#04122b] text-white/70">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image src="/logo-isotipo.png" alt="América Unida" width={70} height={90}
                   className="h-14 md:h-16 w-auto" />
            <div>
              <p className="font-heading font-extrabold tracking-widest text-white text-lg">AMÉRICA UNIDA</p>
              <p className="font-heading text-gold text-sm tracking-[0.14em]">BAJA CALIFORNIA 2027</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">Zona 1 · CMI</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link href="/inscripciones" className="hover:text-white">Inscríbete</Link>
            <Link href="/programa" className="hover:text-white">Programa</Link>
            <Link href="/conferencias" className="hover:text-white">Conferencias</Link>
            <Link href="/hotel" className="hover:text-white">Hotel Sede</Link>
            {site.email && <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} América Unida · Baja California 2027. Todos los derechos reservados.</p>
          <p>{site.fechasTexto} · {site.sedeTexto}</p>
        </div>
      </div>
    </footer>
  );
}
