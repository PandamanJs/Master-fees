import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 text-center">
        {/* Hero heading - Premium typography with perfect spacing */}
        <div className="mb-16">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.03em] text-white mb-6 leading-[0.82] transform transition-all duration-1000">
            Master Fees
          </h1>
          
          {/* Enhanced visual hierarchy with 30% supporting elements */}
          <div className="max-w-5xl mx-auto space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-slate-100 leading-tight tracking-wide">
              The future of school fee management.
            </h2>
            <h2 className="text-3xl md:text-4xl font-light text-emerald-300 leading-tight tracking-wide">
              Beautifully simple. Incredibly powerful.
            </h2>
          </div>
        </div>
        
        {/* Supporting content with consistent 32px spacing */}
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed tracking-wide opacity-90">
            Join our exclusive test program and experience the easiest way to collect fees, 
            track revenue, and reduce admin work—all at zero cost.
          </p>
        </div>
        
        {/* CTA section with enhanced balance */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-32">
          <Button className="bg-emerald-400 text-slate-900 hover:bg-emerald-300 px-12 py-5 rounded-full text-xl font-medium transition-all duration-500 shadow-2xl hover:scale-105 tracking-wide min-w-[200px]">
            Join the Program
          </Button>
          <Button className="border-2 border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-400 px-12 py-5 rounded-full text-xl font-medium transition-all duration-500 hover:scale-105 tracking-wide min-w-[200px]">
            Learn More
          </Button>
        </div>

        {/* Apple-style Device Showcase - What is Master Fees */}
        <div className="mt-20">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-[-0.02em] leading-tight">
              What is Master Fees?
            </h3>
            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed opacity-90">
              A beautifully simple platform that transforms how schools manage fees.
            </p>
          </div>

          {/* Premium Device Showcase with perfect spacing */}
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center max-w-7xl mx-auto">
            {/* iPhone-style Mobile Showcase */}
            <div className="text-center">
              <div className={`inline-block mb-8 transition-all duration-1000 ease-out ${
                isLoaded 
                  ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                  : 'transform translate-y-12 opacity-0 rotate-1 scale-95'
              }`}>
                <div className="relative group">
                  {/* iPhone Floating Animation */}
                  <div className="animate-float-slow">
                    <div className="relative transform group-hover:scale-105 transition-all duration-700">
                      <img 
                        src={mobileImage} 
                        alt="Master Fees Mobile Payment Interface"
                        className="w-64 md:w-72 h-auto shadow-xl rounded-[2.5rem] relative z-10 transition-all duration-700 border border-gray-800/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h4 className={`text-2xl font-medium text-white mb-4 transition-all duration-700 delay-200 tracking-wide ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>For Parents</h4>
              <p className={`text-slate-300 font-light leading-relaxed max-w-md mx-auto text-lg transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Simple, intuitive payments from any device. Real-time updates and instant receipts.
              </p>
            </div>
            
            {/* Mac-style Desktop Showcase */}
            <div className="text-center">
              <div className={`inline-block mb-8 transition-all duration-1000 ease-out delay-300 ${
                isLoaded 
                  ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                  : 'transform translate-y-12 opacity-0 -rotate-1 scale-95'
              }`}>
                <div className="relative group">
                  {/* Mac Floating Animation */}
                  <div className="animate-float-slow-reverse">
                    <div className="relative transform group-hover:scale-105 transition-all duration-700">
                      <img 
                        src={desktopImage} 
                        alt="Master Fees Admin Dashboard"
                        className="w-full max-w-md h-auto shadow-xl rounded-xl relative z-10 transition-all duration-700 border border-gray-700/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h4 className={`text-xl font-light text-white mb-3 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>For Schools</h4>
              <p className={`text-gray-300 font-light leading-relaxed max-w-sm mx-auto transition-all duration-700 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Complete financial oversight with powerful analytics and automated workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
