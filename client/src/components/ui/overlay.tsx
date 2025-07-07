import { MatrixText } from './matrix-text';
import { useState, useEffect } from 'react';

export function Overlay() {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  useEffect(() => {
    // Listen for language changes from localStorage
    const checkLanguage = () => {
      const savedLang = localStorage.getItem('language') as 'en' | 'nl' || 'en';
      setLanguage(savedLang);
    };

    checkLanguage();
    window.addEventListener('storage', checkLanguage);
    
    // Custom event listener for language changes
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail);
    };
    window.addEventListener('languageChange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('storage', checkLanguage);
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const content = {
    en: {
      aiUseCases: [
        'to handle lead generation',
        'for scaling your business',
        'to cut costs by 60%',
        'to automate workflows',
        'for intelligent insights',
        'to boost productivity',
        'for customer service',
        'to optimize operations'
      ],
      description: 'We help organisations achieve their financial and operational goals by implementing agentic AI and automations. We create deep insights, understanding and autonomy for the future of business.',
      cta: 'Get ready for AI within 24 hrs'
    },
    nl: {
      aiUseCases: [
        'voor leadgeneratie',
        'om je bedrijf te schalen',
        'om kosten met 60% te verlagen',
        'voor het automatiseren van workflows',
        'voor intelligente inzichten',
        'om productiviteit te verhogen',
        'voor klantenservice',
        'om operaties te optimaliseren'
      ],
      description: 'Wij helpen organisaties hun financiële en operationele doelen te bereiken door het implementeren van agentische AI en automatiseringen. We creëren diepgaande inzichten, begrip en autonomie voor de toekomst van het bedrijfsleven.',
      cta: 'Klaar voor AI binnen 24 uur'
    }
  };

  return (
    <MatrixText 
      baseText="AI " 
      texts={content[language].aiUseCases}
      description={content[language].description}
      ctaText={content[language].cta}
    />
  );
}