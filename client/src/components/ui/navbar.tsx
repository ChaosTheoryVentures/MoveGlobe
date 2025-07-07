import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const [sectorenOpen, setSectorenOpen] = useState(false);
  const [oplossingenOpen, setOplossingenOpen] = useState(false);

  const sectorenItems = [
    { label: "Financiële Dienstverlening", href: "/sectoren#financieel" },
    { label: "Gezondheidszorg", href: "/sectoren#gezondheidszorg" },
    { label: "Retail & E-commerce", href: "/sectoren#retail" },
    { label: "Productie & Logistiek", href: "/sectoren#productie" }
  ];

  const oplossingenItems = [
    { label: "AI-Powered Analytics", href: "/oplossingen#analytics" },
    { label: "Procesautomatisering", href: "/oplossingen#automatisering" },
    { label: "Predictive Intelligence", href: "/oplossingen#predictive" },
    { label: "Custom AI Solutions", href: "/oplossingen#custom" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="MOVE Logo" 
              className="h-8 sm:h-10 w-auto"
            />
          </a>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Sectoren Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setSectorenOpen(true)}
              onMouseLeave={() => setSectorenOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-[#4746a4] transition-colors">
                <span>Sectoren</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {sectorenOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
                  <div className="py-2">
                    {sectorenItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Oplossingen Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOplossingenOpen(true)}
              onMouseLeave={() => setOplossingenOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-[#4746a4] transition-colors">
                <span>Oplossingen</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {oplossingenOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
                  <div className="py-2">
                    {oplossingenItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Consult Link */}
            <a 
              href="/consult" 
              className="text-white hover:text-[#4746a4] transition-colors"
            >
              Consult
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-[#4746a4] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}