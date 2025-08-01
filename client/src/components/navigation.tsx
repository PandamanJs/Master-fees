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
          
          {/* Apple-style Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection('careers')}
                className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg"
              >
                Careers
              </button>
              <Link href="/admin/aptitude-results" className="px-4 py-2 ultra-glass-light text-slate-200 hover:text-white text-sm font-light transition-all duration-300 rounded-lg">
                Admin
              </Link>

            </div>
          </div>
          
          {/* Apple-style CTA Button */}
          <div className="hidden md:flex items-center">
            <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
              <Button className="ultra-glass-dark text-white hover:text-emerald-100 px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 shadow-lg hover:shadow-emerald-400/25 hover:scale-105 tracking-wide border border-emerald-400/30">
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
