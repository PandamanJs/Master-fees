import { ContactForm } from "./contact-form";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-slate-900 overflow-hidden">
      {/* Consistent background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/40 to-slate-900"></div>
      
      <div className="relative max-w-5xl mx-auto px-8 lg:px-12">
        {/* Apple-style Header with enhanced typography */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 tracking-[-0.03em] leading-[0.9]">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-200 max-w-4xl mx-auto leading-[1.4] opacity-95">
            Ready to transform your school's fee management? Let's start the conversation.
          </p>
        </div>

        {/* Enhanced Contact Form */}
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
              <div className="space-y-3">
                <label className="text-slate-300 font-light text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/70 border border-slate-300/50 text-slate-900 placeholder:text-slate-500 h-12 rounded-xl focus:border-emerald-400 focus:bg-white/90 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Message Text Area */}
            <div className="space-y-3">
              <label className="text-slate-300 font-light text-sm">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your school's fee management needs..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white/70 border border-slate-300/50 text-slate-900 placeholder:text-slate-500 min-h-[120px] rounded-xl focus:border-emerald-400 focus:bg-white/90 focus:ring-2 focus:ring-emerald-400/20 resize-none transition-all duration-300"
              />
            </div>

            {/* Apple-style Contact Reasons */}
            <div className="space-y-6">
              <label className="text-slate-300 font-light text-sm">
                What are you interested in?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'schoolPay', label: 'School Payment Solutions' },
                  { key: 'integration', label: 'System Integration' },
                  { key: 'learnMore', label: 'Learn More About Features' },
                  { key: 'others', label: 'Other Services' }
                ].map((reason) => (
                  <div key={reason.key} className="flex items-center space-x-3 p-4 bg-white/30 rounded-xl border border-slate-200/50 hover:bg-white/50 hover:border-emerald-300/50 transition-all duration-300">
                    <Checkbox
                      id={reason.key}
                      checked={formData.reasons[reason.key as keyof typeof formData.reasons]}
                      onCheckedChange={(checked) => handleReasonChange(reason.key, !!checked)}
                      className="border-slate-400 data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400 data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor={reason.key}
                      className="text-slate-300 font-light cursor-pointer"
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
                className="w-full bg-emerald-400 text-slate-900 hover:bg-emerald-300 h-14 font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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