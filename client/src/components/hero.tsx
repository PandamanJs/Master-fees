import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import dashboardImage from "@assets/Dashboard_1751374916721.png";
import logoImage from "@assets/Group 15_1751377323388.png";

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <img 
                src={logoImage} 
                alt="Master Fees Logo" 
                className="w-16 h-16 mr-4"
              />
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                Master Fees
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
              Simplify School
              <span className="text-brand-teal"> Fee Management</span>
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
              Streamline fee collection, automate receipt generation, and provide parents with a seamless payment experience. Master Fees makes school financial management effortless.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <Button className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5 focus:ring-4 focus:ring-brand-teal/30">
                Get Started Free
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto mt-4 sm:mt-0 border-2 border-slate-300 hover:border-brand-teal hover:bg-brand-teal/5 text-slate-700 hover:text-brand-teal px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 focus:ring-4 focus:ring-slate-300/30"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-slate-600">
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Bank-grade security
              </div>
              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Free trial
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/20 to-brand-teal/20 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-gradient-to-br from-primary-50 to-brand-light-mint rounded-3xl p-6 lg:p-10">
                {/* Actual Dashboard Image */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
                  <img 
                    src={dashboardImage} 
                    alt="Master Fees Dashboard Interface showing revenue analytics and payment management" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Floating elements for visual appeal */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-teal rounded-full opacity-20"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-brand-mint rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
