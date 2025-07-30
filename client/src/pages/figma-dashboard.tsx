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
import dashboardImage from "@assets/Dashboard_1753900251517.png";

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
    <div className="min-h-screen bg-slate-50">
      {/* Full Dashboard Image Overlay */}
      <div className="relative w-full h-screen">
        <img 
          src={dashboardImage} 
          alt="Master Fees Dashboard" 
          className="w-full h-full object-cover object-top"
        />
        
        {/* Interactive Overlay Elements */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300">
          {/* Top Balance Area - Interactive */}
          <div className="absolute top-4 right-6 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-900">ZMW 1,532,000.54</div>
                <div className="text-xs text-slate-500">ZMW (K) Kwacha</div>
              </div>
              <Button size="sm" className="bg-teal-700 hover:bg-teal-800">
                Withdraw
              </Button>
            </div>
          </div>

          {/* Revenue Breakdown Card - Interactive */}
          <div className="absolute bottom-6 left-6 bg-teal-700 text-white rounded-lg p-6 shadow-xl max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Revenue Breakdown</h3>
              <Badge variant="secondary" className="bg-teal-600 text-white">
                +8%
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-teal-100 text-sm mb-1">Revenue Collected</p>
                <p className="text-xl font-bold">ZMW 1,500,000.00</p>
              </div>
              <div>
                <p className="text-teal-100 text-sm mb-1">Balance</p>
                <p className="text-xl font-bold">ZMW 734,000.00</p>
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
          </div>

          {/* Navigation Toggle */}
          <div className="absolute top-4 left-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white bg-opacity-90 hover:bg-opacity-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Figma Integration Panel - Right Side */}
          <div className="absolute top-16 right-6 bg-white bg-opacity-95 rounded-lg p-4 shadow-xl max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className="font-semibold text-slate-900">Figma Integration Active</h4>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Dashboard imported from Figma Make file: iETcOYVOVX4YMS9eunNhqK
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Design System</span>
                <Badge variant="secondary" className="text-xs">Synced</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Components</span>
                <Badge variant="secondary" className="text-xs">Imported</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Layout</span>
                <Badge variant="secondary" className="text-xs">Matched</Badge>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => window.location.href = '/dashboard'}
            >
              View Original Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}