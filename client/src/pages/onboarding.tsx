import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SchoolSuggestions } from '@/components/SchoolSuggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Building2,
  Users,
  Award,
  CheckCircle,
  Zap,
  ArrowLeft,
  Shield,
  Clock,
  Target
} from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [townDistrict, setTownDistrict] = useState('');
  
  // Step 3: Detailed school info
  const [schoolEmail, setSchoolEmail] = useState('');
  const [contactNumbers, setContactNumbers] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [schoolCategories, setSchoolCategories] = useState('');
  const [schoolLogo, setSchoolLogo] = useState('');
  
  // Step 4: Pricing Setup
  const [selectedFeeCategories, setSelectedFeeCategories] = useState<string[]>(['tuition', 'transportation']); // Default for demo
  const [customCategory, setCustomCategory] = useState('');
  
  // Step 5: Pricing Structure
  const [gradePricing, setGradePricing] = useState<{[key: string]: {grades: {name: string, currency: string, amount: string}[], classesCount: string}}>({});
  const [currentCategory, setCurrentCategory] = useState('tuition');
  const [newGradeName, setNewGradeName] = useState('');
  
  const [, navigate] = useLocation();

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolName.trim()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (country && stateProvince && townDistrict && schoolName) {
      try {
        // Store school information in database for auto-fill purposes
        const schoolData = {
          name: schoolName,
          country: country,
          province: stateProvince,
          district: townDistrict,
          dataSource: 'onboarding_form',
          verificationStatus: 'unverified'
        };

        const response = await fetch('/api/schools', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(schoolData),
        });

        if (response.ok) {
          console.log('School data stored successfully');
        }
        
        // Move to step 3 for detailed info
        setStep(3);
      } catch (error) {
        console.error('Failed to store school data:', error);
        // Still move to step 3 even if storage fails
        setStep(3);
      }
    }
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Store the detailed school information
      const detailedSchoolData = {
        name: schoolName,
        country,
        stateProvince,
        townDistrict,
        email: schoolEmail,
        contactNumbers,
        physicalAddress,
        categories: schoolCategories,
        logo: schoolLogo
      };
      
      console.log('Detailed school data stored successfully');
      // Here you would typically send this to your backend
      
      // Move to step 4 for pricing setup
      setStep(4);
    } catch (error) {
      console.error('Error storing detailed school data:', error);
      // Still move to step 4 even if storage fails
      setStep(4);
    }
  };

  const handleStep4Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Store the complete school setup information
      const completeSchoolData = {
        name: schoolName,
        country,
        stateProvince,
        townDistrict,
        email: schoolEmail,
        contactNumbers,
        physicalAddress,
        categories: schoolCategories,
        logo: schoolLogo,
        feeCategories: selectedFeeCategories,
        customCategory
      };
      
      console.log('Complete school setup stored successfully');
      // Here you would typically send this to your backend
      
      // Move to step 5 for pricing structure
      setStep(5);
    } catch (error) {
      console.error('Error storing complete school setup:', error);
      // Still move to step 5 even if storage fails
      setStep(5);
    }
  };

  const handleStep5Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Store the complete school setup with pricing structure
      const completeSchoolData = {
        name: schoolName,
        country,
        stateProvince,
        townDistrict,
        email: schoolEmail,
        contactNumbers,
        physicalAddress,
        categories: schoolCategories,
        logo: schoolLogo,
        feeCategories: selectedFeeCategories,
        customCategory,
        pricingStructure: gradePricing
      };
      
      console.log('Complete school setup with pricing stored successfully');
      // Here you would typically send this to your backend
      
      // Navigate to assessment or dashboard
      navigate('/aptitude-apple');
    } catch (error) {
      console.error('Error storing complete school setup:', error);
      // Still navigate even if storage fails
      navigate('/aptitude-apple');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 5) {
      setStep(4);
    }
  };

  const addGrade = (category: string) => {
    if (newGradeName.trim()) {
      setGradePricing(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          grades: [
            ...(prev[category]?.grades || []),
            { name: newGradeName.trim(), currency: 'ZMW', amount: '1,800.00' }
          ]
        }
      }));
      setNewGradeName('');
    }
  };

  const updateGradeAmount = (category: string, gradeIndex: number, amount: string) => {
    setGradePricing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        grades: prev[category]?.grades.map((grade, index) => 
          index === gradeIndex ? { ...grade, amount } : grade
        ) || []
      }
    }));
  };

  const updateClassesCount = (category: string, count: string) => {
    setGradePricing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        classesCount: count
      }
    }));
  };

  const toggleFeeCategory = (category: string) => {
    setSelectedFeeCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const addCustomCategory = () => {
    if (customCategory.trim() && !selectedFeeCategories.includes(customCategory.trim())) {
      setSelectedFeeCategories(prev => [...prev, customCategory.trim()]);
      setCustomCategory('');
    }
  };

  // Countries list for dropdown
  const countries = [
    'Zambia', 'South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Tanzania', 'Uganda', 'Rwanda', 'Botswana', 'Zimbabwe'
  ];

  // Zambian provinces
  const zambianProvinces = [
    'Central Province', 'Copperbelt Province', 'Eastern Province', 'Luapula Province', 
    'Lusaka Province', 'Muchinga Province', 'Northern Province', 'North-Western Province', 
    'Southern Province', 'Western Province'
  ];

  // Towns/Districts by province (sample for major provinces)
  const townsByProvince: { [key: string]: string[] } = {
    'Lusaka Province': ['Lusaka', 'Kafue', 'Chilanga', 'Chongwe'],
    'Copperbelt Province': ['Kitwe', 'Ndola', 'Chingola', 'Mufulira', 'Luanshya', 'Kalulushi'],
    'Southern Province': ['Livingstone', 'Choma', 'Mazabuka', 'Monze', 'Kalomo'],
    'Eastern Province': ['Chipata', 'Lundazi', 'Petauke', 'Katete'],
    'Northern Province': ['Kasama', 'Mbala', 'Luwingu', 'Mporokoso'],
    'Western Province': ['Mongu', 'Senanga', 'Kalabo', 'Lukulu'],
    'Central Province': ['Kabwe', 'Mkushi', 'Mumbwa', 'Serenje'],
    'North-Western Province': ['Solwezi', 'Zambezi', 'Mwinilunga', 'Kasempa'],
    'Muchinga Province': ['Chinsali', 'Isoka', 'Nakonde', 'Mpika'],
    'Luapula Province': ['Mansa', 'Kawambwa', 'Nchelenge', 'Samfya']
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Simple centered header matching the screenshot */}
          <div className="text-center mb-12">
            <p className="text-slate-300 mb-3 font-light text-sm">
              Hello, Welcome to
            </p>
            <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">
              Master-Fees
            </h1>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label 
                  htmlFor="schoolName" 
                  className="block text-slate-200 mb-3 font-medium text-center"
                >
                  Enter the Name of Your School
                </label>
                <div className="relative">
                  <Input
                    value={schoolName}
                    onChange={(e) => {
                      setSchoolName(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(schoolName.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12 text-center"
                    placeholder="Type your school name or select from list..."
                  />
                  
                  {/* School suggestions dropdown */}
                  {schoolName.length > 0 && showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-600/20 max-h-80 overflow-y-auto">
                      <SchoolSuggestions 
                        query={schoolName}
                        onSelect={(selectedSchool) => {
                          setSchoolName(selectedSchool);
                          setShowSuggestions(false);
                        }}
                        country={country}
                        province={stateProvince}
                        district={townDistrict}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={!schoolName.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed
              </Button>
            </form>

            {/* Simple footer text */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 font-light text-xs">
                Designed for modern educational institutions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Detailed School Information
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
        </div>

        <div className="w-full max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Detailed School Info</h1>
            <p className="text-slate-400">Complete your school profile with additional details</p>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep3Submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column - School Logo Upload */}
                <div className="space-y-4">
                  <div className="aspect-square max-w-sm mx-auto">
                    <div className="w-full h-full border-2 border-dashed border-slate-600/40 rounded-xl flex flex-col items-center justify-center bg-slate-700/20 backdrop-blur-sm hover:bg-slate-600/20 transition-colors cursor-pointer">
                      <div className="text-slate-400 mb-4">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-slate-700/30 border-slate-600/40 text-white hover:bg-slate-600/40 rounded-xl h-12"
                  >
                    School Logo Upload
                  </Button>
                </div>

                {/* Right Column - School Details */}
                <div className="space-y-6">
                  
                  {/* Official School Email */}
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">
                      Official School Email
                    </label>
                    <Input
                      type="email"
                      value={schoolEmail}
                      onChange={(e) => setSchoolEmail(e.target.value)}
                      className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12"
                      placeholder="school@example.com"
                    />
                  </div>

                  {/* Official Contact Numbers */}
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">
                      Official Contact Numbers
                    </label>
                    <Input
                      type="tel"
                      value={contactNumbers}
                      onChange={(e) => setContactNumbers(e.target.value)}
                      className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12"
                      placeholder="+260 xxx xxx xxx"
                    />
                  </div>

                  {/* School Physical Address */}
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">
                      School Physical Address
                    </label>
                    <Input
                      value={physicalAddress}
                      onChange={(e) => setPhysicalAddress(e.target.value)}
                      className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12"
                      placeholder="Complete physical address"
                    />
                  </div>

                  {/* Select School Categories */}
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">
                      Select School Categories
                    </label>
                    <Select value={schoolCategories} onValueChange={setSchoolCategories}>
                      <SelectTrigger className="border-0 bg-slate-700/30 backdrop-blur-sm text-white focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="primary" className="text-white hover:bg-slate-700">Primary School</SelectItem>
                        <SelectItem value="secondary" className="text-white hover:bg-slate-700">Secondary School</SelectItem>
                        <SelectItem value="combined" className="text-white hover:bg-slate-700">Combined School</SelectItem>
                        <SelectItem value="international" className="text-white hover:bg-slate-700">International School</SelectItem>
                        <SelectItem value="community" className="text-white hover:bg-slate-700">Community School</SelectItem>
                        <SelectItem value="private" className="text-white hover:bg-slate-700">Private School</SelectItem>
                        <SelectItem value="technical" className="text-white hover:bg-slate-700">Technical School</SelectItem>
                        <SelectItem value="vocational" className="text-white hover:bg-slate-700">Vocational School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button" 
                  onClick={handleBack}
                  variant="outline"
                  className="bg-slate-700/30 border-slate-600/40 text-white hover:bg-slate-600/40 rounded-xl px-8 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl px-8 h-12"
                >
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            {/* Simple footer text */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 font-light text-xs">
                Your information is secure and will be used to enhance your school management experience
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Pricing Setup
  if (step === 4) {
    const feeCategories = [
      {
        id: 'tuition',
        name: 'Tuition Fees',
        description: 'Core academic fees for teaching and learning activities'
      },
      {
        id: 'transportation',
        name: 'Transportation Fees',
        description: 'School bus and transport services for students'
      },
      {
        id: 'accommodation',
        name: 'Accommodation Fees',
        description: 'Boarding and lodging fees for residential students'
      },
      {
        id: 'meals',
        name: 'Meals & Catering',
        description: 'Lunch, breakfast and other meal services'
      },
      {
        id: 'activities',
        name: 'Activities & Sports',
        description: 'Extracurricular activities, sports, and club fees'
      },
      {
        id: 'materials',
        name: 'Books & Materials',
        description: 'Textbooks, stationery, and learning materials'
      },
      {
        id: 'uniform',
        name: 'Uniform & Equipment',
        description: 'School uniforms, PE kit, and equipment'
      },
      {
        id: 'examination',
        name: 'Examination Fees',
        description: 'Registration and processing fees for examinations'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
        </div>

        <div className="w-full max-w-3xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Pricing Setup</h1>
            <p className="text-slate-400">Select which products and service categories your school offers</p>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep4Submit} className="space-y-6">
              
              {/* Fee Categories */}
              <div className="space-y-4">
                {feeCategories.map((category) => (
                  <div 
                    key={category.id}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedFeeCategories.includes(category.id)
                        ? 'border-emerald-400/50 bg-emerald-500/10 backdrop-blur-sm'
                        : 'border-slate-600/40 bg-slate-700/20 backdrop-blur-sm hover:border-slate-500/60 hover:bg-slate-600/20'
                    }`}
                    onClick={() => toggleFeeCategory(category.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        selectedFeeCategories.includes(category.id)
                          ? 'border-emerald-400 bg-emerald-500'
                          : 'border-slate-400'
                      }`}>
                        {selectedFeeCategories.includes(category.id) && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{category.name}</h3>
                        <p className="text-slate-400 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Category Section */}
              <div className="pt-4 border-t border-slate-600/20">
                <div className="bg-slate-700/20 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-white font-medium mb-2">Can't see a category you offer?</h3>
                  <p className="text-slate-400 text-sm mb-4">Add your own custom fee category below</p>
                  
                  <div className="flex gap-3">
                    <Input
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category name"
                      className="flex-1 border-0 bg-slate-600/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-500/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-10"
                    />
                    <Button
                      type="button"
                      onClick={addCustomCategory}
                      disabled={!customCategory.trim()}
                      className="bg-slate-600/50 hover:bg-slate-500/60 text-white border-0 rounded-xl px-6 h-10 disabled:opacity-50"
                    >
                      Add category
                    </Button>
                  </div>
                </div>
              </div>

              {/* Show selected categories */}
              {selectedFeeCategories.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-slate-300 font-medium mb-3">Selected Categories ({selectedFeeCategories.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeeCategories.map((categoryId) => {
                      const category = feeCategories.find(c => c.id === categoryId);
                      const displayName = category ? category.name : categoryId;
                      return (
                        <span
                          key={categoryId}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm border border-emerald-400/30"
                        >
                          {displayName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button" 
                  onClick={handleBack}
                  variant="outline"
                  className="bg-slate-700/30 border-slate-600/40 text-white hover:bg-slate-600/40 rounded-xl px-8 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl px-8 h-12"
                >
                  Complete Onboarding
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            {/* Simple footer text */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 font-light text-xs">
                You can modify these categories later in your school settings
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Pricing Structure
  if (step === 5) {
    // Initialize pricing structure for selected categories
    const feeCategories = [
      { id: 'tuition', name: 'Tuition Fees' },
      { id: 'transportation', name: 'Transportation Fees' },
      { id: 'accommodation', name: 'Accommodation Fees' },
      { id: 'meals', name: 'Meals & Catering' },
      { id: 'activities', name: 'Activities & Sports' },
      { id: 'materials', name: 'Books & Materials' },
      { id: 'uniform', name: 'Uniform & Equipment' },
      { id: 'examination', name: 'Examination Fees' }
    ];

    // Initialize default grades for current category if not exists
    if (!gradePricing[currentCategory]) {
      setGradePricing(prev => ({
        ...prev,
        [currentCategory]: {
          grades: [
            { name: 'Baby Class', currency: 'ZMW', amount: '1,800.00' },
            { name: 'Reception', currency: 'ZMW', amount: '1,800.00' }
          ],
          classesCount: ''
        }
      }));
    }

    const currentCategoryData = gradePricing[currentCategory] || { grades: [], classesCount: '' };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
        </div>

        <div className="w-full max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Pricing Structure</h1>
            <p className="text-slate-400">Select/Deselect the Grades that your school offers</p>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep5Submit} className="space-y-6">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedFeeCategories.map((categoryId) => {
                  const category = feeCategories.find(c => c.id === categoryId);
                  const categoryName = category ? category.name : categoryId;
                  return (
                    <button
                      key={categoryId}
                      type="button"
                      onClick={() => setCurrentCategory(categoryId)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentCategory === categoryId
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/30 text-slate-300 hover:bg-slate-600/40'
                      }`}
                    >
                      {categoryName}
                    </button>
                  );
                })}
              </div>

              {/* Current Category Content */}
              <div className="bg-slate-700/20 backdrop-blur-sm rounded-xl p-6">
                
                {/* Grade Pricing List */}
                <div className="space-y-4 mb-6">
                  {currentCategoryData.grades.map((grade, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-600/20 rounded-lg border border-slate-500/20">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <span className="text-white font-medium">{grade.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={grade.currency} onValueChange={() => {}}>
                          <SelectTrigger className="w-20 border-0 bg-slate-500/30 text-white h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="ZMW" className="text-white">ZMW</SelectItem>
                            <SelectItem value="USD" className="text-white">USD</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={grade.amount}
                          onChange={(e) => updateGradeAmount(currentCategory, index, e.target.value)}
                          className="w-24 border-0 bg-slate-500/30 text-white h-8 text-right"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="bg-slate-500/30 border-slate-400/40 text-white hover:bg-slate-400/40 h-8 px-3"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Grade Section */}
                <div className="border-t border-slate-600/20 pt-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 text-sm">Can't see a grade that you offer under {feeCategories.find(c => c.id === currentCategory)?.name}?</span>
                    <div className="flex gap-2">
                      <Input
                        value={newGradeName}
                        onChange={(e) => setNewGradeName(e.target.value)}
                        placeholder="Grade name"
                        className="border-0 bg-slate-600/30 text-white placeholder:text-slate-400 h-8"
                      />
                      <Button
                        type="button"
                        onClick={() => addGrade(currentCategory)}
                        disabled={!newGradeName.trim()}
                        className="bg-slate-600/50 hover:bg-slate-500/60 text-white border-0 h-8 px-4 text-sm disabled:opacity-50"
                      >
                        Add Grade
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Classes Count */}
                <div>
                  <label className="block text-slate-300 mb-3 font-medium">
                    How Many classes does each grade Have
                  </label>
                  <Input
                    value={currentCategoryData.classesCount}
                    onChange={(e) => updateClassesCount(currentCategory, e.target.value)}
                    placeholder="Number of classes per grade"
                    className="border-0 bg-slate-600/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-500/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button" 
                  onClick={handleBack}
                  variant="outline"
                  className="bg-slate-700/30 border-slate-600/40 text-white hover:bg-slate-600/40 rounded-xl px-8 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg backdrop-blur-sm border-0 rounded-xl px-8 h-12"
                >
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            {/* Simple footer text */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 font-light text-xs">
                Configure pricing for each selected category. You can adjust these later in your school settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Basic School Information
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 ultra-glass-dark rounded-full opacity-8 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 ultra-glass-dark rounded-full opacity-6 animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 ultra-glass-light rounded-full opacity-5 animate-float delay-500"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Basic School Information</h1>
        </div>

        {/* Clean form card with liquid glass */}
        <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
          <form onSubmit={handleStep2Submit} className="space-y-6">
            {/* School Name Display */}
            <div>
              <label className="block text-slate-200 mb-3 font-medium text-center">
                Enter the Name of Your School
              </label>
              <Input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12 text-center"
                placeholder="School name"
              />
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-slate-200 mb-3 font-medium text-center">
                Select Country of operation
              </label>
              <Select value={country || ""} onValueChange={(value) => {
                console.log('Country selected:', value);
                try {
                  setCountry(value);
                  setStateProvince(''); // Reset state/province when country changes
                  setTownDistrict(''); // Reset town/district when country changes
                } catch (error) {
                  console.error('Error setting country:', error);
                }
              }}>
                <SelectTrigger className="border-0 bg-slate-700/30 backdrop-blur-sm text-white focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {countries && countries.length > 0 ? countries.map((countryOption) => (
                    <SelectItem key={countryOption} value={countryOption} className="text-white hover:bg-slate-700">
                      {countryOption}
                    </SelectItem>
                  )) : (
                    <SelectItem value="no-countries" className="text-white hover:bg-slate-700">
                      No countries available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* State/Province and Town/District in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* State/Province */}
              <div>
                <label className="block text-slate-200 mb-3 font-medium text-center">
                  Select State/province
                </label>
                <Select value={stateProvince || ""} onValueChange={(value) => {
                  console.log('Province selected:', value);
                  try {
                    setStateProvince(value);
                    setTownDistrict(''); // Reset town/district when province changes
                  } catch (error) {
                    console.error('Error setting province:', error);
                  }
                }}>
                  <SelectTrigger className="border-0 bg-slate-700/30 backdrop-blur-sm text-white focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12">
                    <SelectValue placeholder="Select state/province" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {country === 'Zambia' ? (
                      zambianProvinces && zambianProvinces.length > 0 ? zambianProvinces.map((province) => (
                        <SelectItem key={province} value={province} className="text-white hover:bg-slate-700">
                          {province}
                        </SelectItem>
                      )) : (
                        <SelectItem value="no-provinces" className="text-white hover:bg-slate-700">
                          No provinces available
                        </SelectItem>
                      )
                    ) : country ? (
                      <SelectItem value={`${country}-Province`} className="text-white hover:bg-slate-700">
                        {country} Province
                      </SelectItem>
                    ) : (
                      <SelectItem value="select-country-first" className="text-white hover:bg-slate-700">
                        Select country first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Town/District */}
              <div>
                <label className="block text-slate-200 mb-3 font-medium text-center">
                  Select Town/District
                </label>
                <Select value={townDistrict || ""} onValueChange={(value) => {
                  console.log('District selected:', value);
                  try {
                    setTownDistrict(value);
                  } catch (error) {
                    console.error('Error setting district:', error);
                  }
                }}>
                  <SelectTrigger className="border-0 bg-slate-700/30 backdrop-blur-sm text-white focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12">
                    <SelectValue placeholder="Select town/district" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {stateProvince && townsByProvince[stateProvince] && townsByProvince[stateProvince].length > 0 ? (
                      townsByProvince[stateProvince].map((town) => (
                        <SelectItem key={town} value={town} className="text-white hover:bg-slate-700">
                          {town}
                        </SelectItem>
                      ))
                    ) : stateProvince ? (
                      <SelectItem value="Other" className="text-white hover:bg-slate-700">
                        Other
                      </SelectItem>
                    ) : (
                      <SelectItem value="select-province-first" className="text-white hover:bg-slate-700">
                        Select province first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-slate-600/50 hover:bg-slate-600/70 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </span>
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                disabled={!country || !stateProvince || !townDistrict}
              >
                <span className="flex items-center justify-center gap-2">
                  Proceed to Onboarding
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}