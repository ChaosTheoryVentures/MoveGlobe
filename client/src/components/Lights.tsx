import * as THREE from "three";

export function Lights() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} color={0x404040} />
      
      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
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
      
      {/* Rim light for atmospheric effect */}
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color={0x88ccff}
      />
      
      {/* Point light for additional highlights */}
      <pointLight
        position={[0, 0, 10]}
        intensity={0.3}
        color={0xffffff}
        distance={20}
        decay={2}
      />
    </>
  );
}
