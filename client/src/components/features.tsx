import { Zap, FileText, User, Bell, BarChart3, Building2 } from "lucide-react";
import mobileImage from "@assets/iPhone 16 - 46_1753890892151.png";
import desktopImage from "@assets/Dashboard_1753890963584.png";

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
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            What is master-fees?
          </h2>
        </div>

        {/* Device Mockups Display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Mobile Mockup */}
          <div className="relative">
            <img 
              src={mobileImage} 
              alt="fee Master Mobile Interface - Twalumbu Education Centre Payment Flow"
              className="w-72 h-auto shadow-2xl rounded-[3rem]"
            />
          </div>

          {/* Desktop Mockup */}
          <div className="relative">
            <img 
              src={desktopImage} 
              alt="fee Master Admin Dashboard - Revenue Recovery and Financial Management"
              className="w-[600px] h-auto shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
