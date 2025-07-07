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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Company Name */}
          <div className="text-white font-bold text-xl">
            MOVE
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center space-x-6 sm:space-x-8">
            <a 
              href="#privacy" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.privacy}
            </a>
            <a 
              href="#terms" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.terms}
            </a>
            <a 
              href="#cases" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.cases}
            </a>
            <a 
              href="#industries" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.industries}
            </a>
            <a 
              href="#solutions" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.solutions}
            </a>
            <a 
              href="#consult" 
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {currentContent.consult}
            </a>
          </nav>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <span className="text-white text-sm">
              {language === 'en' ? '🇺🇸' : '🇳🇱'}
            </span>
            <span className="text-white text-sm">
              {currentContent.language}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}