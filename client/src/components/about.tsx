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
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Refined Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 ultra-glass-dark rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 ultra-glass-light rounded-full opacity-10 animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 ultra-glass-dark rounded-full opacity-5 animate-float delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 tracking-[-0.03em] leading-[0.9]">
            Why Choose Master Fees?
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-200 max-w-4xl mx-auto leading-[1.4] opacity-95">
            Built for modern educational institutions who value efficiency, security, and excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="ultra-glass-light p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 ultra-glass-dark rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 border border-emerald-400/30">
                  <feature.icon className="w-8 h-8 text-emerald-400 transition-all duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4 tracking-wide">{feature.title}</h3>
                  <p className="text-slate-300 font-light leading-relaxed text-lg opacity-90">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}