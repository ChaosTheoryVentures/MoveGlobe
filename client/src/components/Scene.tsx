import { OrbitControls, Stars } from "@react-three/drei";
import { Globe } from "./Globe";
import { Lights } from "./Lights";
import { FallingStars } from "./FallingStars";
import { LandDots } from "./LandDots";

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
      
      {/* Continental Outlines */}
      <LandDots />
      
      {/* Falling Stars */}
      <FallingStars />
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        target={[0, 0, 0]}
        autoRotate={false}
        autoRotateSpeed={0}
      />
    </>
  );
}
