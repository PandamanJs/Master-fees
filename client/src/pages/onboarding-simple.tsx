import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingSimplePage() {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState('');
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [townDistrict, setTownDistrict] = useState('');
  const [, navigate] = useLocation();

  const countries = ['Zambia', 'South Africa', 'Kenya', 'Nigeria', 'Ghana'];
  const zambianProvinces = [
    'Central Province', 'Copperbelt Province', 'Eastern Province', 
    'Lusaka Province', 'Southern Province', 'Western Province'
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolName.trim()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (country && stateProvince && townDistrict && schoolName) {
      navigate('/aptitude');
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-8">Master-Fees</h1>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-slate-200 mb-3 font-medium text-center">
                  Enter the Name of Your School
                </label>
                <Input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="border-0 bg-slate-700/30 text-white rounded-xl h-12 text-center"
                  placeholder="School name"
                />
              </div>
              <Button
                type="submit"
                disabled={!schoolName.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl h-12"
              >
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Basic School Information</h1>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/20 p-8">
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div>
              <label className="block text-slate-200 mb-3 font-medium text-center">
                School Name
              </label>
              <Input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="border-0 bg-slate-700/30 text-white rounded-xl h-12 text-center"
                placeholder="School name"
              />
            </div>

            <div>
              <label className="block text-slate-200 mb-3 font-medium text-center">
                Select Country
              </label>
              <Select 
                value={country} 
                onValueChange={setCountry}
              >
                <SelectTrigger className="border-0 bg-slate-700/30 text-white rounded-xl h-12">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {countries.map((countryOption) => (
                    <SelectItem key={countryOption} value={countryOption} className="text-white">
                      {countryOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-200 mb-3 font-medium text-center">
                  Select Province
                </label>
                <Select 
                  value={stateProvince} 
                  onValueChange={setStateProvince}
                >
                  <SelectTrigger className="border-0 bg-slate-700/30 text-white rounded-xl h-12">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {country === 'Zambia' ? (
                      zambianProvinces.map((province) => (
                        <SelectItem key={province} value={province} className="text-white">
                          {province}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="General Province" className="text-white">
                        General Province
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-slate-200 mb-3 font-medium text-center">
                  Select District
                </label>
                <Select 
                  value={townDistrict} 
                  onValueChange={setTownDistrict}
                >
                  <SelectTrigger className="border-0 bg-slate-700/30 text-white rounded-xl h-12">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="General District" className="text-white">
                      General District
                    </SelectItem>
                    <SelectItem value="Central District" className="text-white">
                      Central District
                    </SelectItem>
                    <SelectItem value="Other" className="text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-600/50 text-white rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl"
                disabled={!country || !stateProvince || !townDistrict}
              >
                Proceed
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}