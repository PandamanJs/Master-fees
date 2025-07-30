import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white border-t border-slate-700/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Apple-style footer content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-12 lg:space-y-0">
          {/* Left Side - Logo */}
          <div>
            <span className="text-xl font-extralight text-white tracking-wide">Master Fees</span>
          </div>
          
          {/* Center - Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-light"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-light"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-light"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-light"
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
