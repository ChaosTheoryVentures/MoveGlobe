import * as THREE from "three";

export function Lights() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.2} color={0x404040} />
      
      {/* Primary highlight at 10 o'clock position */}
      <directionalLight
        position={[-5, 8, 5]}
        intensity={0.9}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Secondary highlight at 4 o'clock position */}
      <directionalLight
        position={[8, -5, 5]}
        intensity={0.7}
        color={0xffffff}
      />
      
      {/* Under glow - blue underglow from below */}
      <directionalLight
        position={[0, -8, -5]}
        intensity={0.6}
        color={0x0094ff}
      />
      
      {/* Subtle rim lighting */}
      <pointLight
        position={[0, 0, 10]}
        intensity={0.3}
        color={0x007bff}
        distance={20}
        decay={2}
      />
    </>
  );
}
