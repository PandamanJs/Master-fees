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
  Rocket,
  Award,
  Zap,
  BarChart3,
  Activity
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
  const [performanceMetrics, setPerformanceMetrics] = useState({
    correctAnswers: 0,
    accuracy: 0,
    timePerQuestion: 0,
    confidenceScore: 0,
    focusScore: 100
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [animatedValues, setAnimatedValues] = useState({
    accuracy: 0,
    timePerQuestion: 0,
    confidenceScore: 0,
    focusScore: 0
  });
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

  // Animate performance metrics with smooth transitions
  useEffect(() => {
    const animateMetric = (key: keyof typeof animatedValues, targetValue: number) => {
      const startValue = animatedValues[key];
      const diff = targetValue - startValue;
      const duration = 1000; // 1 second animation
      const steps = 60; // 60fps
      const stepSize = diff / steps;
      let currentStep = 0;

      const animate = () => {
        if (currentStep < steps) {
          setAnimatedValues(prev => ({
            ...prev,
            [key]: startValue + (stepSize * currentStep)
          }));
          currentStep++;
          requestAnimationFrame(animate);
        } else {
          setAnimatedValues(prev => ({
            ...prev,
            [key]: targetValue
          }));
        }
      };
      animate();
    };

    // Animate all metrics when they change
    animateMetric('accuracy', performanceMetrics.accuracy);
    animateMetric('timePerQuestion', performanceMetrics.timePerQuestion);
    animateMetric('confidenceScore', performanceMetrics.confidenceScore);
    animateMetric('focusScore', performanceMetrics.focusScore);
  }, [performanceMetrics]);

  // Start timer for each question
  useEffect(() => {
    if (step === 'test') {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, step]);

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

  // Update performance metrics when answering questions
  const updatePerformanceMetrics = (questionId: number, selectedAnswer: string) => {
    const currentTime = Date.now();
    const timeSpent = (currentTime - questionStartTime) / 1000;
    const currentQuestion = questions.find(q => q.id === questionId);
    
    // Calculate if answer is correct (mock logic for now)
    const isCorrect = currentQuestion?.correct === parseInt(selectedAnswer);
    
    setPerformanceMetrics(prev => {
      const totalAnswered = Object.keys(answers).length + 1;
      const newCorrectAnswers = prev.correctAnswers + (isCorrect ? 1 : 0);
      const newAccuracy = (newCorrectAnswers / totalAnswered) * 100;
      
      // Calculate average time per question
      const avgTimePerQuestion = (prev.timePerQuestion * (totalAnswered - 1) + timeSpent) / totalAnswered;
      
      // Calculate confidence score based on answer time (faster = more confident)
      const confidenceScore = Math.max(20, Math.min(100, 100 - (timeSpent * 5)));
      
      // Update focus score (decreases if taking too long)
      const focusScore = Math.max(50, prev.focusScore - (timeSpent > 30 ? 5 : 0));
      
      return {
        correctAnswers: newCorrectAnswers,
        accuracy: Math.round(newAccuracy),
        timePerQuestion: Math.round(avgTimePerQuestion),
        confidenceScore: Math.round(confidenceScore),
        focusScore: Math.round(focusScore)
      };
    });
  };

  // Generate sample questions based on selected test types
  const generateSampleQuestions = (testTypes: string[]) => {
    const questionBank = {
      frontend: [
        {
          id: 1,
          question: "What is the purpose of React hooks?",
          options: [
            "To manage state in functional components",
            "To create class components",
            "To style components",
            "To handle routing"
          ],
          correct: 0,
          category: "Frontend",
          type: "multiple-choice"
        },
        {
          id: 2,
          question: "Which CSS property is used to create flexbox layout?",
          options: [
            "display: block",
            "display: flex",
            "display: grid", 
            "display: inline"
          ],
          correct: 1,
          category: "Frontend",
          type: "multiple-choice"
        },
        {
          id: 11,
          question: "Create a React component that displays a counter with increment and decrement buttons.",
          code: `// Complete this React component
function Counter() {
  // Your code here
  
  return (
    <div>
      {/* Display counter and buttons */}
    </div>
  );
}`,
          expected: "useState hook with counter state, increment/decrement functions, proper JSX structure",
          category: "Frontend",
          type: "coding"
        }
      ],
      backend: [
        {
          id: 3,
          question: "What is the purpose of middleware in Express.js?",
          options: [
            "To handle database connections",
            "To process requests before reaching route handlers",
            "To create HTML templates",
            "To manage file uploads"
          ],
          correct: 1,
          category: "Backend",
          type: "multiple-choice"
        },
        {
          id: 4,
          question: "Which HTTP method is typically used to update existing data?",
          options: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
          ],
          correct: 2,
          category: "Backend",
          type: "multiple-choice"
        },
        {
          id: 12,
          question: "Create an Express.js API endpoint that accepts POST requests and validates user data.",
          code: `// Complete this Express.js route
app.post('/api/users', (req, res) => {
  // Your code here
  // Validate: name (required), email (valid format), age (number > 0)
  
});`,
          expected: "Request body validation, error handling, proper response status codes, data structure validation",
          category: "Backend",
          type: "coding"
        }
      ],
      marketing: [
        {
          id: 5,
          question: "What does SEO stand for?",
          options: [
            "Social Engine Optimization",
            "Search Engine Optimization",
            "Site Enhancement Operations",
            "Strategic Email Outreach"
          ],
          correct: 1,
          category: "Marketing"
        },
        {
          id: 6,
          question: "Which metric measures the percentage of visitors who leave after viewing only one page?",
          options: [
            "Conversion Rate",
            "Click-through Rate", 
            "Bounce Rate",
            "Engagement Rate"
          ],
          correct: 2,
          category: "Marketing"
        }
      ],
      business: [
        {
          id: 7,
          question: "What is the primary purpose of a SWOT analysis?",
          options: [
            "To analyze financial statements",
            "To evaluate Strengths, Weaknesses, Opportunities, and Threats",
            "To create marketing campaigns",
            "To manage project timelines"
          ],
          correct: 1,
          category: "Business"
        },
        {
          id: 8,
          question: "Which methodology emphasizes iterative development and customer collaboration?",
          options: [
            "Waterfall",
            "Six Sigma",
            "Agile",
            "Lean"
          ],
          correct: 2,
          category: "Business"
        }
      ],
      intern: [
        {
          id: 9,
          question: "What is a variable in programming?",
          options: [
            "A fixed value that never changes",
            "A storage location with an associated name",
            "A type of loop structure",
            "A debugging tool"
          ],
          correct: 1,
          category: "Programming"
        },
        {
          id: 10,
          question: "Which data structure follows Last-In-First-Out (LIFO) principle?",
          options: [
            "Queue",
            "Array",
            "Stack",
            "Linked List"
          ],
          correct: 2,
          category: "Programming"
        }
      ]
    };

    let selectedQuestions: any[] = [];
    
    testTypes.forEach(type => {
      if (questionBank[type as keyof typeof questionBank]) {
        selectedQuestions = [...selectedQuestions, ...questionBank[type as keyof typeof questionBank]];
      }
    });

    // If no questions found, add default questions
    if (selectedQuestions.length === 0) {
      selectedQuestions = [
        {
          id: 999,
          question: "What is your primary area of interest?",
          options: [
            "Frontend Development",
            "Backend Development",
            "Marketing",
            "Business Analysis"
          ],
          correct: 0,
          category: "General"
        }
      ];
    }

    return selectedQuestions;
  };

  // Performance visualization component
  const PerformanceVisualization = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-light text-white mb-2">Real-time Performance</h3>
        <p className="text-sm text-slate-300">Live analytics of your assessment progress</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Accuracy */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Accuracy</p>
              <p className="text-xs text-slate-300">{animatedValues.accuracy.toFixed(0)}%</p>
            </div>
          </div>
          <Progress 
            value={animatedValues.accuracy} 
            className="h-2 bg-white/10"
          />
        </div>

        {/* Response Time */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Avg. Time</p>
              <p className="text-xs text-slate-300">{animatedValues.timePerQuestion.toFixed(0)}s</p>
            </div>
          </div>
          <Progress 
            value={Math.max(0, 100 - (animatedValues.timePerQuestion * 2))} 
            className="h-2 bg-white/10"
          />
        </div>

        {/* Confidence Score */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Confidence</p>
              <p className="text-xs text-slate-300">{animatedValues.confidenceScore.toFixed(0)}%</p>
            </div>
          </div>
          <Progress 
            value={animatedValues.confidenceScore} 
            className="h-2 bg-white/10"
          />
        </div>

        {/* Focus Score */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Focus</p>
              <p className="text-xs text-slate-300">{animatedValues.focusScore.toFixed(0)}%</p>
            </div>
          </div>
          <Progress 
            value={animatedValues.focusScore} 
            className="h-2 bg-white/10"
          />
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Test Progress</p>
            <p className="text-xs text-slate-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-light text-white">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </p>
          </div>
        </div>
        <Progress 
          value={((currentQuestion + 1) / questions.length) * 100} 
          className="h-3 bg-white/10"
        />
      </div>
    </div>
  );

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
    
    // Generate questions based on selected test types and proceed
    const sampleQuestions = generateSampleQuestions(selectedTestTypes);
    setQuestions(sampleQuestions);
    setStep('instructions');
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
                  {/* Available Tests - Frontend and Backend Only */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(testTypeConfigs)
                      .filter(([testType]) => ['frontend', 'backend'].includes(testType))
                      .map(([testType, config]) => {
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

                  {/* Coming Soon Tests */}
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-slate-600 mb-4">Coming Soon</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(testTypeConfigs)
                        .filter(([testType]) => ['marketing', 'business', 'intern'].includes(testType))
                        .map(([testType, config]) => {
                          const Icon = config.icon;
                          
                          return (
                            <div 
                              key={testType} 
                              className="relative p-4 rounded-xl border border-slate-200 bg-slate-50/60 opacity-70"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${config.color} text-white opacity-60`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-slate-700">{config.label}</h4>
                                  <p className="text-xs text-slate-500">{config.description}</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2">
                                <Badge variant="outline" className="text-xs px-2 py-1 text-slate-500">
                                  Coming Soon
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                    </div>
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
                  onClick={() => {
                    // Generate sample questions based on selected test types
                    const sampleQuestions = generateSampleQuestions(selectedTestTypes);
                    setQuestions(sampleQuestions);
                    setStep('test');
                  }}
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

  // Test interface with real-time performance visualization
  if (step === 'test') {
    console.log('Test step - Questions available:', questions.length);
    
    if (questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-lg mb-4">Loading questions...</p>
            <Button onClick={() => {
              const sampleQuestions = generateSampleQuestions(selectedTestTypes);
              setQuestions(sampleQuestions);
            }}>
              Generate Questions
            </Button>
          </div>
        </div>
      );
    }
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Main Test Area */}
          <div className="flex-1 space-y-6">
            {/* Header with Timer */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-light text-white mb-1">Assessment in Progress</h1>
                  <p className="text-sm text-slate-300">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <Timer className="w-4 h-4" />
                    <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
                  </div>
                  <p className="text-xs text-slate-300">Time remaining</p>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge className="mb-4" variant="secondary">
                    {selectedTestTypes.map(type => testTypeConfigs[type as keyof typeof testTypeConfigs].category).join(', ')}
                  </Badge>
                  <h2 className="text-2xl font-light text-slate-900 mb-4 leading-relaxed">
                    {currentQ.question}
                  </h2>
                </div>

                {/* Question Content Based on Type */}
                {currentQ.type === 'multiple-choice' ? (
                  <div className="space-y-3">
                    {currentQ.options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          const answerId = index.toString();
                          setAnswers(prev => ({ ...prev, [currentQ.id]: answerId }));
                          updatePerformanceMetrics(currentQ.id, answerId);
                          
                          // Auto-advance to next question after brief delay
                          setTimeout(() => {
                            if (currentQuestion < questions.length - 1) {
                              setCurrentQuestion(prev => prev + 1);
                            } else {
                              setStep('complete');
                            }
                          }, 800);
                      }}
                      className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                        answers[currentQ.id] === index.toString()
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          answers[currentQ.id] === index.toString()
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-slate-900 font-light">{option}</span>
                      </div>
                    </button>
                  ))}
                  </div>
                ) : (
                  /* Coding Question Interface */
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                      <pre className="text-green-400 text-sm font-mono overflow-x-auto">
                        <code>{currentQ.code}</code>
                      </pre>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Your Solution:</label>
                      <textarea
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => {
                          setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }));
                          updatePerformanceMetrics(currentQ.id, e.target.value);
                        }}
                        placeholder="Write your code here..."
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          if (currentQuestion < questions.length - 1) {
                            setCurrentQuestion(prev => prev + 1);
                          } else {
                            setStep('complete');
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
                      >
                        Next Question
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // AI Code Analysis simulation
                          alert('Code analysis: Good approach! Consider adding error handling.');
                        }}
                        className="px-6 py-2 rounded-lg"
                      >
                        Get AI Hint
                      </Button>
                    </div>
                  </div>
                )}

                {/* AI Monitoring Alert */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-900">AI Monitoring Active</p>
                      <p className="text-xs text-purple-700">Focus score: {performanceMetrics.focusScore}% | Confidence: {performanceMetrics.confidenceScore}%</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Sidebar */}
          <div className="w-80">
            <PerformanceVisualization />
          </div>
        </div>
      </div>
    );
  }

  // Submit assessment results mutation
  const submitAssessment = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit assessment');
      return response.json();
    },
    onSuccess: () => {
      console.log('Assessment submitted successfully');
    },
    onError: (error) => {
      console.error('Assessment submission error:', error);
    }
  });

  // Auto-submit results when assessment completes
  useEffect(() => {
    if (step === 'complete' && !submitAssessment.isSuccess && !submitAssessment.isPending) {
      const assessmentData = {
        candidateInfo: form.getValues(),
        answers,
        performanceMetrics,
        correctAnswers: performanceMetrics.correctAnswers,
        totalQuestions: questions.length,
        timeSpent: 3600 - timeLeft // Total time minus remaining time
      };
      submitAssessment.mutate(assessmentData);
    }
  }, [step, submitAssessment.isSuccess, submitAssessment.isPending]);

  // Completion screen
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
        <Card className="border-0 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl mb-8">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-light text-slate-900 mb-4">Assessment Complete!</h2>
            <p className="text-lg text-slate-600 font-light mb-8">
              Thank you for completing the assessment. Your results have been submitted successfully.
            </p>
            
            {/* Final Performance Summary */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-2xl font-light text-slate-900">{performanceMetrics.accuracy}%</p>
                <p className="text-sm text-slate-600">Final Accuracy</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-2xl font-light text-slate-900">{performanceMetrics.correctAnswers}/{questions.length}</p>
                <p className="text-sm text-slate-600">Correct Answers</p>
              </div>
            </div>
            
            {submitAssessment.isPending && (
              <p className="text-sm text-blue-600 mb-4">Submitting results...</p>
            )}
            
            {submitAssessment.isSuccess && (
              <p className="text-sm text-green-600 mb-4">Results submitted successfully!</p>
            )}
            
            <p className="text-sm text-slate-500">
              Our team will review your submission and contact you within 48 hours.
            </p>
          </CardContent>
        </Card>
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
          <p className="text-slate-600 font-light">Loading assessment interface...</p>
        </CardContent>
      </Card>
    </div>
  );
}