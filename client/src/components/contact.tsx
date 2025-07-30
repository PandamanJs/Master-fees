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
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Apple-style Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your school's fee management? Let's start the conversation.
          </p>
        </div>

        {/* Apple-style Contact Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-12 lg:p-16 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white font-light text-sm">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white font-light text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>

            {/* Message Text Area */}
            <div className="space-y-3">
              <label className="text-white font-light text-sm">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your school's fee management needs..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 min-h-[120px] rounded-xl focus:border-white/40 focus:bg-white/15 resize-none transition-all duration-300"
              />
            </div>

            {/* Apple-style Contact Reasons */}
            <div className="space-y-6">
              <label className="text-white font-light text-sm">
                What are you interested in?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'schoolPay', label: 'School Payment Solutions' },
                  { key: 'integration', label: 'System Integration' },
                  { key: 'learnMore', label: 'Learn More About Features' },
                  { key: 'others', label: 'Other Services' }
                ].map((reason) => (
                  <div key={reason.key} className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <Checkbox
                      id={reason.key}
                      checked={formData.reasons[reason.key as keyof typeof formData.reasons]}
                      onCheckedChange={(checked) => handleReasonChange(reason.key, !!checked)}
                      className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black"
                    />
                    <label
                      htmlFor={reason.key}
                      className="text-gray-300 font-light cursor-pointer"
                    >
                      {reason.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apple-style Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 h-14 font-medium text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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