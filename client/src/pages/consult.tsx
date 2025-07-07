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
    <div className="min-h-screen relative" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 h-screen overflow-y-auto">
        <Navbar />
        <div className="pt-20 pb-16 px-4 min-h-full">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-[#4746a4] to-purple-600 bg-clip-text text-transparent">
                  {t.title1}
                </span>{" "}
                {t.title2}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
                {t.text1}
              </p>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                {t.text2}
              </p>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-semibold">
                {t.text3}
              </p>
            </div>
            
            {/* Form Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">{t.formTitle}</h2>
                  <div className="inline-flex items-center gap-3 bg-[#4746a4]/20 px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-[#4746a4]">€750</span>
                    <span className="text-white/80">{t.investment}</span>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 font-medium">{t.firstName} *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder={language === 'en' ? "John" : "Jan"}
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">{t.lastName} *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder={language === 'en' ? "Doe" : "Jansen"}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.companyName} *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={language === 'en' ? "Your Company" : "Uw Bedrijf"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.email} *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={language === 'en' ? "john@company.com" : "jan@bedrijf.nl"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.phone} *</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="+31 6 12345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.employees}</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#4746a4] focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-gray-800">{t.selectRange}</option>
                      <option value="1-10" className="bg-gray-800">1-10</option>
                      <option value="11-50" className="bg-gray-800">11-50</option>
                      <option value="51-200" className="bg-gray-800">51-200</option>
                      <option value="200+" className="bg-gray-800">200+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.challenge} *</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder={t.challengePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">{t.preferredDate}</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#4746a4] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4746a4] to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    {t.submitButton}
                  </button>
                  
                  <p className="text-white/60 text-sm text-center">
                    {t.disclaimer}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}