import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <nav className="backdrop-blur-2xl sticky top-0 z-50 transition-all duration-300 bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Apple-style Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <img 
                src={logoImage} 
                alt="Master Fees Logo" 
                className="w-8 h-8 transition-all duration-300"
              />
              <span className="ml-3 text-xl font-light text-white transition-all duration-300">Master Fees</span>
            </div>
          </div>
          
          {/* Apple-style Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white/90 hover:text-white text-sm font-light transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-white/90 hover:text-white text-sm font-light transition-all duration-300"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/90 hover:text-white text-sm font-light transition-all duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/90 hover:text-white text-sm font-light transition-all duration-300"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Apple-style CTA Button */}
          <div className="hidden md:flex items-center">
            <Button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="px-3 sm:px-4 pt-3 pb-4 space-y-2 bg-white border-t border-slate-200">
            <button
              onClick={() => scrollToSection('home')}
              className="text-slate-900 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-brand-mint/10 transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-brand-mint/10 transition-all duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-brand-mint/10 transition-all duration-200"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-brand-teal block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-brand-mint/10 transition-all duration-200"
            >
              Contact
            </button>
            <div className="pt-4">
              <Button className={cn("w-full bg-[#98fbcb] hover:bg-opacity-90 text-white")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
