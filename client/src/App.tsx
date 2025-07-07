import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { Interface } from "./components/ui/interface";
import { Navbar } from "./components/ui/navbar";
import { Footer } from "./components/ui/footer";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)' }}>
      <Navbar />
      <Canvas
        shadows
        camera={{
          position: [0, 0, 8],
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
      <Interface />
      <Footer />
    </div>
  );
}

export default App;
