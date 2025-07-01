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
    <section id="about" className="py-20 bg-brand-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Experience excellence in digital craftsmanship with our team of skilled professionals dedicated to delivering exceptional results.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-20"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-light-mint rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* About Us Content */}
        <div className="bg-slate-900 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-brand-mint rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-brand-light-mint rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <span className="text-brand-mint text-sm font-semibold tracking-wider uppercase">A BIT</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              ABOUT US
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-slate-300 leading-relaxed">
                Automate collections, receipts, and reporting, so your staff focuses on what matters.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Increase revenue reliability, reduce workload, and gain full control of your finances.
              </p>
            </div>
            <Button className="bg-brand-mint hover:bg-brand-light-mint text-brand-teal px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
              EXPLORE MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}