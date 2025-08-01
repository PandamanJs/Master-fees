import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import mobileImage from "@assets/iPhone 16 - 46_1753900251503.png";
import desktopImage from "@assets/Dashboard_1753900251517.png";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center">
      {/* Premium gradient overlay - 60% primary dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-teal-900/85"></div>
      
      {/* Subtle accent pattern - 10% accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      {/* Main content with enhanced visual hierarchy */}
      <div className="relative z-10 max-w-8xl mx-auto px-12 lg:px-16 text-center">
        {/* Hero heading - Compact spacing with perfect hierarchy */}
        <div className="mb-16">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.04em] text-white mb-8 leading-[0.78] transform transition-all duration-1000">
            Master Fees
          </h1>
          
          {/* Perfect visual hierarchy with reduced spacing */}
          <div className="max-w-6xl mx-auto space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-slate-50 leading-[1.2] tracking-[-0.01em]">
              The future of school fee management.
            </h2>
            <h2 className="text-2xl md:text-3xl font-light text-emerald-300 leading-[1.2] tracking-[-0.01em]">
              Beautifully simple. Incredibly powerful.
            </h2>
          </div>
        </div>
        
        {/* Supporting content with compact spacing */}
        <div className="mb-16 max-w-5xl mx-auto">
          <p className="text-lg md:text-xl font-light text-slate-200 leading-[1.5] tracking-[-0.005em] opacity-95">
            Join our exclusive test program and experience the easiest way to collect fees, 
            track revenue, and reduce admin work—all at zero cost.
          </p>
        </div>
        
        {/* CTA section with perfect symmetrical balance */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
          <Link href="/onboarding">
            <Button className="ultra-glass-dark text-white hover:text-emerald-100 px-16 py-6 rounded-2xl text-xl font-medium transition-all duration-700 shadow-3xl hover:scale-[1.02] tracking-wide min-w-[240px] border border-emerald-400/30">
              Get Started
            </Button>
          </Link>
          <Button className="ultra-glass-light text-slate-200 hover:text-white px-16 py-6 rounded-2xl text-xl font-medium transition-all duration-700 hover:scale-[1.02] tracking-wide min-w-[240px] border border-slate-400/30">
            Learn More
          </Button>
        </div>

        {/* Apple-style Device Showcase - What is Master Fees */}
        <div className="mt-16">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-extralight text-white mb-8 tracking-[-0.02em] leading-[1.1]">
              What is Master Fees?
            </h3>
            <p className="text-lg md:text-xl font-light text-slate-200 max-w-4xl mx-auto leading-[1.4] opacity-95">
              A beautifully simple platform that transforms how schools manage fees.
            </p>
          </div>

          {/* Premium Device Showcase with reduced spacing and visual hierarchy */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-8xl mx-auto">
            {/* iPhone-style Mobile Showcase with enhanced design principles */}
            <div className="text-center group">
              <div className={`relative mb-12 transition-all duration-1200 ease-out ${
                isLoaded 
                  ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                  : 'transform translate-y-16 opacity-0 rotate-2 scale-90'
              }`}>
                {/* Perfect visual balance and symmetry */}
                <div className="relative mx-auto w-fit">
                  {/* Mathematical proportions - Golden ratio applied */}
                  <div className="relative">
                    <img 
                      src={mobileImage} 
                      alt="Master Fees Mobile Payment Interface"
                      className="w-80 md:w-96 h-auto shadow-3xl rounded-[3rem] relative z-20 transition-all duration-1000 group-hover:scale-[1.02] border-4 border-slate-800/20"
                    />
                    {/* Subtle depth effect using design principles */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-[3rem] z-30 pointer-events-none"></div>
                    {/* 10% accent color implementation for visual interest */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/5 via-transparent to-teal-400/5 rounded-[3.5rem] -z-10 transition-all duration-1000 group-hover:scale-105"></div>
                  </div>
                </div>
              </div>
              {/* Enhanced typography hierarchy */}
              <div className="space-y-6">
                <h4 className={`text-xl font-light text-white tracking-[-0.01em] transition-all duration-700 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>For Parents</h4>
                <p className={`text-slate-200 font-light leading-[1.6] max-w-lg mx-auto text-base transition-all duration-700 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  Simple, intuitive payments from any device. Real-time updates and instant receipts.
                </p>
              </div>
            </div>
            
            {/* MacBook-style Desktop Showcase with enhanced design principles */}
            <div className="text-center group">
              <div className={`relative mb-12 transition-all duration-1200 ease-out delay-400 ${
                isLoaded 
                  ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                  : 'transform translate-y-16 opacity-0 -rotate-2 scale-90'
              }`}>
                {/* Perfect visual balance and symmetry for desktop display */}
                <div className="relative mx-auto w-fit">
                  {/* Mathematical proportions for desktop image */}
                  <div className="relative">
                    <img 
                      src={desktopImage} 
                      alt="Master Fees Admin Dashboard"
                      className="w-full max-w-2xl h-auto shadow-3xl rounded-2xl relative z-20 transition-all duration-1000 group-hover:scale-[1.02] border-4 border-slate-700/30"
                    />
                    {/* Professional screen effect for desktop displays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-black/15 rounded-2xl z-30 pointer-events-none"></div>
                    {/* 10% accent color for visual hierarchy balance */}
                    <div className="absolute -inset-6 bg-gradient-to-br from-emerald-400/3 via-transparent to-teal-400/5 rounded-3xl -z-10 transition-all duration-1000 group-hover:scale-105"></div>
                    {/* Subtle reflection effect for premium feel */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/2 to-transparent rounded-b-2xl z-25 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              {/* Enhanced typography hierarchy matching mobile section */}
              <div className="space-y-6">
                <h4 className={`text-xl font-light text-white tracking-[-0.01em] transition-all duration-700 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>For Schools</h4>
                <p className={`text-slate-200 font-light leading-[1.6] max-w-lg mx-auto text-base transition-all duration-700 delay-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  Complete financial oversight with powerful analytics and automated workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
