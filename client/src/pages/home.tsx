import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "../components/Scene";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { Overlay } from "../components/ui/overlay";
import { useScrollLockWithClass } from "../hooks/useScrollLock";

export default function Home() {
  // Use the custom hook to manage scroll locking with CSS classes
  useScrollLockWithClass(true, 'no-scroll');

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
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
            width: '100%', 
            height: '100%',
            touchAction: 'none'
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Overlay />
        <Navbar />
        <div style={{ flex: 1 }}></div>
        <Footer />
      </div>
    </div>
  );
}