import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "../components/Scene";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { Overlay } from "../components/ui/overlay";

export default function Home() {
  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)',
      overflow: 'auto'
    }}>
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
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100vh',
          zIndex: 0,
          touchAction: 'none'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      <Overlay />
      <Navbar />
      <Footer />
    </div>
  );
}