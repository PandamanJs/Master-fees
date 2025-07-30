import { Button } from "@/components/ui/button";

export default function Hero() {

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-brand-teal via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-mint rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-light-mint rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>

      {/* Abstract geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-10 right-10 w-32 h-32 text-brand-mint/20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
        <svg className="absolute bottom-20 left-20 w-24 h-24 text-brand-light-mint/20" viewBox="0 0 100 100" fill="currentColor">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            {/* Brand Logo/Name */}
            <div className="mb-8 animate-fade-in-up">
              <h2 className="text-lg font-semibold text-brand-light-mint tracking-wider">master-fees</h2>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight animate-fade-in-up delay-200">
              Join our <span className="text-brand-mint">Exclusive</span>
              <br />
              test program
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in-up delay-400">
              Unlock the easiest way to collect fees, track revenue, and reduce admin work—all at zero cost. Join our 10-school test program, enjoy premium access for a year, and help us build the perfect solution for schools like yours.
            </p>
            
            {/* CTA Button */}
            <div className="mt-10 sm:mt-12 animate-fade-in-up delay-600">
              <Button className="group bg-brand-mint hover:bg-brand-light-mint text-brand-teal px-12 py-4 rounded-full text-xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2 focus:ring-4 focus:ring-brand-mint/40 relative overflow-hidden">
                <span className="relative z-10">Sign Up Now!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          </div>
          
        </div>

        {/* Bottom mockup section matching reference image */}
        <div className="mt-16 sm:mt-20 animate-fade-in-up delay-800">
          <div className="bg-white rounded-t-3xl p-8 sm:p-12 relative">
            {/* Mockup content area */}
            <div className="flex items-center justify-center h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-brand-mint rounded-full"></div>
                </div>
                <p className="text-slate-500 text-lg font-medium">Master Fees Dashboard Preview</p>
                <p className="text-slate-400 text-sm mt-2">Interactive platform showcase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
