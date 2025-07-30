import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Features from "@/components/features";
import About from "@/components/about";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
