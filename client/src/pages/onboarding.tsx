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
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [townDistrict, setTownDistrict] = useState('');
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
        
        // Navigate to assessment or dashboard
        navigate('/aptitude-apple');
      } catch (error) {
        console.error('Failed to store school data:', error);
        // Still navigate even if storage fails
        navigate('/aptitude-apple');
      }
    }
  };

  const handleBack = () => {
    setStep(1);
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
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12 text-center"
                    placeholder="Type your school name or select from list..."
                  />
                  
                  {/* School suggestions dropdown */}
                  {schoolName.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-600/20 max-h-40 overflow-y-auto">
                      <SchoolSuggestions 
                        query={schoolName}
                        onSelect={setSchoolName}
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