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
        {/* Apple-style hero heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-8 leading-none">
          Master Fees
        </h1>
        
        {/* Apple-style subheading */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          The future of school fee management.<br />
          Beautifully simple. Incredibly powerful.
        </h2>
        
        {/* Apple-style description */}
        <p className="text-lg font-light text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
          Join our exclusive test program and experience the easiest way to collect fees, track revenue, and reduce admin work—all at zero cost.
        </p>
        
        {/* Apple-style CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Button className="bg-emerald-400 text-slate-900 hover:bg-emerald-300 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
            Join the Program
          </Button>
          <Button className="bg-transparent border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
            Learn More
          </Button>
        </div>

        {/* Apple-style Device Showcase - What is Master Fees */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
              What is Master Fees?
            </h3>
            <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                        className="w-64 md:w-72 h-auto shadow-2xl rounded-[3rem] relative z-10 transition-all duration-700"
                      />
                      {/* iPhone Premium Glass Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/8 to-transparent rounded-[3rem] z-20 pointer-events-none"></div>
                      {/* Dynamic Color Glow */}
                      <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-500/40 rounded-[4rem] blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                      {/* Device Frame Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/15 via-black/8 to-gray-800/15 rounded-[3.2rem] transform rotate-1 -z-5"></div>
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
                        className="w-full max-w-md h-auto shadow-2xl rounded-2xl relative z-10 transition-all duration-700"
                      />
                      {/* Mac Premium Screen Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/8 to-transparent rounded-2xl z-20 pointer-events-none"></div>
                      {/* Professional Ambient Glow */}
                      <div className="absolute -inset-8 bg-gradient-to-r from-emerald-400/40 via-teal-400/40 to-cyan-400/40 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                      {/* Mac Device Frame */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/15 via-gray-900/8 to-black/15 rounded-2xl transform -rotate-1 -z-5"></div>
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
