import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-brand-teal overflow-hidden">
      {/* Background decorative curved shapes matching reference */}
      <div className="absolute inset-0">
        {/* Large curved background shapes similar to reference image */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M400,0 C400,200 200,400 0,400 L400,400 Z" fill="currentColor" className="text-brand-mint/30"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-15">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <circle cx="160" cy="160" r="160" fill="currentColor" className="text-slate-600/40"/>
          </svg>
        </div>
        <div className="absolute top-1/3 right-10 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-mint/50"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-mint/30"/>
          </svg>
        </div>
      </div>

      {/* Main content positioned like reference image */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
        {/* Brand name */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-medium">master-fees</h2>
        </div>

        {/* Main heading matching reference exactly */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Join our <span className="text-brand-mint">Exclusive</span><br />
            test program
          </h1>
          
          {/* Description matching reference */}
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Unlock the easiest way to collect fees, track revenue, and reduce admin work—all at zero cost. Join our 10-school test program, enjoy premium access for a year, and help us build the perfect solution for schools like yours.
          </p>
          
          {/* CTA Button matching reference */}
          <Button className="bg-brand-mint hover:bg-brand-light-mint text-slate-800 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
            Sign Up Now!
          </Button>
        </div>
      </div>

      {/* Bottom white mockup section matching reference exactly */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-white rounded-t-[3rem] h-32 md:h-40 relative">
          {/* Mockup placeholder matching reference style */}
          <div className="absolute top-6 left-6 right-6 bottom-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Platform Preview</div>
          </div>
        </div>
      </div>
    </section>
  );
}
