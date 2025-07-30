import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuickBooksIntegration } from '@/components/quickbooks-integration';
import { SMSSettings } from '@/components/sms-settings';
import { ContactForm } from '@/components/contact-form';
import { FigmaIntegration } from '@/components/figma-integration';
import { 
  Building2, 
  MessageSquare, 
  Phone, 
  Users, 
  CreditCard,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Home,
  Settings,
  Bot,
  RefreshCw
} from 'lucide-react';
import { Link } from 'wouter';
import { queryClient } from '@/lib/queryClient';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real-time dashboard data
  const { data: dashboardData, isLoading, refetch } = useQuery({
    queryKey: ['/api/dashboard/data'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch QuickBooks live data
  const { data: qbLiveData } = useQuery({
    queryKey: ['/api/quickbooks/live-data/1'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Use real data or fallback to demo data
  const schoolStats = dashboardData?.stats || {
    totalStudents: 0,
    totalFees: 0,
    pendingPaymentsAmount: 0,
    completedPaymentsAmount: 0,
    smsNotifications: 0,
    qbSyncStatus: 'Disconnected'
  };

  const recentPayments: any[] = dashboardData?.recentPayments || [];
  const smsActivity: any[] = dashboardData?.smsActivity || [];

  const handleRefresh = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['/api/quickbooks/live-data/1'] });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Master Fees Dashboard</h1>
                  <p className="text-sm text-slate-600">Twalumbu Education Centre</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Sync Data
              </Button>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {isLoading ? 'Syncing...' : 'Live Data'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="quickbooks" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              QuickBooks
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="figma" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Figma
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-slate-800">{schoolStats.totalStudents}</p>
                      <p className="text-sm text-slate-600">Total Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-slate-800">₹{(schoolStats.completedPaymentsAmount / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-slate-600">Fees Collected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-slate-800">₹{(schoolStats.pendingPaymentsAmount / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-slate-600">Pending Payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-slate-800">{schoolStats.smsNotifications}</p>
                      <p className="text-sm text-slate-600">SMS Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest fee payments from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment: any) => (
                      <div key={payment.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{payment.student}</p>
                          <p className="text-sm text-slate-600">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">₹{payment.amount}</p>
                          <Badge 
                            className={payment.status === 'completed' 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                              : "bg-orange-100 text-orange-700 border-orange-200"
                            }
                          >
                            {payment.status === 'completed' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Paid
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Activity</CardTitle>
                  <CardDescription>SMS notifications sent today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {smsActivity.map((sms: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{sms.type}</p>
                          <p className="text-sm text-slate-600">Sent successfully</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{sms.count}</p>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Delivered
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
                <CardDescription>Status of connected services and integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">QuickBooks</p>
                      <p className="text-sm text-emerald-600">Connected & Synced</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Twilio SMS</p>
                      <p className="text-sm text-blue-600">Active & Sending</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">AI Assistant</p>
                      <p className="text-sm text-purple-600">Ready to Help</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quickbooks">
            <QuickBooksIntegration schoolId={1} />
          </TabsContent>

          <TabsContent value="sms">
            <SMSSettings />
          </TabsContent>

          <TabsContent value="figma" className="space-y-6">
            <FigmaIntegration />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Assistant Configuration
                </CardTitle>
                <CardDescription>
                  Manage your AI assistant settings and responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">AI Assistant Active</h3>
                      <p className="text-slate-600">Your AI assistant is ready to help students and parents</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-slate-800 mb-2">Quick Questions</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• How do I make a payment?</li>
                        <li>• Check my payment history</li>
                        <li>• What fees are pending?</li>
                        <li>• Contact school administration</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-slate-800 mb-2">AI Capabilities</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Payment guidance</li>
                        <li>• Account management help</li>
                        <li>• Fee inquiry responses</li>
                        <li>• Platform navigation assistance</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-4">
                    The AI assistant appears as a floating icon 🤖 in the bottom-right corner of your website. 
                    Students and parents can click it anytime to get instant help with their fee management needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Demo</CardTitle>
                <CardDescription>
                  Test the contact form with SMS notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}