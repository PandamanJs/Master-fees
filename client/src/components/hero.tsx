import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import dashboardImage from "@assets/Dashboard_1751374916721.png";
import logoImage from "@assets/Group 15_1751377323388.png";

export default function Hero() {
  return (
    <section id="home" className="bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight animate-fade-in-up">
              Simplify School
              <span className="text-brand-teal text-shimmer"> Fee Management</span>
            </h1>
            <p className="mt-8 text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              Streamline fee collection, automate receipt generation, and provide parents with a seamless payment experience. Master Fees makes school financial management effortless.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4 animate-fade-in-up delay-400">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-mint to-brand-teal hover:from-brand-teal hover:to-brand-mint text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-500 shadow-lg hover:shadow-2xl hover:transform hover:-translate-y-2 hover:scale-105 focus:ring-4 focus:ring-brand-teal/30 button-premium animate-pulse-glow">
                Get Started Free
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto mt-4 sm:mt-0 border-2 border-slate-300 hover:border-brand-teal hover:bg-brand-teal/5 text-slate-700 hover:text-brand-teal px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-500 focus:ring-4 focus:ring-slate-300/30 hover:transform hover:-translate-y-1 hover:scale-105 glass-effect"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-slate-600 animate-fade-in-up delay-600">
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 hover:scale-105 animate-float delay-100">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 hover:scale-105 animate-float delay-200">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Bank-grade security
              </div>
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 hover:scale-105 animate-float delay-300">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Free trial
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6 animate-fade-in-right delay-300">
            <div className="relative group">
              {/* Background decoration with parallax effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/20 to-brand-teal/20 rounded-3xl transform rotate-2 transition-transform duration-700 group-hover:rotate-1 group-hover:scale-105"></div>
              <div className="relative bg-gradient-to-br from-primary-50 to-brand-light-mint rounded-3xl p-6 lg:p-10 transition-all duration-700 group-hover:shadow-2xl">
                {/* Actual Dashboard Image */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 transition-all duration-700 group-hover:shadow-3xl group-hover:ring-brand-teal/20">
                  <img 
                    src={dashboardImage} 
                    alt="Master Fees Dashboard Interface showing revenue analytics and payment management" 
                    className="w-full h-auto transform transition-all duration-1000 group-hover:scale-110"
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
