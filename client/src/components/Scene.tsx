import { OrbitControls, Stars } from "@react-three/drei";
import { Globe } from "./Globe";
import { Lights } from "./Lights";

export function Scene() {
  return (
    <>
      {/* Background Stars */}
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      
      {/* Lighting */}
      <Lights />
      
      {/* Main Globe */}
      <Globe />
      
      {/* Camera Controls - Disabled for scrolling */}
      <OrbitControls
        enabled={false}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minDistance={2.5}
        maxDistance={12}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        target={[0, 0, 0]}
        autoRotate={true}
        autoRotateSpeed={0.5}
        touches={{
          ONE: 2, // Touch rotate
          TWO: 1  // Touch zoom
        }}
        mouseButtons={{
          LEFT: 2,  // Mouse rotate
          MIDDLE: 1, // Mouse zoom
          RIGHT: 0   // Mouse pan disabled
        }}
      />
    </>
  );
}
