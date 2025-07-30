import { useState } from 'react';
import { toast } from "sonner@2.0.3";

function BackArrow({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="absolute left-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
    >
      <svg 
        className="w-6 h-6 text-[#003049] group-hover:text-[#004060] transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </button>
  );
}

export default function OnboardingPage({ 
  onComplete, 
  onBack 
}: { 
  onComplete: (schoolName: string) => void;
  onBack: () => void;
}) {
  const [schoolName, setSchoolName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!schoolName.trim()) {
      toast.error('Please enter your school name');
      return;
    }
    
    toast.success('School name saved successfully!');
    onComplete(schoolName.trim());
  };

  const handleBack = () => {
    toast.info('Returning to login page');
    onBack();
  };

  return (
    <div className="bg-[#ffffff] relative size-full" data-name="Onboarding">
      <BackArrow onBack={handleBack} />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#003049] mb-2">
              Welcome to Master-Fees
            </h1>
            <p className="text-[16px] text-gray-600">
              Let's start by getting your school's name
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[16px] font-medium text-gray-700 mb-2">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter your school name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#003049] text-white py-3 px-4 rounded-lg hover:bg-[#004060] transition-colors font-medium"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}