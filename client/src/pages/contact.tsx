import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

export default function Contact() {
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              {t('contact.title')}
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">{t('contact.getInTouch')}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.email')}</h3>
                    <a href="mailto:info@workwithmove.com" className="text-[#4746a4] hover:text-white transition-colors">
                      info@workwithmove.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.phone')}</h3>
                    <a href="tel:+31617858386" className="text-[#4746a4] hover:text-white transition-colors">
                      +31 6 1785 8386
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.address')}</h3>
                    <p className="text-white/80">
                      Science Park 904<br/>
                      1098 XH Amsterdam<br/>
                      Netherlands
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.businessHours')}</h3>
                    <p className="text-white/80" style={{ whiteSpace: 'pre-line' }}>
                      {t('contact.businessHoursText')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.followUs')}</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.linkedin.com/in/erik-wessels" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#4746a4] hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                      <a 
                        href="https://www.instagram.com/workwithmove.ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#4746a4] hover:text-white transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">{t('contact.sendMessage')}</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.name')}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.email')}</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.company')}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.message')}</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {t('contact.sendButton')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}