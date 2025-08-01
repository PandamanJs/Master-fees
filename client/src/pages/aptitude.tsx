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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
  Eye
} from "lucide-react";

const candidateSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  testTypes: z.array(z.enum(["frontend", "backend", "marketing", "business-analyst", "software-engineering-intern"])).min(1, "Please select at least one test type"),
  experience: z.string().min(1, "Please select your experience level"),
});

type CandidateForm = z.infer<typeof candidateSchema>;

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
    question: "Which CSS property is used to create a flexbox container?",
    options: [
      "display: flex",
      "flex-direction: row",
      "justify-content: center",
      "align-items: center"
    ],
    correct: 0,
    category: "CSS"
  },
  {
    id: 3,
    question: "What does the 'useState' hook return?",
    options: [
      "Only the current state value",
      "Only the setter function",
      "An array with the state value and setter function",
      "An object with state and setState properties"
    ],
    correct: 2,
    category: "React Hooks"
  },
  {
    id: 4,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: [
      "append()",
      "push()",
      "add()",
      "insert()"
    ],
    correct: 1,
    category: "JavaScript"
  },
  {
    id: 5,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      "To style list items",
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
    question: "What is the purpose of middleware in Express.js?",
    options: [
      "To handle database connections",
      "To execute code between request and response",
      "To manage user authentication only",
      "To serve static files"
    ],
    correct: 1,
    category: "Express.js"
  },
  {
    id: 2,
    question: "Which HTTP status code indicates a successful POST request that created a resource?",
    options: [
      "200 OK",
      "201 Created",
      "204 No Content",
      "202 Accepted"
    ],
    correct: 1,
    category: "HTTP"
  },
  {
    id: 3,
    question: "What is a foreign key in a relational database?",
    options: [
      "A unique identifier for a table",
      "An encrypted field",
      "A field that references the primary key of another table",
      "A field that stores JSON data"
    ],
    correct: 2,
    category: "Database"
  },
  {
    id: 4,
    question: "What does REST stand for?",
    options: [
      "Relational State Transfer",
      "Representational State Transfer",
      "Remote State Transfer",
      "Reactive State Transfer"
    ],
    correct: 1,
    category: "API Design"
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

export default function AptitudePage() {
  const [step, setStep] = useState<'registration' | 'instructions' | 'test' | 'completed'>('registration');
  const [candidate, setCandidate] = useState<CandidateForm | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [codingAnswer, setCodingAnswer] = useState("");
  const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
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
      form.setValue('testTypes', newTypes as any);
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
    const primaryTestType = candidate?.testTypes?.[0] || 'frontend';
    const questions = primaryTestType === 'frontend' ? frontendQuestions : backendQuestions;
    const testData = {
      candidate,
      answers,
      codingAnswer,
      questions,
      timeSpent: (30 * 60) - timeLeft,
      testType: primaryTestType,
      timestamp: new Date().toISOString()
    };
    
    submitTest.mutate(testData);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const primaryTestType = candidate?.testTypes?.[0] || 'frontend';
  const questions = primaryTestType === 'frontend' ? frontendQuestions : backendQuestions;
  const currentQ = questions[currentQuestion];

  if (step === 'registration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Developer Aptitude Test
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Test Your <span className="text-emerald-600">Development Skills</span>
            </h1>
            <p className="text-lg text-slate-600">
              Take our comprehensive aptitude test designed for frontend and backend developers
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Register for Test</CardTitle>
              <CardDescription>
                Please provide your information to begin the aptitude test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit((data) => submitRegistration.mutate(data))} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Enter your full name"
                      className="border-slate-200 focus:border-emerald-500"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="your.email@example.com"
                      className="border-slate-200 focus:border-emerald-500"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder="+260 XXX XXX XXX"
                      className="border-slate-200 focus:border-emerald-500"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level *</Label>
                    <RadioGroup
                      onValueChange={(value) => form.setValue('experience', value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="junior" id="junior" />
                        <Label htmlFor="junior">Junior (0-2 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mid" id="mid" />
                        <Label htmlFor="mid">Mid-level (2-5 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior">Senior (5+ years)</Label>
                      </div>
                    </RadioGroup>
                    {form.formState.errors.experience && (
                      <p className="text-sm text-red-600">{form.formState.errors.experience.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Test Types *</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTestTypes.includes('frontend') 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                      onClick={() => handleTestTypeChange('frontend', !selectedTestTypes.includes('frontend'))}
                    >
                      <CardContent className="p-6 text-center">
                        <Monitor className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">Frontend Developer</h3>
                        <p className="text-sm text-slate-600">React, JavaScript, CSS, HTML, TypeScript</p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTestTypes.includes('backend') 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                      onClick={() => handleTestTypeChange('backend', !selectedTestTypes.includes('backend'))}
                    >
                      <CardContent className="p-6 text-center">
                        <Database className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">Backend Developer</h3>
                        <p className="text-sm text-slate-600">Node.js, APIs, Databases, Security</p>
                      </CardContent>
                    </Card>
                  </div>
                  {form.formState.errors.testTypes && (
                    <p className="text-sm text-red-600">{form.formState.errors.testTypes.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitRegistration.isPending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Test Instructions
            </h1>
            <p className="text-lg text-slate-600">
              Please read carefully before starting your {candidate?.testTypes?.[0]} developer test
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Important Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Timer className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Time Limit</h4>
                    <p className="text-sm text-slate-600">30 minutes to complete all questions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">AI Monitoring</h4>
                    <p className="text-sm text-slate-600">Camera and microphone will monitor for integrity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Question Types</h4>
                    <p className="text-sm text-slate-600">Multiple choice + 1 coding problem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Test Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                {candidate?.testTypes?.[0] === 'frontend' ? (
                  <div className="space-y-2">
                    <Badge variant="secondary">React & Hooks</Badge>
                    <Badge variant="secondary">JavaScript ES6+</Badge>
                    <Badge variant="secondary">CSS & Flexbox</Badge>
                    <Badge variant="secondary">HTML5</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge variant="secondary">Node.js & Express</Badge>
                    <Badge variant="secondary">REST APIs</Badge>
                    <Badge variant="secondary">Database Design</Badge>
                    <Badge variant="secondary">Security</Badge>
                    <Badge variant="secondary">HTTP Protocols</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                AI Proctoring System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Monitoring Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Face detection to ensure you remain in frame</li>
                  <li>• Eye tracking to monitor focus and attention</li>
                  <li>• Audio monitoring for suspicious activity</li>
                  <li>• Tab switching and window focus detection</li>
                  <li>• Unusual behavior pattern analysis</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={startTest}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold"
            >
              I Understand - Start Test
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Test Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {candidate?.testTypes?.[0] === 'frontend' ? 'Frontend' : 'Backend'} Developer Test
              </h1>
              <p className="text-slate-600">Question {currentQuestion + 1} of {questions.length + 1}</p>
            </div>
            <div className="flex items-center gap-4">
              {isMonitoring && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span className="text-sm">AI Monitoring Active</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow">
                <Timer className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-lg font-semibold text-slate-900">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {currentQuestion < questions.length ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{currentQ.question}</CardTitle>
                    <Badge variant="outline">{currentQ.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQ.id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
                  className="space-y-4"
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={!answers[currentQ.id] && answers[currentQ.id] !== 0}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Coding Challenge</CardTitle>
                <CardDescription>
                  {candidate?.testTypes?.[0] === 'frontend' 
                    ? "Write a React component that displays a list of users with search functionality"
                    : "Write a Node.js function that validates and processes user registration data"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="coding-answer">
                    Your Solution (JavaScript/TypeScript):
                  </Label>
                  <Textarea
                    id="coding-answer"
                    value={codingAnswer}
                    onChange={(e) => setCodingAnswer(e.target.value)}
                    placeholder={
                      candidate?.testTypes?.[0] === 'frontend'
                        ? "// Example: Create a UserList component\nfunction UserList({ users }) {\n  // Your code here\n}"
                        : "// Example: Create a validateUser function\nfunction validateUser(userData) {\n  // Your code here\n}"
                    }
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleSubmitTest}
                    disabled={!codingAnswer.trim() || submitTest.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {submitTest.isPending ? "Submitting..." : "Submit Test"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Test Completed Successfully!
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-slate-600">Your test will be analyzed by our AI system for technical accuracy and behavior patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Admin Review</h3>
                  <p className="text-sm text-slate-600">Our technical team will review your responses and coding solution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Results Notification</h3>
                  <p className="text-sm text-slate-600">You'll receive detailed feedback within 48 hours via email</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-600 mb-8">
            Thank you for taking our {candidate?.testTypes?.[0]} developer aptitude test. 
            We appreciate your time and effort.
          </p>

          <Button
            onClick={() => window.location.href = '/'}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return null;
}