import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    reasons: {
      schoolPay: true,
      integration: false,
      learnMore: false,
      others: false
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReasonChange = (reason: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      reasons: {
        ...prev.reasons,
        [reason]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600">
            Ready to transform your school's fee management? Contact us today.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-700 font-medium text-sm">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Type here"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 h-10 focus:border-brand-teal hover-lift"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 font-medium text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Type here"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 h-10 focus:border-brand-teal hover-lift"
                />
              </div>
            </div>

            {/* Contact Reason */}
            <div className="space-y-2">
              <label className="text-slate-700 font-medium text-sm block">
                Why are you contacting us?
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="schoolPay"
                      checked={formData.reasons.schoolPay}
                      onCheckedChange={(checked) => handleReasonChange("schoolPay", checked as boolean)}
                      className="border-slate-400 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                    />
                    <label htmlFor="schoolPay" className="text-slate-700 font-medium text-sm">
                      School Pay
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="learnMore"
                      checked={formData.reasons.learnMore}
                      onCheckedChange={(checked) => handleReasonChange("learnMore", checked as boolean)}
                      className="border-slate-400 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                    />
                    <label htmlFor="learnMore" className="text-slate-700 font-medium text-sm">
                      Learn more
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="integration"
                      checked={formData.reasons.integration}
                      onCheckedChange={(checked) => handleReasonChange("integration", checked as boolean)}
                      className="border-slate-400 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                    />
                    <label htmlFor="integration" className="text-slate-700 font-medium text-sm">
                      Integration
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="others"
                      checked={formData.reasons.others}
                      onCheckedChange={(checked) => handleReasonChange("others", checked as boolean)}
                      className="border-slate-400 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                    />
                    <label htmlFor="others" className="text-slate-700 font-medium text-sm">
                      Others
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-slate-700 font-medium text-sm">
                Your Message
              </label>
              <Textarea
                placeholder="Type here"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 min-h-24 focus:border-brand-teal resize-none hover-lift"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <Button
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-2.5 rounded-lg font-semibold transition-all duration-200 hover-lift cursor-magic hover:animate-heartbeat"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}