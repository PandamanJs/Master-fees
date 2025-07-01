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
              <span className="block sm:inline">Simplify School</span>
              <span className="text-brand-teal text-shimmer block sm:inline"> Fee Management</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              Streamline fee collection, automate receipt generation, and provide parents with a seamless payment experience. Master Fees makes school financial management effortless.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up delay-400">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-mint to-brand-teal hover:from-brand-teal hover:to-brand-mint text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:transform hover:-translate-y-1 focus:ring-4 focus:ring-brand-teal/30">
                Get Started Free
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-600 hover:border-brand-teal dark:hover:border-brand-teal hover:bg-brand-teal/5 dark:hover:bg-brand-teal/10 text-slate-700 dark:text-slate-300 hover:text-brand-teal px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 focus:ring-4 focus:ring-slate-300/30"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-3 sm:gap-y-4 text-sm text-slate-600 dark:text-slate-400 animate-fade-in-up delay-600">
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/30 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:scale-105 animate-float delay-100">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-xs sm:text-sm">No setup fees</span>
              </div>
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/30 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:scale-105 animate-float delay-200">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-xs sm:text-sm">Bank-grade security</span>
              </div>
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/30 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:scale-105 animate-float delay-300">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-xs sm:text-sm">Free trial</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-12 lg:mt-0 lg:col-span-6 animate-fade-in-right delay-300">
            <div className="relative group max-w-2xl mx-auto lg:max-w-none">
              {/* Background decoration with parallax effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/20 to-brand-teal/20 rounded-2xl sm:rounded-3xl transform rotate-1 sm:rotate-2 transition-transform duration-700 group-hover:rotate-0 sm:group-hover:rotate-1 group-hover:scale-105"></div>
              <div className="relative bg-gradient-to-br from-primary-50 to-brand-light-mint dark:from-slate-800 dark:to-slate-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 transition-all duration-700 group-hover:shadow-2xl">
                {/* Actual Dashboard Image */}
                <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/10 transition-all duration-700 group-hover:shadow-3xl group-hover:ring-brand-teal/20">
                  <img 
                    src={dashboardImage} 
                    alt="Master Fees Dashboard Interface showing revenue analytics and payment management" 
                    className="w-full h-auto transform transition-all duration-1000 group-hover:scale-105 sm:group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Floating elements with animation */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-teal rounded-full opacity-20 animate-float delay-100 transition-all duration-500 group-hover:opacity-60 group-hover:scale-125"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-brand-mint rounded-full opacity-30 animate-float delay-300 transition-all duration-500 group-hover:opacity-80 group-hover:scale-125"></div>
                <div className="absolute top-1/4 -left-3 w-4 h-4 bg-brand-teal/30 rounded-full animate-float delay-500 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150"></div>
                <div className="absolute bottom-1/3 -right-2 w-5 h-5 bg-brand-mint/40 rounded-full animate-float delay-700 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-teal/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
