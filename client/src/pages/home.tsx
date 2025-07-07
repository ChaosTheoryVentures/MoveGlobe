import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "../components/Scene";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { Overlay } from "../components/ui/overlay";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-y-auto" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0">
        <Canvas
          shadows
          camera={{
            position: [3, 2, 6],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "default"
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'transparent'
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Overlay />
        
        {/* Spacer to enable scrolling */}
        <div style={{ height: '150vh' }}></div>
        
        <Footer />
      </div>
    </div>
  );
}