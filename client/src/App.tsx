import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { Footer } from "./components/ui/footer";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)',
      overflow: 'hidden'
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
      
      <Footer />
    </div>
  );
}

export default App;
