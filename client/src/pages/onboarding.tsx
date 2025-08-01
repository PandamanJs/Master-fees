import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OnboardingPage() {
  const [schoolName, setSchoolName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolName.trim()) {
      // Proceed to next step or dashboard
      console.log('School name:', schoolName);
      // Navigate to dashboard or next onboarding step
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">Hello, Welcome to</p>
          <h1 className="text-4xl font-bold text-black mb-8">Master-Fees</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
              Enter the Name of Your School
            </label>
            <Input
              id="schoolName"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder=""
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={!schoolName.trim()}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Onboarding
          </Button>
        </form>
      </div>
    </div>
  );
}