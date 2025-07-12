import { Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4 text-white/50">
            <a href="/" className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="MOVE Logo" 
                className="h-5 w-auto opacity-60 hover:opacity-80 transition-opacity"
              />
            </a>
            <span className="whitespace-nowrap">
              © 2025 MOVE - {t('footer.rights')}
            </span>
            <span className="text-white/30">•</span>
            <a 
              href="/privacy" 
              className="hover:text-white/70 transition-colors whitespace-nowrap"
            >
              {t('footer.privacy')}
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="/voorwaarden" 
              className="hover:text-white/70 transition-colors whitespace-nowrap"
            >
              {t('footer.terms')}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            {/* Social Media Icons */}
            <a 
              href="https://www.linkedin.com/in/erik-wessels/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/workwithmove.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <span className="text-white/30">|</span>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <span className="text-white/60 text-xs">
                {language === 'en' ? '🇺🇸' : '🇳🇱'}
              </span>
            </button>
            
            <a 
              href="/contact"
              className="bg-[#4746a4]/80 hover:bg-[#4746a4] text-white px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap"
            >
              {t('footer.contact')}
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Logo + Copyright */}
          <div className="flex items-center justify-center space-x-2">
            <a href="/" className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="MOVE Logo" 
                className="h-5 w-auto opacity-60 hover:opacity-80 transition-opacity"
              />
            </a>
            <span className="text-white/50 text-xs whitespace-nowrap">
              © 2025 MOVE - {t('footer.rights')}
            </span>
          </div>

          {/* Middle Row: Links */}
          <div className="flex items-center justify-center space-x-3 text-xs text-white/50">
            <a 
              href="/privacy" 
              className="hover:text-white/70 transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="/voorwaarden" 
              className="hover:text-white/70 transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>

          {/* Bottom Row: Social + Language + Contact */}
          <div className="flex items-center justify-center space-x-3">
            {/* Social Media Icons */}
            <a 
              href="https://linkedin.com/company/move-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/moveai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <span className="text-white/30">|</span>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <span className="text-white/60 text-xs">
                {language === 'en' ? '🇺🇸' : '🇳🇱'}
              </span>
            </button>
            
            <a 
              href="/contact"
              className="bg-[#4746a4]/80 hover:bg-[#4746a4] text-white px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}