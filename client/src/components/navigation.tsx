import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
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
    <nav className="backdrop-blur-xl sticky top-0 z-50 transition-all duration-500 bg-slate-900/95 border-b border-emerald-400/20 shadow-2xl">
      <div className="max-w-8xl mx-auto px-12 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Apple-style Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <img 
                src={logoImage} 
                alt="Master Fees Logo" 
                className="w-8 h-8 transition-all duration-300"
              />
              <span className="ml-3 text-xl font-extralight text-white transition-all duration-300 tracking-wide">Master Fees</span>
            </div>
          </div>
          
          {/* Apple-style Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-slate-300 hover:text-emerald-400 text-sm font-light transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-300 hover:text-emerald-400 text-sm font-light transition-all duration-300"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-300 hover:text-emerald-400 text-sm font-light transition-all duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-300 hover:text-emerald-400 text-sm font-light transition-all duration-300"
              >
                Contact
              </button>
              <Link href="/dashboard">
                <button className="text-slate-300 hover:text-emerald-400 text-sm font-light transition-all duration-300">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
          
          {/* Apple-style CTA Button */}
          <div className="hidden md:flex items-center">
            <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-emerald-400 text-slate-900 hover:bg-emerald-300 px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 shadow-lg hover:shadow-emerald-400/25 hover:scale-105 tracking-wide backdrop-blur-sm border border-emerald-300/30">
                Get Started
              </Button>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-300 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 rounded-md p-2"
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
          <div className="px-3 sm:px-4 pt-3 pb-4 space-y-2 bg-slate-800 border-t border-slate-700">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-emerald-400/10 transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-emerald-400/10 transition-all duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-emerald-400/10 transition-all duration-200"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-emerald-400/10 transition-all duration-200"
            >
              Contact
            </button>
            <div className="pt-4">
              <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
                <Button className={cn("w-full bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold")}>
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
