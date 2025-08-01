import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { contactFormSchema, type ContactFormData } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, School, Send, CheckCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      schoolName: '',
      subject: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto ultra-glass-light border-emerald-400/30">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-light text-slate-800 mb-4">
            Thank You for Reaching Out!
          </h3>
          
          <p className="text-slate-600 mb-6 leading-relaxed">
            We've received your message and will get back to you within 24 hours. 
            Our team is excited to help transform your school's fee management experience.
          </p>
          
          <Button
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto ultra-glass-light shadow-xl border-slate-400/30">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-light text-white">
          Get in Touch with Us
        </CardTitle>
        <CardDescription className="text-slate-200 text-base">
          Ready to transform your school's fee management? Let's start the conversation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                {...form.register('name')}
                className="ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 text-white placeholder:text-slate-400"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200 font-medium">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 text-white placeholder:text-slate-400"
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-200 font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  className="pl-10 ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 text-white placeholder:text-slate-400"
                  {...form.register('phone')}
                />
              </div>
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolName" className="text-slate-200 font-medium">
                School/Institution Name
              </Label>
              <div className="relative">
                <School className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="schoolName"
                  placeholder="Your school name"
                  className="pl-10 ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 text-white placeholder:text-slate-400"
                  {...form.register('schoolName')}
                />
              </div>
              {form.formState.errors.schoolName && (
                <p className="text-red-500 text-sm">{form.formState.errors.schoolName.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-200 font-medium">
              Subject *
            </Label>
            <Input
              id="subject"
              placeholder="What would you like to discuss?"
              {...form.register('subject')}
              className="ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 text-white placeholder:text-slate-400"
            />
            {form.formState.errors.subject && (
              <p className="text-red-500 text-sm">{form.formState.errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-200 font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your school's fee management needs, challenges, or any questions you have about Master Fees..."
              rows={5}
              {...form.register('message')}
              className="ultra-glass-light border-slate-400/30 focus:border-emerald-400 focus:ring-emerald-400 resize-none text-white placeholder:text-slate-400"
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full ultra-glass-dark text-white hover:text-emerald-100 py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-emerald-400/30"
            >
              {contactMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Message...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </div>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-sm text-slate-400 text-center leading-relaxed">
            By submitting this form, you agree to our privacy policy. We'll only use your information 
            to respond to your inquiry and provide relevant updates about Master Fees.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}