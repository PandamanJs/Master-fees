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
      <div className="absolute inset-0 opacity-10 bg-[#111a2c]">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-mint rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-light-mint rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>
    </section>
  );
}