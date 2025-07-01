import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Master Fees has transformed our fee collection process. What used to take weeks now happens in days. Parents love the convenience and transparency.",
    author: "Rajesh Sharma",
    role: "Principal, Delhi Public School",
    initials: "RS",
    bgColor: "bg-primary-100",
    textColor: "text-primary-600"
  },
  {
    content: "As a parent, I love being able to track all payments and get instant receipts. The interface is so user-friendly and saves me multiple trips to school.",
    author: "Priya Mehta",
    role: "Parent, St. Xavier's School",
    initials: "PM",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600"
  },
  {
    content: "The reporting features are incredible. We can track every payment, generate reports instantly, and our accountant loves the detailed transaction logs.",
    author: "Amit Kumar",
    role: "Administrator, Modern Academy",
    initials: "AK",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600"
  }
];

const trustedSchools = [
  "Lusaka Int'l",
  "St. Mary's",
  "Hillcrest",
  "American Int'l",
  "Rhodes Park",
  "Chalo Trust"
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50/80 dark:bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by 500+ schools across Zambia
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            See what school administrators and parents are saying about Master Fees.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-sm dark:shadow-lg border border-slate-200/50 dark:border-gray-700/50 hover:shadow-lg dark:hover:shadow-brand-mint/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 dark:text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-3`}>
                  <span className={`${testimonial.textColor} font-semibold text-sm`}>
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trusted Schools - News Headline Style */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-16">
          <h3 className="text-center text-lg font-semibold text-black dark:text-white mb-8">Trusted by leading schools</h3>
          <div className="scrolling-container bg-white dark:bg-slate-800 py-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="scrolling-content">
              {/* Duplicate the list to ensure seamless looping */}
              {[...trustedSchools, ...trustedSchools, ...trustedSchools].map((school, index) => (
                <span
                  key={index}
                  className="inline-block text-black dark:text-white text-lg font-medium px-8 whitespace-nowrap"
                >
                  {school}
                  <span className="mx-4 text-brand-teal">•</span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Alternative scrolling row - opposite direction */}
          <div className="scrolling-container bg-slate-50 dark:bg-slate-900 py-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <div className="scrolling-content" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
              {[...trustedSchools.slice().reverse(), ...trustedSchools.slice().reverse(), ...trustedSchools.slice().reverse()].map((school, index) => (
                <span
                  key={index}
                  className="inline-block text-black dark:text-slate-300 text-base font-medium px-6 whitespace-nowrap opacity-80"
                >
                  ★ {school} School
                  <span className="mx-4 text-brand-mint">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
