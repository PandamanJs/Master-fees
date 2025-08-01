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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Refined Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-10 animate-float delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 ultra-glass-dark rounded-full opacity-12 animate-float delay-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 ultra-glass-light rounded-full opacity-8 animate-float delay-2000"></div>
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
