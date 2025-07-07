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
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs space-y-2 md:space-y-0">
          
          {/* Top Row (Mobile) / Left Side (Desktop): Logo + Copyright + Links */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-white/50">
            <div className="flex items-center space-x-2">
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
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-white/30 hidden sm:inline">•</span>
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
          </div>

          {/* Bottom Row (Mobile) / Right Side (Desktop): Language + Contact */}
          <div className="flex items-center justify-center md:justify-end space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <span className="text-white/60 text-xs">
                {language === 'en' ? '🇺🇸' : '🇳🇱'}
              </span>
            </button>
            
            {/* Contact Button */}
            <a 
              href="/contact"
              className="bg-[#4746a4]/80 hover:bg-[#4746a4] text-white px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap"
            >
              {currentContent.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}