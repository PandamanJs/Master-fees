import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImage from "@assets/Group 15_1751377323388.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-800/50 sticky top-0 z-50 transition-all duration-300 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <img 
                src={logoImage} 
                alt="Master Fees Logo" 
                className="w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float"
              />
              <span className="ml-3 text-2xl font-bold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-brand-teal">Master Fees</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <button
                onClick={() => scrollToSection('home')}
                className="text-slate-900 dark:text-white hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 dark:hover:bg-brand-mint/20 focus:ring-2 focus:ring-brand-teal/30"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 dark:hover:bg-brand-mint/20 focus:ring-2 focus:ring-brand-teal/30"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 dark:hover:bg-brand-mint/20 focus:ring-2 focus:ring-brand-teal/30"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 dark:hover:bg-brand-mint/20 focus:ring-2 focus:ring-brand-teal/30"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 dark:hover:bg-brand-mint/20 focus:ring-2 focus:ring-brand-teal/30"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button className="bg-brand-teal hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            <button
              onClick={() => scrollToSection('home')}
              className="text-slate-900 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Contact
            </button>
            <div className="pt-4 pb-2">
              <Button className="w-full bg-brand-teal hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
