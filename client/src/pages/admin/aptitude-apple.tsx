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
  Target
} from "lucide-react";

interface AptitudeResult {
  id: string;
  candidate: {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
  };
  testTypes: string[];
  scores: Record<string, number>;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  aiAnalysis: {
    behaviorScore: number;
    focusScore: number;
    suspiciousActivity: string[];
    overallIntegrity: 'high' | 'medium' | 'low';
  };
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'approved';
  adminNotes?: string;
}

export default function AppleAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

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

  // Mock data for demonstration
  const mockResults: AptitudeResult[] = [
    {
      id: '1',
      candidate: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+260 123 456 789',
        experience: '3 years'
      },
      testTypes: ['frontend', 'backend'],
      scores: { frontend: 85, backend: 78 },
      totalQuestions: 40,
      correctAnswers: 33,
      timeSpent: 3200,
      aiAnalysis: {
        behaviorScore: 95,
        focusScore: 88,
        suspiciousActivity: [],
        overallIntegrity: 'high'
      },
      submittedAt: '2025-01-01T10:00:00Z',
      status: 'pending',
      adminNotes: ''
    }
  ];

  const stats = {
    total: mockResults.length,
    frontend: mockResults.filter(r => r.testTypes.includes('frontend')).length,
    backend: mockResults.filter(r => r.testTypes.includes('backend')).length,
    pending: mockResults.filter(r => r.status === 'pending').length,
    approved: mockResults.filter(r => r.status === 'approved').length,
    avgScore: Math.round(mockResults.reduce((acc, r) => 
      acc + Object.values(r.scores).reduce((sum, s) => sum + s, 0) / Object.keys(r.scores).length, 0
    ) / mockResults.length)
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.total}</div>
              <div className="text-sm text-slate-600 font-light">Total Tests</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-3">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.frontend}</div>
              <div className="text-sm text-slate-600 font-light">Frontend</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl mx-auto mb-3">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.backend}</div>
              <div className="text-sm text-slate-600 font-light">Backend</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.pending}</div>
              <div className="text-sm text-slate-600 font-light">Pending</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.approved}</div>
              <div className="text-sm text-slate-600 font-light">Approved</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-slate-900 mb-1">{stats.avgScore}%</div>
              <div className="text-sm text-slate-600 font-light">Avg Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-slate-800 mb-2 block">
                  Search Candidates
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
              </div>
              
              <div className="min-w-[200px]">
                <Label htmlFor="status" className="text-sm font-medium text-slate-800 mb-2 block">
                  Filter by Status
                </Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 px-4"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="space-y-4">
          {mockResults.map((result) => (
            <Card key={result.id} className="border-0 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{result.candidate.fullName}</h3>
                      <p className="text-sm text-slate-600">{result.candidate.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-medium text-slate-900">
                        {Math.round(Object.values(result.scores).reduce((sum, s) => sum + s, 0) / Object.keys(result.scores).length)}%
                      </div>
                      <div className="text-xs text-slate-600">Overall Score</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getIntegrityColor(result.aiAnalysis.overallIntegrity)} text-white`}>
                        {result.aiAnalysis.overallIntegrity.charAt(0).toUpperCase() + result.aiAnalysis.overallIntegrity.slice(1)} Integrity
                      </div>
                    </div>
                    
                    <Badge 
                      variant={result.status === 'approved' ? 'default' : result.status === 'pending' ? 'secondary' : 'destructive'}
                      className="capitalize"
                    >
                      {result.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}