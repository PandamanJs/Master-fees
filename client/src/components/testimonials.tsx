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
    <section id="testimonials-section" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Apple-style header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Master Fees
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The future of school fee management.<br />
            Beautifully simple. Incredibly powerful.
          </p>
          <Button className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
            Join the Program
          </Button>
        </div>

        {/* Apple-style content section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-12 lg:p-16 border border-white/10">
          {/* Apple-style Why Join section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-16 tracking-tight">
              Why join the program?
            </h2>
            
            <div className="grid gap-16 max-w-5xl mx-auto">
              {/* Tailor-Made for You */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Tailor-Made for You</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Help shape the perfect tool—built around your school's needs. With fewer than 30 schools joining over 12 years, your feedback directly influences Master-Fees evolution.
                </p>
              </div>
              
              {/* Premium Access */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-10 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Premium Access — Absolutely Free</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  K7,500 worth of value per term for a full year. Get Master-Fees Premium at zero cost with complete features, updates, and support.
                </p>
              </div>
              
              {/* Perfect Revenue Records */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-6 h-8 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Perfect Revenue Records</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Instant reconciliation. Automated follow-ups. No more disputes. Experience seamless fee tracking with detailed insights at your fingertips.
                </p>
              </div>
              
              {/* Limited Early Access */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Limited Early Access</h3>
                <p className="text-lg font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Only 10 schools. Once it's full, it's gone. Intentionally capped to ensure dedicated support and true partnership.
                </p>
              </div>
            </div>
          </div>

          {/* Apple-style Device Showcase */}
          <div className="mt-20 relative">
            <h3 className="text-3xl md:text-4xl font-light text-center text-white mb-16 tracking-tight">
              Experience Master Fees
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              {/* iPhone Animation */}
              <div className="text-center">
                <div className={`transition-all duration-1500 ease-out ${
                  isVisible 
                    ? 'transform translate-y-0 opacity-100 scale-100 rotate-0' 
                    : 'transform translate-y-20 opacity-0 scale-90 rotate-3'
                }`}>
                  <div className="relative group inline-block">
                    {/* iPhone Floating Animation */}
                    <div className="animate-float-slow">
                      <div className="relative transform group-hover:scale-105 transition-all duration-700">
                        <img 
                          src={mobileImage} 
                          alt="Master Fees Mobile Payment Interface"
                          className="w-64 md:w-72 h-auto shadow-2xl rounded-[3rem] relative z-10 transition-all duration-700"
                        />
                        {/* iPhone Premium Glass Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-white/10 to-transparent rounded-[3rem] z-20 pointer-events-none"></div>
                        {/* Dynamic Color Glow */}
                        <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 rounded-[4rem] blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                        {/* Device Frame Shadow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black/10 to-gray-800/20 rounded-[3.2rem] transform rotate-1 -z-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`mt-8 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h4 className="text-xl font-light text-white mb-3">Mobile Experience</h4>
                  <p className="text-gray-300 font-light leading-relaxed max-w-sm mx-auto">
                    Parents can pay fees instantly with a simple, intuitive interface
                  </p>
                </div>
              </div>

              {/* Mac Dashboard Animation */}
              <div className="text-center">
                <div className={`transition-all duration-1500 ease-out delay-500 ${
                  isVisible 
                    ? 'transform translate-y-0 opacity-100 scale-100 rotate-0' 
                    : 'transform translate-y-20 opacity-0 scale-90 -rotate-3'
                }`}>
                  <div className="relative group inline-block">
                    {/* Mac Floating Animation */}
                    <div className="animate-float-slow-reverse">
                      <div className="relative transform group-hover:scale-105 transition-all duration-700">
                        <img 
                          src={desktopImage} 
                          alt="Master Fees Admin Dashboard"
                          className="w-full max-w-md h-auto shadow-2xl rounded-2xl relative z-10 transition-all duration-700"
                        />
                        {/* Mac Premium Screen Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl z-20 pointer-events-none"></div>
                        {/* Professional Ambient Glow */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-emerald-600/40 via-teal-600/40 to-blue-600/40 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                        {/* Mac Device Frame */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/15 via-gray-900/10 to-black/15 rounded-2xl transform -rotate-1 -z-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`mt-8 transition-all duration-1000 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h4 className="text-xl font-light text-white mb-3">Admin Dashboard</h4>
                  <p className="text-gray-300 font-light leading-relaxed max-w-sm mx-auto">
                    Complete revenue tracking with real-time insights and analytics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}