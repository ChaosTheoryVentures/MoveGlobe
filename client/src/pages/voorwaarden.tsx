import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";

export default function Voorwaarden() {
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Algemene Voorwaarden
            </h1>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">Dienstverlening</h2>
                <p className="text-white/90 mb-6">
                  Deze algemene voorwaarden zijn van toepassing op alle diensten die wij leveren.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Toepasselijkheid</h3>
                <p className="text-white/80 mb-4">
                  Deze voorwaarden zijn van toepassing op alle overeenkomsten tussen MOVE en de opdrachtgever.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Uitvoering van de Opdracht</h3>
                <p className="text-white/80 mb-4">
                  Wij voeren de opdracht uit naar beste kunnen en conform de geldende professionele standaarden.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Aansprakelijkheid</h3>
                <p className="text-white/80 mb-4">
                  Onze aansprakelijkheid is beperkt tot het bedrag dat door onze verzekering wordt uitgekeerd.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Toepasselijk Recht</h3>
                <p className="text-white/80 mb-4">
                  Op deze overeenkomst is het Nederlandse recht van toepassing.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Geheimhouding</h3>
                <p className="text-white/80 mb-4">
                  Beide partijen verplichten zich tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst verkrijgen.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Intellectueel Eigendom</h3>
                <p className="text-white/80 mb-4">
                  Alle intellectuele eigendomsrechten die voortvloeien uit de opdracht berusten bij MOVE, tenzij schriftelijk anders overeengekomen.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Betaling</h3>
                <p className="text-white/80 mb-4">
                  Facturen dienen binnen 30 dagen na factuurdatum te worden voldaan. Bij overschrijding van deze termijn is de opdrachtgever van rechtswege in verzuim.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Opzegging</h3>
                <p className="text-white/80 mb-4">
                  Beide partijen kunnen de overeenkomst schriftelijk opzeggen met inachtneming van een opzegtermijn van één maand.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Wijziging Voorwaarden</h3>
                <p className="text-white/80">
                  MOVE behoudt zich het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen treden in werking na bekendmaking aan de opdrachtgever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}