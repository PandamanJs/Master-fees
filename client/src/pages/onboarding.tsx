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
  CheckCircle
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Welcome content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 mb-8 lg:mx-0 mx-auto">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-thin text-white mb-6 tracking-tight">
              Hello, Welcome to
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-light">
                Master-Fees
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Experience the future of educational fee management with our innovative platform designed for modern institutions
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-light">Streamlined payment processing</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-light">Real-time financial tracking</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-light">Comprehensive analytics dashboard</span>
              </div>
            </div>
          </div>

          {/* Right side - Form card */}
          <div className="flex justify-center">
            <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-900 mb-2">Get Started</h2>
                  <p className="text-sm text-slate-600 font-light">Enter your institution details to begin</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="schoolName" 
                      className="block text-slate-700 mb-3 font-light text-sm"
                    >
                      Enter the Name of Your School
                    </label>
                    <div className="relative">
                      <input
                        id="schoolName"
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="St. Mary's High School"
                        className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 pointer-events-none"></div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!schoolName.trim()}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Assessment</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-500 font-light">
                    By continuing, you agree to our terms of service
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-light text-white mb-1">1000+</div>
            <div className="text-sm text-slate-400 font-light">Active Schools</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <Sparkles className="w-8 h-8 text-teal-400 mx-auto mb-3" />
            <div className="text-2xl font-light text-white mb-1">₹50M+</div>
            <div className="text-sm text-slate-400 font-light">Processed</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <Award className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-light text-white mb-1">99.9%</div>
            <div className="text-sm text-slate-400 font-light">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}