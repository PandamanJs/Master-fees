import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Simplify School
              <span className="text-primary-500"> Fee Management</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Streamline fee collection, automate receipt generation, and provide parents with a seamless payment experience. Master Fees makes school financial management effortless.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started Free
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 hover:border-primary-500 text-slate-700 hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" />
                Bank-grade security
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="bg-gradient-to-br from-primary-50 to-indigo-100 rounded-2xl p-8 lg:p-12">
              {/* Dashboard Preview Mockup */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-primary-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Dashboard Overview</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">₹45,000</div>
                      <div className="text-sm text-emerald-700">Collected Today</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">234</div>
                      <div className="text-sm text-blue-700">Payments</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Recent Payment</span>
                      <span className="text-sm text-emerald-600 font-semibold">₹2,500</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Pending Review</span>
                      <span className="text-sm text-amber-600 font-semibold">₹1,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
