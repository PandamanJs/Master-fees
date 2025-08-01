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
  Pause,
  BarChart3,
  Activity,
  Zap,
  Target,
  Award
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

// Skill tracking and adaptive difficulty
interface SkillMetrics {
  accuracy: number;
  speed: number;
  difficulty: number;
  confidence: number;
  streak: number;
}

interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export default function AppleAptitudeTest() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'registration' | 'category' | 'instructions' | 'test' | 'results'>('registration');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  
  // Adaptive difficulty and skill tracking
  const [skillMetrics, setSkillMetrics] = useState<SkillMetrics>({
    accuracy: 0,
    speed: 0,
    difficulty: 1, // Start at medium difficulty
    confidence: 0,
    streak: 0
  });
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

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
      return apiRequest('/api/aptitude-applications', 'POST', data);
    },
    onSuccess: () => {
      setStep('category');
    }
  });

  const onSubmitRegistration = (data: CandidateForm) => {
    submitApplication.mutate({ 
      ...data, 
      category: selectedCategory,
      testTypes: [selectedCategory] 
    });
  };

  const startTest = () => {
    // Generate initial questions at medium difficulty
    const initialQuestions = generateQuestions(selectedCategory, 'medium');
    setQuestions(initialQuestions);
    setIsTestActive(true);
    setQuestionStartTime(Date.now());
    setStep('test');
  };

  // Adaptive question generation based on current skill level
  const generateQuestions = (category: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
    const questionPool = getQuestionPool(category);
    const filteredQuestions = questionPool.filter(q => q.difficulty === difficulty);
    return filteredQuestions.slice(0, 3); // Return 3 questions of current difficulty
  };

  const getQuestionPool = (category: string) => {
    if (category === 'frontend') {
      return [
        // Easy questions
        {
          id: 1,
          type: 'multiple-choice',
          difficulty: 'easy' as const,
          question: 'Which HTML tag is used to create a hyperlink?',
          options: ['<link>', '<a>', '<href>', '<url>'],
          correctAnswer: 1
        },
        {
          id: 2,
          type: 'multiple-choice',
          difficulty: 'easy' as const,
          question: 'What does CSS stand for?',
          options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 1
        },
        // Medium questions
        {
          id: 3,
          type: 'multiple-choice',
          difficulty: 'medium' as const,
          question: 'What is the correct way to handle state in React functional components?',
          options: ['useState hook', 'this.setState', 'setState function', 'state property'],
          correctAnswer: 0
        },
        {
          id: 4,
          type: 'multiple-choice',
          difficulty: 'medium' as const,
          question: 'Which CSS property is used for creating flexible layouts?',
          options: ['display: block', 'display: flex', 'display: inline', 'display: table'],
          correctAnswer: 1
        },
        // Hard questions
        {
          id: 5,
          type: 'multiple-choice',
          difficulty: 'hard' as const,
          question: 'What is the purpose of React.memo()?',
          options: ['State management', 'Performance optimization', 'Event handling', 'Component lifecycle'],
          correctAnswer: 1
        },
        {
          id: 6,
          type: 'coding',
          difficulty: 'hard' as const,
          question: 'Implement a custom React hook for debouncing:',
          placeholder: 'function useDebounce(value, delay) {\n  // Your implementation here\n}'
        }
      ];
    } else if (category === 'backend') {
      return [
        // Easy questions
        {
          id: 1,
          type: 'multiple-choice',
          difficulty: 'easy' as const,
          question: 'What does HTTP stand for?',
          options: ['HyperText Transfer Protocol', 'High Tech Transfer Protocol', 'Home Tool Transfer Protocol', 'Host Transfer Text Protocol'],
          correctAnswer: 0
        },
        {
          id: 2,
          type: 'multiple-choice',
          difficulty: 'easy' as const,
          question: 'Which method is used to read data in REST APIs?',
          options: ['POST', 'GET', 'PUT', 'DELETE'],
          correctAnswer: 1
        },
        // Medium questions
        {
          id: 3,
          type: 'multiple-choice',
          difficulty: 'medium' as const,
          question: 'What HTTP status code indicates a successful request?',
          options: ['404', '500', '200', '301'],
          correctAnswer: 2
        },
        {
          id: 4,
          type: 'multiple-choice',
          difficulty: 'medium' as const,
          question: 'Which database type is MongoDB?',
          options: ['Relational', 'NoSQL', 'Graph', 'Time-series'],
          correctAnswer: 1
        },
        // Hard questions
        {
          id: 5,
          type: 'multiple-choice',
          difficulty: 'hard' as const,
          question: 'What is the CAP theorem in distributed systems?',
          options: ['Consistency, Availability, Partition tolerance', 'Cache, API, Performance', 'Client, Application, Protocol', 'Create, Access, Process'],
          correctAnswer: 0
        },
        {
          id: 6,
          type: 'coding',
          difficulty: 'hard' as const,
          question: 'Implement a rate limiter middleware for Express:',
          placeholder: 'function rateLimiter(maxRequests, windowMs) {\n  // Your implementation here\n}'
        }
      ];
    }
    return [];
  };

  // Calculate skill metrics based on performance
  const updateSkillMetrics = (questionResult: QuestionResult) => {
    setQuestionResults(prev => [...prev, questionResult]);
    
    setSkillMetrics(prev => {
      const allResults = [...questionResults, questionResult];
      const totalQuestions = allResults.length;
      
      // Calculate accuracy
      const correctAnswers = allResults.filter(r => r.isCorrect).length;
      const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      
      // Calculate average speed (lower is better)
      const avgTimeSpent = allResults.reduce((sum, r) => sum + r.timeSpent, 0) / totalQuestions;
      const speed = Math.max(0, 100 - (avgTimeSpent / 1000) * 2); // Convert to 0-100 scale
      
      // Calculate streak
      let currentStreak = 0;
      for (let i = allResults.length - 1; i >= 0; i--) {
        if (allResults[i].isCorrect) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      // Calculate confidence based on recent performance
      const recentResults = allResults.slice(-3);
      const recentAccuracy = recentResults.filter(r => r.isCorrect).length / Math.max(recentResults.length, 1);
      const confidence = recentAccuracy * 100;
      
      // Adaptive difficulty adjustment
      let newDifficulty = prev.difficulty;
      if (accuracy > 80 && currentStreak >= 2) {
        newDifficulty = Math.min(2, prev.difficulty + 0.2); // Increase difficulty
      } else if (accuracy < 40 && currentStreak === 0) {
        newDifficulty = Math.max(0, prev.difficulty - 0.2); // Decrease difficulty
      }
      
      // Update current difficulty level
      if (newDifficulty < 0.7) {
        setCurrentDifficulty('easy');
      } else if (newDifficulty > 1.3) {
        setCurrentDifficulty('hard');
      } else {
        setCurrentDifficulty('medium');
      }
      
      return {
        accuracy: Math.round(accuracy),
        speed: Math.round(speed),
        difficulty: newDifficulty,
        confidence: Math.round(confidence),
        streak: currentStreak
      };
    });
  };

  // Handle answer submission with skill tracking
  const handleAnswerSubmit = (questionId: number, answer: string) => {
    const timeSpent = Date.now() - questionStartTime;
    const question = questions[currentQuestion];
    const isCorrect = question.type === 'multiple-choice' 
      ? parseInt(answer) === question.correctAnswer
      : answer.trim().length > 10; // Simple check for coding questions
    
    const result: QuestionResult = {
      questionId,
      isCorrect,
      timeSpent,
      difficulty: question.difficulty,
      category: selectedCategory
    };
    
    updateSkillMetrics(result);
    
    // Generate next questions based on updated difficulty
    if (currentQuestion === questions.length - 1) {
      const nextQuestions = generateQuestions(selectedCategory, currentDifficulty);
      setQuestions(prev => [...prev, ...nextQuestions]);
    }
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
              <form onSubmit={form.handleSubmit((data) => onSubmitRegistration(data as CandidateForm))} className="space-y-6">
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

                <div className="col-span-2">
                  <Label htmlFor="additional-info" className="text-slate-700 font-medium">Additional Information (Optional)</Label>
                  <Textarea
                    className="mt-2 min-h-[80px] liquid-glass-light"
                    placeholder="Tell us about your experience, portfolio links, or why you want to join our team..."
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
          {/* Header with Timer and Skill Metrics */}
          <div className="liquid-glass-dark rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-light text-white mb-1">Assessment in Progress</h1>
                <p className="text-slate-300">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono text-white">{formatTime(timeRemaining)}</div>
                <p className="text-slate-300 text-sm">Time Remaining</p>
              </div>
            </div>
            
            {/* Real-time Skill Visualization */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-4 h-4 text-emerald-400 mr-1" />
                  <span className="text-slate-300 text-sm">Accuracy</span>
                </div>
                <div className="text-lg font-semibold text-white">{skillMetrics.accuracy}%</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skillMetrics.accuracy}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-slate-300 text-sm">Speed</span>
                </div>
                <div className="text-lg font-semibold text-white">{skillMetrics.speed}%</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skillMetrics.speed}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-slate-300 text-sm">Confidence</span>
                </div>
                <div className="text-lg font-semibold text-white">{skillMetrics.confidence}%</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skillMetrics.confidence}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-4 h-4 text-purple-400 mr-1" />
                  <span className="text-slate-300 text-sm">Streak</span>
                </div>
                <div className="text-lg font-semibold text-white">{skillMetrics.streak}</div>
                <div className="flex justify-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < skillMetrics.streak ? 'bg-purple-400' : 'bg-slate-600'
                      } transition-colors duration-300`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Difficulty Level Indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className={`${
                    currentDifficulty === 'easy' ? 'border-green-400 text-green-400' :
                    currentDifficulty === 'medium' ? 'border-yellow-400 text-yellow-400' :
                    'border-red-400 text-red-400'
                  } bg-transparent`}
                >
                  {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level
                </Badge>
                <span className="text-slate-400 text-sm">
                  {currentDifficulty === 'easy' && '🟢 Building confidence'}
                  {currentDifficulty === 'medium' && '🟡 Steady progress'}
                  {currentDifficulty === 'hard' && '🔴 Challenge mode'}
                </span>
              </div>
              <Progress value={progress} className="w-1/3" />
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-0 liquid-glass-light shadow-2xl rounded-3xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="mb-0" variant="secondary">
                    {testCategories[selectedCategory as keyof typeof testCategories]?.label}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`${
                      question?.difficulty === 'easy' ? 'border-green-500 text-green-600' :
                      question?.difficulty === 'medium' ? 'border-yellow-500 text-yellow-600' :
                      'border-red-500 text-red-600'
                    }`}
                  >
                    {question?.difficulty?.charAt(0).toUpperCase() + question?.difficulty?.slice(1)}
                  </Badge>
                </div>
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
                    // Submit current answer and update metrics
                    const currentAnswer = answers[question.id] || '';
                    handleAnswerSubmit(question.id, currentAnswer);
                    
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(prev => prev + 1);
                      setQuestionStartTime(Date.now());
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
                {/* Final Skill Assessment */}
                <div className="bg-slate-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Your Performance Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{skillMetrics.accuracy}%</div>
                      <p className="text-sm text-slate-600">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{skillMetrics.speed}%</div>
                      <p className="text-sm text-slate-600">Speed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{skillMetrics.confidence}%</div>
                      <p className="text-sm text-slate-600">Confidence</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{skillMetrics.streak}</div>
                      <p className="text-sm text-slate-600">Best Streak</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      {skillMetrics.accuracy >= 80 ? (
                        <>
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-slate-900">Excellent Performance!</span>
                        </>
                      ) : skillMetrics.accuracy >= 60 ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-slate-900">Good Performance!</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold text-slate-900">Room for Growth!</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
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