import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";

export default function Kennisbank() {
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
        <div className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('kennisbank.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {t('kennisbank.subtitle')}
              </p>
            </div>

            {/* Embedded Notion Page */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <iframe 
                src="https://changeable-binder-4b6.notion.site/ebd/211d106da599800ea50bc4f311be8ab9" 
                width="100%" 
                height="800"
                frameBorder="0" 
                allowFullScreen
                title="MOVE AI Kennisbank"
                className="w-full min-h-[600px] md:min-h-[800px] lg:min-h-[900px]"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}