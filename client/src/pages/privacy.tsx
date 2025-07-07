import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Privacy() {
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
        <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Privacy Policy
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Protection</h2>
              <p className="text-white/90 mb-6">
                We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
              <p className="text-white/80 mb-4">
                We collect information you provide directly to us, such as when you contact us for consultation services.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Information</h3>
              <p className="text-white/80 mb-4">
                We use the information we collect to provide, maintain, and improve our services and communicate with you.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
              <p className="text-white/80 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-white/80">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}