import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Monitor, 
  Database, 
  User, 
  Mail, 
  Phone,
  Clock,
  Timer,
  Eye,
  Camera,
  Mic,
  CheckCircle,
  AlertTriangle,
  Trophy,
  TrendingUp,
  Briefcase,
  Code,
  PieChart,
  MessageSquare,
  Target,
  Rocket
} from "lucide-react";
import { candidateFormSchema, type CandidateForm } from "@shared/aptitude-schema";
import { apiRequest } from "@/lib/queryClient";

// Test configurations
const testTypeConfigs = {
  frontend: { 
    label: "Frontend Developer", 
    description: "React, TypeScript, UI/UX", 
    icon: Monitor,
    category: "Technical",
    color: "from-blue-500 to-cyan-500"
  },
  backend: { 
    label: "Backend Developer", 
    description: "Node.js, APIs, Databases", 
    icon: Database,
    category: "Technical", 
    color: "from-purple-500 to-violet-500"
  },
  marketing: { 
    label: "Marketing Specialist", 
    description: "SEO, Social Media, Analytics", 
    icon: TrendingUp,
    category: "Business",
    color: "from-pink-500 to-rose-500"
  },
  business: { 
    label: "Business Analyst", 
    description: "Requirements, Process Analysis", 
    icon: PieChart,
    category: "Business",
    color: "from-green-500 to-emerald-500"
  },
  intern: { 
    label: "Software Engineering Intern", 
    description: "Programming Fundamentals", 
    icon: Code,
    category: "Technical",
    color: "from-orange-500 to-amber-500"
  }
};

export default function AppleAptitudeTest() {
  const [step, setStep] = useState<'registration' | 'instructions' | 'test' | 'complete'>('registration');
  const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [questions, setQuestions] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const form = useForm<CandidateForm>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      testTypes: []
    }
  });

  // Timer countdown
  useEffect(() => {
    if (step === 'test' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const submitRegistration = useMutation({
    mutationFn: async (data: CandidateForm) => {
      console.log('API request data:', data);
      const response = await fetch('/api/aptitude/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`Registration failed: ${errorText}`);
      }
      const result = await response.json();
      console.log('API response:', result);
      return result;
    },
    onSuccess: (data: any) => {
      console.log('Registration successful, data:', data);
      if (data?.questions) {
        setQuestions(data.questions);
      }
      setStep('instructions');
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
    }
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTestTypeChange = (testType: string, checked: boolean) => {
    if (checked) {
      const config = testTypeConfigs[testType as keyof typeof testTypeConfigs];
      const currentCategories = selectedTestTypes.map(t => 
        testTypeConfigs[t as keyof typeof testTypeConfigs].category
      );
      
      if (currentCategories.length > 0 && !currentCategories.includes(config.category)) {
        return; // Prevent cross-category selection
      }
      
      setSelectedTestTypes(prev => {
        const newTypes = [...prev, testType];
        // Clear any existing form error when user selects a test type
        if (newTypes.length > 0) {
          form.clearErrors('testTypes');
        }
        return newTypes;
      });
    } else {
      setSelectedTestTypes(prev => prev.filter(t => t !== testType));
    }
  };

  const onSubmit = (data: CandidateForm) => {
    console.log('Form submitted with data:', data);
    console.log('Selected test types:', selectedTestTypes);
    
    if (selectedTestTypes.length === 0) {
      form.setError('testTypes', { message: 'Please select at least one test category' });
      return;
    }
    
    // Clear any existing testTypes error
    form.clearErrors('testTypes');
    
    // Submit with selected test types
    const submissionData = { ...data, testTypes: selectedTestTypes };
    console.log('Submitting data:', submissionData);
    submitRegistration.mutate(submissionData);
  };

  if (step === 'registration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4">
        <div className="max-w-4xl mx-auto pt-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-thin text-white mb-4 tracking-tight">
              Developer Assessment
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Join our team through comprehensive technical and business evaluation
            </p>
          </div>

          <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-12 px-12">
              <CardTitle className="text-3xl font-light text-slate-900 mb-3">
                Application Registration
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 font-light">
                Complete your profile to begin the assessment process
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-12 pb-12">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                {/* Personal Information */}
                <div className="space-y-8">
                  <h3 className="text-xl font-light text-slate-900 border-b border-slate-200 pb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-sm font-medium text-slate-800 flex items-center">
                        <User className="w-4 h-4 mr-2 text-slate-500" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        {...form.register('fullName')}
                        className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                      {form.formState.errors.fullName && (
                        <p className="text-red-500 text-sm font-light">{form.formState.errors.fullName.message}</p>
                      )}
                    </div>
                  
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-800 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-slate-500" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                        placeholder="your@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm font-light">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-800 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-500" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        {...form.register('phone')}
                        className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                        placeholder="+260 123 456 789"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm font-light">{form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="experience" className="text-sm font-medium text-slate-800 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
                        Experience Level
                      </Label>
                      <Input
                        id="experience"
                        {...form.register('experience')}
                        className="h-12 border-0 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:ring-offset-0 transition-all duration-200"
                        placeholder="e.g., 2 years, Entry level"
                      />
                      {form.formState.errors.experience && (
                        <p className="text-red-500 text-sm font-light">{form.formState.errors.experience.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Test Selection */}
                <div className="space-y-8">
                  <h3 className="text-xl font-light text-slate-900 border-b border-slate-200 pb-4">
                    Select Assessment Areas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(testTypeConfigs).map(([testType, config]) => {
                      const Icon = config.icon;
                      const isSelected = selectedTestTypes.includes(testType);
                      
                      return (
                        <div 
                          key={testType} 
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? 'border-emerald-400 bg-emerald-50 shadow-lg' 
                              : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50'
                          }`}
                          onClick={(e) => {
                            // Prevent double triggering from checkbox
                            if (e.target === e.currentTarget) {
                              handleTestTypeChange(testType, !isSelected);
                            }
                          }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${config.color} text-white`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-slate-900">{config.label}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {config.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {config.description}
                              </p>
                            </div>
                            <Checkbox 
                              checked={isSelected}
                              onCheckedChange={(checked) => handleTestTypeChange(testType, checked as boolean)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {form.formState.errors.testTypes && selectedTestTypes.length === 0 && (
                    <p className="text-red-500 text-sm font-light">{form.formState.errors.testTypes.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={submitRegistration.isPending}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {submitRegistration.isPending ? "Preparing Assessment..." : "Begin Assessment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Add other test steps (instructions, test, complete) with Apple design
  if (step === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4">
        <div className="max-w-4xl mx-auto pt-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 mb-6">
              <Timer className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-thin text-white mb-3 tracking-tight">
              Assessment Instructions
            </h1>
            <p className="text-lg text-slate-300 font-light">
              Please review the guidelines before beginning
            </p>
          </div>

          <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-light text-slate-900 mb-4">Ready to Begin Your Assessment</h2>
                  <p className="text-slate-600 font-light leading-relaxed">
                    You have selected: {selectedTestTypes.map(type => testTypeConfigs[type as keyof typeof testTypeConfigs].label).join(', ')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-900 mb-2">Time Limit</h3>
                    <p className="text-sm text-slate-600">60 minutes total</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <Eye className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-900 mb-2">AI Monitoring</h3>
                    <p className="text-sm text-slate-600">Behavior tracked</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-900 mb-2">Questions</h3>
                    <p className="text-sm text-slate-600">Multiple choice + coding</p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep('test')}
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-2xl"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-4">Assessment System</h2>
          <p className="text-slate-600 font-light">Additional steps will be implemented as needed.</p>
        </CardContent>
      </Card>
    </div>
  );
}