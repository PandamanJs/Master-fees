import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, setLocation] = useLocation();

  const handleNext = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-brand-mint/5 flex items-center justify-center px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M10,10 Q50,0 90,10 Q100,50 90,90 Q50,100 10,90 Q0,50 10,10 Z"
            fill="currentColor"
            className="text-brand-mint"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M20,20 Q60,10 80,20 Q90,40 80,80 Q60,90 20,80 Q10,60 20,20 Z"
            fill="currentColor"
            className="text-brand-teal"
          />
        </svg>
      </div>

      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-slate-900">Master </span>
            <span className="text-brand-mint">Fee</span>
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Smarter School Fee Management
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {/* Step 1 - Sign up */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-brand-mint rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Sign up</span>
            </div>

            {/* Connector line */}
            <div className="flex-1 h-0.5 bg-brand-mint mx-4"></div>

            {/* Step 2 - Your details */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-brand-mint rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Your details</span>
            </div>

            {/* Connector line */}
            <div className="flex-1 h-0.5 bg-brand-mint mx-4"></div>

            {/* Step 3 - Confirm info */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-brand-mint rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Confirm info</span>
            </div>

            {/* Connector line */}
            <div className="flex-1 h-0.5 bg-brand-mint mx-4"></div>

            {/* Step 4 - Finish */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-brand-mint rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Finish</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleNext}
            className="w-full bg-brand-mint hover:bg-brand-mint/90 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="w-full border-2 border-brand-mint text-brand-mint hover:bg-brand-mint hover:text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300"
          >
            Back to Main Site
          </Button>
        </div>
      </div>
    </div>
  );
}