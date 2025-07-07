import { useState } from 'react';

export function Footer() {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'nl' : 'en');
  };

  const content = {
    en: {
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      cases: 'Cases',
      industries: 'Industries',
      solutions: 'Solutions',
      consult: 'Consult',
      language: 'Nederlands'
    },
    nl: {
      privacy: 'Privacybeleid',
      terms: 'Algemene Voorwaarden',
      cases: 'Cases',
      industries: 'Sectoren',
      solutions: 'Oplossingen',
      consult: 'Consult',
      language: 'English'
    }
  };

  const currentContent = content[language];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          {/* Company Logo */}
          <div className="flex items-center order-2 md:order-1">
            <img 
              src="/logo.svg" 
              alt="MOVE Logo" 
              className="h-6 sm:h-8 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 order-1 md:order-2">
            <a 
              href="#privacy" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.privacy}
            </a>
            <a 
              href="#terms" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.terms}
            </a>
            <a 
              href="#cases" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.cases}
            </a>
            <a 
              href="#industries" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.industries}
            </a>
            <a 
              href="#solutions" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.solutions}
            </a>
            <a 
              href="#consult" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            >
              {currentContent.consult}
            </a>
          </nav>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 order-3"
          >
            <span className="text-white text-xs sm:text-sm">
              {language === 'en' ? 'Language:' : 'Taal:'}
            </span>
            <span className="text-white text-sm">
              {language === 'en' ? '🇺🇸' : '🇳🇱'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}