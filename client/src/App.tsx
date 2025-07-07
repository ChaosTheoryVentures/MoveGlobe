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
      

    </div>
  );
}

export default App;
