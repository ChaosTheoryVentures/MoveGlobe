import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Oplossingen() {
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
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Oplossingen
          </h1>
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Agentische AI Systemen</h3>
              <p className="text-white/80 mb-6">
                Autonome AI-agenten die complexe taken uitvoeren zonder menselijke tussenkomst.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Intelligente Automatisering</h4>
                  <p className="text-white/70 text-sm">Complexe workflows en besluitvorming</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Zelflerend Systeem</h4>
                  <p className="text-white/70 text-sm">Voortdurende verbetering en optimalisatie</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Multi-Agent Samenwerking</h4>
                  <p className="text-white/70 text-sm">Gecoördineerde AI-agenten voor complexe taken</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Data Analytics & Insights</h3>
              <p className="text-white/80 mb-6">
                Geavanceerde data-analyse voor actionable business intelligence.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Predictive Analytics</h4>
                  <p className="text-white/70">Voorspel trends en gedrag met machine learning modellen</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Real-time Dashboards</h4>
                  <p className="text-white/70">Live inzichten en monitoring van key metrics</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Process Automation</h3>
              <p className="text-white/80 mb-6">
                Volledige automatisering van bedrijfsprocessen voor maximale efficiëntie.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#4746a4]/20 text-[#4746a4] px-3 py-1 rounded-full text-sm">Workflow Automation</span>
                <span className="bg-[#4746a4]/20 text-[#4746a4] px-3 py-1 rounded-full text-sm">Document Processing</span>
                <span className="bg-[#4746a4]/20 text-[#4746a4] px-3 py-1 rounded-full text-sm">Customer Service Bots</span>
                <span className="bg-[#4746a4]/20 text-[#4746a4] px-3 py-1 rounded-full text-sm">Integration Solutions</span>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}