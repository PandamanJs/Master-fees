import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowRight,
  Shield,
  TrendingUp,
  FileText,
  Settings
} from "lucide-react";

export default function DashboardAccess() {
  const handleDashboardAccess = () => {
    window.open('https://master-fees.com/', '_blank');
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Access your school's dashboard or start your onboarding journey with Master Fees today.
          </p>
        </div>

        {/* Dashboard Access Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Existing Schools Card */}
          <Card className="group relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5"></div>
            <CardHeader className="relative z-10 pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-light tracking-tight">
                Access Your Dashboard
              </CardTitle>
              <CardDescription className="text-slate-300 text-base">
                Already registered? Log in to your school's Master Fees dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Student Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Payment Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Financial Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">Automated Reports</span>
                </div>
              </div>

              <Button
                onClick={handleDashboardAccess}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* New Schools Card */}
          <Card className="group relative overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 hover:scale-[1.02] transition-all duration-500 hover:border-emerald-300">
            <CardHeader className="pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-light text-slate-900 tracking-tight">
                Start Your Journey
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                New to Master Fees? Begin your school's digital transformation
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm text-slate-700">Easy Setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm text-slate-700">Secure Platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm text-slate-700">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm text-slate-700">Free Trial</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Free Test Program</h4>
                    <p className="text-sm text-slate-600">Try Master Fees at zero cost</p>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">FREE</div>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <a href="/onboarding">
                  Begin Onboarding
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6 text-lg">
            Questions about getting started? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50 px-8 py-3 rounded-xl"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50 px-8 py-3 rounded-xl"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}