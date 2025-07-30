import { Button } from "@/components/ui/button";

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
          {/* What is master-fees? */}
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-black">
              What is master-fees?
            </h3>
            
            {/* Device Mockups */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
              {/* Mobile Mockup */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="w-64 h-96 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-teal rounded-lg mx-auto mb-4"></div>
                    <div className="text-sm font-semibold mb-2">Mobile Dashboard</div>
                    <div className="text-xs text-gray-500">Manage payments on-the-go</div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Mockup */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="w-80 h-56 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-teal rounded-lg mx-auto mb-4"></div>
                    <div className="text-sm font-semibold mb-2">Admin Dashboard</div>
                    <div className="text-xs text-gray-500">Complete fee management system</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="max-w-4xl mx-auto text-left">
              <p className="text-gray-700 leading-relaxed mb-4">
                Master-Fees is a smart, <span className="font-semibold">automated fee collection platform</span> designed for schools. It simplifies tuition payments by enabling guardians to pay online instantly, generating and distributing invoices and receipts. All transactions are monitored in one place through the user-friendly dashboard. With seamless integration to mobile money <span className="font-semibold">and student balances</span> wherever you are, Say goodbye to the delays and manual errors of cash and bank payments.
              </p>
            </div>
          </div>

          {/* Why Join the Program? */}
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-black">
              Why Join the Program?
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}