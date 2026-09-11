import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { site } from "@/site.config";

export const metadata = {
  title: "Hotel Sede · América Unida Baja California 2027",
  description: "Rosarito Beach Hotel, sede propuesta del encuentro: resort frente al mar en Rosarito, Baja California. Beneficios, tarifa de grupo y contacto para reservar.",
};

const galeria = [
  { t: "Frente al mar", grad: "from-au-azul to-navy" },
  { t: "Habitaciones", grad: "from-au-azulclaro to-au-azul" },
  { t: "Salones y eventos", grad: "from-au-morado to-navy" },
  { t: "Alberca y áreas", grad: "from-au-azulclaro to-au-verde" },
  { t: "Restaurantes", grad: "from-au-naranja to-au-cafe" },
  { t: "Playa de Rosarito", grad: "from-au-azul to-au-azulclaro" },
];

const beneficios = [
  { t: "Resort frente al mar", d: "Experiencia de playa en Rosarito, parte de la vivencia Baja California." },
  { t: "Todo en un mismo lugar", d: "Hospedaje, convivencia y espacios de evento en un solo complejo: más fraternidad." },
  { t: "496 habitaciones", d: "Capacidad para alojar prácticamente a todo el grupo del encuentro." },
  { t: "Múltiples salones", d: "Espacios para recepción, cóctel y actividades del programa." },
];

const mailReserva = `mailto:${site.email}?subject=${encodeURIComponent("Reserva hotel sede · América Unida 2027")}&body=${encodeURIComponent("Hola, quiero información para reservar en el hotel sede con la tarifa de grupo.\n\nNombre:\nFechas:\nNúmero de personas:\n")}`;

export default function HotelPage() {
  return (
    <main>
      <Navbar />
      <PageHeader kicker="Hotel Sede · propuesta" title="Rosarito Beach Hotel">
        Un resort frente al mar en Rosarito, Baja California. Sede propuesta para hospedaje y convivencia del encuentro — en gestión, por confirmar.
      </PageHeader>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">

          {/* Galería (placeholders hasta tener fotos reales) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galeria.map((g) => (
              <div key={g.t} className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${g.grad} min-h-[150px] md:min-h-[190px] flex items-end p-4`}>
                <span className="absolute inset-0 bg-black/10" />
                <span className="relative text-white font-heading font-semibold text-sm drop-shadow">{g.t}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#999]">Galería ilustrativa · las fotografías reales se agregarán próximamente.</p>

          {/* Info + beneficios */}
          <div className="mt-14 grid gap-10 md:grid-cols-2 items-start">
            <div>
              <p className="kicker text-gold-dark">La sede</p>
              <h2 className="mt-3 font-heading text-navy text-2xl md:text-3xl font-bold">Por qué Rosarito Beach Hotel</h2>
              <p className="mt-4 text-[#4a4a4a] leading-relaxed">
                Reunir a los hermanos en un mismo complejo frente al mar potencia lo que más buscamos: convivencia y fraternidad. Rosarito, además, es parte de la experiencia Baja California que queremos que vivas.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-navy bg-cloud rounded-full px-4 py-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-dark" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>
                Rosarito, Baja California, México
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {beneficios.map((b) => (
                <div key={b.t} className="rounded-xl border border-gray-100 bg-cloud p-5">
                  <h3 className="font-heading font-bold text-navy text-sm">{b.t}</h3>
                  <p className="mt-1.5 text-xs text-[#555] leading-relaxed">{b.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Costos por noche */}
          <div className="mt-14">
            <p className="kicker text-gold-dark">Tarifa por noche</p>
            <h2 className="mt-3 font-heading text-navy text-2xl md:text-3xl font-bold">Tarifa preferencial de grupo</h2>
            <p className="mt-3 text-[#4a4a4a] max-w-2xl">
              Estamos negociando una tarifa especial para los asistentes. Cada participante reservará y pagará directamente con un código de grupo.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-sm font-semibold text-navy">Habitación estándar</p>
                <p className="mt-2 font-heading font-extrabold text-navy text-2xl">Por confirmar</p>
                <p className="text-xs text-[#999] mt-1">Estimado ~$1,000–$1,500 MXN / noche</p>
              </div>
              <div className="rounded-2xl border border-gold bg-white p-5 ring-1 ring-gold/30">
                <p className="text-sm font-semibold text-navy">Código de grupo</p>
                <p className="mt-2 font-heading font-extrabold text-navy text-2xl">En gestión</p>
                <p className="text-xs text-[#999] mt-1">Fecha límite e inventario por definir</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-sm font-semibold text-navy">Reserva</p>
                <p className="mt-2 font-heading font-extrabold text-navy text-2xl">Directa</p>
                <p className="text-xs text-[#999] mt-1">Cada asistente reserva y paga su hospedaje</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#999]">Tarifas estimadas y sujetas a confirmación. Se publicarán en cuanto queden cerradas con el hotel.</p>
          </div>

          {/* Contacto reservar */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-navy to-navy-800 text-white p-8 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">¿Quieres reservar o conocer la tarifa de grupo?</h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">Escríbenos y te compartimos la información de hospedaje y el código de grupo en cuanto esté disponible.</p>
            <a href={mailReserva}
               className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 text-navy font-semibold hover:bg-white transition-colors">
              Contactar para reservar
            </a>
            <p className="mt-3 text-white/50 text-sm">{site.email}</p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
