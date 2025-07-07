import { useState, useEffect } from 'react';

export function Footer() {
  const [language, setLanguage] = useState<'en' | 'nl'>(() => {
    return localStorage.getItem('language') as 'en' | 'nl' || 'en';
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'nl' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail);
    };
    window.addEventListener('languageChange' as any, handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const content = {
    en: {
      rights: 'All rights reserved',
      privacyNotice: 'Privacy Notice',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      contact: 'Contact',
      language: 'Nederlands'
    },
    nl: {
      rights: 'Alle rechten voorbehouden',
      privacyNotice: 'Privacyverklaring',
      privacy: 'Privacybeleid',
      terms: 'Voorwaarden',
      contact: 'Contact',
      language: 'English'
    }
  };

  const currentContent = content[language];

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
              © 2025 MOVE - {currentContent.rights}
            </span>
            <span className="text-white/30">•</span>
            <a 
              href="/privacy" 
              className="hover:text-white/70 transition-colors whitespace-nowrap"
            >
              {currentContent.privacy}
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="/voorwaarden" 
              className="hover:text-white/70 transition-colors whitespace-nowrap"
            >
              {currentContent.terms}
            </a>
          </div>

          <div className="flex items-center space-x-3">
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
              {currentContent.contact}
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
              © 2025 MOVE - {currentContent.rights}
            </span>
          </div>

          {/* Middle Row: Links */}
          <div className="flex items-center justify-center space-x-3 text-xs text-white/50">
            <a 
              href="/privacy" 
              className="hover:text-white/70 transition-colors"
            >
              {currentContent.privacy}
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="/voorwaarden" 
              className="hover:text-white/70 transition-colors"
            >
              {currentContent.terms}
            </a>
          </div>

          {/* Bottom Row: Language + Contact */}
          <div className="flex items-center justify-center space-x-3">
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
              {currentContent.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}