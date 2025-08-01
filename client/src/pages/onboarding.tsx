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
        <div className="text-center">
          <p className="text-gray-600 mb-2" style={{ fontSize: '14px', fontWeight: 'normal' }}>
            Hello, Welcome to
          </p>
          <h1 className="text-black mb-1.5" style={{ fontSize: '32px', fontWeight: 'bold' }}>
            Master-Fees
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-4">
            <label 
              htmlFor="schoolName" 
              className="block text-gray-700 mb-3" 
              style={{ fontSize: '14px', fontWeight: 'normal' }}
            >
              Enter the Name of Your School
            </label>
            <input
              id="schoolName"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder=""
              className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              style={{
                width: '400px',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!schoolName.trim()}
              className="text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
              style={{
                backgroundColor: '#002B45',
                width: '200px',
                height: '36px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                padding: '8px 16px',
                border: 'none'
              }}
            >
              Proceed to Onboarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}