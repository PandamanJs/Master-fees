import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AIAssistant } from './ai-assistant';

export function PandaMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [pandaState, setPandaState] = useState<'idle' | 'waving' | 'happy'>('idle');
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = [
    "Hi! I'm your Master Fees AI assistant! 🤖",
    "Need help with payments? Ask me!",
    "Click me for instant support!",
    "I can help with fees and payments! 💳",
    "Got questions? I'm here to help!"
  ];

  useEffect(() => {
    // Show mascot after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPandaState('waving');
      setTimeout(() => setPandaState('idle'), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Random message display
    const messageTimer = setInterval(() => {
      if (!isAssistantOpen && Math.random() > 0.7) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(randomMessage);
        setShowMessage(true);
        setPandaState('happy');
        
        setTimeout(() => {
          setShowMessage(false);
          setPandaState('idle');
        }, 3000);
      }
    }, 10000);

    return () => clearInterval(messageTimer);
  }, [isAssistantOpen]);

  const handlePandaClick = () => {
    setIsAssistantOpen(true);
    setShowMessage(false);
    setPandaState('happy');
  };

  const closeAssistant = () => {
    setIsAssistantOpen(false);
    setPandaState('waving');
    setTimeout(() => setPandaState('idle'), 1000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Panda Mascot */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Speech Bubble */}
        {showMessage && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-white rounded-2xl px-4 py-2 shadow-lg border border-slate-200 max-w-48 animate-in slide-in-from-bottom-2 duration-300">
            <div className="text-slate-800 text-sm font-medium">{currentMessage}</div>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-slate-200"></div>
          </div>
        )}

        {/* Panda Button */}
        <Button
          onClick={handlePandaClick}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 border-4 border-white shadow-2xl transition-all duration-300 hover:scale-110 ${
            pandaState === 'waving' ? 'animate-bounce' : ''
          } ${
            pandaState === 'happy' ? 'animate-pulse' : ''
          }`}
        >
          <span className="text-2xl">
            {pandaState === 'waving' ? '👋🤖' : 
             pandaState === 'happy' ? '😊🤖' : '🤖'}
          </span>
        </Button>

        {/* Floating Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 animate-ping pointer-events-none"></div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isAssistantOpen} onClose={closeAssistant} />
    </>
  );
}