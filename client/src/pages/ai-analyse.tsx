import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { CheckCircle, Clock, Zap, Shield } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

export default function Consult() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    challenges: '',
    budget: '',
    timeline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-1 pt-24 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('consult.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {t('consult.subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Offer Details */}
              <div className="space-y-8">
                {/* What You Get */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">{t('consult.whatYouGet')}</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#4746a4] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{t('consult.aiAssessment')}</h3>
                        <p className="text-white/70 mt-1">{t('consult.aiAssessmentDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#4746a4] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{t('consult.roiCalculation')}</h3>
                        <p className="text-white/70 mt-1">{t('consult.roiCalculationDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#4746a4] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{t('consult.roadmap')}</h3>
                        <p className="text-white/70 mt-1">{t('consult.roadmapDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#4746a4] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{t('consult.quickWins')}</h3>
                        <p className="text-white/70 mt-1">{t('consult.quickWinsDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">{t('consult.whyMove')}</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-[#4746a4] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-1">{t('consult.24hours')}</h3>
                      <p className="text-white/70 text-sm">{t('consult.24hoursDesc')}</p>
                    </div>
                    <div className="text-center">
                      <Zap className="w-12 h-12 text-[#4746a4] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-1">{t('consult.60savings')}</h3>
                      <p className="text-white/70 text-sm">{t('consult.60savingsDesc')}</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-[#4746a4] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-1">{t('consult.secure')}</h3>
                      <p className="text-white/70 text-sm">{t('consult.secureDesc')}</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-[#4746a4] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-1">{t('consult.free')}</h3>
                      <p className="text-white/70 text-sm">{t('consult.freeDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">{t('consult.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">{t('consult.form.companyName')}</label>
                      <input 
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder={t('consult.form.companyPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">{t('consult.form.contactPerson')}</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder={t('consult.form.namePlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">Email *</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder="email@bedrijf.nl"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">Telefoon</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder="+31 6 12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Aantal medewerkers</label>
                    <select 
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="">Selecteer</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Grootste uitdagingen</label>
                    <textarea 
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder="Welke processen kosten u het meeste tijd of geld?"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">Budget indicatie</label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                      >
                        <option value="">Selecteer</option>
                        <option value="<10k">Minder dan €10.000</option>
                        <option value="10-50k">€10.000 - €50.000</option>
                        <option value="50-100k">€50.000 - €100.000</option>
                        <option value="100k+">Meer dan €100.000</option>
                        <option value="unsure">Nog niet bepaald</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">Gewenste startdatum</label>
                      <select 
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                      >
                        <option value="">Selecteer</option>
                        <option value="asap">Zo snel mogelijk</option>
                        <option value="1month">Binnen 1 maand</option>
                        <option value="3months">Binnen 3 maanden</option>
                        <option value="6months">Binnen 6 maanden</option>
                        <option value="exploring">Nog aan het verkennen</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
                    >
                      Ontvang Gratis AI Assessment
                    </button>
                    <p className="text-white/60 text-sm mt-4 text-center">
                      Binnen 24 uur ontvangt u uw persoonlijke AI-readiness rapport
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <p className="text-white/70 mb-6">Vertrouwd door toonaangevende bedrijven</p>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="text-white/50 text-2xl font-bold">100+</div>
                <span className="text-white/30">•</span>
                <div className="text-white/50">Succesvolle implementaties</div>
                <span className="text-white/30">•</span>
                <div className="text-white/50">GDPR Compliant</div>
                <span className="text-white/30">•</span>
                <div className="text-white/50">ISO 27001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}