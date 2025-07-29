import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle, BookOpen, CreditCard, Users, Settings, HelpCircle } from "lucide-react";

interface MascotMessage {
  id: string;
  text: string;
  action?: () => void;
  actionText?: string;
}

const welcomeMessages: MascotMessage[] = [
  {
    id: "welcome",
    text: "Hi! I'm Feely, your Master Fees guide! 👋 I'm here to help you navigate our school payment system.",
  },
  {
    id: "features",
    text: "Would you like me to show you around? I can explain our key features and how they'll make school payments easier!",
    actionText: "Show me around",
  },
  {
    id: "contact",
    text: "Need help with anything specific? Just click on me anytime and I'll be happy to assist!",
  },
];

const guideTips: { [key: string]: MascotMessage } = {
  hero: {
    id: "hero-tip",
    text: "This is our main dashboard! Schools can track all their fee collections and payments in real-time. Pretty neat, right?",
  },
  features: {
    id: "features-tip",
    text: "These features make school fee management super easy! Multi-payment methods, instant notifications, and detailed analytics.",
  },
  about: {
    id: "about-tip",
    text: "Here's why schools love us! We've helped over 500 schools streamline their payment processes.",
  },
  contact: {
    id: "contact-tip",
    text: "Ready to get started? Fill out this form and our team will set up your school in no time!",
  },
  testimonials: {
    id: "testimonials-tip",
    text: "Don't just take our word for it! See what other school administrators are saying about Master Fees.",
  },
};

export default function MascotGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<MascotMessage | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    // Show mascot after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (!hasSeenWelcome) {
        setCurrentMessage(welcomeMessages[0]);
        setHasSeenWelcome(true);
      }
    }, 2000);

    // Add scroll listener for section-based tips
    const handleScroll = () => {
      const sections = ['hero', 'features', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            // Show section-specific tip after a delay
            setTimeout(() => {
              if (guideTips[sectionId] && !currentMessage) {
                setCurrentMessage(guideTips[sectionId]);
              }
            }, 1000);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasSeenWelcome, currentMessage]);

  useEffect(() => {
    // Auto-advance welcome messages
    if (currentMessage && welcomeMessages.includes(currentMessage) && messageIndex < welcomeMessages.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
        setCurrentMessage(welcomeMessages[messageIndex + 1]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [currentMessage, messageIndex]);

  const handleMascotClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setCurrentMessage({
        id: "help-menu",
        text: "What would you like to learn about?",
      });
    }
  };

  const showTip = (section: string) => {
    setCurrentMessage(guideTips[section]);
    setIsExpanded(false);
  };

  const dismissMessage = () => {
    setCurrentMessage(null);
  };

  const quickActions = [
    { icon: BookOpen, label: "Features", action: () => showTip("features") },
    { icon: CreditCard, label: "Payments", action: () => showTip("hero") },
    { icon: Users, label: "Testimonials", action: () => showTip("testimonials") },
    { icon: MessageCircle, label: "Contact", action: () => showTip("contact") },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Message bubble */}
      {currentMessage && (
        <div className="absolute bottom-20 right-0 mb-2 mr-2 max-w-sm animate-fade-in-up">
          <div className="bg-white-slate-800 rounded-2xl shadow-xl border border-slate-200-slate-700 p-4 relative">
            <button
              onClick={dismissMessage}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-slate-700-slate-300 text-sm leading-relaxed pr-6">
              {currentMessage.text}
            </p>
            {currentMessage.actionText && (
              <Button
                onClick={currentMessage.action}
                size="sm"
                className="mt-3 bg-brand-teal hover:bg-brand-teal/90 text-white"
              >
                {currentMessage.actionText}
              </Button>
            )}
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 right-8 transform translate-y-2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white-t-slate-800"></div>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions menu */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 mb-2 animate-fade-in-up">
          <div className="bg-white-slate-800 rounded-2xl shadow-xl border border-slate-200-slate-700 p-4">
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex flex-col items-center p-3 rounded-xl bg-slate-50-slate-700 hover:bg-brand-teal hover:text-white transition-all duration-200 group"
                >
                  <action.icon className="w-5 h-5 mb-2 group-hover:animate-wiggle" />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mascot character */}
      <div
        onClick={handleMascotClick}
        className="relative cursor-pointer group"
      >
        {/* Panda body */}
        <div className={`w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-3 border-black ${isExpanded ? 'mascot-excited' : 'mascot-idle'}`}>
          {/* Panda face */}
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center relative">
            {/* Panda ears */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-black rounded-full"></div>
            
            {/* Eye patches */}
            <div className="absolute top-0.5 left-1.5 w-2.5 h-3 bg-black rounded-full opacity-80"></div>
            <div className="absolute top-0.5 right-1.5 w-2.5 h-3 bg-black rounded-full opacity-80"></div>
            
            {/* Eyes */}
            <div className="flex space-x-2 relative z-10">
              <div className="w-1 h-1 bg-white rounded-full eye-blink"></div>
              <div className="w-1 h-1 bg-white rounded-full eye-blink" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Panda nose */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-black rounded-full"></div>
            
            {/* Panda mouth */}
            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-1 border border-black border-t-0 rounded-b-full transition-all duration-300 group-hover:border-brand-teal"></div>
          </div>

          {/* Activity indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
          
          {/* Cheeks when expanded */}
          {isExpanded && (
            <>
              <div className="absolute top-6 left-1 w-2 h-2 bg-pink-300 rounded-full opacity-70 animate-fade-in"></div>
              <div className="absolute top-6 right-1 w-2 h-2 bg-pink-300 rounded-full opacity-70 animate-fade-in"></div>
            </>
          )}
        </div>

        {/* Hover hint */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {isExpanded ? "Close menu" : "Hi! I'm Panda 🐼"}
        </div>

        {/* Floating sparkles */}
        <div className="absolute -top-2 -left-2 w-1 h-1 bg-brand-mint rounded-full opacity-70 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-1 -right-3 w-1 h-1 bg-brand-light-mint rounded-full opacity-70 animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2 -left-3 w-1 h-1 bg-brand-teal rounded-full opacity-70 animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}