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
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
          
          {/* Left Section: Logo + Rights */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 order-2 lg:order-1">
            <a href="/">
              <img 
                src="/logo.svg" 
                alt="MOVE Logo" 
                className="h-6 sm:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </a>
            <span className="text-white/60 text-xs sm:text-sm whitespace-nowrap">
              © 2025 MOVE - {currentContent.rights}
            </span>
          </div>

          {/* Center Section: Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 order-1 lg:order-2">
            <span className="text-white/60 text-xs sm:text-sm">
              {currentContent.privacyNotice}
            </span>
            <span className="text-white/40">•</span>
            <a 
              href="/privacy" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.privacy}
            </a>
            <span className="text-white/40">•</span>
            <a 
              href="/voorwaarden" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.terms}
            </a>
          </nav>

          {/* Right Section: Language + Contact Button */}
          <div className="flex items-center space-x-3 order-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <span className="text-white text-xs sm:text-sm">
                {language === 'en' ? '🇺🇸' : '🇳🇱'}
              </span>
            </button>
            
            {/* Contact Button */}
            <a 
              href="/contact"
              className="bg-[#4746a4] hover:bg-[#4746a4]/80 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              {currentContent.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}