import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { 
  Code2, 
  Brain, 
  Monitor, 
  Database, 
  Timer, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  AlertCircle,
  Camera,
  Mic,
  Eye,
  TrendingUp,
  Users,
  BarChart3,
  Briefcase
} from "lucide-react";

const candidateSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  testTypes: z.array(z.enum(["frontend", "backend", "marketing", "business-analyst", "software-engineering-intern"])).min(1, "Please select at least one test type"),
  experience: z.string().min(1, "Please select your experience level"),
});

type CandidateForm = z.infer<typeof candidateSchema>;

// Test questions by category
const frontendQuestions = [
  {
    id: 1,
    question: "What is the virtual DOM in React?",
    options: [
      "A copy of the real DOM kept in memory",
      "A JavaScript representation of the real DOM",
      "A faster version of the real DOM",
      "A testing framework for React"
    ],
    correct: 1,
    category: "React"
  },
  {
    id: 2,
    question: "Which CSS property is used for creating responsive layouts?",
    options: [
      "display: block",
      "position: absolute",
      "display: flex",
      "margin: auto"
    ],
    correct: 2,
    category: "CSS"
  },
  {
    id: 3,
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To manage component state",
      "To handle side effects in functional components",
      "To create custom hooks",
      "To optimize component rendering"
    ],
    correct: 1,
    category: "React Hooks"
  },
  {
    id: 4,
    question: "Which HTML element is best for semantic structure?",
    options: [
      "<div>",
      "<span>",
      "<section>",
      "<p>"
    ],
    correct: 2,
    category: "HTML"
  },
  {
    id: 5,
    question: "What is the key prop used for in React lists?",
    options: [
      "To set the display order",
      "To help React identify which items have changed",
      "To set the order of items",
      "To make items clickable"
    ],
    correct: 1,
    category: "React"
  }
];

const backendQuestions = [
  {
    id: 1,
    question: "What is middleware in Express.js?",
    options: [
      "A database connection handler",
      "Functions that execute during the request-response cycle",
      "A type of HTTP request",
      "A file compression tool"
    ],
    correct: 1,
    category: "Node.js"
  },
  {
    id: 2,
    question: "Which HTTP status code indicates a successful request?",
    options: [
      "404",
      "500",
      "200",
      "301"
    ],
    correct: 2,
    category: "HTTP"
  },
  {
    id: 3,
    question: "What is the purpose of indexing in databases?",
    options: [
      "To delete records faster",
      "To improve query performance",
      "To backup data",
      "To encrypt data"
    ],
    correct: 1,
    category: "Database"
  },
  {
    id: 4,
    question: "What is JWT used for?",
    options: [
      "Database queries",
      "User authentication and authorization",
      "File uploads",
      "Email sending"
    ],
    correct: 1,
    category: "Security"
  },
  {
    id: 5,
    question: "Which Node.js module is commonly used for password hashing?",
    options: [
      "crypto",
      "bcrypt",
      "hash",
      "password"
    ],
    correct: 1,
    category: "Security"
  }
];

const marketingQuestions = [
  {
    id: 1,
    question: "What is the primary goal of digital marketing?",
    options: [
      "To increase website traffic only",
      "To build brand awareness and drive conversions",
      "To reduce marketing costs",
      "To collect customer data"
    ],
    correct: 1,
    category: "Digital Marketing"
  },
  {
    id: 2,
    question: "What does SEO stand for?",
    options: [
      "Social Engagement Optimization",
      "Search Engine Optimization",
      "Sales Enhancement Operations",
      "Strategic Email Outreach"
    ],
    correct: 1,
    category: "SEO"
  },
  {
    id: 3,
    question: "Which metric is most important for measuring social media engagement?",
    options: [
      "Number of followers only",
      "Likes, comments, shares, and saves combined",
      "Post frequency",
      "Account age"
    ],
    correct: 1,
    category: "Social Media"
  },
  {
    id: 4,
    question: "What is A/B testing in marketing?",
    options: [
      "Testing two different audiences",
      "Comparing two versions of content to see which performs better",
      "Testing ad budgets",
      "Analyzing competitor strategies"
    ],
    correct: 1,
    category: "Analytics"
  },
  {
    id: 5,
    question: "What is the marketing funnel?",
    options: [
      "A tool for email marketing",
      "The customer journey from awareness to purchase",
      "A social media strategy",
      "A budgeting method"
    ],
    correct: 1,
    category: "Strategy"
  }
];

const businessAnalystQuestions = [
  {
    id: 1,
    question: "What is the primary role of a business analyst?",
    options: [
      "To manage company finances",
      "To bridge the gap between business needs and IT solutions",
      "To hire new employees",
      "To handle customer complaints"
    ],
    correct: 1,
    category: "Business Analysis"
  },
  {
    id: 2,
    question: "What is a stakeholder in business analysis?",
    options: [
      "Only company shareholders",
      "Anyone who is affected by or can influence a project",
      "Only the project manager",
      "Only customers"
    ],
    correct: 1,
    category: "Stakeholder Management"
  },
  {
    id: 3,
    question: "What is the purpose of requirements gathering?",
    options: [
      "To set project budgets",
      "To understand what the business needs from a solution",
      "To hire project team members",
      "To design user interfaces"
    ],
    correct: 1,
    category: "Requirements"
  },
  {
    id: 4,
    question: "What is a user story in agile methodology?",
    options: [
      "A biography of system users",
      "A short description of a feature from the user's perspective",
      "A technical specification document",
      "A project timeline"
    ],
    correct: 1,
    category: "Agile"
  },
  {
    id: 5,
    question: "What is process mapping used for?",
    options: [
      "Creating office floor plans",
      "Visualizing and analyzing business workflows",
      "Designing software architecture",
      "Planning marketing campaigns"
    ],
    correct: 1,
    category: "Process Analysis"
  }
];

const softwareEngineeringQuestions = [
  {
    id: 1,
    question: "What is version control in software development?",
    options: [
      "Controlling software versions for sale",
      "A system for tracking changes in code over time",
      "Testing different software versions",
      "Managing software licenses"
    ],
    correct: 1,
    category: "Development Tools"
  },
  {
    id: 2,
    question: "What does API stand for?",
    options: [
      "Advanced Programming Interface",
      "Application Programming Interface",
      "Automated Program Integration",
      "Application Process Integration"
    ],
    correct: 1,
    category: "Software Architecture"
  },
  {
    id: 3,
    question: "What is debugging in programming?",
    options: [
      "Removing bugs from computer hardware",
      "The process of finding and fixing errors in code",
      "Adding comments to code",
      "Testing software performance"
    ],
    correct: 1,
    category: "Programming"
  },
  {
    id: 4,
    question: "What is the difference between frontend and backend?",
    options: [
      "Frontend is visible to users, backend handles server-side logic",
      "Frontend is for mobile, backend is for web",
      "Frontend uses databases, backend uses interfaces",
      "There is no difference"
    ],
    correct: 0,
    category: "Web Development"
  },
  {
    id: 5,
    question: "What is object-oriented programming (OOP)?",
    options: [
      "Programming with physical objects",
      "A programming paradigm based on objects and classes",
      "Programming for mobile objects",
      "A type of database design"
    ],
    correct: 1,
    category: "Programming Concepts"
  }
];

// Test type categories and their relationships
const testTypeCategories = {
  technical: ['frontend', 'backend', 'software-engineering-intern'],
  business: ['marketing', 'business-analyst']
};

// Question mapping
const questionsByType = {
  frontend: frontendQuestions,
  backend: backendQuestions,
  marketing: marketingQuestions,
  'business-analyst': businessAnalystQuestions,
  'software-engineering-intern': softwareEngineeringQuestions
};

// Test type configurations with icons and descriptions
const testTypeConfigs = {
  frontend: {
    label: "Frontend Developer",
    icon: Monitor,
    description: "React, JavaScript, CSS, HTML",
    category: "technical"
  },
  backend: {
    label: "Backend Developer", 
    icon: Database,
    description: "Node.js, APIs, Databases",
    category: "technical"
  },
  marketing: {
    label: "Marketing Specialist",
    icon: TrendingUp,
    description: "Digital Marketing, SEO, Analytics",
    category: "business"
  },
  'business-analyst': {
    label: "Business Analyst",
    icon: BarChart3,
    description: "Requirements, Process Analysis",
    category: "business"
  },
  'software-engineering-intern': {
    label: "Software Engineering Intern",
    icon: Code2,
    description: "Programming Fundamentals, Development",
    category: "technical"
  }
};

export default function AptitudePage() {
  const [step, setStep] = useState<'registration' | 'instructions' | 'test' | 'completed'>('registration');
  const [candidate, setCandidate] = useState<CandidateForm | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [codingAnswer, setCodingAnswer] = useState("");
  const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<CandidateForm>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      testTypes: [],
      experience: '',
    },
  });

  // Check if test types can be selected together
  const canSelectTestTypes = (newTypes: string[]) => {
    if (newTypes.length <= 1) return true;
    
    // Check if all selected types are in the same category
    const technicalTypes = newTypes.filter(type => testTypeCategories.technical.includes(type));
    const businessTypes = newTypes.filter(type => testTypeCategories.business.includes(type));
    
    // Allow multiple selections only within the same category
    return (technicalTypes.length === newTypes.length) || (businessTypes.length === newTypes.length);
  };

  const handleTestTypeChange = (testType: string, checked: boolean) => {
    const currentTypes = form.getValues('testTypes') || [];
    let newTypes: string[];
    
    if (checked) {
      newTypes = [...currentTypes, testType];
    } else {
      newTypes = currentTypes.filter(type => type !== testType);
    }
    
    if (canSelectTestTypes(newTypes)) {
      form.setValue('testTypes', newTypes);
      setSelectedTestTypes(newTypes);
    } else {
      toast({
        title: "Invalid Selection",
        description: "You can only select multiple tests within the same job category (Technical or Business)",
        variant: "destructive",
      });
    }
  };

  const submitRegistration = useMutation({
    mutationFn: async (data: CandidateForm) => {
      const response = await fetch('/api/aptitude/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setCandidate(form.getValues());
      setStep('instructions');
      toast({
        title: "Registration Successful",
        description: "Please read the instructions carefully before starting the test.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitTest = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/aptitude/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Test submission failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setStep('completed');
      toast({
        title: "Test Submitted Successfully",
        description: "Your results will be reviewed by our team. We'll contact you within 48 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Combine questions from all selected test types
  const getQuestionsForTests = (testTypes: string[]) => {
    const combinedQuestions: any[] = [];
    testTypes.forEach(testType => {
      const questions = questionsByType[testType as keyof typeof questionsByType] || [];
      combinedQuestions.push(...questions.map(q => ({ ...q, testType })));
    });
    return combinedQuestions;
  };
  
  const questions = candidate ? getQuestionsForTests(candidate.testTypes) : [];

  const startTest = async () => {
    try {
      // Request camera and microphone permissions for AI monitoring
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setIsMonitoring(true);
      setStep('test');
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      toast({
        title: "Test Started",
        description: "AI monitoring is active. Good luck!",
      });
    } catch (error) {
      toast({
        title: "Permission Required",
        description: "Camera and microphone access is required for AI monitoring.",
        variant: "destructive",
      });
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitTest = () => {
    const testData = {
      candidate,
      answers,
      codingAnswer,
      questions,
      timeSpent: (30 * 60) - timeLeft,
      testTypes: candidate?.testTypes,
      timestamp: new Date().toISOString()
    };
    
    submitTest.mutate(testData);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = (data: CandidateForm) => {
    submitRegistration.mutate(data);
  };

  if (step === 'registration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Brain className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800">Developer Aptitude Test</CardTitle>
              <CardDescription className="text-lg text-slate-600 mt-2">
                Register for comprehensive technical and business assessment
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register('fullName')}
                      className="border-slate-200 focus:border-emerald-400"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-500 text-sm">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className="border-slate-200 focus:border-emerald-400"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      className="border-slate-200 focus:border-emerald-400"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Experience Level</Label>
                    <RadioGroup
                      value={form.watch('experience')}
                      onValueChange={(value) => form.setValue('experience', value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="entry" id="entry" />
                        <Label htmlFor="entry">Entry Level (0-2 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mid" id="mid" />
                        <Label htmlFor="mid">Mid Level (2-5 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior">Senior Level (5+ years)</Label>
                      </div>
                    </RadioGroup>
                    {form.formState.errors.experience && (
                      <p className="text-red-500 text-sm">{form.formState.errors.experience.message}</p>
                    )}
                  </div>
                </div>

                {/* Test Type Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Select Test Types (Multiple selections allowed within same category)
                  </Label>
                  
                  {/* Technical Category */}
                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                      <Code2 className="w-4 h-4 mr-2 text-emerald-600" />
                      Technical Positions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {testTypeCategories.technical.map((testType) => {
                        const config = testTypeConfigs[testType as keyof typeof testTypeConfigs];
                        const Icon = config.icon;
                        return (
                          <div key={testType} className="flex items-start space-x-3 p-3 bg-white rounded border">
                            <Checkbox
                              id={testType}
                              checked={selectedTestTypes.includes(testType)}
                              onCheckedChange={(checked) => handleTestTypeChange(testType, checked as boolean)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={testType} className="flex items-center cursor-pointer">
                                <Icon className="w-4 h-4 mr-2 text-emerald-600" />
                                <div>
                                  <div className="font-medium text-sm">{config.label}</div>
                                  <div className="text-xs text-slate-500">{config.description}</div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Business Category */}
                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-emerald-600" />
                      Business Positions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testTypeCategories.business.map((testType) => {
                        const config = testTypeConfigs[testType as keyof typeof testTypeConfigs];
                        const Icon = config.icon;
                        return (
                          <div key={testType} className="flex items-start space-x-3 p-3 bg-white rounded border">
                            <Checkbox
                              id={testType}
                              checked={selectedTestTypes.includes(testType)}
                              onCheckedChange={(checked) => handleTestTypeChange(testType, checked as boolean)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={testType} className="flex items-center cursor-pointer">
                                <Icon className="w-4 h-4 mr-2 text-emerald-600" />
                                <div>
                                  <div className="font-medium text-sm">{config.label}</div>
                                  <div className="text-xs text-slate-500">{config.description}</div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {form.formState.errors.testTypes && (
                    <p className="text-red-500 text-sm">{form.formState.errors.testTypes.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  disabled={submitRegistration.isPending}
                >
                  {submitRegistration.isPending ? "Registering..." : "Register for Test"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800">Test Instructions</CardTitle>
              <CardDescription className="text-slate-600">
                Please read carefully before starting your aptitude test
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <Timer className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-800">30 Minutes</h3>
                  <p className="text-sm text-slate-600">Total test duration</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-800">{questions.length} Questions</h3>
                  <p className="text-sm text-slate-600">Multiple choice + coding</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-800">AI Monitored</h3>
                  <p className="text-sm text-slate-600">Integrity tracking</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Selected Tests:</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate?.testTypes.map(testType => {
                    const config = testTypeConfigs[testType as keyof typeof testTypeConfigs];
                    return (
                      <Badge key={testType} variant="secondary" className="px-3 py-1">
                        {config.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Important Guidelines:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <span>Camera and microphone will be activated for AI proctoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <span>Do not refresh the page or navigate away during the test</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <span>Answer all questions to the best of your ability</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <span>Results will be reviewed by our team within 48 hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <span>Any suspicious activity will be flagged in the AI analysis</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t">
                <Button
                  onClick={startTest}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Test (Enable Camera & Microphone)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto pt-4">
          {/* Header with timer and progress */}
          <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-emerald-600" />
                  <span className="font-mono text-lg font-semibold text-slate-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-slate-600">AI Monitoring Active</span>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {currentQ?.category} - {currentQ?.testType}
                </Badge>
                <span className="text-sm text-slate-500">Question {currentQuestion + 1}</span>
              </div>
              <CardTitle className="text-xl text-slate-800 mt-4">
                {currentQ?.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <RadioGroup
                value={answers[currentQ?.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQ?.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQ?.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6"
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={() => setStep('completed')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              >
                Finish Test
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
              >
                Next
              </Button>
            )}
          </div>

          {/* Coding Challenge (show on last question) */}
          {currentQuestion === questions.length - 1 && (
            <Card className="mt-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Bonus: Coding Challenge</CardTitle>
                <CardDescription>
                  Write a simple function (optional, but recommended for technical roles)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="coding" className="text-sm font-medium text-slate-700 mb-2 block">
                  Write a function that returns the sum of two numbers:
                </Label>
                <Textarea
                  id="coding"
                  placeholder="function sum(a, b) {
  // Your code here
  return a + b;
}"
                  value={codingAnswer}
                  onChange={(e) => setCodingAnswer(e.target.value)}
                  className="h-32 font-mono text-sm border-slate-200 focus:border-emerald-400"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm text-center">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-emerald-100 rounded-full">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-4">
                Test Completed Successfully!
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Thank you for taking our comprehensive aptitude test
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pb-8">
              <div className="p-6 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-4">What happens next?</h3>
                <ul className="space-y-2 text-left text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Your results are being processed with AI analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Our team will review your performance within 48 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>You'll receive feedback via email at {candidate?.email}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Selected candidates will be contacted for interviews</span>
                  </li>
                </ul>
              </div>

              <div className="text-sm text-slate-500">
                Test ID: {Date.now().toString(36)} | Submitted at {new Date().toLocaleString()}
              </div>

              <Button
                onClick={() => window.location.href = "/"}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}