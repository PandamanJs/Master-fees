import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-white border-t border-emerald-400/20 overflow-hidden">
      {/* Consistent background pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/30 to-slate-900"></div>
      
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-20">
        {/* Apple-style footer content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-16 lg:space-y-0">
          {/* Left Side - Enhanced Logo */}
          <div>
            <span className="text-2xl font-light text-white tracking-wide">Master Fees</span>
            <p className="text-slate-400 text-sm mt-2 font-light">Transforming education finance</p>
          </div>
          
          {/* Center - Enhanced Navigation with balanced spacing */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base font-light tracking-wide"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base font-light tracking-wide"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base font-light tracking-wide"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base font-light tracking-wide"
            >
              Contact
            </button>
          </div>
          
          {/* Right Side - Contact Info */}
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a 
                href="mailto:info@masterfees.com" 
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="tel:+1234567890" 
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Apple-style divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom Section - Apple style */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-light">feemaster@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-light">+260 766 699 3729</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-light">Lusaka, Zambia</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm font-light">
            © 2025 Master Fees. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
