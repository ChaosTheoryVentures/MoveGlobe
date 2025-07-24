import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stepper, StepperContent, StepperActions } from "@/components/ui/stepper";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useApplicationForm } from "@/hooks/use-form-submission";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const { submit, isLoading } = useApplicationForm();
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
    t("step1", "Business Information"),
    t("step2", "Financial Details"),
    t("step3", "Goals & AI Interest"),
    t("step4", "Contact Details")
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
      toast.error(t("fillAllFields", "Please fill in all required fields"));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) {
      toast.error(t("fillAllFields", "Please fill in all required fields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submit(formData);
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
        toast.error(result.error || t("submitError", "Failed to submit application"));
      }
    } catch (error) {
      toast.error(t("submitError", "An error occurred. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white/80">{t("companyName", "Company Name")} *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                placeholder={t("companyNamePlaceholder", "Enter your company name")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-white/80">{t("industry", "Industry")} *</Label>
              <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder={t("selectIndustry", "Select your industry")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companySize" className="text-white/80">{t("companySize", "Company Size")} *</Label>
              <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder={t("selectCompanySize", "Select company size")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white/80">{t("website", "Website")} ({t("optional", "Optional")})</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://www.example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
              />
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annualRevenue" className="text-white/80">{t("annualRevenue", "Annual Revenue (EUR)")} *</Label>
              <Select value={formData.annualRevenue} onValueChange={(value) => updateFormData("annualRevenue", value)}>
                <SelectTrigger id="annualRevenue">
                  <SelectValue placeholder={t("selectRevenue", "Select annual revenue")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Less than €100k</SelectItem>
                  <SelectItem value="100000">€100k - €250k</SelectItem>
                  <SelectItem value="250000">€250k - €500k</SelectItem>
                  <SelectItem value="500000">€500k - €1M</SelectItem>
                  <SelectItem value="1000000">€1M - €5M</SelectItem>
                  <SelectItem value="5000000">€5M - €10M</SelectItem>
                  <SelectItem value="10000000">More than €10M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentChallenges" className="text-white/80">{t("currentChallenges", "Current Business Challenges")} *</Label>
              <Textarea
                id="currentChallenges"
                value={formData.currentChallenges}
                onChange={(e) => updateFormData("currentChallenges", e.target.value)}
                placeholder={t("challengesPlaceholder", "Describe your main business challenges...")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 resize-none"
                rows={4}
                required
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessGoals" className="text-white/80">{t("businessGoals", "Business Goals")} *</Label>
              <Textarea
                id="businessGoals"
                value={formData.businessGoals}
                onChange={(e) => updateFormData("businessGoals", e.target.value)}
                placeholder={t("goalsPlaceholder", "What are your main business goals for the next 12 months?")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 resize-none"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aiInterest" className="text-white/80">{t("aiInterest", "AI Interest Areas")} *</Label>
              <Textarea
                id="aiInterest"
                value={formData.aiInterest}
                onChange={(e) => updateFormData("aiInterest", e.target.value)}
                placeholder={t("aiInterestPlaceholder", "Which areas of your business would benefit most from AI?")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 resize-none"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-white/80">{t("timeline", "Implementation Timeline")} *</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                <SelectTrigger id="timeline">
                  <SelectValue placeholder={t("selectTimeline", "When do you want to start?")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="12months+">12+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/80">{t("fullName", "Full Name")} *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder={t("fullNamePlaceholder", "Enter your full name")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">{t("email", "Email")} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder={t("emailPlaceholder", "your@email.com")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/80">{t("phone", "Phone Number")} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder={t("phonePlaceholder", "+31 6 12345678")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferredContact" className="text-white/80">{t("preferredContact", "Preferred Contact Method")} *</Label>
              <Select value={formData.preferredContact} onValueChange={(value) => updateFormData("preferredContact", value)}>
                <SelectTrigger id="preferredContact">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("applicationTitle", "AI Transformation Application")}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t("applicationDescription", "Tell us about your business and discover how AI can help you grow")}
              </p>
            </div>

            {/* Application Form */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <Stepper steps={steps} currentStep={currentStep} className="mb-12" />
              
              <StepperContent>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  {renderStepContent()}
                </div>
              </StepperContent>
              
              <StepperActions className="mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("previous", "Previous")}
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t("next", "Next")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting || isLoading 
                      ? t("submitting", "Submitting...") 
                      : t("submit", "Submit Application")}
                  </Button>
                )}
              </StepperActions>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}