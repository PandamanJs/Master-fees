import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Phone,
  Settings,
  HelpCircle,
  Wallet,
  BarChart3,
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  CreditCard,
  Eye,
  Menu
} from "lucide-react";

interface DashboardStats {
  totalStudents: number;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  smsCount: number;
  contactsCount: number;
}

export default function FigmaDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch dashboard data
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/data'],
    refetchInterval: 30000,
  });

  // Mock data to match Figma design
  const revenueData = {
    term: "Term 2 2025",
    collected: 1500000,
    target: 1532000,
    balance: 734000,
    progress: 98
  };

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Payment Received",
      message: "Your payment has been successfully received. You have unlocked premium services now.",
      action: "Check Transactions"
    },
    {
      id: 2,
      type: "error", 
      title: "Database connection Failure",
      message: "We are encountering issues with connecting to our system's database at the moments.",
      action: "Learn More"
    },
    {
      id: 3,
      type: "info",
      title: "New Feature has been added to your dashboard",
      message: "Your payment has been successfully received. You have unlocked premium services now.",
      action: "View new Feature"
    },
    {
      id: 4,
      type: "warning",
      title: "Payments Warning",
      message: "Many parents haven't adhered to school payment policy's",
      action: "View Students"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-slate-200 ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">fM</span>
            </div>
            {sidebarOpen && <span className="font-semibold text-slate-900">fee Master</span>}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6">
          <div className="px-4 mb-6">
            {sidebarOpen && <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">GENERAL</p>}
          </div>
          <nav className="space-y-1 px-3">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-teal-50 text-teal-700 rounded-lg">
              <BarChart3 className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Dashboard</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <TrendingUp className="w-5 h-5" />
              {sidebarOpen && <span>Transactions</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Users className="w-5 h-5" />
              {sidebarOpen && <span>Customer Management</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              {sidebarOpen && <span>Tasks</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Wallet className="w-5 h-5" />
              {sidebarOpen && <span>Wallet</span>}
            </a>
          </nav>

          <div className="px-4 mt-8 mb-4">
            {sidebarOpen && <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">SUPPORT</p>}
          </div>
          <nav className="space-y-1 px-3">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <ExternalLink className="w-5 h-5" />
              {sidebarOpen && <span>Integrations</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <HelpCircle className="w-5 h-5" />
              {sidebarOpen && <span>Customer Care & Help</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span>Settings</span>}
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold text-slate-900">Twalumbu Education Centre</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>ZMW 1,532,000.54</span>
                <span className="text-xs text-slate-500">ZMW (K) Kwacha</span>
              </div>
              <Button size="sm" className="bg-teal-700 hover:bg-teal-800">
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Dashboard Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Revenue Recovery Chart */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">Revenue Recovery</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal-200 rounded-full"></div>
                        <span className="text-sm text-slate-600">Revenue Collection Goal</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-slate-900">{revenueData.term}</div>
                    <div className="text-sm text-slate-600">Continue</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chart Area - Simplified representation */}
                  <div className="h-48 bg-slate-50 rounded-lg flex items-end justify-center p-4">
                    <div className="flex items-end gap-4 w-full max-w-md">
                      {[20, 30, 25, 35, 45, 40, 85].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t ${i === 6 ? 'bg-teal-600' : 'bg-slate-300'} transition-all duration-500`}
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-slate-500 mt-2">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-slate-600">
                      Progress: <span className="font-semibold">{revenueData.progress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="bg-teal-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Revenue Breakdown</CardTitle>
                  <Badge variant="secondary" className="bg-teal-600 text-white">
                    +8%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-teal-100 text-sm mb-1">Revenue Collected</p>
                    <p className="text-2xl font-bold">ZMW 1,500,000.00</p>
                  </div>
                  <div>
                    <p className="text-teal-100 text-sm mb-1">Balance</p>
                    <p className="text-2xl font-bold">ZMW 797,000.00</p>  
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="w-full bg-teal-600 rounded-full h-2">
                    <div className="bg-teal-300 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-right">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="bg-white text-teal-700 hover:bg-teal-50"
                    >
                      View all Transactions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Updates Panel */}
          <div className="w-80 bg-white border-l border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-slate-900">Updates</h2>
              <Button variant="ghost" size="sm" className="text-white bg-red-500 hover:bg-red-600 text-xs px-2 py-1 h-6">
                Mark all as read
                <Badge variant="secondary" className="ml-2 bg-white text-red-500 text-xs">11</Badge>
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="border-l-4 border-l-teal-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {notification.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                        {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                        <h4 className="font-medium text-slate-900 text-sm">{notification.title}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-4 w-4">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{notification.message}</p>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      {notification.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Visa Card */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-slate-900 text-sm">Visa ending in 1234</h4>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-4 w-4">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Expiry 06/2024</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Set as default
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}