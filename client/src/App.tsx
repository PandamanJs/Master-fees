import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIAssistant } from "@/components/ai-assistant";
import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import AppleAptitudeTest from "@/pages/aptitude-apple";
import AptitudeTest from "@/pages/aptitude";
import AptitudeEnhanced from "@/pages/aptitude-enhanced";
import AppleAdminPanel from "@/pages/admin/aptitude-apple";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/aptitude" component={AptitudeTest} />
      <Route path="/aptitude-enhanced" component={AptitudeEnhanced} />
      <Route path="/aptitude-apple" component={AppleAptitudeTest} />
      <Route path="/admin/aptitude-results" component={AppleAdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <AIAssistant isOpen={false} onClose={() => {}} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
