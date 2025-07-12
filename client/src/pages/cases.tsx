import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";

export default function Cases() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Case Studies
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">Process Automation</h3>
              <p className="text-white/80 mb-4">
                Automated customer service and inventory management systems, 
                reducing response times by 80% and increasing customer satisfaction.
              </p>
              <div className="text-[#4746a4] font-semibold">60% Cost Reduction</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">Data Analytics Platform</h3>
              <p className="text-white/80 mb-4">
                Implemented AI-driven analysis system for improved 
                prediction accuracy and performance optimization.
              </p>
              <div className="text-[#4746a4] font-semibold">35% Better ROI</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">Resource Optimization</h3>
              <p className="text-white/80 mb-4">
                Streamlined scheduling and resource allocation systems, 
                improving operational efficiency and service quality.
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