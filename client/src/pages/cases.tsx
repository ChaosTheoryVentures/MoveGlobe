import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Cases() {
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
        <div className="pt-24 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Case Studies
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">E-commerce Automation</h3>
              <p className="text-white/80 mb-4">
                Automated customer service and inventory management for a major retailer, 
                reducing response times by 80% and increasing customer satisfaction.
              </p>
              <div className="text-[#4746a4] font-semibold">60% Cost Reduction</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">Financial Analytics</h3>
              <p className="text-white/80 mb-4">
                Implemented AI-driven financial analysis system for investment firm, 
                improving prediction accuracy and portfolio performance.
              </p>
              <div className="text-[#4746a4] font-semibold">35% Better ROI</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">Healthcare Optimization</h3>
              <p className="text-white/80 mb-4">
                Streamlined patient scheduling and resource allocation for healthcare provider, 
                improving efficiency and patient care quality.
              </p>
              <div className="text-[#4746a4] font-semibold">50% Faster Processing</div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}