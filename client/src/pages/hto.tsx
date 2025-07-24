import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { CheckCircle, Calendar, Phone, Clock, Star } from "lucide-react";

export default function HTO() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    // Check if user is qualified
    const qualified = sessionStorage.getItem("application_qualified");
    if (qualified !== "true") {
      navigate("/");
      return;
    }

    // Get application data
    const data = sessionStorage.getItem("application_data");
    if (data) {
      setApplicationData(JSON.parse(data));
    }
  }, [navigate]);

  const benefits = [
    {
      icon: CheckCircle,
      title: t('hto.benefits.benefit1.title', 'Personalized AI Strategy'),
      description: t('hto.benefits.benefit1.description', 'Custom roadmap designed for your business')
    },
    {
      icon: CheckCircle,
      title: t('hto.benefits.benefit2.title', 'ROI Analysis'),
      description: t('hto.benefits.benefit2.description', 'Clear projections on AI investment returns')
    },
    {
      icon: CheckCircle,
      title: t('hto.benefits.benefit3.title', 'Implementation Plan'),
      description: t('hto.benefits.benefit3.description', 'Step-by-step guide to AI transformation')
    },
    {
      icon: CheckCircle,
      title: t('hto.benefits.benefit4.title', 'Expert Guidance'),
      description: t('hto.benefits.benefit4.description', 'Direct access to AI consultants')
    }
  ];

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
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('hto.title', 'Congratulations! You Qualify for Our Premium AI Transformation Program')}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {applicationData?.fullName && 
                t('hto.greeting', `Thank you, ${applicationData.fullName}. Based on your application, your business is perfectly positioned for AI transformation.`)}
            </p>
          </div>

          {/* Next Steps Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">
                  {t('hto.nextSteps', 'Schedule Your Strategy Call')}
                </h2>
              </div>
              <p className="text-xl text-white/80">
                {t('hto.strategyCallDesc', 'Book a 45-minute call with our AI transformation experts')}
              </p>
            </div>

            {/* Calendly Embed Container */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center mb-8">
              <Clock className="w-16 h-16 mx-auto mb-6 text-white/60" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {t('hto.booking.title', 'AI Strategy Call Booking')}
              </h3>
              <p className="text-white/70 mb-6">
                {t('hto.booking.placeholder', 'Calendly booking widget will be embedded here')}
              </p>
              {/* Replace with actual Calendly embed code */}
              <div 
                className="calendly-inline-widget bg-white/5 rounded-lg" 
                data-url="https://calendly.com/your-calendar-link"
                style={{ minWidth: "320px", height: "630px" }}
              />
            </div>

            {/* Alternative Booking Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('hto.contact.callNow', 'Call Now: +31 20 123 4567')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                onClick={() => window.open("mailto:strategy@moveglobe.com")}
              >
                {t('hto.contact.emailUs', 'Email: strategy@moveglobe.com')}
              </Button>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {t('hto.benefits.title', 'What You\'ll Get From Your Strategy Call')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-xl font-semibold text-white mb-2">
              {t('hto.urgency.message', 'Limited spots available this week. Book your call now to secure your AI transformation journey.')}
            </p>
            <p className="text-white/70">
              {t('hto.urgency.socialProof', 'Join 200+ businesses that have already transformed with AI')}
            </p>
          </div>
        </div>
        </main>

        <Footer />
      </div>

    </div>
  );
}