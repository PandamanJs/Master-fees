import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Features from "@/components/features";
import DashboardAccess from "@/components/dashboard-access";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Careers from "@/components/careers";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 liquid-glass rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 liquid-glass rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 liquid-glass rounded-full opacity-25 animate-float delay-500"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <DashboardAccess />
        <About />
        <Testimonials />
        <Contact />
        <Careers />
        <Footer />
      </div>
    </div>
  );
}
