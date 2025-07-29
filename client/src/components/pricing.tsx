import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for small schools",
    price: "ZMW 199",
    period: "/month",
    features: [
      "Up to 500 students",
      "Digital receipts",
      "Parent dashboard",
      "Email support",
      "Basic reports"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Standard",
    description: "Best for growing schools",
    price: "ZMW 499",
    period: "/month",
    features: [
      "Up to 2,000 students",
      "All Basic features",
      "Automated reminders",
      "Advanced reports",
      "Priority support",
      "Custom branding"
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large institutions",
    price: "Custom",
    period: "",
    features: [
      "Unlimited students",
      "All Standard features",
      "Multi-school support",
      "API access",
      "Dedicated support",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-brand-mint/10 rounded-full text-brand-teal font-semibold text-sm tracking-wide uppercase mb-6">
            Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-4 sm:px-0">
            Choose the perfect plan for your school. All plans include core features with no hidden fees.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 relative hover:-translate-y-1 cursor-pointer overflow-hidden ${
                plan.popular
                  ? "bg-gradient-to-br from-brand-mint/5 to-brand-teal/5 dark:from-brand-mint/15 dark:to-brand-teal/15 border-2 border-brand-teal md:scale-102 lg:scale-102 shadow-lg dark:shadow-brand-teal/20"
                  : "border-2 border-slate-200/60 dark:border-gray-700/60 hover:border-brand-mint/50 dark:hover:border-brand-mint/70 hover:shadow-lg dark:hover:shadow-brand-mint/10"
              } animate-fade-in-up delay-${(index + 1) * 200}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-brand-mint to-brand-teal text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-300">{plan.period}</span>
                </div>
              </div>
              
              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.buttonVariant}
                className={`relative w-full px-6 py-4 rounded-xl font-semibold transition-all duration-500 hover:transform hover:-translate-y-2 hover:scale-105 button-premium ${
                  plan.buttonVariant === "default"
                    ? "bg-gradient-to-r from-brand-mint to-brand-teal hover:from-brand-teal hover:to-brand-mint text-white shadow-lg hover:shadow-2xl focus:ring-4 focus:ring-brand-teal/30 animate-pulse-glow"
                    : "border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white focus:ring-4 focus:ring-brand-teal/20 glass-effect hover:shadow-xl"
                } overflow-hidden`}
              >
                <span className="relative z-10">{plan.buttonText}</span>
                {/* Animated background for outline buttons */}
                {plan.buttonVariant !== "default" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-mint to-brand-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                )}
              </Button>
            </div>
          ))}
        </div>
        
        {/* Pricing Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex justify-center items-center space-x-8 text-sm text-slate-500">
            <span className="flex items-center">
              <Check className="w-4 h-4 text-emerald-500 mr-2" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-emerald-500 mr-2" />
              No setup fees
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-emerald-500 mr-2" />
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
