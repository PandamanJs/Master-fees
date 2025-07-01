import { Zap, FileText, User, Bell, BarChart3, Building2 } from "lucide-react";

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
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-brand-mint/10 rounded-full text-brand-teal font-semibold text-sm tracking-wide uppercase mb-6">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Everything you need to manage school fees
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-4 sm:px-0">
            Powerful features designed specifically for educational institutions to streamline fee collection and financial management.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 border border-slate-100 dark:border-gray-800 card-hover animate-fade-in-up delay-${(index + 1) * 100} cursor-pointer relative overflow-hidden`}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/5 via-transparent to-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Icon with enhanced animations */}
              <div className={`relative w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor} transition-all duration-300 group-hover:scale-110`} />
                
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-brand-teal/30 transition-all duration-500 animate-pulse"></div>
              </div>
              
              {/* Content with staggered animations */}
              <h3 className="relative text-xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-brand-teal transition-all duration-300 transform group-hover:-translate-y-1">{feature.title}</h3>
              <p className="relative text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transform group-hover:-translate-y-1">
                {feature.description}
              </p>
              
              {/* Shimmer effect on hover */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
