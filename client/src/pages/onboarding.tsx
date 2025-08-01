import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Building2,
  Users,
  Award,
  CheckCircle,
  Zap,
  ArrowLeft,
  Shield,
  Clock,
  Target
} from 'lucide-react';

export default function OnboardingPage() {
  const [schoolName, setSchoolName] = useState('');
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolName.trim()) {
      // Navigate to assessment or dashboard
      navigate('/aptitude-apple');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Refined Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 ultra-glass-dark rounded-full opacity-12 animate-float"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 ultra-glass-dark rounded-full opacity-8 animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 ultra-glass-light rounded-full opacity-10 animate-float delay-500"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 w-12 h-12 ultra-glass-light backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-20 border border-slate-400/20 hover:border-emerald-400/30"
      >
        <ArrowLeft className="w-5 h-5 text-slate-300 hover:text-emerald-400" />
      </button>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header Text with enhanced typography */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 ultra-glass-light border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-xl shadow-lg">
            <Sparkles className="w-4 h-4" />
            Welcome to Master-Fees
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Transform Your School's <span className="text-emerald-400">Fee Management</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of educational institutions already using our modern, secure, and efficient fee collection system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features Cards */}
          <div className="space-y-6">
            <Card className="border-0 ultra-glass-light backdrop-blur-xl shadow-2xl border border-slate-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  Secure & Reliable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Bank-grade security with 99.9% uptime guarantee for your peace of mind</p>
              </CardContent>
            </Card>

            <Card className="border-0 ultra-glass-light backdrop-blur-xl shadow-2xl border border-slate-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Clock className="w-6 h-6 text-emerald-400" />
                  Quick Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Get started in minutes, not months. Our streamlined onboarding process is designed for busy administrators</p>
              </CardContent>
            </Card>

            <Card className="border-0 ultra-glass-light backdrop-blur-xl shadow-2xl border border-slate-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Target className="w-6 h-6 text-emerald-400" />
                  Proven Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Schools report 75% reduction in admin time and 95% improvement in fee collection rates</p>
              </CardContent>
            </Card>
          </div>

          {/* Form Card with enhanced styling */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Get Started Today</h2>
              <p className="text-slate-300">Enter your school details to begin your transformation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="schoolName" 
                  className="block text-slate-200 mb-3 font-medium"
                >
                  School Name *
                </label>
                <div className="relative">
                  <Input
                    id="schoolName"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Enter your school name"
                    className="border-0 bg-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/50 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12"
                  />
                  <Building2 className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!schoolName.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 text-lg font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {schoolName.trim() ? (
                  <>
                    Start Onboarding <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  'Enter School Name to Continue'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                🔒 Your data is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center">
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl p-8 border border-slate-600/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Why Choose Master-Fees?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">10,000+</h4>
                <p className="text-sm text-slate-300">Schools Trust Us</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">99.9%</h4>
                <p className="text-sm text-slate-300">Uptime Guarantee</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">24/7</h4>
                <p className="text-sm text-slate-300">Expert Support</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}