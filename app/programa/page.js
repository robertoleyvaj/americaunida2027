import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Programa from "@/components/Programa";
import { site } from "@/site.config";

export const metadata = {
  title: "Programa · América Unida Baja California 2027",
  description: "Programa preliminar del encuentro: cuatro días de conferencias, mesas de trabajo, Tenida Blanca, Cena de Gala y la experiencia opcional del Valle de Guadalupe.",
};

export default function ProgramaPage({ searchParams }) {
  const d = searchParams?.d;
  return (
    <main>
      <Navbar />
      {/* Encabezado de página */}
      <section className="bg-navy text-white pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="kicker text-gold">Programa</p>
          <h1 className="mt-3 font-heading text-4xl md:text-6xl font-extrabold">Cuatro días de encuentro</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Trabajo, fraternidad y experiencia Baja California. {site.fechasTexto}. Programa preliminar, sujeto a confirmación en sedes y horarios.
          </p>
        </div>
      </section>

      <Programa initial={d} hideHeader />
      <Footer />
    </main>
  );
}
