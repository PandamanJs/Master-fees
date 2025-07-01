import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
// import CustomCursor from "@/components/custom-cursor";
import MascotGuide from "@/components/mascot-guide";
import PageTransition from "@/components/page-transition";
import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import ParentLookup from "@/pages/parent-lookup";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <PageTransition>
      <Switch>
        {/* Public route for parent payment lookup */}
        <Route path="/parent-lookup" component={ParentLookup} />
        
        {/* Authentication-aware routes */}
        {isLoading ? (
          <Route path="/" component={() => (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          )} />
        ) : !isAuthenticated ? (
          <Route path="/" component={Home} />
        ) : user?.onboardingCompleted ? (
          <>
            <Route path="/" component={() => (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">Welcome to Master Fees Dashboard</h1>
                  <p className="text-gray-600">Your school management dashboard will be available here.</p>
                </div>
              </div>
            )} />
          </>
        ) : (
          <Route path="/" component={Onboarding} />
        )}
        
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="masterfees-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* <CustomCursor /> */}
          <MascotGuide />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
