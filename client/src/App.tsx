import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}>
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "default"
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-2xl font-bold mb-2">Earth Globe</h1>
        <p className="text-sm opacity-80">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}

export default App;
