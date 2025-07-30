import { Zap, FileText, User, Bell, BarChart3, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import mobileImage from "@assets/iPhone 16 - 46_1753900251503.png";
import desktopImage from "@assets/Dashboard_1753900251517.png";

const features = [
  {
    icon: Zap,
    title: "Instant Payments",
    description: "Accept payments instantly through multiple payment gateways. Mobile money, cards, bank transfers - all supported with real-time confirmation.",
    bgColor: "bg-primary-100",
    iconColor: "text-primary-600"
  },
  {
    icon: FileText,
    title: "Digital Receipts",
    description: "Automatically generate and send digital receipts via email and SMS. Customizable templates with school branding.",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: User,
    title: "Parent Dashboard",
    description: "Give parents complete visibility into their child's fee status, payment history, and upcoming dues through a dedicated portal.",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600"
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Smart reminder system sends notifications before due dates. Reduce late payments with customizable reminder schedules.",
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    description: "Comprehensive reporting with real-time insights. Track collections, pending payments, and generate audit-ready reports.",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Building2,
    title: "Multi-School Support",
    description: "Perfect for educational groups managing multiple schools. Centralized dashboard with school-wise segregation and reporting.",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600"
  }
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileAnimated, setMobileAnimated] = useState(false);
  const [desktopAnimated, setDesktopAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger the animations
            setTimeout(() => setMobileAnimated(true), 300);
            setTimeout(() => setDesktopAnimated(true), 600);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('features');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-32 bg-gray-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Apple-style Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            What is Master Fees?
          </h2>
          <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A beautifully simple platform that transforms how schools manage fees.
          </p>
        </div>

        {/* Apple-style Device Showcase with Animations */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          {/* iPhone-style Mobile Showcase */}
          <div className="text-center">
            <div className={`inline-block mb-8 transition-all duration-1000 ease-out ${
              mobileAnimated 
                ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                : 'transform translate-y-12 opacity-0 rotate-1 scale-95'
            }`}>
              <div className="relative group">
                {/* iPhone Floating Animation */}
                <div className="animate-float-slow">
                  <div className="relative transform group-hover:scale-105 transition-all duration-700">
                    <img 
                      src={mobileImage} 
                      alt="Master Fees Mobile Payment Interface"
                      className="w-64 md:w-72 h-auto shadow-2xl rounded-[3rem] relative z-10 transition-all duration-700"
                    />
                    {/* iPhone Premium Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/5 to-transparent rounded-[3rem] z-20 pointer-events-none"></div>
                    {/* Dynamic Color Glow */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                    {/* Device Frame Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-black/5 to-gray-800/10 rounded-[3.2rem] transform rotate-1 -z-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className={`text-2xl font-light text-black mb-4 transition-all duration-700 delay-200 ${
              mobileAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>For Parents</h3>
            <p className={`text-lg font-light text-gray-600 leading-relaxed transition-all duration-700 delay-300 ${
              mobileAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Simple, intuitive payments from any device. Real-time updates and instant receipts.
            </p>
          </div>
          
          {/* Mac-style Desktop Showcase */}
          <div className="text-center">
            <div className={`inline-block mb-8 transition-all duration-1000 ease-out delay-300 ${
              desktopAnimated 
                ? 'transform translate-y-0 opacity-100 rotate-0 scale-100' 
                : 'transform translate-y-12 opacity-0 -rotate-1 scale-95'
            }`}>
              <div className="relative group">
                {/* Mac Floating Animation */}
                <div className="animate-float-slow-reverse">
                  <div className="relative transform group-hover:scale-105 transition-all duration-700">
                    <img 
                      src={desktopImage} 
                      alt="Master Fees Admin Dashboard"
                      className="w-full max-w-md h-auto shadow-2xl rounded-2xl relative z-10 transition-all duration-700"
                    />
                    {/* Mac Premium Screen Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl z-20 pointer-events-none"></div>
                    {/* Professional Ambient Glow */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 -z-10 animate-pulse-slow"></div>
                    {/* Mac Device Frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 via-gray-900/5 to-black/10 rounded-2xl transform -rotate-1 -z-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className={`text-2xl font-light text-black mb-4 transition-all duration-700 delay-500 ${
              desktopAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>For Schools</h3>
            <p className={`text-lg font-light text-gray-600 leading-relaxed transition-all duration-700 delay-600 ${
              desktopAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Complete financial oversight with powerful analytics and automated workflows.
            </p>
          </div>
        </div>

        {/* Apple-style feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-3xl shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-light text-black mb-4">{feature.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
