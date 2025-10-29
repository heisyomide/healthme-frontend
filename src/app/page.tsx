import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroSection />
      
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}