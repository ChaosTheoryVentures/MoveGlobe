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
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        rotateSpeed={0.4}
        zoomSpeed={0.6}
        minDistance={4}
        maxDistance={15}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        target={[0, 0, 0]}
        autoRotate={false}
        autoRotateSpeed={0}
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
