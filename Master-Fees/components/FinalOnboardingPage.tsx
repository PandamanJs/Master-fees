import { useState } from 'react';
import { toast } from "sonner@2.0.3";

interface BasicFormData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
}

interface ExtendedFormData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
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

export default function FinalOnboardingPage({ 
  onComplete, 
  onBack,
  basicFormData 
}: { 
  onComplete: (formData: ExtendedFormData) => void;
  onBack: () => void;
  basicFormData: BasicFormData;
}) {
  const [formData, setFormData] = useState<ExtendedFormData>({
    ...basicFormData,
    schoolEmail: '',
    contactNumbers: '',
    physicalAddress: '',
    schoolCategories: '',
    schoolLogo: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.schoolEmail.trim()) {
      toast.error('Please enter your school email');
      return;
    }
    if (!formData.contactNumbers.trim()) {
      toast.error('Please enter contact numbers');
      return;
    }
    if (!formData.physicalAddress.trim()) {
      toast.error('Please enter your physical address');
      return;
    }
    if (!formData.schoolCategories.trim()) {
      toast.error('Please enter school categories');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.schoolEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    toast.success('School details saved successfully!');
    onComplete(formData);
  };

  const handleBack = () => {
    toast.info('Returning to previous step');
    onBack();
  };

  const handleChange = (field: keyof ExtendedFormData, value: string | File | null) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      toast.success('Logo uploaded successfully');
    }
    handleChange('schoolLogo', file);
  };

  return (
    <div className="bg-[#ffffff] relative size-full" data-name="Onboarding">
      <BackArrow onBack={handleBack} />
      
      <div className="absolute inset-0 flex items-center justify-center py-8">
        <div className="w-full max-w-md px-8 max-h-full overflow-y-auto">
          <div className="text-center mb-6">
            <h1 className="text-[28px] font-bold text-[#003049] mb-2">
              Contact Details
            </h1>
            <p className="text-[14px] text-gray-600">
              Provide your school's contact information
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                School Email
              </label>
              <input
                type="email"
                value={formData.schoolEmail}
                onChange={(e) => handleChange('schoolEmail', e.target.value)}
                placeholder="school@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                Contact Numbers
              </label>
              <input
                type="text"
                value={formData.contactNumbers}
                onChange={(e) => handleChange('contactNumbers', e.target.value)}
                placeholder="e.g., +260-123-456-789"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                Physical Address
              </label>
              <textarea
                value={formData.physicalAddress}
                onChange={(e) => handleChange('physicalAddress', e.target.value)}
                placeholder="Enter your school's physical address"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                School Categories
              </label>
              <input
                type="text"
                value={formData.schoolCategories}
                onChange={(e) => handleChange('schoolCategories', e.target.value)}
                placeholder="e.g., Primary, Secondary, Boarding"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1">
                School Logo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-transparent"
              />
              {formData.schoolLogo && (
                <p className="text-[12px] text-green-600 mt-1">
                  Logo uploaded: {formData.schoolLogo.name}
                </p>
              )}
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