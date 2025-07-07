import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Consult() {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  useEffect(() => {
    const checkLanguage = () => {
      const savedLang = localStorage.getItem('language') as 'en' | 'nl' || 'en';
      setLanguage(savedLang);
    };

    checkLanguage();
    window.addEventListener('storage', checkLanguage);
    
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
      title1: "4 laser-focused hours",
      title2: "with our AI experts",
      text1: "In one 4-hour workshop, we'll uncover every process draining your time and profit.",
      text2: "The next day, you'll get a clear AI automation plan with ROI numbers, costs, and timelines.",
      text3: "While others guess, you'll scale—faster, leaner, smarter.",
      formTitle: "Request Your AI Consultation",
      investment: "Investment for complete audit",
      firstName: "First Name",
      lastName: "Last Name",
      companyName: "Company Name",
      email: "Business Email",
      phone: "Phone Number",
      employees: "Number of Employees",
      selectRange: "Select range",
      challenge: "What's your biggest operational challenge?",
      challengePlaceholder: "Describe the main inefficiencies or bottlenecks in your business...",
      preferredDate: "Preferred consultation date",
      submitButton: "Request Your €750 AI Consultation",
      disclaimer: "After submission, we'll contact you within 24 hours to schedule your consultation and discuss payment details."
    },
    nl: {
      title1: "4 gerichte uren",
      title2: "met onze AI experts",
      text1: "In één gerichte workshop van 4 uur ontdekken we alle knelpunten die je tijd en winst kosten.",
      text2: "De volgende dag ontvang je een helder AI-actieplan met kosten, ROI en implementatieschema.",
      text3: "Terwijl anderen nog zoeken, schaal jij sneller, slimmer en winstgevender op.",
      formTitle: "Vraag Je AI Consultatie Aan",
      investment: "Investering voor complete audit",
      firstName: "Voornaam",
      lastName: "Achternaam",
      companyName: "Bedrijfsnaam",
      email: "Zakelijk E-mailadres",
      phone: "Telefoonnummer",
      employees: "Aantal medewerkers",
      selectRange: "Selecteer bereik",
      challenge: "Wat is je grootste operationele uitdaging?",
      challengePlaceholder: "Beschrijf de belangrijkste inefficiënties of knelpunten in je bedrijf...",
      preferredDate: "Voorkeursdatum consultatie",
      submitButton: "Vraag Je €750 AI Consultatie Aan",
      disclaimer: "Na indiening nemen we binnen 24 uur contact op om je consultatie in te plannen en betalingsdetails te bespreken."
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 overflow-y-auto">
        <div className="bg-[#4746a4] text-white text-center py-2 px-4">
          <p className="text-sm font-medium">
            {language === 'en' ? 'Limited time: €750 comprehensive AI audit (normally €1,200)' : 'Beperkte tijd: €750 uitgebreide AI-audit (normaal €1,200)'}
          </p>
        </div>
        
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#4746a4]">{t.title1}</span>{" "}
                {t.title2}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                {t.text1}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                {t.text2}
              </p>
              
              <p className="text-lg text-gray-800 leading-relaxed font-semibold mb-8 max-w-2xl mx-auto">
                {t.text3}
              </p>

              {/* Social Proof */}
              <div className="flex justify-center items-center gap-8 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{language === 'en' ? '50+ businesses helped' : '50+ bedrijven geholpen'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{language === 'en' ? 'Average 35% cost savings' : 'Gemiddeld 35% kostenbesparing'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{language === 'en' ? '24h delivery' : '24u levering'}</span>
                </div>
              </div>
            </div>
            
            {/* Form Section */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.formTitle}</h2>
                  <div className="bg-gradient-to-r from-[#4746a4] to-purple-600 text-white px-6 py-3 rounded-full inline-block mb-4">
                    <span className="text-2xl font-bold">€750</span>
                    <span className="text-sm ml-2 opacity-90">({t.investment})</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Book your audit today - limited slots available this month' : 'Boek je audit vandaag - beperkte plekken beschikbaar deze maand'}
                  </p>
                </div>
                
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">{t.firstName} *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all"
                        placeholder={language === 'en' ? "John" : "Jan"}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">{t.lastName} *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all"
                        placeholder={language === 'en' ? "Doe" : "Jansen"}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">{t.email} *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all"
                      placeholder={language === 'en' ? "john@company.com" : "jan@bedrijf.nl"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">{t.phone} *</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all"
                      placeholder="+31 6 12345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">{t.companyName} *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all"
                      placeholder={language === 'en' ? "Your Company" : "Uw Bedrijf"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">{t.challenge} *</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4746a4] focus:ring-2 focus:ring-[#4746a4]/20 focus:outline-none transition-all resize-none"
                      placeholder={t.challengePlaceholder}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4746a4] to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    {t.submitButton}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-2">
                      {t.disclaimer}
                    </p>
                    <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
                      <span>🔒 {language === 'en' ? 'Secure & confidential' : 'Veilig & vertrouwelijk'}</span>
                      <span>💼 {language === 'en' ? 'No spam, ever' : 'Geen spam, ooit'}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Additional Trust Signals */}
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4746a4] mb-2">4 hrs</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Deep dive session' : 'Diepgaande sessie'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4746a4] mb-2">24h</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Delivery time' : 'Levertijd'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4746a4] mb-2">35%</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Avg. cost savings' : 'Gem. kostenbesparing'}</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚡ {language === 'en' ? 'Only 3 audit slots left this month. Book now to secure your spot.' : 'Slechts 3 audit plekken over deze maand. Boek nu om je plek te reserveren.'}
                </p>
              </div>
              
              <p className="text-xs text-gray-500">
                {language === 'en' ? 'MOVE - AI Automation Experts | Amsterdam, Netherlands' : 'MOVE - AI Automatisering Experts | Amsterdam, Nederland'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}