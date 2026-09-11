import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifiesto from "@/components/Manifiesto";
import QueEs from "@/components/QueEs";
import PorQueTijuana from "@/components/PorQueTijuana";
import ProgramaTeaser from "@/components/ProgramaTeaser";
import CierreCTA from "@/components/CierreCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Manifiesto />
      <QueEs />
      <PorQueTijuana />
      <ProgramaTeaser />
      <CierreCTA />
      <Footer />
    </main>
  );
}
