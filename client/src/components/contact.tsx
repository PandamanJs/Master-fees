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
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-slate-300">
            Ready to transform your school's fee management? Contact us today.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-brand-light-mint font-medium text-lg">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Type here"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-transparent border-2 border-brand-light-mint text-white placeholder:text-slate-400 h-12 text-lg focus:border-brand-mint"
              />
            </div>
            <div className="space-y-2">
              <label className="text-brand-light-mint font-medium text-lg">
                Email
              </label>
              <Input
                type="email"
                placeholder="Type here"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-transparent border-2 border-brand-light-mint text-white placeholder:text-slate-400 h-12 text-lg focus:border-brand-mint"
              />
            </div>
          </div>

          {/* Contact Reason */}
          <div className="space-y-4">
            <label className="text-brand-light-mint font-medium text-lg block">
              Why are you contacting us?
            </label>
            <div className="bg-brand-teal bg-opacity-20 border-2 border-brand-light-mint rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="schoolPay"
                    checked={formData.reasons.schoolPay}
                    onCheckedChange={(checked) => handleReasonChange("schoolPay", checked as boolean)}
                    className="border-brand-light-mint data-[state=checked]:bg-brand-mint data-[state=checked]:border-brand-mint"
                  />
                  <label htmlFor="schoolPay" className="text-white font-medium">
                    School Pay
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="learnMore"
                    checked={formData.reasons.learnMore}
                    onCheckedChange={(checked) => handleReasonChange("learnMore", checked as boolean)}
                    className="border-brand-light-mint data-[state=checked]:bg-brand-mint data-[state=checked]:border-brand-mint"
                  />
                  <label htmlFor="learnMore" className="text-white font-medium">
                    Learn more
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="integration"
                    checked={formData.reasons.integration}
                    onCheckedChange={(checked) => handleReasonChange("integration", checked as boolean)}
                    className="border-brand-light-mint data-[state=checked]:bg-brand-mint data-[state=checked]:border-brand-mint"
                  />
                  <label htmlFor="integration" className="text-white font-medium">
                    Integration
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="others"
                    checked={formData.reasons.others}
                    onCheckedChange={(checked) => handleReasonChange("others", checked as boolean)}
                    className="border-brand-light-mint data-[state=checked]:bg-brand-mint data-[state=checked]:border-brand-mint"
                  />
                  <label htmlFor="others" className="text-white font-medium">
                    Others
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-brand-light-mint font-medium text-lg">
              Your Message
            </label>
            <Textarea
              placeholder="Type here"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="bg-transparent border-2 border-brand-light-mint text-white placeholder:text-slate-400 min-h-32 text-lg focus:border-brand-mint resize-none"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <Button
              type="submit"
              className="bg-brand-teal hover:bg-opacity-80 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-200 border-2 border-brand-teal hover:border-brand-light-mint"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}