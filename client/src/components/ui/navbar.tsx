import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="MOVE Logo" 
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* AI Agents Link */}
            <Link 
              to="/ai-agents" 
              className="text-white hover:text-[#4746a4] transition-colors"
            >
              {t('nav.oplossingen')}
            </Link>

            {/* AI Analyse Link */}
            <Link 
              to="/ai-analyse" 
              className="text-white hover:text-[#4746a4] transition-colors"
            >
              {t('nav.aiConsult')}
            </Link>

            {/* Contact Link */}
            <Link 
              to="/contact" 
              className="text-white hover:text-[#4746a4] transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#4746a4] transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              {/* AI Agents Mobile Link */}
              <Link 
                to="/ai-agents" 
                className="block text-white hover:text-[#4746a4] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.oplossingen')}
              </Link>

              {/* AI Analyse Mobile Link */}
              <Link 
                to="/ai-analyse" 
                className="block text-white hover:text-[#4746a4] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.aiConsult')}
              </Link>

              {/* Contact Mobile Link */}
              <Link 
                to="/contact" 
                className="block text-white hover:text-[#4746a4] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}