import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Building2,
  Users,
  Award,
  CheckCircle,
  Zap,
  ArrowLeft
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
        className="absolute top-6 left-6 w-10 h-10 ultra-glass-light rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-20"
      >
        <ArrowLeft className="w-4 h-4 text-slate-600" />
      </button>

      <div className="w-full max-w-md relative z-10">
        {/* Header Text with Apple-style typography */}
        <div className="text-center mb-12">
          <p className="text-slate-300 mb-3 font-light" style={{ fontSize: '17px' }}>
            Hello, Welcome to
          </p>
          <h1 className="text-white mb-8 font-thin tracking-tight" style={{ fontSize: '40px', lineHeight: '1.1' }}>
            Master-Fees
          </h1>
        </div>

        {/* Form Card with Liquid Glass */}
        <div className="ultra-glass-light rounded-3xl shadow-2xl shadow-slate-900/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label 
                htmlFor="schoolName" 
                className="block text-slate-700 mb-4 font-light"
                style={{ fontSize: '17px' }}
              >
                Enter the Name of Your School
              </label>
              <div className="relative">
                <input
                  id="schoolName"
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder=""
                  className="w-full h-14 px-4 border border-slate-300/30 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:outline-none transition-all duration-300 ultra-glass-light text-slate-900 font-light"
                  style={{ fontSize: '17px' }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/3 to-cyan-500/3 pointer-events-none"></div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!schoolName.trim()}
                className="w-full h-14 ultra-glass-dark text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontSize: '17px' }}
              >
                Proceed to Onboarding
              </button>
            </div>
          </form>

          {/* Subtle footer text */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 font-light" style={{ fontSize: '13px' }}>
              Designed for modern educational institutions
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}