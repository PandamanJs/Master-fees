import { Button } from "@/components/ui/button";
import { Shield, Users, TrendingUp, Handshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Built with bank-grade security measures to protect sensitive financial data. Our robust infrastructure ensures 99.9% uptime so fee collection never stops, giving schools and parents complete peace of mind."
  },
  {
    icon: Users,
    title: "User-Friendly Design", 
    description: "Intuitive interface designed for everyone - from school administrators to parents and students. Simple navigation and clear processes make fee management effortless for all users."
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Real-time insights and comprehensive reporting help schools track fee collection, identify trends, and make informed financial decisions. Automated reminders and notifications boost collection rates."
  },
  {
    icon: Handshake,
    title: "Dedicated Support",
    description: "24/7 customer support and dedicated account management ensure smooth operations. We provide ongoing training, system updates, and personalized assistance to maximize your success."
  }
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-slate-50 to-brand-mint/10 text-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-mint rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-light-mint rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-brand-teal to-black bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <p className="text-xl sm:text-2xl text-black/90 max-w-4xl mx-auto animate-fade-in-up delay-200 px-4 sm:px-0 leading-relaxed font-medium">
            Experience excellence in school fee management with our team of skilled professionals dedicated to delivering exceptional results.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/95 backdrop-blur-lg p-8 sm:p-10 rounded-2xl border border-slate-200 transition-all duration-700 hover:bg-white hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-2xl hover:shadow-3xl hover-lift"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-brand-mint/20 via-transparent to-brand-light-mint/20 pointer-events-none"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-brand-mint/50 via-brand-light-mint/50 to-brand-mint/50 p-[1px] pointer-events-none">
                <div className="w-full h-full bg-transparent rounded-2xl"></div>
              </div>
              
              <div className="flex items-start space-x-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-light-mint to-brand-mint rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl group-hover:shadow-2xl animate-heartbeat group-hover:animate-bounce-subtle">
                  <feature.icon className="w-8 h-8 text-brand-teal transition-all duration-500 group-hover:scale-110 group-hover:animate-wiggle" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-500"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-black transition-all duration-500 group-hover:text-brand-light-mint transform group-hover:-translate-y-1 group-hover:animate-bounce-subtle">
                    {feature.title}
                  </h3>
                  <p className="text-black/85 text-lg leading-relaxed transition-all duration-500 group-hover:text-black transform group-hover:-translate-y-1 group-hover:animate-wiggle">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* About Us Content */}
        <div className="group bg-slate-900 rounded-2xl p-8 lg:p-12 relative overflow-hidden transition-all duration-700 hover:scale-102 hover:-translate-y-1 cursor-pointer animate-fade-in-up delay-600">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-brand-mint rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-brand-light-mint rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6 animate-fade-in-left delay-700">
              <span className="text-brand-mint text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:text-brand-light-mint">A BIT</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 animate-fade-in-left delay-800 transition-colors duration-300 group-hover:text-brand-light-mint">
              ABOUT US
            </h2>
            <div className="space-y-4 mb-8 animate-fade-in-left delay-900">
              <p className="text-lg text-slate-300 leading-relaxed transition-colors duration-300 group-hover:text-white">
                Automate collections, receipts, and reporting, so your staff focuses on what matters.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed transition-colors duration-300 group-hover:text-white">
                Increase revenue reliability, reduce workload, and gain full control of your finances.
              </p>
            </div>
            <Button className="bg-brand-mint hover:bg-brand-light-mint text-brand-teal px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-lg animate-fade-in-left delay-1000">
              EXPLORE MORE
            </Button>
          </div>
          

        </div>
      </div>
    </section>
  );
}