import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to transform your school's fee management?
        </h2>
        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
          Join 500+ schools already using Master Fees. Start your free trial today and see the difference.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://master-fees.com/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg">
              Get Started
            </Button>
          </a>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Schedule Demo
          </Button>
        </div>
        
        <p className="text-primary-200 text-sm mt-6">
          No credit card required • 14-day free trial • Setup in under 10 minutes
        </p>
      </div>
    </section>
  );
}
