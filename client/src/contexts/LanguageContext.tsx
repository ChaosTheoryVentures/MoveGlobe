import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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


  // VSL Page
  'vsl.title': { 
    en: 'Transform Your Business with AI Automation', 
    nl: 'Transformeer Uw Bedrijf met AI Automatisering' 
  },
  'vsl.subtitle': {
    en: 'Discover how companies like yours are using AI to increase revenue by 40%+ while reducing operational costs and saving hours of manual work every day.',
    nl: 'Ontdek hoe bedrijven zoals het uwe AI gebruiken om de omzet met 40%+ te verhogen terwijl ze operationele kosten verlagen en dagelijks uren handwerk besparen.'
  },
  'vsl.video.title': {
    en: 'Watch: How AI Transformed These Businesses',
    nl: 'Bekijk: Hoe AI Deze Bedrijven Transformeerde'
  },
  'vsl.video.subtitle': {
    en: 'Real case studies • 15 minutes • No fluff',
    nl: 'Echte casestudies • 15 minuten • Geen flauwekul'
  },
  'vsl.form.title': {
    en: 'Ready to See How AI Can Transform Your Business?',
    nl: 'Klaar om te Zien Hoe AI Uw Bedrijf Kan Transformeren?'
  },
  'vsl.form.subtitle': {
    en: 'Get instant access to our AI Transformation Blueprint and see exactly how businesses in your industry are scaling with AI.',
    nl: 'Krijg directe toegang tot onze AI Transformatie Blauwdruk en zie precies hoe bedrijven in uw sector schalen met AI.'
  },
  'vsl.form.placeholder': {
    en: 'Enter your business email',
    nl: 'Voer uw zakelijke e-mail in'
  },
  'vsl.form.button': {
    en: 'Get Instant Access',
    nl: 'Krijg Directe Toegang'
  },
  'vsl.form.privacy': {
    en: '100% secure. No spam. Unsubscribe anytime.',
    nl: '100% veilig. Geen spam. Altijd uitschrijven mogelijk.'
  },
  'vsl.social.trust': {
    en: 'Trusted by 500+ business owners',
    nl: 'Vertrouwd door 500+ ondernemers'
  },
  'vsl.social.rating': {
    en: '4.9/5 average rating',
    nl: '4,9/5 gemiddelde beoordeling'
  },
  'vsl.benefit1.title': {
    en: 'Increase Revenue by 40%+',
    nl: 'Verhoog Omzet met 40%+'
  },
  'vsl.benefit1.desc': {
    en: 'Our clients see an average revenue increase of 40% within 6 months of implementing AI automation.',
    nl: 'Onze klanten zien gemiddeld 40% omzetgroei binnen 6 maanden na implementatie van AI automatisering.'
  },
  'vsl.benefit2.title': {
    en: 'Save 20+ Hours Weekly',
    nl: 'Bespaar 20+ Uren per Week'
  },
  'vsl.benefit2.desc': {
    en: 'Automate repetitive tasks and free up your team to focus on high-value strategic work.',
    nl: 'Automatiseer repetitieve taken en geef uw team ruimte voor hoogwaardige strategische werkzaamheden.'
  },
  'vsl.benefit3.title': {
    en: 'Proven Implementation',
    nl: 'Bewezen Implementatie'
  },
  'vsl.benefit3.desc': {
    en: 'Step-by-step roadmap based on 200+ successful AI transformations across industries.',
    nl: 'Stap-voor-stap roadmap gebaseerd op 200+ succesvolle AI transformaties in verschillende sectoren.'
  },

  // Application Page
  'application.title': {
    en: 'AI Transformation Application',
    nl: 'AI Transformatie Aanvraag'
  },
  'application.subtitle': {
    en: 'Tell us about your business and discover how AI can transform your operations, increase revenue, and give you a competitive edge.',
    nl: 'Vertel ons over uw bedrijf en ontdek hoe AI uw operaties kan transformeren, omzet kan verhogen en u een concurrentievoordeel kan geven.'
  },
  'application.step1': { en: 'Business Info', nl: 'Bedrijfsinfo' },
  'application.step2': { en: 'Financials', nl: 'Financiën' },
  'application.step3': { en: 'Goals & AI', nl: 'Doelen & AI' },
  'application.step4': { en: 'Contact', nl: 'Contact' },
  'application.progress': { en: 'Complete', nl: 'Voltooid' },
  'application.step.of': { en: 'Step {current} of {total}', nl: 'Stap {current} van {total}' },
  
  // Step 1 - Business Info
  'application.step1.title': {
    en: 'Tell us about your business',
    nl: 'Vertel ons over uw bedrijf'
  },
  'application.step1.subtitle': {
    en: 'We need to understand your company to provide the best AI solutions',
    nl: 'We moeten uw bedrijf begrijpen om de beste AI-oplossingen te bieden'
  },
  'application.companyName': { en: 'Company Name', nl: 'Bedrijfsnaam' },
  'application.industry': { en: 'Industry', nl: 'Sector' },
  'application.companySize': { en: 'Company Size', nl: 'Bedrijfsgrootte' },
  'application.website': { en: 'Website', nl: 'Website' },
  'application.optional': { en: 'Optional', nl: 'Optioneel' },
  'application.placeholder.companyName': { en: 'Enter your company name', nl: 'Voer uw bedrijfsnaam in' },
  'application.placeholder.industry': { en: 'Select your industry', nl: 'Selecteer uw sector' },
  'application.placeholder.companySize': { en: 'Select company size', nl: 'Selecteer bedrijfsgrootte' },
  'application.placeholder.website': { en: 'https://www.example.com', nl: 'https://www.voorbeeld.nl' },
  
  // Industries
  'application.industry.technology': { en: 'Technology', nl: 'Technologie' },
  'application.industry.retail': { en: 'Retail', nl: 'Detailhandel' },
  'application.industry.manufacturing': { en: 'Manufacturing', nl: 'Productie' },
  'application.industry.healthcare': { en: 'Healthcare', nl: 'Zorgverlening' },
  'application.industry.finance': { en: 'Finance', nl: 'Financieel' },
  'application.industry.consulting': { en: 'Consulting', nl: 'Consultancy' },
  'application.industry.ecommerce': { en: 'E-commerce', nl: 'E-commerce' },
  'application.industry.other': { en: 'Other', nl: 'Anders' },
  
  // Company sizes
  'application.size.1-10': { en: '1-10 employees', nl: '1-10 medewerkers' },
  'application.size.11-50': { en: '11-50 employees', nl: '11-50 medewerkers' },
  'application.size.51-200': { en: '51-200 employees', nl: '51-200 medewerkers' },
  'application.size.201-500': { en: '201-500 employees', nl: '201-500 medewerkers' },
  'application.size.500+': { en: '500+ employees', nl: '500+ medewerkers' },
  
  // Step 2 - Financial Details
  'application.step2.title': {
    en: 'Financial Information',
    nl: 'Financiële Informatie'
  },
  'application.step2.subtitle': {
    en: 'Help us understand your business scale and current challenges',
    nl: 'Help ons uw bedrijfsschaal en huidige uitdagingen te begrijpen'
  },
  'application.annualRevenue': { en: 'Annual Revenue (EUR)', nl: 'Jaaromzet (EUR)' },
  'application.currentChallenges': { en: 'Current Business Challenges', nl: 'Huidige Bedrijfsuitdagingen' },
  'application.placeholder.revenue': { en: 'Select your annual revenue', nl: 'Selecteer uw jaaromzet' },
  'application.placeholder.challenges': { 
    en: 'Describe your main business challenges and pain points...', 
    nl: 'Beschrijf uw belangrijkste bedrijfsuitdagingen en pijnpunten...' 
  },
  
  // Revenue ranges
  'application.revenue.0': { en: 'Less than €100k', nl: 'Minder dan €100k' },
  'application.revenue.100000': { en: '€100k - €250k', nl: '€100k - €250k' },
  'application.revenue.250000': { en: '€250k - €500k', nl: '€250k - €500k' },
  'application.revenue.500000': { en: '€500k - €1M', nl: '€500k - €1M' },
  'application.revenue.1000000': { en: '€1M - €5M', nl: '€1M - €5M' },
  'application.revenue.5000000': { en: '€5M - €10M', nl: '€5M - €10M' },
  'application.revenue.10000000': { en: 'More than €10M', nl: 'Meer dan €10M' },
  
  // Step 3 - Goals & AI Interest
  'application.step3.title': {
    en: 'Goals & AI Interest',
    nl: 'Doelen & AI Interesse'
  },
  'application.step3.subtitle': {
    en: 'Tell us about your objectives and where AI can help',
    nl: 'Vertel ons over uw doelstellingen en waar AI kan helpen'
  },
  'application.businessGoals': { en: 'Business Goals', nl: 'Bedrijfsdoelen' },
  'application.aiInterest': { en: 'AI Interest Areas', nl: 'AI Interessegebieden' },
  'application.timeline': { en: 'Implementation Timeline', nl: 'Implementatie Tijdlijn' },
  'application.placeholder.goals': { 
    en: 'What are your main business goals for the next 12 months?', 
    nl: 'Wat zijn uw belangrijkste bedrijfsdoelen voor de komende 12 maanden?' 
  },
  'application.placeholder.aiInterest': { 
    en: 'Which areas of your business would benefit most from AI automation?', 
    nl: 'Welke gebieden van uw bedrijf zouden het meest profiteren van AI automatisering?' 
  },
  'application.placeholder.timeline': { en: 'When do you want to start?', nl: 'Wanneer wilt u beginnen?' },
  
  // Timeline options
  'application.timeline.immediate': { en: 'Immediately', nl: 'Meteen' },
  'application.timeline.1-3months': { en: '1-3 months', nl: '1-3 maanden' },
  'application.timeline.3-6months': { en: '3-6 months', nl: '3-6 maanden' },
  'application.timeline.6-12months': { en: '6-12 months', nl: '6-12 maanden' },
  'application.timeline.12months+': { en: '12+ months', nl: '12+ maanden' },
  
  // Step 4 - Contact Details
  'application.step4.title': {
    en: 'Contact Information',
    nl: 'Contactgegevens'
  },
  'application.step4.subtitle': {
    en: 'Final step - how can we reach you?',
    nl: 'Laatste stap - hoe kunnen we u bereiken?'
  },
  'application.fullName': { en: 'Full Name', nl: 'Volledige Naam' },
  'application.email': { en: 'Email Address', nl: 'E-mailadres' },
  'application.phone': { en: 'Phone Number', nl: 'Telefoonnummer' },
  'application.preferredContact': { en: 'Preferred Contact Method', nl: 'Voorkeurs Contactmethode' },
  'application.placeholder.fullName': { en: 'Enter your full name', nl: 'Voer uw volledige naam in' },
  'application.placeholder.email': { en: 'your@email.com', nl: 'uw@email.nl' },
  'application.placeholder.phone': { en: '+31 6 12345678', nl: '+31 6 12345678' },
  
  // Contact methods
  'application.contact.email': { en: 'Email', nl: 'E-mail' },
  'application.contact.phone': { en: 'Phone', nl: 'Telefoon' },
  'application.contact.both': { en: 'Both', nl: 'Beide' },
  
  // Buttons
  'application.button.previous': { en: 'Previous', nl: 'Vorige' },
  'application.button.continue': { en: 'Continue', nl: 'Doorgaan' },
  'application.button.submit': { en: 'Submit Application', nl: 'Aanvraag Indienen' },
  'application.button.submitting': { en: 'Submitting...', nl: 'Indienen...' },
  
  // Validation
  'application.validation.required': { en: 'Please fill in all required fields', nl: 'Vul alle verplichte velden in' },

  // HTO Page
  'hto.title': {
    en: 'Congratulations! You Qualify for Our Premium AI Transformation Program',
    nl: 'Gefeliciteerd! U Komt in Aanmerking voor Ons Premium AI Transformatie Programma'
  },
  'hto.greeting': {
    en: 'Thank you, {name}. Based on your application, your business is perfectly positioned for AI transformation.',
    nl: 'Dank u, {name}. Op basis van uw aanvraag is uw bedrijf perfect gepositioneerd voor AI transformatie.'
  },
  'hto.nextSteps': {
    en: 'Schedule Your Strategy Call',
    nl: 'Plan Uw Strategiegesprek'
  },
  'hto.strategyCall.desc': {
    en: 'Book a 45-minute call with our AI transformation experts',
    nl: 'Boek een gesprek van 45 minuten met onze AI transformatie experts'
  },
  'hto.calendly.title': {
    en: 'AI Strategy Call Booking',
    nl: 'AI Strategiegesprek Boeken'
  },
  'hto.calendly.placeholder': {
    en: 'Calendly booking widget will be embedded here',
    nl: 'Calendly boekingswidget wordt hier ingevoegd'
  },
  'hto.button.call': {
    en: 'Call Now: +31 20 123 4567',
    nl: 'Bel Nu: +31 20 123 4567'
  },
  'hto.button.email': {
    en: 'Email: strategy@moveglobe.com',
    nl: 'E-mail: strategy@moveglobe.com'
  },
  'hto.whatYouGet': {
    en: 'What You\'ll Get From Your Strategy Call',
    nl: 'Wat U Krijgt van Uw Strategiegesprek'
  },
  'hto.benefit1': {
    en: 'Personalized AI Strategy',
    nl: 'Gepersonaliseerde AI Strategie'
  },
  'hto.benefit1.desc': {
    en: 'Custom roadmap designed for your business',
    nl: 'Aangepaste roadmap ontworpen voor uw bedrijf'
  },
  'hto.benefit2': {
    en: 'ROI Analysis',
    nl: 'ROI Analyse'
  },
  'hto.benefit2.desc': {
    en: 'Clear projections on AI investment returns',
    nl: 'Duidelijke projecties van AI investeringsrendementen'
  },
  'hto.benefit3': {
    en: 'Implementation Plan',
    nl: 'Implementatieplan'
  },
  'hto.benefit3.desc': {
    en: 'Step-by-step guide to AI transformation',
    nl: 'Stap-voor-stap gids voor AI transformatie'
  },
  'hto.benefit4': {
    en: 'Expert Guidance',
    nl: 'Expert Begeleiding'
  },
  'hto.benefit4.desc': {
    en: 'Direct access to AI consultants',
    nl: 'Directe toegang tot AI consultants'
  },
  'hto.urgency': {
    en: 'Limited spots available this week. Book your call now to secure your AI transformation journey.',
    nl: 'Beperkte plekken beschikbaar deze week. Boek nu uw gesprek om uw AI transformatiereis veilig te stellen.'
  },
  'hto.social.proof': {
    en: 'Join 200+ businesses that have already transformed with AI',
    nl: 'Sluit u aan bij 200+ bedrijven die al zijn getransformeerd met AI'
  },

  // LTO Page
  'lto.badge': {
    en: 'Exclusive Offer for Growing Businesses',
    nl: 'Exclusief Aanbod voor Groeiende Bedrijven'
  },
  'lto.title': {
    en: 'Start Your AI Journey Today',
    nl: 'Begin Vandaag Uw AI Reis'
  },
  'lto.greeting': {
    en: '{name}, while you\'re building towards our premium program, these packages will help you get started with AI immediately.',
    nl: '{name}, terwijl u opbouwt naar ons premium programma, helpen deze pakketten u om meteen te beginnen met AI.'
  },
  'lto.mostPopular': {
    en: 'MOST POPULAR',
    nl: 'MEEST POPULAIR'
  },
  
  // Packages
  'lto.starter.name': {
    en: 'AI Starter Kit',
    nl: 'AI Starter Kit'
  },
  'lto.starter.desc': {
    en: 'Perfect for businesses ready to start their AI journey',
    nl: 'Perfect voor bedrijven die klaar zijn om hun AI reis te beginnen'
  },
  'lto.growth.name': {
    en: 'AI Growth Accelerator',
    nl: 'AI Groei Accelerator'
  },
  'lto.growth.desc': {
    en: 'For businesses serious about AI transformation',
    nl: 'Voor bedrijven die serieus zijn over AI transformatie'
  },
  'lto.workshop.name': {
    en: 'AI Workshop Series',
    nl: 'AI Workshop Serie'
  },
  'lto.workshop.desc': {
    en: 'Group learning experience with other businesses',
    nl: 'Groepsleervaring met andere bedrijven'
  },
  
  // Features
  'lto.feature.assessment': { en: 'AI Readiness Assessment', nl: 'AI Gereedheid Assessment' },
  'lto.feature.recommendations': { en: '3 AI Tool Recommendations', nl: '3 AI Tool Aanbevelingen' },
  'lto.feature.checklist': { en: 'Implementation Checklist', nl: 'Implementatie Checklist' },
  'lto.feature.strategyCall': { en: '30-min Strategy Call', nl: '30-min Strategiegesprek' },
  'lto.feature.emailSupport': { en: 'Email Support (30 days)', nl: 'E-mail Ondersteuning (30 dagen)' },
  'lto.feature.roadmap': { en: 'Custom AI Roadmap', nl: 'Aangepaste AI Roadmap' },
  'lto.feature.implementations': { en: '5 AI Tool Implementations', nl: '5 AI Tool Implementaties' },
  'lto.feature.weeklyCalls': { en: 'Weekly Progress Calls (4 weeks)', nl: 'Wekelijkse Voortgangsgesprekken (4 weken)' },
  'lto.feature.slackSupport': { en: 'Slack Support (60 days)', nl: 'Slack Ondersteuning (60 dagen)' },
  'lto.feature.dashboard': { en: 'ROI Tracking Dashboard', nl: 'ROI Tracking Dashboard' },
  'lto.feature.workshop': { en: '4-Week Online Workshop', nl: '4-Weken Online Workshop' },
  'lto.feature.qaSessions': { en: 'Live Q&A Sessions', nl: 'Live Q&A Sessies' },
  'lto.feature.templates': { en: 'AI Templates & Frameworks', nl: 'AI Templates & Frameworks' },
  'lto.feature.community': { en: 'Community Access', nl: 'Community Toegang' },
  'lto.feature.recordings': { en: 'Recording Access (Lifetime)', nl: 'Opname Toegang (Levenslang)' },
  
  'lto.button.getStarted': {
    en: 'Get Started Now',
    nl: 'Begin Nu'
  },
  'lto.button.processing': {
    en: 'Processing...',
    nl: 'Verwerken...'
  },
  
  // Testimonials
  'lto.testimonials.title': {
    en: 'Success Stories from Our Clients',
    nl: 'Succesverhalen van Onze Klanten'
  },
  'lto.testimonial1': {
    en: 'The AI Starter Kit gave us the clarity we needed. We implemented 3 tools and saved 20 hours per week!',
    nl: 'De AI Starter Kit gaf ons de duidelijkheid die we nodig hadden. We implementeerden 3 tools en bespaarden 20 uur per week!'
  },
  'lto.testimonial2': {
    en: 'The Growth Accelerator transformed our business. Our revenue increased by 35% in just 3 months.',
    nl: 'De Growth Accelerator transformeerde ons bedrijf. Onze omzet steeg met 35% in slechts 3 maanden.'
  },
  'lto.testimonial3': {
    en: 'The workshop series was incredible. I learned so much and connected with other business owners.',
    nl: 'De workshop serie was ongelooflijk. Ik leerde zo veel en maakte contact met andere ondernemers.'
  },
  
  // Bonus section
  'lto.bonus.title': {
    en: 'Special Bonus: Act Now!',
    nl: 'Speciale Bonus: Handel Nu!'
  },
  'lto.bonus.desc': {
    en: 'Purchase any package today and get our AI Prompt Library (€197 value) absolutely FREE!',
    nl: 'Koop vandaag een pakket en krijg onze AI Prompt Library (€197 waarde) helemaal GRATIS!'
  },
  'lto.bonus.limited': {
    en: 'Limited Time Offer - Expires in 48 Hours',
    nl: 'Beperkte Tijd Aanbieding - Verloopt over 48 Uur'
  },
  'lto.faq.button': {
    en: 'Have questions? Check our FAQ',
    nl: 'Heeft u vragen? Bekijk onze FAQ'
  },

  // Common elements
  'common.readMore': { en: 'Read More', nl: 'Lees Meer' },
  'common.learnMore': { en: 'Learn More', nl: 'Meer Informatie' },
  'common.getStarted': { en: 'Get Started', nl: 'Begin Nu' },
  'common.contactUs': { en: 'Contact Us', nl: 'Neem Contact Op' },
  'common.next': { en: 'Next', nl: 'Volgende' },
  'common.previous': { en: 'Previous', nl: 'Vorige' },
  'common.loading': { en: 'Calculating...', nl: 'Berekenen...' },
  'common.required': { en: 'required', nl: 'verplicht' },
  'common.optional': { en: 'optional', nl: 'optioneel' }
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
    const handleLanguageChange = (e: Event) => {
      // Type guard to check if it's a CustomEvent with the expected detail
      if (e instanceof CustomEvent && e.detail) {
        setLanguage(e.detail as Language);
      }
    };
    
    // Add event listener
    window.addEventListener('languageChange', handleLanguageChange);
    
    // Cleanup function
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
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