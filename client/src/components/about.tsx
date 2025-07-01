import { Button } from "@/components/ui/button";
import { Shield, Users, TrendingUp, Handshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Expertise",
    description: "Our team consists of highly skilled professionals who have a deep understanding of the digital landscape. We stay updated with the latest industry trends and best practices to deliver cutting-edge solutions."
  },
  {
    icon: Users,
    title: "Client-Centric Approach", 
    description: "We prioritize our clients and their unique needs. We listen to your ideas, challenges, and goals, and tailor our services to meet your specific requirements. Your success is our success."
  },
  {
    icon: TrendingUp,
    title: "Results-Driven Solutions",
    description: "Our primary focus is on delivering results. We combine creativity and technical expertise to create digital products that drive business growth, enhance user experiences, and provide a competitive advantage."
  },
  {
    icon: Handshake,
    title: "Collaborative Partnership",
    description: "We value long-term relationships with our clients. We see ourselves as your digital partner, providing ongoing support, maintenance, and updates to ensure your digital products continue to thrive."
  }
];

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-shimmer">
            Why Choose Us?
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto animate-fade-in-up delay-200 px-4 sm:px-0">
            Experience excellence in digital craftsmanship with our team of skilled professionals dedicated to delivering exceptional results.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white bg-opacity-10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white border-opacity-20 transition-all duration-700 hover:bg-opacity-20 hover:scale-102 hover:-translate-y-1 cursor-pointer relative overflow-hidden animate-fade-in-up delay-${(index + 1) * 200} glass-effect`}
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1500"></div>
              </div>
              
              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-12 h-12 bg-brand-light-mint rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
                  <feature.icon className="w-6 h-6 text-brand-teal transition-all duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 transition-all duration-500 group-hover:text-brand-light-mint transform group-hover:-translate-y-0.5">{feature.title}</h3>
                  <p className="text-slate-200 leading-relaxed transition-all duration-500 group-hover:text-white transform group-hover:-translate-y-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-light-mint/10 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* About Us Content */}
        <div className="group bg-slate-900 rounded-2xl p-8 lg:p-12 relative overflow-hidden transition-all duration-700 hover:scale-102 hover:-translate-y-1 cursor-pointer animate-fade-in-up delay-600">
          {/* Background decoration with animation */}
          <div className="absolute inset-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20">
            <div className="absolute top-10 right-10 w-32 h-32 bg-brand-mint rounded-full animate-float delay-100 transition-all duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-brand-light-mint rounded-full animate-float delay-300 transition-all duration-700 group-hover:scale-125"></div>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6 animate-fade-in-left delay-700">
              <span className="text-brand-mint text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:text-brand-light-mint">A BIT</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 animate-fade-in-left delay-800 transition-all duration-300 group-hover:text-brand-light-mint transform group-hover:-translate-y-1">
              ABOUT US
            </h2>
            <div className="space-y-4 mb-8 animate-fade-in-left delay-900">
              <p className="text-lg text-slate-300 leading-relaxed transition-all duration-300 group-hover:text-white transform group-hover:-translate-y-1">
                Automate collections, receipts, and reporting, so your staff focuses on what matters.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed transition-all duration-300 group-hover:text-white transform group-hover:-translate-y-1">
                Increase revenue reliability, reduce workload, and gain full control of your finances.
              </p>
            </div>
            <Button className="bg-brand-mint hover:bg-brand-light-mint text-brand-teal px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-xl animate-fade-in-left delay-1000 button-premium">
              EXPLORE MORE
            </Button>
          </div>
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-light-mint/10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}