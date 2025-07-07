import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load the authentic landmask texture
  const landTexture = useTexture("/land_dotted.png");
  
  // Create enhanced digital earth texture using the authentic landmask
  const createDigitalEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create radial gradient base from dark navy center to brighter blue at edges
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) / 2;
    
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, '#010814');    // Near-black navy core
    gradient.addColorStop(0.6, '#001a3d');  // Deep navy
    gradient.addColorStop(0.8, '#003d7a');  // Medium blue
    gradient.addColorStop(1, '#0060ff');    // Electric blue rim
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const digitalEarthTexture = createDigitalEarthTexture();
  
  // Configure the land texture
  landTexture.wrapS = landTexture.wrapT = THREE.RepeatWrapping;
  
  // Continuous rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Rotate around Y axis
    }
  });
  
  return (
    <group>
      {/* Main Digital Earth sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          map={landTexture}
          transparent={false}
        />
      </mesh>
      
      {/* Electric blue rim glow - Main halo */}
      <mesh scale={[2.08, 2.08, 2.08]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x0060ff)}
          transparent={true}
          opacity={0.6}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Electric blue rim glow - Outer halo */}
      <mesh scale={[2.18, 2.18, 2.18]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x0060ff)}
          transparent={true}
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Subtle inner rim highlight */}
      <mesh scale={[2.02, 2.02, 2.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x0072ff)}
          transparent={true}
          opacity={0.2}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
