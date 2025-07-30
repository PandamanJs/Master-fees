export default function WhatIsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
            What is master-fees?
          </h2>
        </div>
        
        {/* Device Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Mobile Mockup */}
          <div className="relative">
            <div className="w-64 sm:w-72 md:w-80 bg-black rounded-[2.5rem] p-2 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden h-[500px] sm:h-[580px] md:h-[640px]">
                {/* Mobile Screen Content */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-white p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-700">master-fees</div>
                      <div className="w-6 h-6 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-6 bg-slate-50">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-brand-teal rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Twinklestar Education Centre</h3>
                      <p className="text-sm text-slate-600">Your new payment notification from Twinklestar Education Centre</p>
                    </div>
                    
                    {/* Amount Display */}
                    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900 mb-2">₹2,500</div>
                        <div className="text-sm text-slate-600">Monthly Fee - March 2024</div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className="w-full bg-brand-teal text-white py-4 rounded-xl font-medium text-lg shadow-lg">
                      Proceed
                    </button>
                  </div>
                  
                  {/* Bottom Nav Indicator */}
                  <div className="p-4 bg-white">
                    <div className="w-12 h-1 bg-brand-mint rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Mockup */}
          <div className="relative flex-1 max-w-4xl">
            <div className="bg-slate-800 rounded-t-2xl p-3 shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-700 rounded-md px-3 py-1 text-slate-300 text-xs">
                  https://master-fees.com/dashboard
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="bg-white rounded-lg overflow-hidden h-96 md:h-[480px]">
                {/* Dashboard Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-slate-900">Master Fees</div>
                      <div className="text-sm text-slate-600">Dashboard</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-slate-600">John • Admin</div>
                      <div className="w-8 h-8 bg-brand-teal rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Body */}
                <div className="flex h-full">
                  {/* Sidebar */}
                  <div className="w-64 bg-brand-teal text-white p-4">
                    <div className="space-y-3">
                      <div className="bg-brand-mint/20 rounded-lg p-3">
                        <div className="text-sm font-medium">Overview</div>
                      </div>
                      <div className="text-sm text-brand-mint/80 p-3">Students Management</div>
                      <div className="text-sm text-brand-mint/80 p-3">Fee Collection</div>
                      <div className="text-sm text-brand-mint/80 p-3">Reports</div>
                      <div className="text-sm text-brand-mint/80 p-3">Settings</div>
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    {/* Revenue Summary Card */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Summary</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-sm text-slate-600">Pending</div>
                          <div className="text-xl font-bold text-orange-600">₹96,750.00</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-sm text-slate-600">Collected</div>
                          <div className="text-xl font-bold text-green-600">₹2,43,250.00</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-sm text-slate-600">Balance</div>
                          <div className="text-xl font-bold text-slate-900">₹1,46,500.00</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="bg-slate-50 rounded-lg p-4 h-32">
                      <div className="flex items-end space-x-2 h-full">
                        <div className="flex-1 bg-brand-teal rounded-t h-3/4"></div>
                        <div className="flex-1 bg-brand-mint rounded-t h-full"></div>
                        <div className="flex-1 bg-brand-teal rounded-t h-1/2"></div>
                        <div className="flex-1 bg-brand-mint rounded-t h-2/3"></div>
                        <div className="flex-1 bg-brand-teal rounded-t h-4/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notifications Panel */}
                  <div className="w-72 bg-slate-50 border-l border-slate-200 p-4">
                    <h4 className="font-medium text-slate-900 mb-4">Updates</h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Payment Received</div>
                            <div className="text-xs text-slate-600">New payment from John Smith for March fees</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Automated Balance Received</div>
                            <div className="text-xs text-slate-600">Balance automatically updated for multiple students</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">Reminder Sent</div>
                            <div className="text-xs text-slate-600">Payment reminder sent to 15 students</div>
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