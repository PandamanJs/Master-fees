import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// Removed Card imports as we're using liquid glass design
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
// Using FormSubmit for form submission instead of API mutations
// ObjectUploader removed - using link field only with FormSubmit
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
  // CV upload state removed - using link field only
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

  const onSubmit = (data: JobApplicationForm) => {
    // Validation passed, form will submit naturally to FormSubmit
    setIsSubmitting(true);
    
    // Show immediate feedback - actual submission handled by HTML form
    toast({
      title: "Submitting Application...",
      description: "Please wait while we process your application.",
    });
  };

  // CV upload functionality removed - using link field only with FormSubmit

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
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-3">
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
                  <p className="text-slate-300 mb-4">{position.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setValue('position', position.title)}
                    className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 bg-transparent"
                  >
                    Apply for this position
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto ultra-glass-light p-8 rounded-3xl shadow-2xl border border-emerald-400/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extralight text-white mb-4 tracking-[-0.02em]">Apply for a Position</h3>
            <p className="text-slate-300 font-light opacity-90">
              We'd love to hear from you! Fill out the form below to apply for any of our open positions.
            </p>
          </div>
          <div>
            <form 
              action="https://formsubmit.co/el/ruyeje" 
              method="POST" 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Job Application - Master Fees" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_autoresponse" value="Thank you for your job application! We have received your submission and will review it shortly. We'll get back to you within 2-3 business days." />
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-white font-medium">
                    <User className="w-4 h-4 text-emerald-400" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-white font-medium">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-white font-medium">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+260 XXX XXX XXX"
                    className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-400">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center gap-2 text-white font-medium">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    Position Applying For *
                  </Label>
                  <Select onValueChange={(value) => setValue('position', value)}>
                    <SelectTrigger className="bg-white/10 border-emerald-400/30 text-white focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm">
                      <SelectValue placeholder="Select a position" className="text-slate-400" />
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
                    <p className="text-sm text-red-400">{errors.position.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Experience Level *
                  </Label>
                  <Select onValueChange={(value) => setValue('experience', value)}>
                    <SelectTrigger className="bg-white/10 border-emerald-400/30 text-white focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm">
                      <SelectValue placeholder="Select experience level" className="text-slate-400" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="lead">Lead/Management (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-sm text-red-400">{errors.experience.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Availability *
                  </Label>
                  <Select onValueChange={(value) => setValue('availability', value)}>
                    <SelectTrigger className="bg-white/10 border-emerald-400/30 text-white focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm">
                      <SelectValue placeholder="When can you start?" className="text-slate-400" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="2weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1month">1 month notice</SelectItem>
                      <SelectItem value="3months">2-3 months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.availability && (
                    <p className="text-sm text-red-400">{errors.availability.message}</p>
                  )}
                </div>
              </div>

              {/* Instructions for Resume */}
              <div className="space-y-4 p-6 ultra-glass-dark rounded-2xl border border-emerald-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-400/20 rounded-full border border-emerald-400/30">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Resume/CV Instructions</h3>
                    <p className="text-sm text-slate-300">Please provide a link to your resume in the field below</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400">
                  Upload your resume to Google Drive, Dropbox, or another file sharing service and paste the shareable link in the Resume/CV Link field below.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="flex items-center gap-2 text-white font-medium">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  Education Background *
                </Label>
                <Input
                  id="education"
                  {...register("education")}
                  placeholder="e.g., Bachelor's in Computer Science, University of Zambia"
                  className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
                />
                {errors.education && (
                  <p className="text-sm text-red-400">{errors.education.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-white font-medium">
                  Relevant Skills & Technologies *
                </Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="List your relevant skills, programming languages, frameworks, tools, etc."
                  rows={3}
                  className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm resize-none"
                />
                {errors.skills && (
                  <p className="text-sm text-red-400">{errors.skills.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation" className="text-white font-medium">
                  Why do you want to join Master Fees? *
                </Label>
                <Textarea
                  id="motivation"
                  {...register("motivation")}
                  placeholder="Tell us about your motivation, what excites you about our mission, and how you can contribute to our team..."
                  rows={4}
                  className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm resize-none"
                />
                {errors.motivation && (
                  <p className="text-sm text-red-400">{errors.motivation.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2 text-white font-medium">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Resume/CV Link
                  </Label>
                  <Input
                    id="resume"
                    {...register("resume")}
                    placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="flex items-center gap-2 text-white font-medium">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    Portfolio/LinkedIn
                  </Label>
                  <Input
                    id="portfolio"
                    {...register("portfolio")}
                    placeholder="Link to your portfolio or LinkedIn profile"
                    className="bg-white/10 border-emerald-400/30 text-white placeholder-slate-400 focus:border-emerald-400 focus:bg-white/15 backdrop-blur-sm"
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
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-300 mb-4">
            Don't see a position that fits? We're always looking for talented individuals.
          </p>
          <p className="text-sm text-slate-400">
            Send us your resume at <a href="mailto:masterfees101@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">masterfees101@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}