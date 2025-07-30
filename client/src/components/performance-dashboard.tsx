import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

// Mock real-time data generator for demonstration
const generateRealtimeData = () => ({
  totalRevenue: Math.floor(Math.random() * 50000) + 150000,
  studentsActive: Math.floor(Math.random() * 500) + 1200,
  paymentsPending: Math.floor(Math.random() * 50) + 15,
  systemHealth: Math.floor(Math.random() * 20) + 80,
  collectionRate: Math.floor(Math.random() * 15) + 85,
  responseTime: Math.floor(Math.random() * 100) + 50,
  recentPayments: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    student: `Student ${Math.floor(Math.random() * 1000)}`,
    amount: Math.floor(Math.random() * 5000) + 1000,
    time: `${Math.floor(Math.random() * 59)} min ago`,
    status: Math.random() > 0.2 ? 'completed' : 'pending'
  })),
  weeklyStats: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    amount: Math.floor(Math.random() * 30000) + 10000,
    payments: Math.floor(Math.random() * 100) + 50
  }))
});

export default function PerformanceDashboard() {
  const [data, setData] = useState(generateRealtimeData());
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setData(generateRealtimeData());
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500";
    if (health >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getHealthBadge = (health: number) => {
    if (health >= 90) return { text: "Excellent", variant: "default" as const };
    if (health >= 70) return { text: "Good", variant: "secondary" as const };
    return { text: "Needs Attention", variant: "destructive" as const };
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Performance Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-400">Real-time insights into your school's fee management</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {isLive ? 'Live' : 'Paused'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="px-3 py-1 text-xs bg-brand-mint text-brand-teal rounded-full hover:bg-brand-light-mint transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-brand-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${data.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.3% from last month
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <DollarSign className="w-full h-full text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {data.studentsActive.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% this week
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <Users className="w-full h-full text-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {data.paymentsPending}
            </div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -8.1% from yesterday
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <Clock className="w-full h-full text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(data.systemHealth)}`}>
              {data.systemHealth}%
            </div>
            <Badge variant={getHealthBadge(data.systemHealth).variant} className="mt-1 text-xs">
              {getHealthBadge(data.systemHealth).text}
            </Badge>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <Activity className="w-full h-full text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Meters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-brand-teal" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Collection Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Collection Rate</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{data.collectionRate}%</span>
              </div>
              <Progress value={data.collectionRate} className="h-3" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Target: 90%</span>
                <span className={data.collectionRate >= 90 ? 'text-green-500' : 'text-orange-500'}>
                  {data.collectionRate >= 90 ? 'Above target' : 'Below target'}
                </span>
              </div>
            </div>

            {/* Response Time */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Avg Response Time</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{data.responseTime}ms</span>
              </div>
              <Progress value={Math.max(0, 100 - (data.responseTime / 2))} className="h-3" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Target: &lt;100ms</span>
                <span className={data.responseTime <= 100 ? 'text-green-500' : 'text-orange-500'}>
                  {data.responseTime <= 100 ? 'Excellent' : 'Needs optimization'}
                </span>
              </div>
            </div>

            {/* Fun animated progress bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Today's Goal Progress</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">73%</span>
              </div>
              <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-teal to-brand-mint rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '73%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-brand-teal" />
              <span>Recent Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {payment.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{payment.student}</div>
                      <div className="text-xs text-slate-500">{payment.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">${payment.amount.toLocaleString()}</div>
                    <Badge 
                      variant={payment.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-brand-teal" />
            <span>Weekly Payment Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {data.weeklyStats.map((stat, index) => (
              <div key={stat.day} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-brand-teal to-brand-mint rounded-t-lg transition-all duration-1000 ease-out hover:from-brand-mint hover:to-brand-light-mint cursor-pointer relative group"
                  style={{ 
                    height: `${(stat.amount / 40000) * 200}px`,
                    minHeight: '20px'
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg"></div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    ${stat.amount.toLocaleString()}
                    <br />
                    {stat.payments} payments
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                  {stat.day}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}