import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import mobileImage from "@assets/iPhone 16 - 46_1753890892151.png";
import desktopImage from "@assets/Dashboard_1753890963584.png";

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
            Join the Program
          </Button>
          <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
            Learn More
          </Button>
        </div>
      </div>


    </section>
  );
}
