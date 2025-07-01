import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import dashboardImage from "@assets/Dashboard_1751374916721.png";
import logoImage from "@assets/Group 15_1751377323388.png";

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-white via-slate-50/50 to-brand-mint/5 dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-brand-mint/10 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight animate-fade-in-up">
              <span className="block sm:inline">Transform School</span>
              <span className="bg-gradient-to-r from-brand-teal to-brand-mint bg-clip-text text-transparent block sm:inline"> Fee Collection</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              Automate fee collection, streamline payment processing, and provide real-time financial insights. Master Fees empowers schools with modern payment management solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 sm:gap-6 animate-fade-in-up delay-400">
              <Button className="group w-full sm:w-auto bg-gradient-to-r from-brand-teal to-brand-mint hover:from-brand-mint hover:to-brand-teal text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 focus:ring-4 focus:ring-brand-teal/40 relative overflow-hidden">
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              <Button 
                variant="outline"
                className="group w-full sm:w-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-brand-teal/30 hover:border-brand-teal hover:bg-brand-teal/10 dark:hover:bg-brand-teal/20 text-brand-teal hover:text-brand-teal px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 focus:ring-4 focus:ring-brand-teal/30 relative overflow-hidden"
              >
                <span className="relative z-10">View Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 animate-fade-in-up delay-600">
              <div className="flex items-center bg-brand-mint/10 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-mint/20 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-100">
                <Check className="w-4 h-4 text-brand-teal mr-3" />
                <span className="text-sm font-semibold text-brand-teal dark:text-brand-mint">Instant Setup</span>
              </div>
              <div className="flex items-center bg-brand-mint/10 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-mint/20 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-200">
                <Check className="w-4 h-4 text-brand-teal mr-3" />
                <span className="text-sm font-semibold text-brand-teal dark:text-brand-mint">Bank Security</span>
              </div>
              <div className="flex items-center bg-brand-mint/10 dark:bg-brand-mint/20 backdrop-blur-sm border border-brand-mint/30 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 hover:bg-brand-mint/20 dark:hover:bg-brand-mint/30 hover:scale-105 hover:shadow-lg animate-float delay-300">
                <Check className="w-4 h-4 text-brand-teal mr-3" />
                <span className="text-sm font-semibold text-brand-teal dark:text-brand-mint">30-Day Trial</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-12 lg:mt-0 lg:col-span-6 animate-fade-in-right delay-300">
            <div className="relative group max-w-2xl mx-auto lg:max-w-none">
              {/* Background decoration with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/15 to-brand-teal/15 rounded-2xl transform rotate-1 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105"></div>
              
              {/* Laptop Container */}
              <div className="relative transition-all duration-700 group-hover:shadow-2xl">
                {/* Laptop Screen */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-t-2xl p-3 sm:p-4 shadow-2xl">
                  {/* Screen Bezel */}
                  <div className="relative bg-black rounded-t-xl p-2 shadow-inner">
                    {/* Screen Content */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl overflow-hidden ring-1 ring-slate-700/30 dark:ring-slate-600/30 transition-all duration-700 group-hover:ring-brand-teal/40">
                      <img 
                        src={dashboardImage} 
                        alt="Master Fees Dashboard Interface showing revenue analytics and payment management" 
                        className="w-full h-auto transform transition-all duration-500 group-hover:scale-102"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Screen Reflection */}
                    <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Laptop Camera */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-700 dark:bg-slate-600 rounded-full shadow-inner"></div>
                </div>
                
                {/* Laptop Base/Keyboard */}
                <div className="relative">
                  {/* Laptop Hinge */}
                  <div className="w-full h-1 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800"></div>
                  
                  {/* Laptop Bottom */}
                  <div className="bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded-b-2xl p-4 sm:p-6 shadow-xl">
                    {/* Trackpad */}
                    <div className="mx-auto w-16 sm:w-20 h-12 sm:h-14 bg-slate-200 dark:bg-slate-600 rounded-lg shadow-inner border border-slate-300 dark:border-slate-500 mt-2"></div>
                    
                    {/* Keyboard suggestion lines */}
                    <div className="flex justify-center space-x-1 mt-3">
                      <div className="w-2 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                      <div className="w-3 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                      <div className="w-2 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating UI elements with brand colors */}
              <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-brand-mint to-brand-light-mint rounded-2xl opacity-20 animate-float delay-100 transition-all duration-500 group-hover:opacity-70 group-hover:scale-110 shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-teal rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-brand-teal to-blue-600 rounded-xl opacity-25 animate-float delay-300 transition-all duration-500 group-hover:opacity-80 group-hover:scale-110 shadow-lg"></div>
              <div className="absolute top-1/4 -left-5 w-6 h-6 bg-brand-mint/40 rounded-lg animate-float delay-500 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 shadow-md"></div>
              <div className="absolute bottom-1/3 -right-3 w-7 h-7 bg-gradient-to-br from-brand-light-mint to-brand-mint rounded-full opacity-30 animate-float delay-700 transition-all duration-500 group-hover:opacity-90 group-hover:scale-115 shadow-lg"></div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-brand-mint/5 via-transparent to-brand-teal/5 pointer-events-none blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
