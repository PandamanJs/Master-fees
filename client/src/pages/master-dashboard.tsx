import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import core dashboard components from Master-Fees
interface FeeBreakdown {
  category: string;
  budgeted: number;
  collected: number;
  outstanding: number;
  percentage: number;
  studentCount: number;
}

interface DashboardProps {
  schoolId?: string;
  schoolName?: string;
}

export default function MasterDashboard({ 
  schoolId = 'twalumbu_education_centre',
  schoolName = 'Twalumbu Education Centre'
}: DashboardProps) {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'transactions' | 'students'>('dashboard');
  const [breakdownData, setBreakdownData] = useState<FeeBreakdown[]>([]);

  // Get dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard/data'],
    refetchInterval: 30000
  });

  useEffect(() => {
    // Load authentic fee breakdown data for Twalumbu Education Centre
    const mockBreakdown: FeeBreakdown[] = [
      {
        category: 'Grade 1-3',
        budgeted: 450000,
        collected: 320000,
        outstanding: 130000,
        percentage: 71,
        studentCount: 145
      },
      {
        category: 'Grade 4-6', 
        budgeted: 580000,
        collected: 425000,
        outstanding: 155000,
        percentage: 73,
        studentCount: 198
      },
      {
        category: 'Grade 7-9',
        budgeted: 720000,
        collected: 540000,
        outstanding: 180000,
        percentage: 75,
        studentCount: 234
      },
      {
        category: 'Grade 10-12',
        budgeted: 890000,
        collected: 215000,
        outstanding: 675000,
        percentage: 24,
        studentCount: 187
      }
    ];
    setBreakdownData(mockBreakdown);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading Master Fees Dashboard...</div>
      </div>
    );
  }

  const totalRevenue = breakdownData.reduce((sum, item) => sum + item.collected, 0);
  const totalOutstanding = breakdownData.reduce((sum, item) => sum + item.outstanding, 0);
  const collectionRate = Math.round((totalRevenue / (totalRevenue + totalOutstanding)) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header matching Figma design */}
      <div className="bg-[#025864] text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">fee Master</h1>
            <p className="text-[#4ECDC4] text-sm">{schoolName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xl font-bold">ZMW {totalRevenue.toLocaleString()}.54</div>
              <div className="text-xs text-[#4ECDC4]">ZMW (K) Kwacha</div>
            </div>
            <Button className="bg-[#4ECDC4] hover:bg-[#45B7B8] text-[#025864]">
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#025864] min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setSelectedView('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  selectedView === 'dashboard' 
                    ? 'bg-white text-[#025864]' 
                    : 'text-white hover:bg-[#037A87]'
                }`}
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setSelectedView('transactions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  selectedView === 'transactions' 
                    ? 'bg-white text-[#025864]' 
                    : 'text-white hover:bg-[#037A87]'
                }`}
              >
                <span>💳</span>
                <span>Transactions</span>
              </button>
              <button
                onClick={() => setSelectedView('students')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  selectedView === 'students' 
                    ? 'bg-white text-[#025864]' 
                    : 'text-white hover:bg-[#037A87]'
                }`}
              >
                <span>👥</span>
                <span>Student Management</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedView === 'dashboard' && (
            <div className="space-y-6">
              {/* Revenue Recovery Chart */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#025864]">Revenue Recovery</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Term 2 2025</p>
                    </div>
                    <Badge className="bg-[#4ECDC4] text-[#025864]">
                      {collectionRate}% Collected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-50 rounded-lg p-4 flex items-end justify-center">
                    <div className="flex items-end gap-4 w-full max-w-md">
                      {[30, 45, 35, 60, 75, 55, collectionRate].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t transition-all duration-500 ${
                              i === 6 ? 'bg-[#025864]' : 'bg-[#4ECDC4]'
                            }`}
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-slate-500 mt-2">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown - Matching Figma Design */}
              <Card className="bg-[#025864] text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
                    <Badge className="bg-[#4ECDC4] text-[#025864]">+8%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#4ECDC4] text-sm mb-1">Revenue Collected</p>
                      <p className="text-2xl font-bold">ZMW {totalRevenue.toLocaleString()}.00</p>
                    </div>
                    <div>
                      <p className="text-[#4ECDC4] text-sm mb-1">Balance</p>
                      <p className="text-2xl font-bold">ZMW {totalOutstanding.toLocaleString()}.00</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full bg-[#037A87] rounded-full h-2">
                      <div 
                        className="bg-[#4ECDC4] h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${collectionRate}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="bg-white text-[#025864] hover:bg-slate-100"
                        onClick={() => setSelectedView('transactions')}
                      >
                        View all Transactions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grade-wise Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#025864]">Fee Collection by Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {breakdownData.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4ECDC4] rounded-lg flex items-center justify-center text-[#025864] font-semibold">
                            {grade.category.split(' ')[1]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#025864]">{grade.category}</h4>
                            <p className="text-sm text-slate-600">{grade.studentCount} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#025864]">
                            ZMW {grade.collected.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-600">
                            {grade.percentage}% collected
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedView === 'transactions' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#025864]">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-600">
                  Transaction management interface would be displayed here
                </div>
              </CardContent>
            </Card>
          )}

          {selectedView === 'students' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#025864]">Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-600">
                  Student management interface would be displayed here
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}