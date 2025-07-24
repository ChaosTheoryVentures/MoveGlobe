import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useContactForm } from "@/hooks/use-form-submission";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle, Building, DollarSign, Target, Users, Mail, Phone } from "lucide-react";

interface ApplicationData {
  // Step 1: Business Information
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  
  // Step 2: Financial Details
  annualRevenue: string;
  currentChallenges: string;
  
  // Step 3: Goals & AI Interest
  businessGoals: string;
  aiInterest: string;
  timeline: string;
  
  // Step 4: Contact Details
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
}

const REVENUE_THRESHOLD = 500000; // €500k

export default function Application() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { submit, isLoading } = useContactForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ApplicationData>({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    annualRevenue: "",
    currentChallenges: "",
    businessGoals: "",
    aiInterest: "",
    timeline: "",
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "email"
  });

  const steps = [
    { title: t('application.steps.step1', 'Business Info'), icon: Building },
    { title: t('application.steps.step2', 'Financials'), icon: DollarSign },
    { title: t('application.steps.step3', 'Goals & AI'), icon: Target },
    { title: t('application.steps.step4', 'Contact'), icon: Users }
  ];

  useEffect(() => {
    // Retrieve email from VSL page if available
    const vslEmail = sessionStorage.getItem("vsl_email");
    if (vslEmail) {
      setFormData(prev => ({ ...prev, email: vslEmail }));
      sessionStorage.removeItem("vsl_email");
    }
  }, []);

  const updateFormData = (field: keyof ApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.companyName && formData.industry && formData.companySize);
      case 1:
        return !!(formData.annualRevenue && formData.currentChallenges);
      case 2:
        return !!(formData.businessGoals && formData.aiInterest && formData.timeline);
      case 3:
        return !!(formData.fullName && formData.email && formData.phone && formData.preferredContact);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      toast.error(t('application.validation.required', 'Please fill in all required fields'));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) {
      toast.error(t('application.validation.required', 'Please fill in all required fields'));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submit({
        name: formData.fullName,
        email: formData.email,
        company: formData.companyName,
        message: `Application Form Submission:
Company: ${formData.companyName}
Industry: ${formData.industry}
Company Size: ${formData.companySize}
Website: ${formData.website}
Annual Revenue: ${formData.annualRevenue}
Current Challenges: ${formData.currentChallenges}
Business Goals: ${formData.businessGoals}
AI Interest: ${formData.aiInterest}
Timeline: ${formData.timeline}
Phone: ${formData.phone}
Preferred Contact: ${formData.preferredContact}`
      });
      
      if (result.success) {
        // Check qualification based on revenue
        const revenue = parseInt(formData.annualRevenue);
        const isQualified = revenue >= REVENUE_THRESHOLD;
        
        // Store qualification status
        sessionStorage.setItem("application_qualified", isQualified.toString());
        sessionStorage.setItem("application_data", JSON.stringify(formData));
        
        // Redirect based on qualification
        navigate(isQualified ? "/hto" : "/lto");
      } else {
        toast.error(t('application.errors.general', 'Something went wrong. Please try again.'));
      }
    } catch (error) {
      toast.error(t('application.errors.network', 'Network error. Please check your connection and try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Building className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t('application.step1.title', 'Tell us about your business')}</h3>
              <p className="text-white/70">{t('application.step1.subtitle', 'We need to understand your company to provide the best AI solutions')}</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-white font-medium text-lg">{t('application.step1.companyName', 'Company Name')} *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder={t('application.step1.companyNamePlaceholder', 'Enter your company name')}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="industry" className="text-white font-medium text-lg">{t('application.step1.industry', 'Industry')} *</Label>
                <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                  <SelectTrigger id="industry" className="h-14 text-lg bg-white/10 border-white/20 text-white focus:border-blue-400">
                    <SelectValue placeholder={t('application.step1.industryPlaceholder', 'Select your industry')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="technology">{t('application.step1.industries.technology', 'Technology')}</SelectItem>
                    <SelectItem value="retail">{t('application.step1.industries.retail', 'Retail')}</SelectItem>
                    <SelectItem value="manufacturing">{t('application.step1.industries.manufacturing', 'Manufacturing')}</SelectItem>
                    <SelectItem value="healthcare">{t('application.step1.industries.healthcare', 'Healthcare')}</SelectItem>
                    <SelectItem value="finance">{t('application.step1.industries.finance', 'Finance')}</SelectItem>
                    <SelectItem value="consulting">{t('application.step1.industries.consulting', 'Consulting')}</SelectItem>
                    <SelectItem value="ecommerce">{t('application.step1.industries.ecommerce', 'E-commerce')}</SelectItem>
                    <SelectItem value="other">{t('application.step1.industries.other', 'Other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="companySize" className="text-white font-medium text-lg">{t('application.step1.companySize', 'Company Size')} *</Label>
                <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                  <SelectTrigger id="companySize" className="h-14 text-lg bg-white/10 border-white/20 text-white focus:border-blue-400">
                    <SelectValue placeholder={t('application.step1.companySizePlaceholder', 'Select company size')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="1-10">{t('application.step1.sizes.small', '1-10 employees')}</SelectItem>
                    <SelectItem value="11-50">{t('application.step1.sizes.medium', '11-50 employees')}</SelectItem>
                    <SelectItem value="51-200">{t('application.step1.sizes.large', '51-200 employees')}</SelectItem>
                    <SelectItem value="201-500">{t('application.step1.sizes.xlarge', '201-500 employees')}</SelectItem>
                    <SelectItem value="500+">{t('application.step1.sizes.enterprise', '500+ employees')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="website" className="text-white font-medium text-lg">{t('application.step1.website', 'Website')} <span className="text-white/50">({t('application.step1.optional', 'Optional')})</span></Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder={t('application.step1.websitePlaceholder', 'https://www.example.com')}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t('application.step2.title', 'Financial Information')}</h3>
              <p className="text-white/70">{t('application.step2.subtitle', 'Help us understand your business scale and current challenges')}</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="annualRevenue" className="text-white font-medium text-lg">{t('application.step2.annualRevenue', 'Annual Revenue (EUR)')} *</Label>
                <Select value={formData.annualRevenue} onValueChange={(value) => updateFormData("annualRevenue", value)}>
                  <SelectTrigger id="annualRevenue" className="h-14 text-lg bg-white/10 border-white/20 text-white focus:border-blue-400">
                    <SelectValue placeholder={t('application.step2.annualRevenuePlaceholder', 'Select your annual revenue')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="0">{t('application.step2.revenues.under100k', 'Less than €100k')}</SelectItem>
                    <SelectItem value="100000">{t('application.step2.revenues.100k250k', '€100k - €250k')}</SelectItem>
                    <SelectItem value="250000">{t('application.step2.revenues.250k500k', '€250k - €500k')}</SelectItem>
                    <SelectItem value="500000">{t('application.step2.revenues.500k1m', '€500k - €1M')}</SelectItem>
                    <SelectItem value="1000000">{t('application.step2.revenues.1m5m', '€1M - €5M')}</SelectItem>
                    <SelectItem value="5000000">{t('application.step2.revenues.5m10m', '€5M - €10M')}</SelectItem>
                    <SelectItem value="10000000">{t('application.step2.revenues.over10m', 'More than €10M')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="currentChallenges" className="text-white font-medium text-lg">{t('application.step2.currentChallenges', 'Current Business Challenges')} *</Label>
                <Textarea
                  id="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={(e) => updateFormData("currentChallenges", e.target.value)}
                  placeholder={t('application.step2.challengesPlaceholder', 'Describe your main business challenges and pain points...')}
                  className="min-h-32 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t('application.step3.title', 'Goals & AI Interest')}</h3>
              <p className="text-white/70">{t('application.step3.subtitle', 'Tell us about your objectives and where AI can help')}</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="businessGoals" className="text-white font-medium text-lg">{t('application.step3.businessGoals', 'Business Goals')} *</Label>
                <Textarea
                  id="businessGoals"
                  value={formData.businessGoals}
                  onChange={(e) => updateFormData("businessGoals", e.target.value)}
                  placeholder={t('application.step3.businessGoalsPlaceholder', 'What are your main business goals for the next 12 months?')}
                  className="min-h-28 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="aiInterest" className="text-white font-medium text-lg">{t('application.step3.aiInterest', 'AI Interest Areas')} *</Label>
                <Textarea
                  id="aiInterest"
                  value={formData.aiInterest}
                  onChange={(e) => updateFormData("aiInterest", e.target.value)}
                  placeholder={t('application.step3.aiInterestPlaceholder', 'Which areas of your business would benefit most from AI automation?')}
                  className="min-h-28 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="timeline" className="text-white font-medium text-lg">{t('application.step3.timeline', 'Implementation Timeline')} *</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                  <SelectTrigger id="timeline" className="h-14 text-lg bg-white/10 border-white/20 text-white focus:border-blue-400">
                    <SelectValue placeholder={t('application.step3.timelinePlaceholder', 'When do you want to start?')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="immediate">{t('application.step3.timelines.immediate', 'Immediately')}</SelectItem>
                    <SelectItem value="1-3months">{t('application.step3.timelines.1to3months', '1-3 months')}</SelectItem>
                    <SelectItem value="3-6months">{t('application.step3.timelines.3to6months', '3-6 months')}</SelectItem>
                    <SelectItem value="6-12months">{t('application.step3.timelines.6to12months', '6-12 months')}</SelectItem>
                    <SelectItem value="12months+">{t('application.step3.timelines.over12months', '12+ months')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t('application.step4.title', 'Contact Information')}</h3>
              <p className="text-white/70">{t('application.step4.subtitle', 'Final step - how can we reach you?')}</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-white font-medium text-lg">{t('application.step4.fullName', 'Full Name')} *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder={t('application.step4.fullNamePlaceholder', 'Enter your full name')}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white font-medium text-lg">{t('application.step4.email', 'Email Address')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder={t('application.step4.emailPlaceholder', 'your@email.com')}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-white font-medium text-lg">{t('application.step4.phone', 'Phone Number')} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder={t('application.step4.phonePlaceholder', '+31 6 12345678')}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="preferredContact" className="text-white font-medium text-lg">{t('application.step4.preferredContact', 'Preferred Contact Method')} *</Label>
                <Select value={formData.preferredContact} onValueChange={(value) => updateFormData("preferredContact", value)}>
                  <SelectTrigger id="preferredContact" className="h-14 text-lg bg-white/10 border-white/20 text-white focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="email">{t('application.step4.contactMethods.email', 'Email')}</SelectItem>
                    <SelectItem value="phone">{t('application.step4.contactMethods.phone', 'Phone')}</SelectItem>
                    <SelectItem value="both">{t('application.step4.contactMethods.both', 'Both')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col"
      style={{ 
        background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
      }}
    >
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('application.title', 'AI Transformation ')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#4746a4]">
                  {" "}{t('application.titleHighlight', 'Application')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t('application.subtitle', 'Tell us about your business and discover how AI can transform your operations, increase revenue, and give you a competitive edge.')}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const StepIcon = step.icon;
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                          isActive || isCompleted
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                            : "bg-white/10 text-white/50 border border-white/20"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <StepIcon className="w-8 h-8" />
                        )}
                      </div>
                      <span 
                        className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Progress Bar */}
              <div className="max-w-2xl mx-auto mt-8">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-white/60">
                  <span>{t('application.progress.step', 'Step')} {currentStep + 1} {t('application.progress.of', 'of')} {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% {t('application.progress.complete', 'Complete')}</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
              {renderStepContent()}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-50 h-14 px-8 text-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {t('application.navigation.previous', 'Previous')}
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
                >
                  {t('application.navigation.continue', 'Continue')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || isLoading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 h-14 px-8 text-lg font-semibold"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      {t('application.navigation.submitting', 'Submitting...')}
                    </>
                  ) : (
                    <>
                      {t('application.navigation.submit', 'Submit Application')}
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}