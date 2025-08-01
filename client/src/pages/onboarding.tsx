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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 w-10 h-10 bg-white/80 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-white/90"
      >
        <ArrowLeft className="w-4 h-4 text-slate-600" />
      </button>

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

        
      </div>
    </div>
  );
}