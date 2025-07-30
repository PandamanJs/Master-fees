import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, BarChart3 } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button 
            variant={location === "/" ? "default" : "ghost"} 
            size="sm"
            className="rounded-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button 
            variant={location === "/dashboard" ? "default" : "ghost"} 
            size="sm"
            className="rounded-full"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  );
}