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
    <section id="features" className="py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        



        {/* Apple-style feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="apple-glass-light text-center p-10 rounded-[2rem] shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-slate-200/50 group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg">
                <feature.icon className="w-10 h-10 text-emerald-600 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-slate-600 font-light leading-relaxed tracking-wide opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
