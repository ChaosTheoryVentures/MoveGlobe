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
  'nav.oplossingen': { en: 'Solutions', nl: 'Oplossingen' },
  'nav.aiConsult': { en: 'AI Consult', nl: 'AI Consult' },
  'nav.kennisbank': { en: 'Knowledge Base', nl: 'Kennisbank' },
  'nav.roi': { en: 'ROI Calculator', nl: 'ROI Calculator' },
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

  // Kennisbank page
  'kennisbank.title': { en: 'Knowledge Base', nl: 'Kennisbank' },
  'kennisbank.subtitle': {
    en: 'Deepen your knowledge about AI, automation and digital transformation with our expert articles and practical guides.',
    nl: 'Verdiep uw kennis over AI, automatisering en digitale transformatie met onze expertartikelen en praktische guides.'
  },
  'kennisbank.categories.all': { en: 'All', nl: 'Alle' },
  'kennisbank.categories.fundamentals': { en: 'AI Fundamentals', nl: 'AI Fundamentals' },
  'kennisbank.categories.practices': { en: 'Best Practices', nl: 'Best Practices' },
  'kennisbank.categories.cases': { en: 'Case Studies', nl: 'Case Studies' },
  'kennisbank.categories.technology': { en: 'Technology', nl: 'Technology' },
  'kennisbank.newsletter.title': {
    en: 'Stay up to date with the latest AI developments',
    nl: 'Blijf op de hoogte van de laatste AI-ontwikkelingen'
  },
  'kennisbank.newsletter.subtitle': {
    en: 'Receive our best articles, practical tips and exclusive insights directly in your inbox every month.',
    nl: 'Ontvang maandelijks onze beste artikelen, praktische tips en exclusieve inzichten direct in uw inbox.'
  },
  'kennisbank.newsletter.placeholder': { en: 'your@email.com', nl: 'uw@email.nl' },
  'kennisbank.newsletter.button': { en: 'Subscribe', nl: 'Aanmelden' },
  'kennisbank.readTime': { en: 'min read', nl: 'min leestijd' },


  // Oplossingen page
  'oplossingen.title': { en: 'Solutions', nl: 'Oplossingen' },
  'oplossingen.subtitle': {
    en: 'Comprehensive AI solutions designed to solve your specific business challenges and drive growth.',
    nl: 'Uitgebreide AI-oplossingen ontworpen om uw specifieke bedrijfsuitdagingen op te lossen en groei te stimuleren.'
  },
  'oplossingen.analytics.title': { en: 'AI-Powered Analytics', nl: 'AI-Powered Analytics' },
  'oplossingen.analytics.description': {
    en: 'Transform your data into actionable insights with advanced machine learning algorithms.',
    nl: 'Transformeer uw data naar bruikbare inzichten met geavanceerde machine learning algoritmes.'
  },
  'oplossingen.automation.title': { en: 'Process Automation', nl: 'Procesautomatisering' },
  'oplossingen.automation.description': {
    en: 'Automate repetitive tasks and workflows to increase efficiency and reduce human error.',
    nl: 'Automatiseer repetitieve taken en workflows om efficiëntie te verhogen en menselijke fouten te verminderen.'
  },
  'oplossingen.predictive.title': { en: 'Predictive Intelligence', nl: 'Predictive Intelligence' },
  'oplossingen.predictive.description': {
    en: 'Anticipate future trends and make data-driven decisions with predictive AI models.',
    nl: 'Voorzie toekomstige trends en neem datagedreven beslissingen met voorspellende AI-modellen.'
  },
  'oplossingen.custom.title': { en: 'Custom AI Solutions', nl: 'Custom AI Solutions' },
  'oplossingen.custom.description': {
    en: 'Tailor-made AI solutions designed specifically for your unique business requirements.',
    nl: 'Op maat gemaakte AI-oplossingen specifiek ontworpen voor uw unieke bedrijfsvereisten.'
  },

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

  // ROI Calculator page
  'roi.title': { en: 'AI ROI Calculator', nl: 'AI ROI Calculator' },
  'roi.subtitle': {
    en: 'Discover the potential return on investment AI can bring to your business with our interactive calculator.',
    nl: 'Ontdek het potentiële rendement op investering dat AI naar uw bedrijf kan brengen met onze interactieve calculator.'
  },
  'roi.step1.title': { en: 'Step 1: Company Information', nl: 'Stap 1: Bedrijfsinformatie' },
  'roi.step2.title': { en: 'Step 2: Current Challenges', nl: 'Stap 2: Huidige Uitdagingen' },
  'roi.step3.title': { en: 'Step 3: Your ROI Calculation', nl: 'Stap 3: Uw ROI Berekening' },
  
  'roi.revenue.label': { en: 'Annual Revenue', nl: 'Jaarlijkse Omzet' },
  'roi.revenue.placeholder': { en: 'Select revenue range', nl: 'Selecteer omzetbereik' },
  'roi.revenue.500k-2m': { en: '€500K - €2M', nl: '€500K - €2M' },
  'roi.revenue.2m-10m': { en: '€2M - €10M', nl: '€2M - €10M' },
  'roi.revenue.10m-50m': { en: '€10M - €50M', nl: '€10M - €50M' },
  'roi.revenue.50m+': { en: '€50M+', nl: '€50M+' },
  
  'roi.employees.label': { en: 'Number of Employees', nl: 'Aantal Medewerkers' },
  'roi.employees.placeholder': { en: 'Select employee count', nl: 'Selecteer aantal medewerkers' },
  'roi.employees.1-10': { en: '1-10 employees', nl: '1-10 medewerkers' },
  'roi.employees.11-50': { en: '11-50 employees', nl: '11-50 medewerkers' },
  'roi.employees.51-200': { en: '51-200 employees', nl: '51-200 medewerkers' },
  'roi.employees.201-500': { en: '201-500 employees', nl: '201-500 medewerkers' },
  'roi.employees.500+': { en: '500+ employees', nl: '500+ medewerkers' },
  
  
  'roi.challenges.label': { en: 'Biggest Challenges (select all that apply)', nl: 'Grootste Uitdagingen (selecteer alle die van toepassing zijn)' },
  'roi.challenge.manual-processes': { en: 'Manual, repetitive processes', nl: 'Handmatige, repetitieve processen' },
  'roi.challenge.data-analysis': { en: 'Time-consuming data analysis', nl: 'Tijdrovende data-analyse' },
  'roi.challenge.customer-service': { en: 'High customer service costs', nl: 'Hoge klantenservice kosten' },
  'roi.challenge.inventory': { en: 'Inventory management issues', nl: 'Voorraadbeheer problemen' },
  'roi.challenge.compliance': { en: 'Compliance and risk management', nl: 'Compliance en risicobeheer' },
  'roi.challenge.decision-making': { en: 'Slow decision-making processes', nl: 'Trage besluitvormingsprocessen' },
  'roi.challenge.quality-control': { en: 'Quality control and monitoring', nl: 'Kwaliteitscontrole en monitoring' },
  'roi.challenge.resource-planning': { en: 'Resource planning and scheduling', nl: 'Resourceplanning en planning' },
  
  'roi.calculate.button': { en: 'Calculate My ROI', nl: 'Bereken Mijn ROI' },
  'roi.results.title': { en: 'Your AI ROI Potential', nl: 'Uw AI ROI Potentieel' },
  'roi.results.annual-savings': { en: 'Estimated Annual Savings', nl: 'Geschatte Jaarlijkse Besparingen' },
  'roi.results.implementation-cost': { en: 'Implementation Investment', nl: 'Implementatie Investering' },
  'roi.results.roi-percentage': { en: 'Return on Investment', nl: 'Rendement op Investering' },
  'roi.results.payback-period': { en: 'Payback Period', nl: 'Terugverdientijd' },
  'roi.results.productivity-gain': { en: 'Productivity Improvement', nl: 'Productiviteitsverbetering' },
  
  'roi.breakdown.title': { en: 'Calculation Breakdown', nl: 'Berekening Uitsplitsing' },
  'roi.breakdown.labor-savings': { en: 'Labor Cost Savings', nl: 'Arbeidskosten Besparing' },
  'roi.breakdown.efficiency-gains': { en: 'Efficiency Gains', nl: 'Efficiëntiewinst' },
  'roi.breakdown.error-reduction': { en: 'Error Reduction Savings', nl: 'Foutenreductie Besparing' },
  'roi.breakdown.revenue-increase': { en: 'Revenue Increase', nl: 'Omzetverhoging' },
  
  'roi.consultation.title': { en: 'Ready to Make It Reality?', nl: 'Klaar om het Werkelijkheid te Maken?' },
  'roi.consultation.description': {
    en: 'These calculations are based on industry averages. Get a personalized assessment tailored to your specific business needs.',
    nl: 'Deze berekeningen zijn gebaseerd op branche gemiddelden. Krijg een gepersonaliseerde beoordeling afgestemd op uw specifieke bedrijfsbehoeften.'
  },
  'roi.consultation.benefits': {
    en: 'Our experts will provide you with:',
    nl: 'Onze experts bieden u:'
  },
  'roi.consultation.benefit1': { en: 'Detailed implementation roadmap', nl: 'Gedetailleerde implementatie roadmap' },
  'roi.consultation.benefit2': { en: 'Custom ROI projections for your business', nl: 'Aangepaste ROI projecties voor uw bedrijf' },
  'roi.consultation.benefit3': { en: 'Risk assessment and mitigation strategies', nl: 'Risicobeoordeling en mitigatie strategieën' },
  'roi.consultation.benefit4': { en: 'Technology recommendations', nl: 'Technologie aanbevelingen' },
  'roi.consultation.cta': { en: 'Book Your Free Consultation', nl: 'Boek Uw Gratis Consultatie' },
  
  'roi.disclaimer': {
    en: 'Calculations are estimates based on industry data and typical AI implementation outcomes. Actual results may vary.',
    nl: 'Berekeningen zijn schattingen gebaseerd op branchegegevens en typische AI-implementatie resultaten. Werkelijke resultaten kunnen variëren.'
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