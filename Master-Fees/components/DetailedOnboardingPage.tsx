import { useState } from 'react';
import { toast } from "sonner@2.0.3";

interface FormData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
}

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

export default function DetailedOnboardingPage({ 
  onComplete, 
  onBack,
  initialSchoolName 
}: { 
  onComplete: (formData: FormData) => void;
  onBack: () => void;
  initialSchoolName: string;
}) {
  const [formData, setFormData] = useState<FormData>({
    schoolName: initialSchoolName,
    institutionType: '',
    country: '',
    state: '',
    town: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.schoolName.trim()) {
      toast.error('Please enter your school name');
      return;
    }
    if (!formData.institutionType) {
      toast.error('Please select your institution type');
      return;
    }
    if (!formData.country.trim()) {
      toast.error('Please enter your country');
      return;
    }
    if (!formData.state.trim()) {
      toast.error('Please enter your state/province');
      return;
    }
    if (!formData.town.trim()) {
      toast.error('Please enter your town/city');
      return;
    }
    
    toast.success('Basic information saved successfully!');
    onComplete(formData);
  };

  const handleBack = () => {
    toast.info('Returning to previous step');
    onBack();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-[#ffffff] relative size-full" data-name="Onboarding">
      <BackArrow onBack={handleBack} />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#003049] mb-2">
              School Information
            </h1>
            <p className="text-[16px] text-gray-600">
              Tell us more about your school
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                placeholder="Enter your school name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                Institution Type
              </label>
              <select
                value={formData.institutionType}
                onChange={(e) => handleChange('institutionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              >
                <option value="">Select institution type</option>
                <option value="Primary School">Primary School</option>
                <option value="Secondary School">Secondary School</option>
                <option value="Combined School">Combined School</option>
                <option value="International School">International School</option>
                <option value="Private School">Private School</option>
                <option value="Public School">Public School</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                placeholder="Enter your country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Enter your state or province"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                Town/City
              </label>
              <input
                type="text"
                value={formData.town}
                onChange={(e) => handleChange('town', e.target.value)}
                placeholder="Enter your town or city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#003049] text-white py-3 px-4 rounded-lg hover:bg-[#004060] transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}