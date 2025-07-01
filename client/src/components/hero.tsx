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
              <span className="text-brand-teal"> Fee Management</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Streamline fee collection, automate receipt generation, and provide parents with a seamless payment experience. Master Fees makes school financial management effortless.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="w-full sm:w-auto bg-brand-teal hover:bg-opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started Free
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 hover:border-brand-teal text-slate-700 hover:text-brand-teal px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
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
            <div className="bg-gradient-to-br from-primary-50 to-brand-light-mint rounded-2xl p-8 lg:p-12">
              {/* Real Dashboard Preview */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/attached_assets/Group 15_1751372567555.png" 
                        alt="fee Master" 
                        className="w-6 h-6"
                      />
                      <span className="text-slate-900 font-semibold">fee Master</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-600">Your School Name</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-slate-900">ZMW 1,532,000.54</span>
                        <button className="bg-brand-teal text-white px-3 py-1 rounded text-xs font-medium">
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-600">2025 - Term 2</h3>
                      </div>
                      
                      {/* Simple Chart Mockup */}
                      <div className="relative bg-slate-50 rounded-lg p-4 h-32">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-end justify-between h-16">
                            <div className="w-2 bg-brand-mint rounded-t h-8"></div>
                            <div className="w-2 bg-brand-mint rounded-t h-12"></div>
                            <div className="w-2 bg-brand-mint rounded-t h-16"></div>
                            <div className="w-2 bg-brand-mint rounded-t h-10"></div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-brand-teal text-white px-2 py-1 rounded text-xs">
                          K136,000.00
                        </div>
                      </div>
                      
                      {/* Revenue Breakdown */}
                      <div className="bg-brand-teal rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Revenue Breakdown</h4>
                          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">+25%</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Revenue Collected</span>
                            <span>ZMW 1,500,000.00</span>
                          </div>
                          <div className="flex justify-between text-sm opacity-80">
                            <span>Balance</span>
                            <span>734,000.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Updates Panel */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900">Updates</h3>
                        <button className="text-xs text-brand-teal">Mark all as read</button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs font-medium text-slate-900">Payment Received</p>
                            <p className="text-xs text-slate-600">Your payment has been successfully received.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs font-medium text-slate-900">Database connection Failure</p>
                            <p className="text-xs text-slate-600">We are encountering issues with connecting...</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs font-medium text-slate-900">Payments Warning</p>
                            <p className="text-xs text-slate-600">Many parents haven't adhered to school...</p>
                          </div>
                        </div>
                      </div>
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
