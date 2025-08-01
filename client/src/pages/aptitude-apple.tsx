import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  ArrowLeft,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";
import { candidateFormSchema, type CandidateForm } from "@shared/aptitude-schema";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

// Test type configurations
const testCategories = {
  frontend: { 
    label: "Frontend Developer", 
    description: "React, TypeScript, UI/UX", 
    icon: Monitor,
    available: true,
    color: "from-blue-500 to-cyan-500"
  },
  backend: { 
    label: "Backend Developer", 
    description: "Node.js, APIs, Databases", 
    icon: Database,
    available: true,
    color: "from-green-500 to-emerald-500"
  },
  marketing: { 
    label: "Marketing Specialist", 
    description: "Coming Soon", 
    icon: TrendingUp,
    available: false,
    color: "from-purple-500 to-pink-500"
  },
  business: { 
    label: "Business Analyst", 
    description: "Coming Soon", 
    icon: Briefcase,
    available: false,
    color: "from-orange-500 to-red-500"
  }
};

export default function AppleAptitudeTest() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'registration' | 'category' | 'instructions' | 'test' | 'results'>('registration');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<any[]>([]);

  const form = useForm<CandidateForm>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      portfolio: '',
      motivation: ''
    }
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTestActive(false);
            setStep('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const submitApplication = useMutation({
    mutationFn: async (data: CandidateForm & { category: string }) => {
      return apiRequest('/api/aptitude-applications', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      setStep('category');
    }
  });

  const onSubmitRegistration = (data: CandidateForm) => {
    submitApplication.mutate({ ...data, category: selectedCategory });
  };

  const startTest = () => {
    // Generate sample questions based on category
    const sampleQuestions = generateQuestions(selectedCategory);
    setQuestions(sampleQuestions);
    setIsTestActive(true);
    setStep('test');
  };

  const generateQuestions = (category: string) => {
    if (category === 'frontend') {
      return [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What is the correct way to handle state in React functional components?',
          options: ['useState hook', 'this.setState', 'setState function', 'state property'],
          correctAnswer: 0
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'Which CSS property is used for creating flexible layouts?',
          options: ['display: block', 'display: flex', 'display: inline', 'display: table'],
          correctAnswer: 1
        },
        {
          id: 3,
          type: 'coding',
          question: 'Write a function that takes an array of numbers and returns the sum:',
          placeholder: 'function sumArray(numbers) {\n  // Your code here\n}'
        }
      ];
    } else if (category === 'backend') {
      return [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What HTTP status code indicates a successful request?',
          options: ['404', '500', '200', '301'],
          correctAnswer: 2
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'Which database type is MongoDB?',
          options: ['Relational', 'NoSQL', 'Graph', 'Time-series'],
          correctAnswer: 1
        },
        {
          id: 3,
          type: 'coding',
          question: 'Create a simple Express.js route that returns JSON:',
          placeholder: 'app.get("/api/users", (req, res) => {\n  // Your code here\n});'
        }
      ];
    }
    return [];
  };

  if (step === 'registration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4 relative overflow-hidden">
        {/* Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 liquid-glass-dark rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 liquid-glass-dark rounded-full opacity-15 animate-float delay-1000"></div>
          <div className="absolute top-2/3 right-1/3 w-48 h-48 liquid-glass-dark rounded-full opacity-25 animate-float delay-500"></div>
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 w-10 h-10 liquid-glass-light rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-20"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        
        <div className="max-w-4xl mx-auto pt-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-thin text-white mb-4 tracking-tight">
              Aptitude Assessment
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Join our team through comprehensive technical evaluation
            </p>
          </div>

          <Card className="border-0 liquid-glass-light shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-12 px-12">
              <CardTitle className="text-3xl font-light text-slate-900 mb-4">
                Candidate Registration
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 font-light">
                Please provide your details to begin the assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="px-12 pb-12">
              <form onSubmit={form.handleSubmit(onSubmitRegistration)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name</Label>
                    <Input
                      {...form.register("fullName")}
                      className="mt-2 h-12 liquid-glass-light"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                    <Input
                      {...form.register("email")}
                      type="email"
                      className="mt-2 h-12 liquid-glass-light"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                    <Input
                      {...form.register("phone")}
                      className="mt-2 h-12 liquid-glass-light"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-slate-700 font-medium">Years of Experience</Label>
                    <Input
                      {...form.register("experience")}
                      className="mt-2 h-12 liquid-glass-light"
                      placeholder="e.g., 3 years"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolio" className="text-slate-700 font-medium">Portfolio/LinkedIn URL</Label>
                  <Input
                    {...form.register("portfolio")}
                    className="mt-2 h-12 liquid-glass-light"
                    placeholder="https://portfolio.com or https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <Label htmlFor="motivation" className="text-slate-700 font-medium">Why do you want to join our team?</Label>
                  <Textarea
                    {...form.register("motivation")}
                    className="mt-2 min-h-[120px] liquid-glass-light"
                    placeholder="Tell us about your motivation and what you can bring to our team..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitApplication.isPending}
                  className="w-full h-14 liquid-glass-button text-white font-medium rounded-xl"
                >
                  {submitApplication.isPending ? 'Submitting...' : 'Continue to Assessment'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4 relative overflow-hidden">
        {/* Liquid Glass Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 liquid-glass-dark rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 liquid-glass-dark rounded-full opacity-15 animate-float delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto pt-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-thin text-white mb-4 tracking-tight">
              Choose Your Path
            </h1>
            <p className="text-xl text-slate-300 font-light">
              Select the position you're applying for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.entries(testCategories).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <Card 
                  key={key}
                  className={`border-0 liquid-glass-card cursor-pointer transition-all duration-300 ${
                    selectedCategory === key ? 'ring-2 ring-teal-400' : ''
                  } ${!config.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => config.available && setSelectedCategory(key)}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${config.color} p-4 mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {config.label}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {config.description}
                    </p>
                    {!config.available && (
                      <Badge variant="secondary" className="bg-slate-200">
                        Coming Soon
                      </Badge>
                    )}
                    {config.available && selectedCategory === key && (
                      <Badge className="bg-teal-500 text-white">
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedCategory && (
            <div className="text-center">
              <Button
                onClick={() => setStep('instructions')}
                className="liquid-glass-button text-white px-8 py-4 text-lg"
              >
                Continue to Instructions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-12 relative z-10">
          <Card className="border-0 liquid-glass-light shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl font-light text-slate-900 mb-4">
                Assessment Instructions
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Please read carefully before starting
              </CardDescription>
            </CardHeader>
            <CardContent className="px-12 pb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Time Limit</h3>
                    <p className="text-slate-600">You have 60 minutes to complete the assessment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Brain className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Question Types</h3>
                    <p className="text-slate-600">Multiple choice questions and coding challenges</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Monitoring</h3>
                    <p className="text-slate-600">This session may be monitored for integrity purposes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Best Practices</h3>
                    <p className="text-slate-600">Answer all questions to the best of your ability. You cannot return to previous questions.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button
                  onClick={startTest}
                  className="liquid-glass-button text-white px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Timer */}
          <div className="liquid-glass-dark rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-light text-white mb-1">Assessment in Progress</h1>
                <p className="text-slate-300">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono text-white">{formatTime(timeRemaining)}</div>
                <p className="text-slate-300 text-sm">Time Remaining</p>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </div>

          {/* Question Card */}
          <Card className="border-0 liquid-glass-light shadow-2xl rounded-3xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge className="mb-4" variant="secondary">
                  {testCategories[selectedCategory as keyof typeof testCategories]?.label}
                </Badge>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  {question?.question}
                </h2>
              </div>

              {question?.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {question.options?.map((option: string, index: number) => (
                    <label
                      key={index}
                      className="flex items-center p-4 liquid-glass-card rounded-xl cursor-pointer hover:shadow-md transition-all"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={index}
                        checked={answers[question.id] === index.toString()}
                        onChange={(e) => setAnswers(prev => ({
                          ...prev,
                          [question.id]: e.target.value
                        }))}
                        className="w-4 h-4 text-teal-600 mr-3"
                      />
                      <span className="text-slate-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question?.type === 'coding' && (
                <div>
                  <Textarea
                    placeholder={question.placeholder}
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      [question.id]: e.target.value
                    }))}
                    className="min-h-[300px] font-mono text-sm liquid-glass-light"
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(prev => prev - 1);
                    }
                  }}
                  disabled={currentQuestion === 0}
                  className="liquid-glass-card"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={() => {
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(prev => prev + 1);
                    } else {
                      setStep('results');
                      setIsTestActive(false);
                    }
                  }}
                  className="liquid-glass-button text-white"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-12 relative z-10">
          <Card className="border-0 liquid-glass-light shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-8 pt-12">
              <Trophy className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <CardTitle className="text-3xl font-light text-slate-900 mb-4">
                Assessment Complete!
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Thank you for taking our assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="px-12 pb-12 text-center">
              <div className="space-y-6">
                <p className="text-slate-700 text-lg">
                  Your responses have been submitted successfully. Our team will review your assessment and contact you within 3-5 business days.
                </p>
                
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                  <h3 className="font-semibold text-teal-900 mb-2">Next Steps</h3>
                  <ul className="text-left text-teal-800 space-y-2">
                    <li>• Assessment review by our technical team</li>
                    <li>• Potential follow-up interview</li>
                    <li>• Final decision communication</li>
                  </ul>
                </div>

                <Button
                  onClick={() => navigate('/')}
                  className="liquid-glass-button text-white px-8 py-4"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}