import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)' }}>
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
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      

    </div>
  );
}

export default App;
