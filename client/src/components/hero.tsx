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
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Apple-style subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

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
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
            Join the Program
          </Button>
          <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
            Learn More
          </Button>
        </div>

        {/* Apple-style floating device preview */}
        <div className="relative max-w-5xl mx-auto">
          {/* iPhone floating animation */}
          <div className={`absolute left-8 md:left-16 lg:left-24 top-0 transition-all duration-2000 ease-out ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0'
          }`}>
            <div className="relative group">
              {/* iPhone device mockup with floating animation */}
              <div className="animate-float-slow">
                <div className="relative transform group-hover:scale-105 transition-all duration-500">
                  <img 
                    src={mobileImage} 
                    alt="Master Fees Mobile Interface"
                    className="w-48 md:w-64 h-auto shadow-2xl rounded-[2.5rem] relative z-10 transition-all duration-500"
                  />
                  {/* iPhone glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent rounded-[2.5rem] z-20 pointer-events-none"></div>
                  {/* Ambient glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mac/Desktop floating animation */}
          <div className={`absolute right-8 md:right-16 lg:right-24 top-12 transition-all duration-2000 ease-out delay-500 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0'
          }`}>
            <div className="relative group">
              {/* Mac device mockup with floating animation */}
              <div className="animate-float-slow-reverse">
                <div className="relative transform group-hover:scale-105 transition-all duration-500">
                  <img 
                    src={desktopImage} 
                    alt="Master Fees Dashboard"
                    className="w-64 md:w-80 h-auto shadow-2xl rounded-xl relative z-10 transition-all duration-500"
                  />
                  {/* Mac screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-xl z-20 pointer-events-none"></div>
                  {/* Mac ambient glow */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-blue-500/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for floating elements */}
          <div className="h-64 md:h-80"></div>
        </div>
      </div>
    </section>
  );
}
