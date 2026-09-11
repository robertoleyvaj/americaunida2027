import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PreguntaForm from "@/components/PreguntaForm";

export const metadata = {
  title: "Conferencias · América Unida Baja California 2027",
  description: "Tres conferencias magistrales sobre formación, gobernanza y regularidad masónica. Deja tu pregunta previa para los ponentes.",
};

const conferencias = [
  {
    n: 1, color: "#3FA9F5",
    titulo: "Del AJEFismo al relevo generacional: formación, continuidad y futuro de la Masonería",
    enfoque: "Formación de nuevas generaciones, transición generacional, relación entre juventud y Masonería, continuidad institucional y el AJEFismo como herramienta de formación.",
  },
  {
    n: 2, color: "#2F9E6B",
    titulo: "De la Logia a la institución: gobernanza, certeza jurídica y sostenibilidad de la Masonería contemporánea",
    enfoque: "Asociaciones civiles, personalidad jurídica, patrimonio, administración, obligaciones fiscales, transparencia, controles internos, continuidad administrativa y profesionalización de las instituciones masónicas.",
  },
  {
    n: 3, color: "#E8842B",
    titulo: "Regularidad y reconocimiento masónico: principios, jurisdicción y fraternidad",
    enfoque: "Diferencia entre regularidad y reconocimiento, Landmarks, soberanía, territorialidad, relaciones entre jurisdicciones, escisiones y mecanismos de convivencia y diálogo interjurisdiccional.",
  },
];

export default function ConferenciasPage() {
  return (
    <main>
      <Navbar />
      <PageHeader kicker="Conferencias" title="Tres grandes temas">
        Una jornada académica para pensar juntos el presente y el futuro de la Masonería. Los mismos tres temas se retoman después en las mesas de trabajo del sábado.
      </PageHeader>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* Las 3 conferencias */}
          <div className="grid gap-6 md:grid-cols-3">
            {conferencias.map((c) => (
              <div key={c.n} className="rounded-2xl border border-gray-100 bg-cloud p-6 flex flex-col">
                <span className="h-1.5 w-10 rounded-full mb-5" style={{ backgroundColor: c.color }} />
                <p className="font-heading font-extrabold text-3xl" style={{ color: c.color }}>0{c.n}</p>
                <h2 className="mt-2 font-heading font-bold text-navy text-lg leading-snug">{c.titulo}</h2>
                <p className="mt-3 text-sm text-[#555] leading-relaxed flex-1">{c.enfoque}</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="h-10 w-10 rounded-full bg-navy/5 flex items-center justify-center text-navy/40">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Ponente por anunciar</p>
                    <p className="text-xs text-[#999]">Curriculum próximamente</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expositores nota */}
          <div className="mt-8 rounded-xl bg-navy/5 border border-navy/10 p-4 text-sm text-[#555]">
            Estamos confirmando a los expositores. Muy pronto publicaremos aquí sus nombres y trayectoria.
          </div>

          {/* Pregunta previa */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 items-start">
            <div>
              <p className="kicker text-gold-dark">Participa</p>
              <h2 className="mt-3 font-heading text-navy text-2xl md:text-3xl font-bold">Tu voz también construye la conferencia</h2>
              <p className="mt-4 text-[#4a4a4a] leading-relaxed">
                Queremos que las conferencias respondan a lo que realmente te interesa. Déjanos una pregunta o comentario previo y lo haremos llegar a los ponentes para que lo consideren al preparar su ponencia.
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
