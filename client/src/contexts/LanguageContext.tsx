import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  // Navigation
  'nav.sectoren': { en: 'Industries', nl: 'Sectoren' },
  'nav.oplossingen': { en: 'AI Agents', nl: 'Oplossingen' },
  'nav.aiConsult': { en: 'AI Analyse', nl: 'AI Analyse' },
  'nav.contact': { en: 'Contact', nl: 'Contact' },

  // Footer
  'footer.rights': { en: 'All rights reserved', nl: 'Alle rechten voorbehouden' },
  'footer.privacy': { en: 'Privacy Policy', nl: 'Privacybeleid' },
  'footer.terms': { en: 'Terms', nl: 'Voorwaarden' },
  'footer.contact': { en: 'Contact', nl: 'Contact' },

  // Home page
  'home.aiUseCases.leadGeneration': { en: 'to handle lead generation', nl: 'voor leadgeneratie' },
  'home.aiUseCases.scaling': { en: 'for scaling your business', nl: 'om je bedrijf te schalen' },
  'home.aiUseCases.costReduction': { en: 'to cut costs by 60%', nl: 'om kosten met 60% te verlagen' },
  'home.aiUseCases.automation': { en: 'to automate workflows', nl: 'voor het automatiseren van workflows' },
  'home.aiUseCases.insights': { en: 'for intelligent insights', nl: 'voor intelligente inzichten' },
  'home.aiUseCases.productivity': { en: 'to boost productivity', nl: 'om productiviteit te verhogen' },
  'home.aiUseCases.customerService': { en: 'for customer service', nl: 'voor klantenservice' },
  'home.aiUseCases.optimization': { en: 'to optimize operations', nl: 'om operaties te optimaliseren' },
  'home.description': {
    en: 'We help organisations achieve their financial and operational goals by implementing agentic AI and automations. We create deep insights, efficiency and autonomy for the future of business.',
    nl: 'Wij helpen organisaties hun financiële en operationele doelen te bereiken door het implementeren van AI agents en automatiseringen. We creëren diepgaande inzichten, efficiëntie en autonomie voor de toekomst van het bedrijven.'
  },
  'home.cta': { en: 'Get ready for AI within 24 hrs', nl: 'Klaar voor AI binnen 24 uur' },

  // Contact page
  'contact.title': { en: 'Contact', nl: 'Contact' },
  'contact.getInTouch': { en: 'Get in Touch', nl: 'Neem Contact Op' },
  'contact.email': { en: 'Email', nl: 'Email' },
  'contact.phone': { en: 'Phone', nl: 'Telefoon' },
  'contact.address': { en: 'Address', nl: 'Adres' },
  'contact.businessHours': { en: 'Business Hours', nl: 'Openingstijden' },
  'contact.businessHoursText': {
    en: 'Monday - Friday: 9:00 - 18:00\nWeekend: By appointment',
    nl: 'Maandag - Vrijdag: 9:00 - 18:00\nWeekend: Op afspraak'
  },
  'contact.followUs': { en: 'Follow Us', nl: 'Volg Ons' },
  'contact.sendMessage': { en: 'Send Message', nl: 'Bericht Versturen' },
  'contact.name': { en: 'Name', nl: 'Naam' },
  'contact.company': { en: 'Company', nl: 'Bedrijf' },
  'contact.message': { en: 'Message', nl: 'Bericht' },
  'contact.namePlaceholder': { en: 'Your name', nl: 'Uw naam' },
  'contact.emailPlaceholder': { en: 'your@email.com', nl: 'uw@email.nl' },
  'contact.companyPlaceholder': { en: 'Your company', nl: 'Uw bedrijf' },
  'contact.messagePlaceholder': { en: 'Tell us about your project...', nl: 'Vertel ons over uw project...' },
  'contact.sendButton': { en: 'Send Message', nl: 'Bericht Versturen' },

  // Consult page
  'consult.title': { en: 'AI-Ready in 24 Hours', nl: 'AI-Ready in 24 Uur' },
  'consult.subtitle': {
    en: 'Discover how AI can transform your business with our free AI-readiness assessment',
    nl: 'Ontdek hoe AI uw bedrijf kan transformeren met onze gratis AI-readiness assessment'
  },
  'consult.whatYouGet': { en: 'What You Get', nl: 'Wat krijgt u?' },
  'consult.aiAssessment': { en: 'AI Readiness Assessment', nl: 'AI Readiness Assessment' },
  'consult.aiAssessmentDesc': {
    en: 'Complete analysis of your current processes and AI opportunities',
    nl: 'Complete analyse van uw huidige processen en AI-mogelijkheden'
  },
  'consult.roiCalculation': { en: 'ROI Calculation', nl: 'ROI Berekening' },
  'consult.roiCalculationDesc': {
    en: 'Concrete figures on potential cost savings and efficiency gains',
    nl: 'Concrete cijfers over potentiële kostenbesparingen en efficiëntiewinst'
  },
  'consult.roadmap': { en: 'Implementation Roadmap', nl: 'Implementatie Roadmap' },
  'consult.roadmapDesc': {
    en: 'Step-by-step plan for successful AI integration',
    nl: 'Stap-voor-stap plan voor succesvolle AI-integratie'
  },
  'consult.quickWins': { en: 'Quick Wins Identification', nl: 'Quick Wins Identificatie' },
  'consult.quickWinsDesc': {
    en: 'Directly implementable solutions for fast results',
    nl: 'Direct implementeerbare oplossingen voor snelle resultaten'
  },
  'consult.whyMove': { en: 'Why MOVE?', nl: 'Waarom MOVE?' },
  'consult.24hours': { en: '24 Hours', nl: '24 Uur' },
  'consult.24hoursDesc': { en: 'From intake to complete report', nl: 'Van intake tot volledig rapport' },
  'consult.60savings': { en: '60% Savings', nl: '60% Besparing' },
  'consult.60savingsDesc': { en: 'Average cost reduction', nl: 'Gemiddelde kostenbesparing' },
  'consult.secure': { en: '100% Secure', nl: '100% Veilig' },
  'consult.secureDesc': { en: 'GDPR-compliant & secure', nl: 'GDPR-compliant & beveiligd' },
  'consult.free': { en: 'Free', nl: 'Gratis' },
  'consult.freeDesc': { en: 'No costs, no obligations', nl: 'Geen kosten, geen verplichtingen' },

  // Consult form
  'consult.form.title': { en: 'Start Your AI Transformation', nl: 'Start uw AI-transformatie' },
  'consult.form.companyName': { en: 'Company Name *', nl: 'Bedrijfsnaam *' },
  'consult.form.contactPerson': { en: 'Contact Person *', nl: 'Contactpersoon *' },
  'consult.form.email': { en: 'Email *', nl: 'Email *' },
  'consult.form.phone': { en: 'Phone', nl: 'Telefoon' },
  'consult.form.employees': { en: 'Number of Employees', nl: 'Aantal medewerkers' },
  'consult.form.sector': { en: 'Sector', nl: 'Sector' },
  'consult.form.challenges': { en: 'Biggest Challenges', nl: 'Grootste uitdagingen' },
  'consult.form.budget': { en: 'Budget Indication', nl: 'Budget indicatie' },
  'consult.form.timeline': { en: 'Desired Start Date', nl: 'Gewenste startdatum' },
  'consult.form.companyPlaceholder': { en: 'Your company', nl: 'Uw bedrijf' },
  'consult.form.namePlaceholder': { en: 'Your name', nl: 'Uw naam' },
  'consult.form.emailPlaceholder': { en: 'email@company.com', nl: 'email@bedrijf.nl' },
  'consult.form.phonePlaceholder': { en: '+31 6 12345678', nl: '+31 6 12345678' },
  'consult.form.challengesPlaceholder': {
    en: 'Which processes cost you the most time or money?',
    nl: 'Welke processen kosten u het meeste tijd of geld?'
  },
  'consult.form.select': { en: 'Select', nl: 'Selecteer' },
  'consult.form.employees.1-10': { en: '1-10', nl: '1-10' },
  'consult.form.employees.11-50': { en: '11-50', nl: '11-50' },
  'consult.form.employees.51-200': { en: '51-200', nl: '51-200' },
  'consult.form.employees.201-500': { en: '201-500', nl: '201-500' },
  'consult.form.employees.500+': { en: '500+', nl: '500+' },
  'consult.form.budget.<10k': { en: 'Less than €10,000', nl: 'Minder dan €10.000' },
  'consult.form.budget.10-50k': { en: '€10,000 - €50,000', nl: '€10.000 - €50.000' },
  'consult.form.budget.50-100k': { en: '€50,000 - €100,000', nl: '€50.000 - €100.000' },
  'consult.form.budget.100k+': { en: 'More than €100,000', nl: 'Meer dan €100.000' },
  'consult.form.budget.unsure': { en: 'Not yet determined', nl: 'Nog niet bepaald' },
  'consult.form.timeline.asap': { en: 'As soon as possible', nl: 'Zo snel mogelijk' },
  'consult.form.timeline.1month': { en: 'Within 1 month', nl: 'Binnen 1 maand' },
  'consult.form.timeline.3months': { en: 'Within 3 months', nl: 'Binnen 3 maanden' },
  'consult.form.timeline.6months': { en: 'Within 6 months', nl: 'Binnen 6 maanden' },
  'consult.form.timeline.exploring': { en: 'Still exploring', nl: 'Nog aan het verkennen' },
  'consult.form.submit': { en: 'Get Free AI Assessment', nl: 'Ontvang Gratis AI Assessment' },
  'consult.form.disclaimer': {
    en: 'Within 24 hours you will receive your personal AI-readiness report',
    nl: 'Binnen 24 uur ontvangt u uw persoonlijke AI-readiness rapport'
  },
  'consult.trust.text': { en: 'Trusted by leading companies', nl: 'Vertrouwd door toonaangevende bedrijven' },
  'consult.trust.implementations': { en: 'Successful implementations', nl: 'Succesvolle implementaties' },



  // Oplossingen page
  'oplossingen.title': { en: 'AI Solutions', nl: 'AI Oplossingen' },
  'oplossingen.subtitle': {
    en: 'Transform your business with intelligent AI agents and centralized data management. From automated workflows to custom integrations.',
    nl: 'Transformeer uw bedrijf met intelligente AI-agents en gecentraliseerd databeheer. Van geautomatiseerde workflows tot custom integraties.'
  },

  // Core Products
  'oplossingen.products.title': { en: 'Our Core Products', nl: 'Onze Kernproducten' },
  
  'oplossingen.agent1.title': { en: 'Customer Service Agent', nl: 'Klantenservice Agent' },
  'oplossingen.agent1.description': {
    en: 'Intelligent AI agent that handles customer inquiries 24/7, processes orders, and provides personalized support across all channels.',
    nl: 'Intelligente AI-agent die 24/7 klantenvragen afhandelt, bestellingen verwerkt en gepersonaliseerde ondersteuning biedt via alle kanalen.'
  },
  'oplossingen.agent1.features': {
    en: '• Multi-language support\n• Order processing\n• Live chat integration\n• CRM synchronization',
    nl: '• Meertalige ondersteuning\n• Orderverwerking\n• Live chat integratie\n• CRM synchronisatie'
  },

  'oplossingen.agent2.title': { en: 'Operations Agent', nl: 'Operationele Agent' },
  'oplossingen.agent2.description': {
    en: 'Automates business operations, manages inventory, schedules tasks, and optimizes workflows to maximize efficiency.',
    nl: 'Automatiseert bedrijfsoperaties, beheert voorraad, plant taken en optimaliseert workflows voor maximale efficiëntie.'
  },
  'oplossingen.agent2.features': {
    en: '• Inventory management\n• Task scheduling\n• Workflow optimization\n• Performance monitoring',
    nl: '• Voorraadbeheer\n• Taakplanning\n• Workflow optimalisatie\n• Prestatiemonitoring'
  },

  'oplossingen.datahub.title': { en: 'Centralized Data Hub', nl: 'Gecentraliseerde Data Hub' },
  'oplossingen.datahub.description': {
    en: 'Unified data platform that connects all your systems, provides real-time analytics, and enables intelligent decision-making.',
    nl: 'Uniforme dataplatform dat al uw systemen verbindt, real-time analytics biedt en intelligente besluitvorming mogelijk maakt.'
  },
  'oplossingen.datahub.features': {
    en: '• System integration\n• Real-time analytics\n• Data visualization\n• Predictive insights',
    nl: '• Systeemintegratie\n• Real-time analytics\n• Datavisualisatie\n• Voorspellende inzichten'
  },

  // Custom Solutions
  'oplossingen.custom.title': { en: 'Custom AI Integration', nl: 'Custom AI Integratie' },
  'oplossingen.custom.subtitle': {
    en: 'Any Business Process. Any System. AI-Powered.',
    nl: 'Elk Bedrijfsproces. Elk Systeem. AI-Powered.'
  },
  'oplossingen.custom.description': {
    en: 'We integrate AI into any existing business process or system. From legacy software to modern platforms - we make it intelligent.',
    nl: 'Wij integreren AI in elk bestaand bedrijfsproces of systeem. Van legacy software tot moderne platformen - wij maken het intelligent.'
  },
  'oplossingen.custom.capabilities': {
    en: '• Legacy system modernization\n• API integrations\n• Custom AI models\n• Workflow automation\n• Data pipeline creation\n• Real-time processing',
    nl: '• Legacy systeem modernisering\n• API integraties\n• Custom AI modellen\n• Workflow automatisering\n• Data pipeline creatie\n• Real-time verwerking'
  },

  // Consulting Service
  'oplossingen.consulting.title': { en: 'AI Readiness Assessment', nl: 'AI Readiness Assessment' },
  'oplossingen.consulting.price': { en: '€1,200', nl: '€1.200' },
  'oplossingen.consulting.subtitle': { en: 'Complete AI Strategy in One Day', nl: 'Complete AI Strategie op Één Dag' },
  'oplossingen.consulting.description': {
    en: 'Get everything you need to start your AI transformation. Our comprehensive one-day assessment gives you a complete roadmap.',
    nl: 'Krijg alles wat u nodig heeft om uw AI-transformatie te starten. Onze uitgebreide one-day assessment geeft u een complete roadmap.'
  },
  'oplossingen.consulting.includes': { en: 'What\'s Included:', nl: 'Wat is Inbegrepen:' },
  'oplossingen.consulting.discovery': { en: 'Business Process Discovery', nl: 'Bedrijfsproces Ontdekking' },
  'oplossingen.consulting.discovery.desc': {
    en: 'Deep analysis of your current workflows and pain points',
    nl: 'Diepgaande analyse van uw huidige workflows en pijnpunten'
  },
  'oplossingen.consulting.advice': { en: 'Strategic AI Advice', nl: 'Strategisch AI Advies' },
  'oplossingen.consulting.advice.desc': {
    en: 'Personalized recommendations for AI implementation',
    nl: 'Gepersonaliseerde aanbevelingen voor AI-implementatie'
  },
  'oplossingen.consulting.implementation': { en: 'Implementation Roadmap', nl: 'Implementatie Roadmap' },
  'oplossingen.consulting.implementation.desc': {
    en: 'Step-by-step plan with timelines and priorities',
    nl: 'Stap-voor-stap plan met tijdlijnen en prioriteiten'
  },
  'oplossingen.consulting.roi': { en: 'ROI Calculation', nl: 'ROI Berekening' },
  'oplossingen.consulting.roi.desc': {
    en: 'Detailed financial projections and cost-benefit analysis',
    nl: 'Gedetailleerde financiële projecties en kosten-batenanalyse'
  },
  'oplossingen.consulting.readiness': { en: 'AI Readiness Report', nl: 'AI Readiness Rapport' },
  'oplossingen.consulting.readiness.desc': {
    en: 'Complete assessment of your organization\'s AI preparedness',
    nl: 'Complete beoordeling van uw organisatie\'s AI-gereedheid'
  },
  'oplossingen.consulting.cta': { en: 'Book Your Assessment', nl: 'Boek Uw Assessment' },

  // Voorwaarden page
  'voorwaarden.title': { en: 'Terms and Conditions', nl: 'Algemene Voorwaarden' },
  'voorwaarden.lastUpdated': { en: 'Last updated', nl: 'Laatst bijgewerkt' },
  'voorwaarden.intro': {
    en: 'These terms and conditions outline the rules and regulations for the use of MOVE AI\'s services.',
    nl: 'Deze algemene voorwaarden beschrijven de regels en voorschriften voor het gebruik van MOVE AI\'s diensten.'
  },
  'voorwaarden.services.title': { en: 'Services', nl: 'Diensten' },
  'voorwaarden.services.content': {
    en: 'MOVE provides AI consulting, implementation, and automation services to businesses.',
    nl: 'MOVE biedt AI-consultancy, implementatie en automatiseringsdiensten aan bedrijven.'
  },
  'voorwaarden.liability.title': { en: 'Liability', nl: 'Aansprakelijkheid' },
  'voorwaarden.liability.content': {
    en: 'MOVE AI shall not be liable for any indirect or consequential damages arising from the use of our services.',
    nl: 'MOVE AI is niet aansprakelijk voor enige indirecte of gevolgschade voortvloeiend uit het gebruik van onze diensten.'
  },
  'voorwaarden.privacy.title': { en: 'Privacy', nl: 'Privacy' },
  'voorwaarden.privacy.content': {
    en: 'We respect your privacy and handle your data in accordance with our Privacy Policy.',
    nl: 'Wij respecteren uw privacy en behandelen uw gegevens in overeenstemming met ons Privacybeleid.'
  },
  'voorwaarden.contact.title': { en: 'Contact Information', nl: 'Contactgegevens' },
  'voorwaarden.contact.content': {
    en: 'For questions about these terms, please contact us at info@move.ai',
    nl: 'Voor vragen over deze voorwaarden kunt u contact met ons opnemen via info@move.ai'
  },


  // Common elements
  'common.readMore': { en: 'Read More', nl: 'Lees Meer' },
  'common.learnMore': { en: 'Learn More', nl: 'Meer Informatie' },
  'common.getStarted': { en: 'Get Started', nl: 'Begin Nu' },
  'common.contactUs': { en: 'Contact Us', nl: 'Neem Contact Op' },
  'common.next': { en: 'Next', nl: 'Volgende' },
  'common.previous': { en: 'Previous', nl: 'Vorige' },
  'common.loading': { en: 'Calculating...', nl: 'Berekenen...' }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'nl' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  const t = (key: string): string => {
    return translations[key as keyof typeof translations]?.[language] || key;
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

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}