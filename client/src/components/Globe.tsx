import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load the authentic landmask texture
  const landTexture = useTexture("/land_dotted.png");
  
  // Process the landmask to create darker blue dots
  const processLandTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Wait for texture to load
    if (landTexture.image) {
      canvas.width = landTexture.image.width;
      canvas.height = landTexture.image.height;
      
      // Draw the original image
      ctx.drawImage(landTexture.image, 0, 0);
      
      // Get image data to modify colors
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Process each pixel to make blue areas darker
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is blue (landmass), make it darker blue
        if (b > 200 && r < 100 && g < 150) {
          data[i] = 15;     // Dark blue R
          data[i + 1] = 45; // Dark blue G  
          data[i + 2] = 85; // Dark blue B
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      return new THREE.CanvasTexture(canvas);
    }
    
    return landTexture;
  };
  
  const processedLandTexture = processLandTexture();
  
  // Configure the texture
  processedLandTexture.wrapS = processedLandTexture.wrapT = THREE.RepeatWrapping;
  
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
          map={processedLandTexture}
          transparent={false}
        />
      </mesh>
      
      {/* Smooth atmospheric glow effect */}
      <mesh scale={[2.08, 2.08, 2.08]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x4499ff)}
          transparent={true}
          opacity={0.6}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x3388ff)}
          transparent={true}
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh scale={[2.25, 2.25, 2.25]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x2277ff)}
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
