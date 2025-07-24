import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { Check, Zap, TrendingUp, Users, BookOpen, Rocket, Star } from "lucide-react";
import { toast } from "sonner";

export default function LTO() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if user came from application
    const qualified = sessionStorage.getItem("application_qualified");
    if (qualified !== "false") {
      navigate("/");
      return;
    }

    // Get application data
    const data = sessionStorage.getItem("application_data");
    if (data) {
      setApplicationData(JSON.parse(data));
    }
  }, [navigate]);

  const handlePurchase = async (tier: string) => {
    setIsProcessing(true);
    // Simulate purchase process
    toast.success(t('lto.purchaseInitiated', `Purchase initiated for ${tier} package`));
    
    // In real implementation, integrate with payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to payment gateway or checkout
    }, 1000);
  };

  const packages = [
    {
      id: "starter",
      name: t('lto.packages.starter.name', 'AI Starter Kit'),
      price: "€497",
      originalPrice: "€997",
      discount: "50% OFF",
      description: t('lto.packages.starter.description', 'Perfect for businesses ready to start their AI journey'),
      features: [
        t('lto.packages.starter.features.feature1', 'AI Readiness Assessment'),
        t('lto.packages.starter.features.feature2', '3 AI Tool Recommendations'),
        t('lto.packages.starter.features.feature3', 'Implementation Checklist'),
        t('lto.packages.starter.features.feature4', '30-min Strategy Call'),
        t('lto.packages.starter.features.feature5', 'Email Support (30 days)')
      ],
      icon: Rocket,
      popular: false
    },
    {
      id: "growth",
      name: t('lto.packages.growth.name', 'AI Growth Accelerator'),
      price: "€997",
      originalPrice: "€1,997",
      discount: "50% OFF",
      description: t('lto.packages.growth.description', 'For businesses serious about AI transformation'),
      features: [
        t('lto.packages.growth.features.feature1', 'Everything in Starter Kit'),
        t('lto.packages.growth.features.feature2', 'Custom AI Roadmap'),
        t('lto.packages.growth.features.feature3', '5 AI Tool Implementations'),
        t('lto.packages.growth.features.feature4', 'Weekly Progress Calls (4 weeks)'),
        t('lto.packages.growth.features.feature5', 'Slack Support (60 days)'),
        t('lto.packages.growth.features.feature6', 'ROI Tracking Dashboard')
      ],
      icon: TrendingUp,
      popular: true
    },
    {
      id: "workshop",
      name: t('lto.packages.workshop.name', 'AI Workshop Series'),
      price: "€297",
      description: t('lto.packages.workshop.description', 'Group learning experience with other businesses'),
      features: [
        t('lto.packages.workshop.features.feature1', '4-Week Online Workshop'),
        t('lto.packages.workshop.features.feature2', 'Live Q&A Sessions'),
        t('lto.packages.workshop.features.feature3', 'AI Templates & Frameworks'),
        t('lto.packages.workshop.features.feature4', 'Community Access'),
        t('lto.packages.workshop.features.feature5', 'Recording Access (Lifetime)')
      ],
      icon: Users,
      popular: false
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <Badge 
                variant="secondary" 
                className="text-lg px-6 py-3 mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300"
              >
                {t('lto.badge', 'Exclusive Offer for Growing Businesses')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('lto.title', 'Start Your AI Journey Today')}
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                {applicationData?.fullName && 
                  t('lto.greeting', `${applicationData.fullName}, while you're building towards our premium program, these packages will help you get started with AI immediately.`)}
              </p>
            </div>

            {/* Package Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 ${
                    pkg.popular ? "ring-2 ring-gradient-to-r from-blue-400 to-cyan-400 scale-105" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-sm font-semibold">
                        {t('lto.packages.mostPopular', 'MOST POPULAR')}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center">
                      <pkg.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    {pkg.discount && (
                      <Badge variant="destructive" className="bg-red-500/20 border border-red-400/30 text-red-300">
                        {pkg.discount}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                  <p className="text-white/70 mb-6">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-xl text-white/50 line-through">
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full text-lg font-semibold py-6 ${
                      pkg.popular 
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none shadow-lg hover:shadow-xl"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                    } transition-all duration-300`}
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing 
                      ? t('lto.packages.processing', 'Processing...') 
                      : t('lto.packages.getStarted', 'Get Started Now')}
                  </Button>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                {t('lto.testimonials.title', 'Success Stories from Our Clients')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah M.",
                    company: "Tech Startup",
                    text: t('lto.testimonials.testimonial1', 'The AI Starter Kit gave us the clarity we needed. We implemented 3 tools and saved 20 hours per week!')
                  },
                  {
                    name: "Jan K.",
                    company: "E-commerce",
                    text: t('lto.testimonials.testimonial2', 'The Growth Accelerator transformed our business. Our revenue increased by 35% in just 3 months.')
                  },
                  {
                    name: "Lisa P.",
                    company: "Consulting Firm",
                    text: t('lto.testimonials.testimonial3', 'The workshop series was incredible. I learned so much and connected with other business owners.')
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/80 italic mb-4">"{testimonial.text}"</p>
                    <p className="text-white font-semibold">
                      {testimonial.name} - {testimonial.company}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Section */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 md:p-12 text-center mb-16">
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                {t('lto.bonus.title', 'Special Bonus: Act Now!')}
              </h3>
              <p className="text-xl text-white/80 mb-6">
                {t('lto.bonus.description', 'Purchase any package today and get our AI Prompt Library (€197 value) absolutely FREE!')}
              </p>
              <Badge 
                variant="secondary" 
                className="text-lg px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300"
              >
                {t('lto.bonus.limitedTime', 'Limited Time Offer - Expires in 48 Hours')}
              </Badge>
            </div>

            {/* FAQ Link */}
            <div className="text-center">
              <Button 
                variant="link" 
                size="lg" 
                className="text-lg text-white/80 hover:text-white"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                {t('lto.faq.text', 'Have questions? Check our FAQ')}
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}