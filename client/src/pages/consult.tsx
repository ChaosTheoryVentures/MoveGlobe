import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Consult() {
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
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            AI Consult
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-white/90 text-lg mb-6">
              Get expert consultation on implementing AI solutions for your business.
            </p>
            <p className="text-white/80 mb-8">
              Our team of AI specialists will work with you to identify opportunities, 
              develop strategies, and implement cutting-edge AI automations that drive 
              real business results.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Strategy Development</h3>
                <p className="text-white/80">
                  Custom AI strategy aligned with your business goals and operational needs.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Implementation Support</h3>
                <p className="text-white/80">
                  End-to-end support from concept to deployment and optimization.
                </p>
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