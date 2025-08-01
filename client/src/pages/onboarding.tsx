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
  Zap
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Text with Apple-style typography */}
        <div className="text-center mb-12">
          <p className="text-slate-500 mb-3 font-light" style={{ fontSize: '17px' }}>
            Hello, Welcome to
          </p>
          <h1 className="text-slate-900 mb-8 font-thin tracking-tight" style={{ fontSize: '40px', lineHeight: '1.1' }}>
            Master-Fees
          </h1>
        </div>

        {/* Form Card with Apple glass-morphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl shadow-slate-900/5 p-8">
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
                  className="w-full h-14 px-4 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm text-slate-900 font-light"
                  style={{ fontSize: '17px' }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/3 to-cyan-500/3 pointer-events-none"></div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!schoolName.trim()}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
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

        {/* Apple-style minimal feature indicators */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-600 font-light text-sm">Secure</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mx-auto flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-600 font-light text-sm">Fast</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-600 font-light text-sm">Reliable</p>
          </div>
        </div>
      </div>
    </div>
  );
}