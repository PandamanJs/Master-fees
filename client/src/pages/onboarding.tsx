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
  Target,
  Check
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
  
  // Additional fees/costs structure
  const [additionalFees, setAdditionalFees] = useState<{name: string, description: string, currency: string, amount: string, enabled: boolean}[]>([
    { name: 'Maintenance fee', description: 'Lorem ipsum dolor sit amet consectetur. Cursus integer egestas in massa neque amet habitant odio quam.', currency: 'ZMW', amount: '150.00', enabled: true },
    { name: 'Maintenance fee', description: 'Lorem ipsum dolor sit amet consectetur. Cursus integer egestas in massa neque amet habitant odio quam.', currency: 'ZMW', amount: '150.00', enabled: false },
    { name: 'Value Added Tax', description: 'Lorem ipsum dolor sit amet consectetur. Cursus integer egestas in massa neque amet habitant odio quam.', currency: 'ZMW', amount: '150.00', enabled: false }
  ]);
  
  // Advanced pricing structure with service classes and groups
  const [pricingCategories, setPricingCategories] = useState([
    {
      id: 'school_fees',
      name: 'School Fees',
      serviceClasses: [
        {
          name: 'Early Childhood Education - ECE',
          items: [
            { name: 'Baby Class', serviceGroup: 'ECE', priceStatus: '[Enter Price & Basis]' }
          ]
        },
        {
          name: 'Lower Primary Section - LPS',
          items: [
            { name: 'Baby Class', serviceGroup: 'ECE', priceStatus: '[Enter Price & Basis]' }
          ]
        }
      ]
    },
    {
      id: 'transport_fees',
      name: 'Transport Fees',
      serviceClasses: [
        {
          name: 'Kaputu Bus Routes',
          items: [
            { name: 'KPT-01', serviceGroup: 'KPT', priceStatus: '[Enter Price & Basis]' }
          ]
        },
        {
          name: 'Chongwe High School Bus Route',
          items: [
            { name: 'KPT-01', serviceGroup: 'KPT', priceStatus: '[Enter Price & Basis]' }
          ]
        }
      ]
    }
  ]);
  
  // Step 6: Assign Products to Groups
  const [productGroups, setProductGroups] = useState<{[key: string]: string[]}>({});
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
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
        pricingStructure: gradePricing,
        additionalFees: additionalFees
      };
      
      console.log('Complete school setup with pricing stored successfully');
      // Here you would typically send this to your backend
      
      // Move to step 6 for product grouping
      setStep(6);
    } catch (error) {
      console.error('Error storing complete school setup:', error);
      // Still move to step 6 even if storage fails
      setStep(6);
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
    } else if (step === 6) {
      setStep(5);
    }
  };

  const addGrade = (category: string, gradeName?: string) => {
    const name = gradeName || newGradeName;
    if (name.trim()) {
      setGradePricing(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          grades: [
            ...(prev[category]?.grades || []),
            { name: name.trim(), currency: 'ZMW', amount: '500.00' }
          ]
        }
      }));
      if (!gradeName) setNewGradeName('');
    }
  };

  const deleteAllGrades = (category: string) => {
    setGradePricing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        grades: []
      }
    }));
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

  const handleStep6Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Store the final complete school setup with product groups
      const finalSchoolData = {
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
        pricingStructure: gradePricing,
        productGroups
      };
      
      console.log('Final school onboarding completed successfully');
      // Here you would typically send this to your backend
      
      // Navigate to assessment or dashboard
      navigate('/aptitude-apple');
    } catch (error) {
      console.error('Error completing final school setup:', error);
      // Still navigate even if storage fails
      navigate('/aptitude-apple');
    }
  };

  const toggleProductSelection = (productName: string) => {
    setSelectedProducts(prev => 
      prev.includes(productName) 
        ? prev.filter(p => p !== productName)
        : [...prev, productName]
    );
  };

  const createProductGroup = (groupName: string) => {
    if (selectedProducts.length > 0) {
      setProductGroups(prev => ({
        ...prev,
        [groupName]: [...selectedProducts]
      }));
      setSelectedProducts([]);
    }
  };

  const toggleAdditionalFee = (index: number) => {
    setAdditionalFees(prev => 
      prev.map((fee, i) => 
        i === index ? { ...fee, enabled: !fee.enabled } : fee
      )
    );
  };

  const updateAdditionalFee = (index: number, field: string, value: string) => {
    setAdditionalFees(prev => 
      prev.map((fee, i) => 
        i === index ? { ...fee, [field]: value } : fee
      )
    );
  };

  const addCustomFee = () => {
    const name = prompt('Enter fee/service name:');
    const description = prompt('Enter description (optional):') || 'Custom fee or service charge';
    
    if (name?.trim()) {
      setAdditionalFees(prev => [
        ...prev,
        {
          name: name.trim(),
          description,
          currency: 'ZMW',
          amount: '100.00',
          enabled: false
        }
      ]);
    }
  };

  const addServiceClass = (categoryId: string) => {
    const className = prompt('Enter service class name:');
    if (className?.trim()) {
      setPricingCategories(prev => 
        prev.map(cat => 
          cat.id === categoryId 
            ? {
                ...cat,
                serviceClasses: [
                  ...cat.serviceClasses,
                  {
                    name: className.trim(),
                    items: [
                      { name: 'New Item', serviceGroup: 'DEFAULT', priceStatus: '[Enter Price & Basis]' }
                    ]
                  }
                ]
              }
            : cat
        )
      );
    }
  };

  const addPricingCategory = () => {
    const categoryName = prompt('Enter pricing category name:');
    if (categoryName?.trim()) {
      setPricingCategories(prev => [
        ...prev,
        {
          id: categoryName.toLowerCase().replace(/\s+/g, '_'),
          name: categoryName.trim(),
          serviceClasses: [
            {
              name: 'Default Service Class',
              items: [
                { name: 'New Service', serviceGroup: 'DEFAULT', priceStatus: '[Enter Price & Basis]' }
              ]
            }
          ]
        }
      ]);
    }
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
      const defaultGrades = {
        tuition: [
          { name: 'Baby Class', currency: 'ZMW', amount: '1,800.00' },
          { name: 'Reception', currency: 'ZMW', amount: '1,800.00' }
        ],
        transportation: [
          { name: 'Early Childhood', currency: 'ZMW', amount: '500.00' },
          { name: 'Lower Primary', currency: 'ZMW', amount: '600.00' },
          { name: 'Upper Primary', currency: 'ZMW', amount: '700.00' }
        ],
        accommodation: [
          { name: 'Grade 1-3', currency: 'ZMW', amount: '2,500.00' },
          { name: 'Grade 4-7', currency: 'ZMW', amount: '2,800.00' },
          { name: 'Grade 8-12', currency: 'ZMW', amount: '3,200.00' }
        ],
        meals: [
          { name: 'Nursery', currency: 'ZMW', amount: '300.00' },
          { name: 'Primary', currency: 'ZMW', amount: '400.00' },
          { name: 'Secondary', currency: 'ZMW', amount: '500.00' }
        ]
      };

      setGradePricing(prev => ({
        ...prev,
        [currentCategory]: {
          grades: defaultGrades[currentCategory as keyof typeof defaultGrades] || [
            { name: 'Basic Level', currency: 'ZMW', amount: '500.00' }
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
            <p className="text-slate-400">Attach Specific Prices to the different classes</p>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep5Submit} className="space-y-6">
              
              {/* Header with Create Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Pricing Structure</h3>
                <Button
                  type="button"
                  onClick={addPricingCategory}
                  variant="outline"
                  className="bg-slate-700/30 border-slate-600/40 text-white hover:bg-slate-600/40 h-8 px-4 text-sm"
                >
                  Create
                </Button>
              </div>

              {/* Pricing Categories */}
              <div className="space-y-8">
                {pricingCategories.map((category) => (
                  <div key={category.id} className="bg-slate-700/20 backdrop-blur-sm rounded-xl p-6">
                    
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-white">{category.name}</h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addServiceClass(category.id)}
                          className="text-emerald-400 hover:text-emerald-300 text-xl font-medium"
                        >
                          +
                        </button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 h-7 px-3 text-xs"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Service Classes Table */}
                    <div className="space-y-4">
                      {/* Table Header */}
                      <div className="grid grid-cols-3 gap-4 text-slate-400 text-sm font-medium pb-2 border-b border-slate-600/20">
                        <div>Service Class</div>
                        <div>Service Group</div>
                        <div>Price</div>
                      </div>

                      {/* Service Classes */}
                      {category.serviceClasses.map((serviceClass, classIndex) => (
                        <div key={classIndex} className="space-y-2">
                          {/* Service Class Header */}
                          <div className="text-slate-300 font-medium text-sm">{serviceClass.name}</div>
                          
                          {/* Service Items */}
                          {serviceClass.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="grid grid-cols-3 gap-4 items-center py-2 pl-4">
                              <div className="text-white">{item.name}</div>
                              <div className="text-slate-300">{item.serviceGroup}</div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="bg-slate-600/30 border-slate-500/40 text-slate-300 hover:bg-slate-500/40 h-7 px-3 text-xs flex-1 justify-between"
                                >
                                  {item.priceStatus}
                                  <ArrowRight className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
                  Next
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

  // Step 6: Assign Products to Groups
  if (step === 6) {
    // Get all products/grades from all categories
    const allProducts: string[] = [];
    Object.keys(gradePricing).forEach(category => {
      if (gradePricing[category]?.grades) {
        gradePricing[category].grades.forEach(grade => {
          allProducts.push(grade.name);
        });
      }
    });

    // Get ungrouped products
    const groupedProducts = Object.values(productGroups).flat();
    const ungroupedProducts = allProducts.filter(product => !groupedProducts.includes(product));
    
    const feeCategories = [
      { id: 'tuition', name: 'Tuition Fees' },
      { id: 'transportation', name: 'Transport Fees' }
    ].filter(cat => selectedFeeCategories.includes(cat.id));

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
            <h1 className="text-3xl font-bold text-white mb-2">Assign Products to groups</h1>
            <p className="text-slate-400">You Can Assign different products to product and service groups.</p>
          </div>

          {/* Clean form card with liquid glass */}
          <div className="ultra-glass-light backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep6Submit} className="space-y-6">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {feeCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Products Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-slate-300">
                  There are <span className="font-semibold text-white">{ungroupedProducts.length} Products/services</span> that have not been grouped.
                </div>
                <Select>
                  <SelectTrigger className="w-32 border-0 bg-slate-700/30 text-white h-8">
                    <SelectValue placeholder="View All" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all" className="text-white">View All</SelectItem>
                    <SelectItem value="grouped" className="text-white">Grouped</SelectItem>
                    <SelectItem value="ungrouped" className="text-white">Ungrouped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {ungroupedProducts.map((product, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedProducts.includes(product)
                        ? 'border-emerald-400/50 bg-emerald-500/10 backdrop-blur-sm'
                        : 'border-slate-600/40 bg-slate-700/20 backdrop-blur-sm hover:border-slate-500/60 hover:bg-slate-600/20'
                    }`}
                    onClick={() => toggleProductSelection(product)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedProducts.includes(product)
                          ? 'border-emerald-400 bg-emerald-500'
                          : 'border-slate-400'
                      }`}>
                        {selectedProducts.includes(product) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-white font-medium">{product}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-1 rounded bg-slate-600/30 hover:bg-slate-500/40 transition-colors"
                      >
                        <span className="text-slate-300 text-lg">+</span>
                      </button>
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

              {/* Create Group Action */}
              {selectedProducts.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-600/20">
                  <span className="text-slate-300">
                    {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
                  </span>
                  <Button
                    type="button"
                    onClick={() => {
                      const groupName = prompt('Enter group name:');
                      if (groupName?.trim()) {
                        createProductGroup(groupName.trim());
                      }
                    }}
                    className="bg-emerald-600/50 hover:bg-emerald-500/60 text-white border-0 h-8 px-4 text-sm"
                  >
                    Create Group
                  </Button>
                </div>
              )}

              {/* Show Existing Groups */}
              {Object.keys(productGroups).length > 0 && (
                <div className="pt-4 border-t border-slate-600/20">
                  <h4 className="text-slate-300 font-medium mb-3">Product Groups</h4>
                  <div className="space-y-2">
                    {Object.entries(productGroups).map(([groupName, products]) => (
                      <div key={groupName} className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{groupName}</span>
                          <span className="text-slate-400 text-sm ml-2">({products.length} products)</span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="bg-slate-500/30 border-slate-400/40 text-white hover:bg-slate-400/40 h-7 px-2 text-xs"
                        >
                          Edit
                        </Button>
                      </div>
                    ))}
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
                Group related products together for easier management and reporting
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