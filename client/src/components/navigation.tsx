import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50 transition-all duration-300 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#182234]">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer hover-lift cursor-magic">
              <img 
                src={logoImage} 
                alt="Master Fees Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-bounce-subtle group-hover:animate-rubber-band"
              />
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold transition-all duration-300 group-hover:text-brand-teal group-hover:animate-wiggle text-[#ffffff]">Master Fees</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 text-[#f2f5f7]">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 focus:ring-2 focus:ring-brand-teal/30 hover-lift text-[#ffffff]"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 focus:ring-2 focus:ring-brand-teal/30 hover-lift text-[#ffffff]"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 focus:ring-2 focus:ring-brand-teal/30 hover-lift text-[#ffffff]"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-brand-teal px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-brand-mint/10 focus:ring-2 focus:ring-brand-teal/30 text-[#ffffff]"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button className="bg-[#98fbcb] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
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
              <Button className="w-full bg-[#98fbcb] hover:bg-opacity-90 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-200">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
