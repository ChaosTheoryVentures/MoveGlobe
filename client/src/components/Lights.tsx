import * as THREE from "three";

export function Lights() {
  return (
    <>
      {/* Head light - frontal illumination */}
      <directionalLight
        position={[0, 0, 10]}
        intensity={0.4}
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
      
      {/* Back light - blue illumination from behind */}
      <directionalLight
        position={[0, 0, -10]}
        intensity={0.8}
        color={0x00a8ff}
      />
      
      {/* Ground glow - blue underglow from below */}
      <directionalLight
        position={[0, -8, 0]}
        intensity={0.6}
        color={0x0094ff}
      />
      
      {/* Ambient light for subtle overall illumination */}
      <ambientLight intensity={0.1} color={0x404040} />
    </>
  );
}
