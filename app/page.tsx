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
    <main className="relative">
      <Navigation />
      <Hero />
      <MarqueeStrip variant="dark" />
      <FeaturedWork />
      <MarqueeStrip variant="light" />
      <MotionWork />
      <DesignStrip />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
