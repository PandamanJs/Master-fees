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
      {/* Subtle Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Simple centered header matching the screenshot */}
        <div className="text-center mb-12">
          <p className="text-slate-300 mb-3 font-light text-sm">
            Hello, Welcome to
          </p>
          <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">
            Master-Fees
          </h1>
        </div>

        {/* Clean form card with liquid glass */}
        <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="schoolName" 
                className="block text-slate-200 mb-3 font-medium text-center"
              >
                Enter the Name of Your School
              </label>
              <Input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder=""
                className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12 text-center"
              />
            </div>

            <Button
              type="submit"
              disabled={!schoolName.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Onboarding
            </Button>
          </form>

          {/* Simple footer text */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 font-light text-xs">
              Designed for modern educational institutions
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}