import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a futuristic digital earth texture with data point grid
  const createDigitalEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create radial gradient from dark navy center to brighter blue at edges
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
    
    // Add regular grid of data points (dots)
    const dotSpacing = 24;
    const dotRadius = 2;
    
    for (let x = dotSpacing; x < canvas.width; x += dotSpacing) {
      for (let y = dotSpacing; y < canvas.height; y += dotSpacing) {
        // Calculate distance from center for intensity variation
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const normalizedDist = distFromCenter / radius;
        
        // Brightest at rim, fading toward center
        const intensity = Math.max(0.3, 1 - normalizedDist * 0.7);
        
        ctx.fillStyle = `rgba(0, 114, 255, ${intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const digitalEarthTexture = createDigitalEarthTexture();
  
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
          map={digitalEarthTexture}
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
