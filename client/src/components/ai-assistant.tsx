import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, HelpCircle, CreditCard, School, Calculator } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const predefinedQuestions = [
  {
    icon: <CreditCard className="w-4 h-4" />,
    text: "How do I make a fee payment?",
    category: "Payment"
  },
  {
    icon: <School className="w-4 h-4" />,
    text: "What are the different fee categories?",
    category: "Fees"
  },
  {
    icon: <Calculator className="w-4 h-4" />,
    text: "How can I view my payment history?",
    category: "Account"
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    text: "What payment methods are supported?",
    category: "Payment"
  }
];

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Master Fees AI assistant. I can help you with fee payments, account information, and answer questions about our platform. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('payment') || message.includes('pay')) {
      return "To make a fee payment: 1) Log into your account, 2) Navigate to 'Pending Fees', 3) Select the fees you want to pay, 4) Choose your payment method (UPI, Net Banking, Card), 5) Complete the transaction. You'll receive an instant receipt via email and SMS.";
    }
    
    if (message.includes('fee') && (message.includes('category') || message.includes('type'))) {
      return "Our platform supports various fee categories including: Tuition Fees, Transport Fees, Library Fees, Lab Fees, Sports Fees, and Examination Fees. Each category can be configured with different due dates and payment schedules by your school.";
    }
    
    if (message.includes('history') || message.includes('past') || message.includes('previous')) {
      return "You can view your complete payment history in the 'Payment History' section of your dashboard. It shows all transactions with dates, amounts, receipt numbers, and payment status. You can also download receipts for any past payment.";
    }
    
    if (message.includes('method') || message.includes('upi') || message.includes('card')) {
      return "We support multiple payment methods: UPI (Google Pay, PhonePe, Paytm), Net Banking from all major banks, Credit/Debit Cards (Visa, Mastercard, RuPay), and Digital Wallets. All payments are secured with 256-bit SSL encryption.";
    }
    
    if (message.includes('receipt') || message.includes('invoice')) {
      return "After successful payment, you'll automatically receive a digital receipt via email and SMS. You can also download receipts anytime from your payment history. All receipts include transaction details, school information, and are accepted for official records.";
    }
    
    if (message.includes('due') || message.includes('pending')) {
      return "You can check pending dues in your dashboard under 'Pending Fees'. The system shows all outstanding amounts with due dates. You'll also receive automatic reminders via email and SMS before due dates to help you stay on track.";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return "For additional support, you can: 1) Use this chat for instant help, 2) Email us through the contact form, 3) Call our support helpline, or 4) Visit the FAQ section. Our team is available 24/7 to assist you with any queries.";
    }
    
    if (message.includes('login') || message.includes('account') || message.includes('password')) {
      return "Having trouble logging in? Make sure you're using the correct email and password. You can reset your password using the 'Forgot Password' link. If you're a new user, your school admin will provide login credentials. Contact your school office if you need assistance.";
    }
    
    if (message.includes('student') || message.includes('child')) {
      return "As a parent, you can manage fees for multiple children from one account. Each student's fees are displayed separately with their name and class. You can pay for individual students or make bulk payments for all your children at once.";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you with anything related to Master Fees. Whether you need help with payments, want to check your account, or have questions about our platform, just ask me!";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! I'm always here to help. If you have any other questions about Master Fees, feel free to ask. Have a great day!";
    }
    
    // Default response
    return "I'd be happy to help you with that! I can assist with fee payments, account management, payment history, receipt downloads, and general platform questions. Could you please provide more specific details about what you need help with?";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handlePredefinedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col bg-white shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Master Fees Assistant</CardTitle>
                <p className="text-sm text-emerald-100">AI-powered help & support</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-slate-100 text-slate-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="bg-slate-100 px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-slate-50">
              <p className="text-sm font-medium text-slate-700 mb-3">Quick questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePredefinedQuestion(question.text)}
                    className="justify-start text-left h-auto py-2 px-3 text-xs"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {question.icon}
                      <span className="flex-1">{question.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 border-slate-300 focus:border-emerald-500"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="bg-emerald-600 hover:bg-emerald-700 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              AI assistant for Master Fees platform support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}