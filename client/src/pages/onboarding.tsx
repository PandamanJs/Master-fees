import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  School, 
  ArrowRight, 
  Users, 
  CreditCard, 
  BarChart3,
  CheckCircle,
  Building
} from "lucide-react";

export default function Onboarding() {
  const [schoolName, setSchoolName] = useState('');

  const handleProceed = () => {
    if (schoolName.trim()) {
      // Redirect to actual dashboard
      window.open('https://master-fees.com/', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">Master Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Hello, Welcome to
          </h1>
          <h2 className="text-5xl font-bold text-slate-900 mb-8">
            Master-Fees
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Streamline your school's fee management with our comprehensive platform. 
            Get started by entering your school information below.
          </p>
        </div>

        {/* School Registration Card */}
        <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 mx-auto">
              <Building className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              School Registration
            </CardTitle>
            <CardDescription className="text-slate-600">
              Enter the name of your school to begin the onboarding process
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="schoolName" className="text-sm font-medium text-slate-700">
                Enter the Name of Your School
              </Label>
              <Input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g., Greenwood High School"
                className="h-12 text-base border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <Button
              onClick={handleProceed}
              disabled={!schoolName.trim()}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Onboarding
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            What you'll get with Master Fees
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Student Management</h4>
                <p className="text-sm text-slate-600">
                  Comprehensive student profiles and fee tracking
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Payment Processing</h4>
                <p className="text-sm text-slate-600">
                  Secure online payments with automated receipts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Analytics & Reports</h4>
                <p className="text-sm text-slate-600">
                  Detailed financial insights and reporting tools
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            Why schools choose Master Fees
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Reduce manual fee collection by 90%",
              "Automated SMS notifications to parents",
              "Real-time payment tracking and reporting",
              "QuickBooks integration for accounting",
              "Secure payment gateway with multiple options",
              "24/7 customer support for your school"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}