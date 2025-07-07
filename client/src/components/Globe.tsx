import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a procedural earth-like texture since we don't have an earth texture
  const createEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a gradient for the earth
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e3c72');    // Deep blue at poles
    gradient.addColorStop(0.3, '#2a5298');  // Ocean blue
    gradient.addColorStop(0.5, '#4a90e2');  // Lighter blue
    gradient.addColorStop(0.7, '#228b22');  // Green for land
    gradient.addColorStop(0.85, '#8b4513'); // Brown for mountains
    gradient.addColorStop(1, '#f4f4f4');    // White for ice caps
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some land masses (simplified)
    ctx.fillStyle = '#228b22';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const earthTexture = createEarthTexture();
  
  // Continuous rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Rotate around Y axis
    }
  });
  
  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          transparent={false}
          shininess={100}
          specular={new THREE.Color(0x111111)}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh scale={[2.1, 2.1, 2.1]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x88ccff)}
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
