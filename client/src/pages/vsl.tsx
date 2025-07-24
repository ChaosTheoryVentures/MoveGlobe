import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useContactForm } from "@/hooks/use-form-submission";
import { toast } from "sonner";
import { Play, CheckCircle, TrendingUp, Clock, Shield } from "lucide-react";

export default function VSL() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { submit, isLoading } = useContactForm();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submit({ 
        name: "VSL Lead",
        email: email,
        company: "",
        message: "VSL email capture - ready for application"
      });
      
      if (result.success) {
        // Store email in session storage for application form
        sessionStorage.setItem("vsl_email", email);
        navigate("/application");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
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
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Business with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#4746a4]">
                {" "}AI Automation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how companies like yours are using AI to increase revenue by 40%+ 
              while reducing operational costs and saving hours of manual work every day.
            </p>
          </div>

          {/* Video Section */}
          <div className="relative mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 mx-auto border border-white/20">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Watch: How AI Transformed These Businesses
                  </h3>
                  <p className="text-white/70">
                    Real case studies • 15 minutes • No fluff
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Capture Section */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to See How AI Can Transform Your Business?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Get instant access to our AI Transformation Blueprint and see exactly 
                  how businesses in your industry are scaling with AI.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting || isLoading}
                    className="flex-1 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? "Processing..." : "Get Instant Access"}
                  </Button>
                </div>
                <p className="text-sm text-center text-white/60 mt-4 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  100% secure. No spam. Unsubscribe anytime.
                </p>
              </form>

              {/* Social Proof */}
              <div className="text-center text-white/70">
                <p className="text-sm mb-2">Trusted by 500+ business owners</p>
                <div className="flex justify-center items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                  <span className="ml-2 text-sm">4.9/5 average rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: TrendingUp,
                title: "Increase Revenue by 40%+",
                description: "Our clients see an average revenue increase of 40% within 6 months of implementing AI automation."
              },
              {
                icon: Clock,
                title: "Save 20+ Hours Weekly",
                description: "Automate repetitive tasks and free up your team to focus on high-value strategic work."
              },
              {
                icon: CheckCircle,
                title: "Proven Implementation",
                description: "Step-by-step roadmap based on 200+ successful AI transformations across industries."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}