import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from '@uppy/core';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Zap,
  Heart,
  TrendingUp,
  Upload,
  FileText,
  Mail,
  Phone,
  User,
  GraduationCap,
  Bot
} from "lucide-react";

const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().min(2, "Education background is required"),
  skills: z.string().min(10, "Please describe your relevant skills"),
  motivation: z.string().min(50, "Please tell us why you want to join our team"),
  availability: z.string().min(1, "Please select your availability"),
  portfolio: z.string().optional(),
  resume: z.string().optional()
});

type JobApplicationForm = z.infer<typeof jobApplicationSchema>;

export default function Careers() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<string>("");
  const [isProcessingCV, setIsProcessingCV] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<JobApplicationForm>({
    resolver: zodResolver(jobApplicationSchema)
  });

  const submitApplicationMutation = useMutation({
    mutationFn: (data: JobApplicationForm) => 
      apiRequest('/api/job-applications', 'POST', data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: JobApplicationForm) => {
    setIsSubmitting(true);
    submitApplicationMutation.mutate({
      ...data,
      resume: cvFile || data.resume
    });
  };

  const handleCVUpload = async () => {
    return {
      method: 'PUT' as const,
      url: await apiRequest('/api/objects/upload', 'POST').then((res: any) => res.uploadURL),
    };
  };

  const handleCVComplete = async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      const cvUrl = uploadedFile.uploadURL;
      
      setIsProcessingCV(true);
      
      try {
        // Extract CV information and autofill form
        const response: any = await apiRequest('/api/extract-cv-info', 'POST', { cvUrl });
        
        if (response.extractedInfo) {
          const info = response.extractedInfo;
          
          // Autofill form fields
          if (info.fullName) setValue('fullName', info.fullName);
          if (info.email) setValue('email', info.email);
          if (info.phone) setValue('phone', info.phone);
          if (info.education) setValue('education', info.education);
          if (info.skills) setValue('skills', info.skills);
          if (info.experience && info.experience !== 'Not specified') {
            setValue('experience', info.experience);
          }
          
          setCvFile(cvUrl || '');
          
          toast({
            title: "CV Processed Successfully!",
            description: "Your CV has been uploaded and form fields have been automatically filled.",
          });
        }
      } catch (error) {
        console.error('CV processing error:', error);
        setCvFile(cvUrl || ''); // Still save the CV URL even if parsing fails
        toast({
          title: "CV Uploaded",
          description: "Your CV has been uploaded. Please fill in the form fields manually.",
        });
      } finally {
        setIsProcessingCV(false);
      }
    }
  };

  const openPositions = [
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote / Lusaka, Zambia",
      type: "Full-time",
      experience: "2-5 years",
      description: "Build and maintain our school fee management platform using React, Node.js, and modern web technologies."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Lusaka, Zambia", 
      type: "Full-time",
      experience: "3-6 years",
      description: "Lead product strategy and development for our education technology solutions."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Lusaka, Zambia",
      type: "Full-time",
      experience: "2-4 years",
      description: "Help schools successfully implement and maximize value from Master Fees platform."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote / Lusaka, Zambia",
      type: "Full-time",
      experience: "2-4 years",
      description: "Drive growth through digital marketing, content creation, and community engagement."
    },
    {
      title: "Software Engineering Intern",
      department: "Engineering",
      location: "Remote / Lusaka, Zambia",
      type: "Internship",
      experience: "0-1 years",
      description: "Learn and contribute to building our education technology platform. Perfect for students and recent graduates."
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: "Professional Growth",
      description: "Learning budget, conferences, and career development opportunities"
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Great Team",
      description: "Work with passionate professionals making education accessible"
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and work-life balance"
    }
  ];

  return (
    <section id="careers" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Refined Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 ultra-glass-dark rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 ultra-glass-light rounded-full opacity-10 animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 ultra-glass-dark rounded-full opacity-5 animate-float delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 ultra-glass-light text-emerald-400 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-emerald-400/30">
            <Briefcase className="w-4 h-4" />
            Join Our Team
          </div>
          <h2 className="text-5xl lg:text-6xl font-extralight text-white mb-8 tracking-[-0.03em] leading-[0.9]">
            Build the Future of 
            <span className="text-emerald-300"> Education Technology</span>
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-200 max-w-4xl mx-auto leading-[1.4] opacity-95">
            Join our mission to make school fee management simple and accessible for every educational institution in Africa.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="ultra-glass-light p-6 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group text-center">
              <div className="w-16 h-16 ultra-glass-dark rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 border border-emerald-400/30">
                {benefit.icon}
              </div>
              <h3 className="font-medium text-white mb-2 tracking-wide">{benefit.title}</h3>
              <p className="text-sm text-slate-300 font-light opacity-90">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h3 className="text-3xl font-extralight text-white mb-8 text-center tracking-[-0.02em]">Open Positions</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <div key={index} className="ultra-glass-light p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group">
                <div className="mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-medium text-white mb-2 tracking-wide">{position.title}</h4>
                      <p className="text-emerald-400 font-medium">
                        {position.department}
                      </p>
                    </div>
                    <div className="ultra-glass-dark px-3 py-1 rounded-full text-emerald-400 text-sm border border-emerald-400/30">
                      {position.type}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {position.experience}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-600 mb-4">{position.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setValue('position', position.title)}
                    className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                  >
                    Apply for this position
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900">Apply for a Position</CardTitle>
            <CardDescription>
              We'd love to hear from you! Fill out the form below to apply for any of our open positions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className="border-slate-200 focus:border-emerald-500"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className="border-slate-200 focus:border-emerald-500"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+260 XXX XXX XXX"
                    className="border-slate-200 focus:border-emerald-500"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Position Applying For *
                  </Label>
                  <Select onValueChange={(value) => setValue('position', value)}>
                    <SelectTrigger className="border-slate-200 focus:border-emerald-500">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {openPositions.map((position) => (
                        <SelectItem key={position.title} value={position.title}>
                          {position.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other / General Application</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.position && (
                    <p className="text-sm text-red-600">{errors.position.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Experience Level *
                  </Label>
                  <Select onValueChange={(value) => setValue('experience', value)}>
                    <SelectTrigger className="border-slate-200 focus:border-emerald-500">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="lead">Lead/Management (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-sm text-red-600">{errors.experience.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability *
                  </Label>
                  <Select onValueChange={(value) => setValue('availability', value)}>
                    <SelectTrigger className="border-slate-200 focus:border-emerald-500">
                      <SelectValue placeholder="When can you start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="2weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1month">1 month notice</SelectItem>
                      <SelectItem value="3months">2-3 months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.availability && (
                    <p className="text-sm text-red-600">{errors.availability.message}</p>
                  )}
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="space-y-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Bot className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Smart CV Upload</h3>
                    <p className="text-sm text-slate-600">Upload your CV and we'll automatically fill out the form for you</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <ObjectUploader
                    maxNumberOfFiles={1}
                    maxFileSize={5 * 1024 * 1024} // 5MB
                    onGetUploadParameters={handleCVUpload}
                    onComplete={handleCVComplete}
                    buttonClassName="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      {cvFile ? "CV Uploaded ✓" : "Upload CV/Resume"}
                    </div>
                  </ObjectUploader>
                  
                  {isProcessingCV && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></div>
                      <span className="text-sm">Processing CV...</span>
                    </div>
                  )}
                  
                  {cvFile && !isProcessingCV && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">CV processed successfully</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-slate-500">
                  Supported formats: PDF, DOC, DOCX (max 5MB). Your CV will be securely processed to extract relevant information.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education Background *
                </Label>
                <Input
                  id="education"
                  {...register("education")}
                  placeholder="e.g., Bachelor's in Computer Science, University of Zambia"
                  className="border-slate-200 focus:border-emerald-500"
                />
                {errors.education && (
                  <p className="text-sm text-red-600">{errors.education.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">
                  Relevant Skills & Technologies *
                </Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="List your relevant skills, programming languages, frameworks, tools, etc."
                  rows={3}
                  className="border-slate-200 focus:border-emerald-500"
                />
                {errors.skills && (
                  <p className="text-sm text-red-600">{errors.skills.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">
                  Why do you want to join Master Fees? *
                </Label>
                <Textarea
                  id="motivation"
                  {...register("motivation")}
                  placeholder="Tell us about your motivation, what excites you about our mission, and how you can contribute to our team..."
                  rows={4}
                  className="border-slate-200 focus:border-emerald-500"
                />
                {errors.motivation && (
                  <p className="text-sm text-red-600">{errors.motivation.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resume/CV Link
                  </Label>
                  <Input
                    id="resume"
                    {...register("resume")}
                    placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    className="border-slate-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Portfolio/LinkedIn
                  </Label>
                  <Input
                    id="portfolio"
                    {...register("portfolio")}
                    placeholder="Link to your portfolio or LinkedIn profile"
                    className="border-slate-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold transition-all duration-300"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">
            Don't see a position that fits? We're always looking for talented individuals.
          </p>
          <p className="text-sm text-slate-500">
            Send us your resume at <a href="mailto:masterfees101@gmail.com" className="text-emerald-600 hover:text-emerald-700">masterfees101@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}