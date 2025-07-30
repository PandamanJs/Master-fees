import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import mobileImage from "@assets/iPhone 16 - 46_1753900251503.png";
import desktopImage from "@assets/Dashboard_1753900251517.png";

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector('#testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials-section" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/50 to-teal-900/70"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Apple-style header with premium typography */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-extralight tracking-[-0.02em] mb-10 bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent leading-[0.85]">
            Master Fees
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-200 mb-16 max-w-4xl mx-auto leading-relaxed tracking-wide">
            The future of school fee management.<br />
            <span className="text-emerald-300">Beautifully simple.</span> <span className="text-slate-400">Incredibly powerful.</span>
          </p>
          <Button className="bg-emerald-400 text-slate-900 hover:bg-emerald-300 px-14 py-5 rounded-full text-lg font-semibold transition-all duration-500 shadow-2xl hover:shadow-emerald-400/25 hover:scale-105 tracking-wide backdrop-blur-sm border border-emerald-300/50">
            Join the Program
          </Button>
        </div>

        {/* Apple-style content section with premium glassmorphism */}
        <div className="apple-glass rounded-[3rem] p-16 lg:p-20 border border-white/10 shadow-2xl">
          {/* Apple-style Why Join section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-20 tracking-[-0.01em] leading-tight">
              Why join the program?
            </h2>
            
            <div className="grid gap-16 max-w-5xl mx-auto">
              {/* Tailor-Made for You */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-6 tracking-wide">Tailor-Made for You</h3>
                <p className="text-lg font-light text-slate-200 leading-relaxed max-w-2xl mx-auto tracking-wide opacity-90">
                  Help shape the perfect tool—built around your school's needs. With fewer than 30 schools joining over 12 years, your feedback directly influences Master-Fees evolution.
                </p>
              </div>
              
              {/* Premium Access */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-10 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Premium Access — Absolutely Free</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  K7,500 worth of value per term for a full year. Get Master-Fees Premium at zero cost with complete features, updates, and support.
                </p>
              </div>
              
              {/* Perfect Revenue Records */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-6 h-8 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Perfect Revenue Records</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Instant reconciliation. Automated follow-ups. No more disputes. Experience seamless fee tracking with detailed insights at your fingertips.
                </p>
              </div>
              
              {/* Limited Early Access */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Limited Early Access</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Only 10 schools. Once it's full, it's gone. Intentionally capped to ensure dedicated support and true partnership.
                </p>
              </div>
            </div>
          </div>


        </div>
        
      </div>
    </section>
  );
}