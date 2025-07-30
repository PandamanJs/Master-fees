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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 overflow-hidden flex items-center">
      {/* Apple-style subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-teal-900/50"></div>

      {/* Apple-style main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Apple-style hero heading with premium typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-normal tracking-[-0.02em] text-white mb-8 leading-[0.85] transform transition-all duration-1000 animate-apple-entrance">
          Master Fees
        </h1>
        
        {/* Apple-style subheading with enhanced hierarchy */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-slate-200 mb-2 leading-tight tracking-wide">
            The future of school fee management.
          </h2>
          <h2 className="text-2xl md:text-3xl font-light text-slate-200 leading-tight tracking-wide">
            Beautifully simple. Incredibly powerful.
          </h2>
        </div>
        
        {/* Apple-style description with refined spacing */}
        <p className="text-lg font-light text-slate-300 mb-20 max-w-3xl mx-auto leading-relaxed tracking-wide opacity-80">
          Join our exclusive test program and experience the easiest way to collect fees, track revenue, and reduce admin work—all at zero cost.
        </p>
        
        {/* Apple-style CTA buttons with premium design */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <Button className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 rounded-full text-lg font-medium transition-all duration-500 shadow-2xl hover:scale-105 tracking-wide">
            Join the Program
          </Button>
          <Button className="border border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-4 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 tracking-wide">
            Learn More
          </Button>
        </div>

        {/* Apple-style Device Showcase - What is Master Fees */}
        <div className="mt-20">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-[-0.01em] leading-tight">
              What is Master Fees?
            </h3>
            <p className="text-xl md:text-2xl font-light text-slate-200 max-w-4xl mx-auto leading-relaxed tracking-wide opacity-90">
              A beautifully simple platform that transforms how schools manage fees.
            </p>
          </div>

          {/* Apple-style Device Showcase with Animations */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
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
              <h4 className={`text-xl font-light text-white mb-3 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>For Parents</h4>
              <p className={`text-gray-300 font-light leading-relaxed max-w-sm mx-auto transition-all duration-700 delay-300 ${
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
