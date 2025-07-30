import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import WhatIsSection from "@/components/what-is-section";
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
      <WhatIsSection />
      <Features />
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
