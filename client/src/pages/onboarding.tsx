import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

// Import step components
import SchoolInfoStep from "@/components/onboarding/school-info-step";
import BankingInfoStep from "@/components/onboarding/banking-info-step";
import FeeStructureStep from "@/components/onboarding/fee-structure-step";
import StudentImportStep from "@/components/onboarding/student-import-step";
import ReceiptTemplateStep from "@/components/onboarding/receipt-template-step";
import ReminderConfigStep from "@/components/onboarding/reminder-config-step";

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "School Information",
    description: "Basic details about your school",
    component: SchoolInfoStep,
  },
  {
    id: 2,
    title: "Banking Setup",
    description: "Configure payment methods",
    component: BankingInfoStep,
  },
  {
    id: 3,
    title: "Fee Structure",
    description: "Set up your fee categories",
    component: FeeStructureStep,
  },
  {
    id: 4,
    title: "Student Import",
    description: "Add students to your system",
    component: StudentImportStep,
  },
  {
    id: 5,
    title: "Receipt Templates",
    description: "Customize your receipts",
    component: ReceiptTemplateStep,
  },
  {
    id: 6,
    title: "Reminder Settings",
    description: "Configure automated reminders",
    component: ReminderConfigStep,
  },
];

export default function Onboarding() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Complete onboarding mutation
  const completeOnboardingMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/onboarding/complete");
    },
    onSuccess: () => {
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to Master Fees. Your account is now fully set up.",
      });
      window.location.href = "/welcome";
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    // Move to next step if not on last step
    if (stepId < ONBOARDING_STEPS.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleFinishOnboarding = () => {
    completeOnboardingMutation.mutate();
  };

  const progress = (completedSteps.length / ONBOARDING_STEPS.length) * 100;
  const CurrentStepComponent = ONBOARDING_STEPS[currentStep - 1]?.component;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Master Fees
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Let's set up your school fee management system
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Setup Progress</CardTitle>
                  <CardDescription>
                    Step {currentStep} of {ONBOARDING_STEPS.length}: {ONBOARDING_STEPS[currentStep - 1]?.title}
                  </CardDescription>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {Math.round(progress)}% Complete
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              
              {/* Step indicators */}
              <div className="flex items-center justify-between">
                {ONBOARDING_STEPS.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        completedSteps.includes(step.id)
                          ? "bg-green-500 text-white"
                          : currentStep === step.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="text-xs text-center mt-1 max-w-16">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Step */}
          <Card>
            <CardHeader>
              <CardTitle>{ONBOARDING_STEPS[currentStep - 1]?.title}</CardTitle>
              <CardDescription>
                {ONBOARDING_STEPS[currentStep - 1]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {CurrentStepComponent && (
                <CurrentStepComponent
                  onComplete={() => handleStepComplete(currentStep)}
                  onNext={() => setCurrentStep(Math.min(currentStep + 1, ONBOARDING_STEPS.length))}
                  onPrevious={() => setCurrentStep(Math.max(currentStep - 1, 1))}
                  isCompleted={completedSteps.includes(currentStep)}
                />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep === ONBOARDING_STEPS.length ? (
                  <Button
                    onClick={handleFinishOnboarding}
                    disabled={completedSteps.length < ONBOARDING_STEPS.length || completeOnboardingMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {completeOnboardingMutation.isPending ? "Completing..." : "Complete Setup"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep(Math.min(currentStep + 1, ONBOARDING_STEPS.length))}
                    disabled={currentStep === ONBOARDING_STEPS.length}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}