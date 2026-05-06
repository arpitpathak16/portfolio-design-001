import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import FeaturedWork from "@/components/FeaturedWork";
import MotionWork from "@/components/MotionWork";
import DesignStrip from "@/components/DesignStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F5F0E8]">
      <div className="fixed inset-0 z-0">
        <Hero />
      </div>
      <Navigation />
      <div className="h-screen pointer-events-none" aria-hidden="true" />
      <div className="relative z-20 bg-[#F5F0E8]">
        <MarqueeStrip variant="dark" />
        <FeaturedWork />
        <MarqueeStrip variant="light" />
        <MotionWork />
        <DesignStrip />
        <About />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
