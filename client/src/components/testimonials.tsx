import { Button } from "@/components/ui/button";
import mobileImage from "@assets/iPhone 16 - 46_1753890892151.png";
import desktopImage from "@assets/Dashboard_1753890963584.png";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-brand-teal text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-mint rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-light-mint rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-brand-mint mb-4 tracking-wide uppercase">
            master-fees
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join our <span className="text-brand-mint">Exclusive</span><br />
            test program
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Unlock the easiest way to collect fees, track revenue, and reduce admin workload at your own school from day one. School loan programs, online payment processing, and analytics—the complete solution for schools like yours.
          </p>
          <Button className="bg-brand-mint hover:bg-brand-mint/90 text-slate-900 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105">
            Sign Up Now!
          </Button>
        </div>

        {/* White Content Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900 mt-16">


        </div>
      </div>
    </section>
  );
}