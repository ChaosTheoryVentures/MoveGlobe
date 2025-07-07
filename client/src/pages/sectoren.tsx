import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Sectoren() {
  return (
    <div className="min-h-screen relative overflow-auto" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10">
        <Navbar />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Sectoren
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Financiële Dienstverlening</h3>
              <p className="text-white/80 mb-4">
                AI-oplossingen voor banken, verzekeraars en beleggingsfondsen.
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• Risicobeoordeling en compliance</li>
                <li>• Fraudedetectie en preventie</li>
                <li>• Geautomatiseerde klantenservice</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Zorg & Welzijn</h3>
              <p className="text-white/80 mb-4">
                Innovatieve AI-toepassingen voor de gezondheidszorg.
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• Patiënt monitoring en diagnostiek</li>
                <li>• Resource planning en scheduling</li>
                <li>• Administratieve automatisering</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Retail & E-commerce</h3>
              <p className="text-white/80 mb-4">
                Slimme oplossingen voor moderne retailers.
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• Voorraadoptimalisatie</li>
                <li>• Gepersonaliseerde aanbevelingen</li>
                <li>• Dynamische prijsstrategieën</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Productie & Logistiek</h3>
              <p className="text-white/80 mb-4">
                Automatisering en optimalisatie van productieprocessen.
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• Predictief onderhoud</li>
                <li>• Supply chain optimalisatie</li>
                <li>• Kwaliteitscontrole systemen</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}