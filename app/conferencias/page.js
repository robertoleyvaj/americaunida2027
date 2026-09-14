import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PreguntaForm from "@/components/PreguntaForm";

export const metadata = {
  title: "Conferencias · América Unida Baja California 2027",
  description: "Conferencias magistrales del encuentro. Temas y ponentes por confirmar. Deja tu pregunta previa para los ponentes.",
};

const colores = ["#3FA9F5", "#2F9E6B", "#E8842B"];

export default function ConferenciasPage() {
  return (
    <main>
      <Navbar />
      <PageHeader kicker="Conferencias" title="Conferencias magistrales">
        Una jornada académica para pensar juntos el presente y el futuro de la Masonería. Temas y ponentes por confirmar; muy pronto los publicaremos aquí.
      </PageHeader>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* Conferencias por confirmar */}
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <div key={n} className="rounded-2xl border border-gray-100 bg-cloud p-6 flex flex-col">
                <span className="h-1.5 w-10 rounded-full mb-5" style={{ backgroundColor: colores[i] }} />
                <p className="font-heading font-extrabold text-3xl" style={{ color: colores[i] }}>0{n}</p>
                <h2 className="mt-2 font-heading font-bold text-navy text-lg">Conferencia {n}</h2>
                <p className="mt-2 inline-block text-xs font-semibold text-gold-dark bg-gold/15 rounded-full px-3 py-1 w-fit">Tema por confirmar</p>
                <p className="mt-3 text-sm text-[#777] leading-relaxed flex-1">El tema y el enfoque de esta conferencia se anunciarán próximamente.</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="h-10 w-10 rounded-full bg-navy/5 flex items-center justify-center text-navy/40">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Ponente por anunciar</p>
                    <p className="text-xs text-[#999]">Próximamente</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-navy/5 border border-navy/10 p-4 text-sm text-[#555]">
            Estamos definiendo los temas y confirmando a los ponentes. Muy pronto publicaremos aquí el programa completo de conferencias.
          </div>

          {/* Pregunta previa */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 items-start">
            <div>
              <p className="kicker text-gold-dark">Participa</p>
              <h2 className="mt-3 font-heading text-navy text-2xl md:text-3xl font-bold">Tu voz también construye las conferencias</h2>
              <p className="mt-4 text-[#4a4a4a] leading-relaxed">
                Queremos que las conferencias respondan a lo que realmente te interesa. Déjanos una pregunta o comentario previo y lo tomaremos en cuenta al definir los temas y preparar las ponencias.
              </p>
              <p className="mt-3 text-sm text-[#777]">Tu pregunta se envía directo al equipo organizador.</p>
            </div>
            <PreguntaForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
