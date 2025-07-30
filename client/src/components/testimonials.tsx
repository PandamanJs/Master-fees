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
              <div className="relative">
                <div className="w-72 h-[580px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                    
                    {/* Mobile UI content */}
                    <div className="pt-12 px-6 pb-6 h-full flex flex-col">
                      {/* Header with logo */}
                      <div className="flex items-center justify-center mb-12">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-slate-800 rounded mr-2 flex items-center justify-center">
                            <div className="w-3 h-3 bg-brand-teal rounded-sm"></div>
                          </div>
                          <span className="text-slate-800 font-bold text-lg">fee Master</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-center mb-8">
                          <div className="text-gray-600 text-sm mb-2">Pay School fees for,</div>
                          <div className="text-slate-800 font-bold text-xl mb-8">Twalumbu Education Centre</div>
                          
                          <div className="text-gray-600 text-sm mb-6 text-left">
                            Enter your registered phone number or the Student ID number.
                          </div>
                          
                          {/* Input field */}
                          <div className="mb-6">
                            <input 
                              type="text" 
                              placeholder="e.g. 09xx-xxx-xxx"
                              className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 bg-gray-50"
                              readOnly
                            />
                          </div>
                          
                          {/* Proceed button */}
                          <button className="w-full bg-slate-800 text-white py-4 rounded-lg font-semibold text-lg">
                            Proceed
                          </button>
                          
                          {/* Footer text */}
                          <div className="text-xs text-gray-400 mt-4">
                            View the <span className="underline">terms</span> and <span className="underline">conditions</span> of service<br />
                            All rights reserved ©
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom decorative elements */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-8 h-16 bg-green-200 rounded-t-full opacity-60"></div>
                      </div>
                      <div className="absolute bottom-4 left-16">
                        <div className="w-6 h-12 bg-blue-200 rounded-t-lg opacity-40"></div>
                      </div>
                      <div className="absolute bottom-4 right-8">
                        <div className="w-12 h-8 bg-blue-300 rounded-l-full opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Mockup */}
              <div className="relative">
                <div className="w-[500px] h-[320px] bg-gray-300 rounded-2xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                    {/* Browser header */}
                    <div className="bg-gray-100 h-8 flex items-center px-3">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="flex h-full">
                      {/* Sidebar */}
                      <div className="w-44 bg-gray-50 border-r">
                        <div className="p-3">
                          <div className="flex items-center mb-6">
                            <div className="w-4 h-4 bg-slate-800 rounded mr-2 flex items-center justify-center">
                              <div className="w-2 h-2 bg-brand-teal rounded-sm"></div>
                            </div>
                            <span className="text-slate-800 font-bold text-xs">fee Master</span>
                          </div>
                          
                          <div className="space-y-1 text-xs">
                            <div className="text-gray-500 font-semibold mb-2">GENERAL</div>
                            <div className="bg-slate-800 text-white p-2 rounded text-xs">Dashboard</div>
                            <div className="text-gray-600 p-2">Transactions</div>
                            <div className="text-gray-600 p-2">Customer Management</div>
                            <div className="text-gray-600 p-2">Tasks</div>
                            <div className="text-gray-600 p-2">Wallet</div>
                            
                            <div className="text-gray-500 font-semibold mt-4 mb-2">SUPPORT</div>
                            <div className="text-gray-600 p-2">Integrations</div>
                            <div className="text-gray-600 p-2">Customer Care & Help</div>
                            <div className="text-gray-600 p-2">Settings</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Main content */}
                      <div className="flex-1 p-3">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                          <h1 className="text-lg font-bold">Twalumbu Education Centre</h1>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">ZMW 1,532,000.54</span>
                            <button className="bg-slate-800 text-white px-3 py-1 rounded text-xs">Withdraw</button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 h-60">
                          {/* Revenue Recovery Chart */}
                          <div className="col-span-2 bg-white border rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-sm">Revenue Recovery</h3>
                              <span className="text-xs text-gray-500">Term 2 2025</span>
                            </div>
                            <div className="h-32 bg-gray-50 rounded flex items-end justify-center">
                              <div className="bg-brand-teal w-8 h-20 rounded-t"></div>
                            </div>
                          </div>
                          
                          {/* Updates Panel */}
                          <div className="bg-white border rounded-lg p-3">
                            <h3 className="font-semibold text-sm mb-2">Updates</h3>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                                <div>
                                  <div className="font-medium">Payment Received</div>
                                  <div className="text-gray-500 text-xs">Your payment has been received</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                                <div>
                                  <div className="font-medium">Database connection Failure</div>
                                  <div className="text-gray-500 text-xs">Connection issues</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Revenue Breakdown - spans full width */}
                          <div className="col-span-2 bg-slate-800 text-white rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-sm">Revenue Breakdown</h3>
                              <span className="text-xs bg-green-500 px-2 py-1 rounded">+8%</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <div className="text-gray-300">Revenue Collected</div>
                                <div className="font-bold">ZMW 1,500,000.00</div>
                                <div className="text-gray-300 mt-2">Balance</div>
                                <div className="font-bold">734,000.00</div>
                              </div>
                              <div className="bg-brand-teal/20 rounded p-2">
                                <div className="h-12 bg-brand-teal rounded"></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Additional info panel */}
                          <div className="bg-white border rounded-lg p-2">
                            <div className="text-xs space-y-1">
                              <div className="font-medium">Visa ending in 1234</div>
                              <div className="text-gray-500">Expiry 06/2024</div>
                              <button className="text-blue-600 underline">Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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