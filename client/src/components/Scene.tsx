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
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  );
}
