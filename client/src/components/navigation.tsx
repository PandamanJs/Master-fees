import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
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
    <nav className="ultra-glass-dark sticky top-0 z-50 transition-all duration-500 border-b border-slate-700/30 shadow-2xl">
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
          
          {/* Premium Center Navigation Pill - Real Estate Style */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 ultra-glass-light rounded-full px-3 py-2 border border-slate-600/20 shadow-2xl">
              <button
                onClick={() => scrollToSection('home')}
                className="px-5 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-5 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-5 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium tracking-wide"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Contact
              </button>
              <Link 
                href="/aptitude"
                className="px-5 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Aptitude Tests
              </Link>
            </div>
          </div>
          
          {/* Right Side Contact & Admin Buttons - Premium Style */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/admin/aptitude-results"
              className="ultra-glass-dark px-4 py-2 text-slate-200 hover:text-white rounded-full transition-all duration-300 text-sm font-medium tracking-wide border border-slate-600/30 shadow-lg"
            >
              Admin
            </Link>
            <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
              <Button className="ultra-glass-dark text-slate-200 hover:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 shadow-lg hover:scale-105 tracking-wide border border-emerald-400/30 flex items-center group">
                Contact us
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
          <div className="px-3 sm:px-4 pt-3 pb-4 space-y-2 ultra-glass-dark border-t border-slate-700/30">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg ultra-glass-light transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg ultra-glass-light transition-all duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg ultra-glass-light transition-all duration-200"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg ultra-glass-light transition-all duration-200"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('careers')}
              className="text-slate-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium w-full text-left rounded-lg ultra-glass-light transition-all duration-200"
            >
              Careers
            </button>
            <div className="pt-4">
              <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
                <Button className={cn("w-full ultra-glass-dark text-white hover:text-emerald-100 font-semibold border border-emerald-400/30")}>
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
