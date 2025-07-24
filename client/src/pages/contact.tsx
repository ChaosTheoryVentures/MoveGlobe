import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";
import { useContactForm } from "../hooks/use-form-submission";

export default function Contact() {
  const { t } = useLanguage();
  const { submit, isLoading, isLoadingFormTypes, isSuccess, isError, error, reset } = useContactForm();
  const [showMessage, setShowMessage] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  // Show success/error message when submission status changes
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (isSuccess || isError) {
      setShowMessage(true);
      if (isSuccess) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        // Hide success message after 5 seconds
        timer = setTimeout(() => {
          setShowMessage(false);
          reset();
        }, 5000);
      }
    }
    
    // Cleanup function to clear timer if component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSuccess, isError, reset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit(formData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  // Show loading state while form types are being fetched
  if (isLoadingFormTypes) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" style={{ 
        background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
      }}>
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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
        <div className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              {t('contact.title')}
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">{t('contact.getInTouch')}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.email')}</h3>
                    <a href="mailto:info@workwithmove.com" className="text-[#4746a4] hover:text-white transition-colors">
                      info@workwithmove.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.phone')}</h3>
                    <a href="tel:+31617858386" className="text-[#4746a4] hover:text-white transition-colors">
                      +31 6 1785 8386
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.address')}</h3>
                    <p className="text-white/80">
                      Science Park 904<br/>
                      1098 XH Amsterdam<br/>
                      Netherlands
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.businessHours')}</h3>
                    <p className="text-white/80" style={{ whiteSpace: 'pre-line' }}>
                      {t('contact.businessHoursText')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('contact.followUs')}</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.linkedin.com/in/erik-wessels" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#4746a4] hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                      <a 
                        href="https://www.instagram.com/workwithmove.ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#4746a4] hover:text-white transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">{t('contact.sendMessage')}</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.name')}</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.email')}</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.company')}</label>
                    <input 
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">{t('contact.message')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    ></textarea>
                  </div>

                  {showMessage && (isSuccess || isError) && (
                    <div className={`p-4 rounded-lg ${
                      isSuccess 
                        ? 'bg-green-500/20 border border-green-500/40 text-green-300' 
                        : 'bg-red-500/20 border border-red-500/40 text-red-300'
                    }`}>
                      {isSuccess 
                        ? (t('contact.successMessage') || 'Thank you! We will get back to you soon.')
                        : (error?.message || 'Something went wrong. Please try again.')
                      }
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : t('contact.sendButton')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}