import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";
import { useLanguage } from "../contexts/LanguageContext";

export default function Sectoren() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen relative" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <Navbar />
        <div className="pt-24 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              {t('sectoren.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-center mb-12">
              {t('sectoren.subtitle')}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-4">{t('sectoren.financial.title')}</h3>
                <p className="text-white/80 mb-4">{t('sectoren.financial.description')}</p>
              </div>
            
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-4">{t('sectoren.healthcare.title')}</h3>
                <p className="text-white/80 mb-4">{t('sectoren.healthcare.description')}</p>
              </div>
            
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-4">{t('sectoren.retail.title')}</h3>
                <p className="text-white/80 mb-4">{t('sectoren.retail.description')}</p>
              </div>
            
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-4">{t('sectoren.manufacturing.title')}</h3>
                <p className="text-white/80 mb-4">{t('sectoren.manufacturing.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}