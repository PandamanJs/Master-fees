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