import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Monitor, 
  Database, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  AlertTriangle,
  TrendingUp,
  Filter,
  Search,
  Download,
  Lock,
  Shield,
  Users,
  Award,
  BarChart3,
  Target,
  PieChart,
  Code,
  MessageSquare
} from "lucide-react";

interface AssessmentResult {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  testTypes: string[];
  answers: Record<string, any>;
  performanceMetrics: {
    correctAnswers: number;
    accuracy: number;
    timePerQuestion: number;
    confidenceScore: number;
    focusScore: number;
  };
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  status: string;
  createdAt: string;
}

export default function AppleAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Fetch assessment results
  const { data: results = [], isLoading } = useQuery<AssessmentResult[]>({
    queryKey: ['/api/assessment/results'],
    enabled: isAuthenticated,
  });

  // Calculate statistics
  const stats = {
    total: results.length,
    frontend: results.filter(r => r.testTypes?.includes('frontend')).length,
    backend: results.filter(r => r.testTypes?.includes('backend')).length,
    marketing: results.filter(r => r.testTypes?.includes('marketing')).length,
    business: results.filter(r => r.testTypes?.includes('business')).length,
    intern: results.filter(r => r.testTypes?.includes('intern')).length,
    pending: results.filter(r => r.status === 'pending').length,
    approved: results.filter(r => r.status === 'approved').length,
    avgScore: results.length > 0 ? Math.round(results.reduce((acc, r) => {
      const mainScore = Object.values(r.scores || {})[0] || 0;
      return acc + mainScore;
    }, 0) / results.length) : 0
  };

  // Filter results
  const filteredResults = results.filter((result: AssessmentResult) => {
    const matchesSearch = result.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'Masterfees' && loginForm.password === 'Pandamanjs007') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getIntegrityColor = (integrity: string) => {
    switch (integrity) {
      case 'high': return 'from-emerald-500 to-green-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-red-500 to-pink-500';
      default: return 'from-slate-500 to-gray-500';
    }
  };

  const getTestTypeIcon = (testType: string) => {
    switch (testType) {
      case 'frontend': return Monitor;
      case 'backend': return Database;
      case 'marketing': return TrendingUp;
      case 'business': return PieChart;
      case 'intern': return Code;
      default: return Brain;
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
        {/* Apple-style login form */}
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-thin text-white mb-2 tracking-tight">
              Admin Access
            </h1>
            <p className="text-slate-300 font-light">
              Secure dashboard authentication
            </p>
          </div>

          <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-6 pt-10 px-8">
              <CardTitle className="text-2xl font-light text-slate-900 mb-2">
                Sign In
              </CardTitle>
              <CardDescription className="text-slate-600 font-light">
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-sm font-medium text-slate-800 flex items-center">
                    <User className="w-4 h-4 mr-2 text-slate-500" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-800 flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-slate-500" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {loginError && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl font-light">
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Access Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-white font-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Apple-style header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 pt-12 pb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl font-thin text-white mb-3 tracking-tight">
                Assessment Dashboard
              </h1>
              <p className="text-xl text-slate-300 font-light">
                Comprehensive candidate evaluation system
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm rounded-full px-6 py-2 transition-all duration-200"
            >
              <Lock className="w-4 h-4 mr-2" />
              <span className="font-light">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.total}</div>
              <div className="text-sm text-slate-600 font-light">Total</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl mb-3">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.frontend}</div>
              <div className="text-sm text-slate-600 font-light">Frontend</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl mb-3">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.backend}</div>
              <div className="text-sm text-slate-600 font-light">Backend</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.marketing}</div>
              <div className="text-sm text-slate-600 font-light">Marketing</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-3">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.business}</div>
              <div className="text-sm text-slate-600 font-light">Business</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl mb-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.intern}</div>
              <div className="text-sm text-slate-600 font-light">Intern</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.pending}</div>
              <div className="text-sm text-slate-600 font-light">Pending</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-thin text-slate-900 mb-1">{stats.approved}</div>
              <div className="text-sm text-slate-600 font-light">Approved</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                  className="rounded-xl"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('pending')}
                  className="rounded-xl"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'approved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('approved')}
                  className="rounded-xl"
                >
                  Approved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="space-y-6">
          {filteredResults.length === 0 ? (
            <Card className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-light text-slate-900 mb-2">No Test Results</h3>
                <p className="text-slate-600 font-light">No aptitude test results match your current filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredResults.map((result: AptitudeResult) => {
              const TestIcon = getTestTypeIcon(result.testTypes?.[0] || 'frontend');
              return (
                <Card key={result.id} className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                          <TestIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-light">{result.candidate.fullName}</CardTitle>
                          <CardDescription className="text-base font-light">
                            {result.candidate.email} • {result.candidate.phone}
                          </CardDescription>
                          <div className="flex gap-2 mt-2">
                            {result.testTypes?.map(testType => (
                              <Badge key={testType} variant="outline" className="capitalize rounded-full">
                                {testType}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-thin text-slate-900">
                          {Object.values(result.scores || {})[0] || 0}%
                        </div>
                        <div className="text-sm text-slate-600 font-light">Overall Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-lg font-light text-slate-900">{result.correctAnswers}/{result.totalQuestions}</div>
                        <div className="text-sm text-slate-600 font-light">Correct Answers</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-lg font-light text-slate-900">{formatTime(result.timeSpent)}</div>
                        <div className="text-sm text-slate-600 font-light">Time Spent</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-light bg-gradient-to-r ${getIntegrityColor(result.aiAnalysis.overallIntegrity)} text-white`}>
                          {result.aiAnalysis.overallIntegrity.toUpperCase()}
                        </div>
                        <div className="text-sm text-slate-600 font-light mt-1">AI Integrity</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}