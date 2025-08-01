import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Shield
} from "lucide-react";

interface AptitudeResult {
  id: string;
  candidate: {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
  };
  testType: 'frontend' | 'backend';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  codingScore: number;
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

export default function AdminAptitudeResults() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'frontend' | 'backend'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // Check if user is admin (simplified - in real app would use proper auth)
  const isAdmin = true; // This would be replaced with actual admin check

  const { data: results = [], isLoading } = useQuery<AptitudeResult[]>({
    queryKey: ['/api/aptitude/results'],
    enabled: isAdmin,
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">You don't have permission to view aptitude test results.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredResults = results.filter((result: AptitudeResult) => {
    const matchesType = filterType === 'all' || result.testType === filterType;
    const matchesSearch = result.candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    total: results.length,
    frontend: results.filter((r: AptitudeResult) => r.testType === 'frontend').length,
    backend: results.filter((r: AptitudeResult) => r.testType === 'backend').length,
    pending: results.filter((r: AptitudeResult) => r.status === 'pending').length,
    approved: results.filter((r: AptitudeResult) => r.status === 'approved').length,
    avgScore: results.length > 0 ? Math.round(results.reduce((acc: number, r: AptitudeResult) => acc + r.score, 0) / results.length) : 0
  };

  const handleStatusUpdate = async (resultId: string, status: string, notes: string) => {
    try {
      // API call to update result status
      console.log('Updating result:', { resultId, status, notes });
    } catch (error) {
      console.error('Failed to update result:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getIntegrityColor = (integrity: string) => {
    switch (integrity) {
      case 'high': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

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
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                  <User className="w-4 h-4 inline mr-2" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="border-slate-200 focus:border-emerald-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="border-slate-200 focus:border-emerald-400"
                  required
                />
              </div>

              {loginError && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
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
        <div className="mb-8">

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.frontend}</div>
              <div className="text-sm text-slate-600">Frontend</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.backend}</div>
              <div className="text-sm text-slate-600">Backend</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
              <div className="text-sm text-slate-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.approved}</div>
              <div className="text-sm text-slate-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.avgScore}%</div>
              <div className="text-sm text-slate-600">Avg Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Candidates</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Filter by Type</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === 'frontend' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('frontend')}
                  >
                    Frontend
                  </Button>
                  <Button
                    variant={filterType === 'backend' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('backend')}
                  >
                    Backend
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="grid gap-6">
          {filteredResults.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Test Results</h3>
                <p className="text-slate-600">No aptitude test results match your current filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredResults.map((result: AptitudeResult) => (
              <Card key={result.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${result.testType === 'frontend' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        {result.testType === 'frontend' ? 
                          <Monitor className={`w-6 h-6 ${result.testType === 'frontend' ? 'text-blue-600' : 'text-purple-600'}`} /> :
                          <Database className={`w-6 h-6 ${result.testType === 'frontend' ? 'text-blue-600' : 'text-purple-600'}`} />
                        }
                      </div>
                      <div>
                        <CardTitle className="text-xl">{result.candidate.fullName}</CardTitle>
                        <CardDescription className="text-base">
                          {result.candidate.email} • {result.candidate.phone}
                        </CardDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="capitalize">
                            {result.testType} Developer
                          </Badge>
                          <Badge variant="outline">
                            {result.candidate.experience} Experience
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{result.score}%</div>
                      <div className="text-sm text-slate-600">Overall Score</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
                      <TabsTrigger value="actions">Actions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{result.correctAnswers}</div>
                          <div className="text-sm text-slate-600">Correct Answers</div>
                          <div className="text-xs text-slate-500">out of {result.totalQuestions}</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{result.codingScore}%</div>
                          <div className="text-sm text-slate-600">Coding Score</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{formatTime(result.timeSpent)}</div>
                          <div className="text-sm text-slate-600">Time Spent</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getIntegrityColor(result.aiAnalysis.overallIntegrity)}`}>
                            {result.aiAnalysis.overallIntegrity.toUpperCase()} INTEGRITY
                          </div>
                          <div className="text-sm text-slate-600 mt-1">AI Assessment</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-600">
                        <strong>Submitted:</strong> {new Date(result.submittedAt).toLocaleDateString()} at {new Date(result.submittedAt).toLocaleTimeString()}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="technical" className="space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Question Performance</h4>
                        <div className="text-sm text-slate-600">
                          Technical assessment details would be displayed here including:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Individual question scores and categories</li>
                            <li>Coding challenge submission and evaluation</li>
                            <li>Time spent per question</li>
                            <li>Areas of strength and improvement</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ai-analysis" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Behavior Analysis
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Focus Score:</span>
                              <span className="font-semibold">{result.aiAnalysis.focusScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Behavior Score:</span>
                              <span className="font-semibold">{result.aiAnalysis.behaviorScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Suspicious Activity
                          </h4>
                          {result.aiAnalysis.suspiciousActivity.length > 0 ? (
                            <ul className="text-sm space-y-1">
                              {result.aiAnalysis.suspiciousActivity.map((activity, index) => (
                                <li key={index} className="text-red-600">• {activity}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-emerald-600">No suspicious activity detected</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="actions" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="admin-notes">Admin Notes</Label>
                          <Textarea
                            id="admin-notes"
                            placeholder="Add your review notes..."
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            rows={4}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusUpdate(result.id, 'approved', adminNotes)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Candidate
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(result.id, 'rejected', adminNotes)}
                            variant="destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Candidate
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(result.id, 'pending', adminNotes)}
                            variant="outline"
                          >
                            Mark as Pending
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}