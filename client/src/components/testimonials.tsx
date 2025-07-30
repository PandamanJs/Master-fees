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
          {/* What is master-fees? */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
              What is master-fees?
            </h2>
            
            {/* Device Mockups */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
              {/* Mobile Mockup */}
              <div className="relative">
                <img 
                  src={mobileImage} 
                  alt="fee Master Mobile Interface - Twalumbu Education Centre Payment Flow"
                  className="w-72 h-auto shadow-2xl rounded-[3rem]"
                />
              </div>
              
              {/* Desktop Mockup */}
              <div className="relative">
                <img 
                  src={desktopImage} 
                  alt="fee Master Admin Dashboard - Revenue Recovery and Financial Management"
                  className="w-[500px] h-auto shadow-2xl rounded-2xl"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                Master-Fees is a smart, <span className="font-semibold">automated fee collection platform</span> designed for schools. It simplifies tuition payments by enabling guardians to pay online, instantly generating and distributing invoices and receipts. All transactions are automatically updated in a centralised dashboard—giving you <span className="font-semibold">real-time access to revenue, collections, and student balances</span> wherever you are. Say goodbye to the delays and manual errors of cash and bank payments.
              </p>
            </div>
          </div>

          {/* Why Join the Program? */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              Why Join the Program?
            </h2>
            
            <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
              {/* Tailor-Made for You */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Tailor-Made for You</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Help Shape the Perfect Tool—Built Around Your School's Needs</span><br />
                    You're not getting a generic solution. With fewer than 30 schools slated to join over the next 12 years, the feedback will directly shape how Master-Fees evolves, ensuring that the final product solves your exact fee collection challenges. This kind of tailor-made software could easily cost thousands of thousands for a team to develop independently—but you'll get it for free, just for sharing your experience.
                  </p>
                </div>
              </div>
              
              {/* Premium Access */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Premium Access – Absolutely Free</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">K7,500 Worth of Value Per Term – Yours Free for a Full Year</span><br />
                    Get one full year of Master-Fees Premium—our highest-tier product—for zero cost. Normally priced at K7,500 per term, this package includes the full suite of features, updates, and support. You'll use it risk-free and decide later if it's right for your school. No hidden costs. No pressure. Just real results.
                  </p>
                </div>
              </div>
              
              {/* Perfect Revenue Records */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-6 bg-red-500 rounded-sm transform rotate-45"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Perfect revenue records</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Instant Reconciliation. Automated Follow-Ups. No More Disputes.</span><br />
                    From day one, you'll experience seamless fee tracking and automated revenue recovery. Master-Fees drastically reduces your team's workload while improving accuracy. No manual reconciliation. No balance disputes. Just smooth, stress-free fee collection with detailed insights and reporting at your fingertips.
                  </p>
                </div>
              </div>
              
              {/* Limited Early Access */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Limited early access</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Only 10 Schools. Once It's Full, It's Gone.</span><br />
                    This program is intentionally capped at 10 schools to ensure dedicated support and true partnership. Once the slots are filled, you may have to wait several additional months for this access again. So you still have a chance—but time and space are running out.
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