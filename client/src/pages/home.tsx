import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-brand-teal text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-mint rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-light-mint rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        {/* Header Section */}
        <div className="mb-12 max-w-2xl">
          <div className="text-sm font-semibold text-brand-mint mb-4 tracking-wide">
            master-fees
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Join our <span className="text-brand-mint">Exclusive</span><br />
            test program
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">
            Unlock the easiest way to collect fees, track revenue, and reduce admin workload at your own school from day one. School loan programs, online payment processing, and analytics—the complete solution for schools like yours.
          </p>
          <Button className="bg-brand-mint hover:bg-brand-mint/90 text-slate-900 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105">
            Sign Up Now!
          </Button>
        </div>

        {/* White Content Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900">
          {/* What is master-fees? */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-black text-center">
              What is master-fees?
            </h2>
            
            {/* Device Mockups */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mb-12">
              {/* Mobile Mockup */}
              <div className="flex-shrink-0">
                <div className="w-56 h-[28rem] bg-black rounded-[3rem] p-2 shadow-2xl relative">
                  {/* Phone bezel details */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="bg-slate-50 px-4 py-2 flex justify-between items-center text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-black rounded-sm">
                          <div className="w-3 h-1 bg-black rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* App header */}
                    <div className="bg-brand-teal text-white p-4 text-center">
                      <div className="text-sm font-bold">Master Fees</div>
                      <div className="text-xs opacity-90">Student Portal</div>
                    </div>
                    
                    {/* App content */}
                    <div className="p-4 space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Outstanding Balance</div>
                        <div className="text-lg font-bold text-brand-teal">$1,250.00</div>
                      </div>
                      
                      <div className="bg-brand-teal text-white p-3 rounded-lg text-center">
                        <div className="text-sm font-semibold">Pay Now</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="bg-gray-50 h-12 rounded-lg flex items-center px-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <div className="text-xs">Payment History</div>
                        </div>
                        <div className="bg-gray-50 h-12 rounded-lg flex items-center px-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <div className="text-xs">Receipts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Mockup */}
              <div className="flex-shrink-0">
                <div className="w-[28rem] h-80 bg-gray-300 rounded-2xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                    {/* Browser chrome */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-4">
                        master-fees.com/dashboard
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-4">
                      {/* Top nav */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold">Dashboard</div>
                        <div className="flex gap-2">
                          <div className="w-6 h-6 bg-brand-teal rounded"></div>
                          <div className="w-6 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Stats cards */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-slate-50 p-3 rounded text-center">
                          <div className="text-xs text-gray-500">Total Revenue</div>
                          <div className="text-sm font-bold text-brand-teal">$45,230</div>
                        </div>
                        <div className="bg-brand-teal p-3 rounded text-center text-white">
                          <div className="text-xs opacity-90">Pending</div>
                          <div className="text-sm font-bold">$3,450</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded text-center">
                          <div className="text-xs text-gray-500">Students</div>
                          <div className="text-sm font-bold">1,247</div>
                        </div>
                      </div>
                      
                      {/* Chart area */}
                      <div className="bg-slate-800 rounded-lg p-4 h-24">
                        <div className="flex items-end gap-1 h-full">
                          <div className="bg-brand-teal w-4 h-8 rounded-sm"></div>
                          <div className="bg-brand-mint w-4 h-12 rounded-sm"></div>
                          <div className="bg-brand-teal w-4 h-6 rounded-sm"></div>
                          <div className="bg-brand-mint w-4 h-16 rounded-sm"></div>
                          <div className="bg-brand-teal w-4 h-10 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-base">
                Master-Fees is a smart, <span className="font-semibold">automated fee collection platform</span> designed for schools. It simplifies tuition payments by enabling guardians to pay online instantly, generating and distributing invoices and receipts. All transactions are monitored in one place through the user-friendly dashboard. With seamless integration to mobile money <span className="font-semibold">and student balances</span> wherever you are, Say goodbye to the delays and manual errors of cash and bank payments.
              </p>
            </div>
          </div>

          {/* Why Join the Program? */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">
              Why Join the Program?
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}