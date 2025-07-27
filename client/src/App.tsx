import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { usePerformance } from "@/hooks/usePerformance";
import { Suspense, lazy } from "react";
// import CustomCursor from "@/components/custom-cursor";
import MascotGuide from "@/components/mascot-guide";
import PageTransition from "@/components/page-transition";

// Lazy load components for code splitting
const Home = lazy(() => import("@/pages/home"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Welcome = lazy(() => import("@/pages/welcome"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const ParentLookup = lazy(() => import("@/pages/parent-lookup"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {/* Public route for parent payment lookup */}
          <Route path="/parent-lookup" component={ParentLookup} />
          
          {/* Authentication-aware routes */}
          {isLoading ? (
            <Route path="/" component={LoadingSpinner} />
          ) : !isAuthenticated ? (
            <Route path="/" component={Home} />
          ) : user && 'onboardingCompleted' in user && user.onboardingCompleted ? (
            <>
              <Route path="/" component={Dashboard} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/dashboard" component={Dashboard} />
            </>
          ) : (
            <Route path="/" component={Onboarding} />
          )}
          
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </PageTransition>
  );
}

function App() {
  // Initialize performance monitoring
  usePerformance();

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
