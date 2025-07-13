import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  MessageCircle, 
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  MessageSquare,
  Workflow,
  Database,
  FileText
} from 'lucide-react';

export default function Oplossingen() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen relative flex flex-col" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-1 pt-24 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('oplossingen.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8">
                {t('oplossingen.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>24hr setup</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>GDPR compliant</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span>60% cost reduction</span>
                </div>
              </div>
            </div>

            {/* Core Products Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t('oplossingen.products.title')}
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Customer Service Agent */}
                <div className="bg-gradient-to-br from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <MessageSquare className="w-16 h-16 text-[#4746a4] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t('oplossingen.agent1.title')}
                    </h3>
                    <p className="text-white/80">
                      {t('oplossingen.agent1.description')}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="whitespace-pre-line text-white/70 text-sm">
                      {t('oplossingen.agent1.features')}
                    </div>
                  </div>
                </div>

                {/* Operations Agent */}
                <div className="bg-gradient-to-br from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <Workflow className="w-16 h-16 text-[#4746a4] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t('oplossingen.agent2.title')}
                    </h3>
                    <p className="text-white/80">
                      {t('oplossingen.agent2.description')}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="whitespace-pre-line text-white/70 text-sm">
                      {t('oplossingen.agent2.features')}
                    </div>
                  </div>
                </div>

                {/* Centralized Data Hub */}
                <div className="bg-gradient-to-br from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <Database className="w-16 h-16 text-[#4746a4] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t('oplossingen.datahub.title')}
                    </h3>
                    <p className="text-white/80">
                      {t('oplossingen.datahub.description')}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="whitespace-pre-line text-white/70 text-sm">
                      {t('oplossingen.datahub.features')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Solutions Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="text-center mb-8">
                  <Zap className="w-16 h-16 text-[#4746a4] mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('oplossingen.custom.title')}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
                    {t('oplossingen.custom.subtitle')}
                  </h3>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                    {t('oplossingen.custom.description')}
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 mb-6">
                  <div className="whitespace-pre-line text-white/80">
                    {t('oplossingen.custom.capabilities')}
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting Service Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-green-400/20">
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                    {t('oplossingen.consulting.price')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('oplossingen.consulting.title')}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
                    {t('oplossingen.consulting.subtitle')}
                  </h3>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                    {t('oplossingen.consulting.description')}
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <h4 className="text-xl font-semibold text-white mb-6 text-center">
                    {t('oplossingen.consulting.includes')}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 rounded-xl p-6">
                      <FileText className="w-10 h-10 text-green-400 mb-3" />
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {t('oplossingen.consulting.discovery')}
                      </h5>
                      <p className="text-white/70 text-sm">
                        {t('oplossingen.consulting.discovery.desc')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6">
                      <Zap className="w-10 h-10 text-green-400 mb-3" />
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {t('oplossingen.consulting.advice')}
                      </h5>
                      <p className="text-white/70 text-sm">
                        {t('oplossingen.consulting.advice.desc')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6">
                      <Workflow className="w-10 h-10 text-green-400 mb-3" />
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {t('oplossingen.consulting.implementation')}
                      </h5>
                      <p className="text-white/70 text-sm">
                        {t('oplossingen.consulting.implementation.desc')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6">
                      <BarChart3 className="w-10 h-10 text-green-400 mb-3" />
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {t('oplossingen.consulting.roi')}
                      </h5>
                      <p className="text-white/70 text-sm">
                        {t('oplossingen.consulting.roi.desc')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6">
                      <Shield className="w-10 h-10 text-green-400 mb-3" />
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {t('oplossingen.consulting.readiness')}
                      </h5>
                      <p className="text-white/70 text-sm">
                        {t('oplossingen.consulting.readiness.desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <a 
                      href="/consult" 
                      className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
                    >
                      {t('oplossingen.consulting.cta')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Start with our €1,200 AI Readiness Assessment or explore our core products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consult" 
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Get AI Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg border border-white/20"
                >
                  Contact Us
                </a>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">€1,200</div>
                  <div className="text-white/70 text-sm">One-day assessment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">60%</div>
                  <div className="text-white/70 text-sm">Average cost reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">24hrs</div>
                  <div className="text-white/70 text-sm">Implementation time</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}