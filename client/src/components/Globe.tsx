import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create orthographic earth texture with continents and dot grid
  const createOrthographicEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024; // Square for orthographic projection
    const ctx = canvas.getContext('2d')!;
    
    // Fill with base color
    ctx.fillStyle = '#001b54';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
    
    // Create circular mask for globe
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();
    
    // Function to convert normalized coordinates to canvas coordinates
    const normToCanvas = (xNorm: number, yNorm: number) => ({
      x: xNorm * canvas.width,
      y: yNorm * canvas.height
    });
    
    // Draw continents with high-density dots
    const continents = [
      // Africa - Central focus with pronounced west-coast bulge
      { name: 'Africa', anchor: { xNorm: 0.50, yNorm: 0.55 }, density: 'high', 
        shape: [
          [0.48, 0.45], [0.52, 0.45], [0.54, 0.50], [0.52, 0.55], 
          [0.50, 0.65], [0.48, 0.70], [0.46, 0.65], [0.44, 0.55], 
          [0.46, 0.50], [0.48, 0.45]
        ] 
      },
      // Europe - Compact cluster
      { name: 'Europe', anchor: { xNorm: 0.62, yNorm: 0.33 }, density: 'medium',
        shape: [
          [0.60, 0.30], [0.65, 0.30], [0.67, 0.35], [0.65, 0.38], 
          [0.60, 0.38], [0.58, 0.35], [0.60, 0.30]
        ]
      },
      // Middle East - Arabian Peninsula arc
      { name: 'MiddleEast', anchor: { xNorm: 0.70, yNorm: 0.45 }, density: 'medium',
        shape: [
          [0.68, 0.42], [0.72, 0.42], [0.74, 0.47], [0.72, 0.50], 
          [0.68, 0.50], [0.68, 0.42]
        ]
      },
      // South America - Triangular with Brazil bump
      { name: 'SouthAmerica', anchor: { xNorm: 0.25, yNorm: 0.70 }, density: 'medium',
        shape: [
          [0.22, 0.65], [0.28, 0.65], [0.30, 0.72], [0.26, 0.80], 
          [0.22, 0.75], [0.20, 0.70], [0.22, 0.65]
        ]
      },
      // North America Atlantic Rim - Sparse tilted patch
      { name: 'NorthAmericaAtlanticRim', anchor: { xNorm: 0.18, yNorm: 0.25 }, density: 'low',
        shape: [
          [0.15, 0.22], [0.22, 0.22], [0.24, 0.28], [0.20, 0.32], 
          [0.15, 0.30], [0.13, 0.25], [0.15, 0.22]
        ]
      }
    ];
    
    // Draw continent shapes with dots
    continents.forEach(continent => {
      const densityMap = { high: 3, medium: 5, low: 8 };
      const spacing = densityMap[continent.density as keyof typeof densityMap];
      
      // Fill continent area with dots
      continent.shape.forEach(([xNorm, yNorm]) => {
        const { x, y } = normToCanvas(xNorm, yNorm);
        
        // Add dots in area around each point
        for (let dx = -spacing * 3; dx <= spacing * 3; dx += spacing) {
          for (let dy = -spacing * 3; dy <= spacing * 3; dy += spacing) {
            const dotX = x + dx;
            const dotY = y + dy;
            
            // Check if point is within continent shape (simplified)
            if (dotX >= 0 && dotX < canvas.width && dotY >= 0 && dotY < canvas.height) {
              // Calculate distance from center for vignette effect
              const distFromCenter = Math.sqrt(
                Math.pow(dotX - centerX, 2) + Math.pow(dotY - centerY, 2)
              );
              const normalizedDist = distFromCenter / radius;
              
              // Vignette toward center (brighter at rim)
              const vignetteIntensity = Math.max(0.4, 1 - normalizedDist * 0.6);
              
              // Draw white dot with blue halo
              ctx.fillStyle = `rgba(0, 168, 255, ${vignetteIntensity * 0.8})`;
              ctx.beginPath();
              ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.fillStyle = `rgba(255, 255, 255, ${vignetteIntensity})`;
              ctx.beginPath();
              ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });
    });
    
    // Add regular grid of ocean dots
    const oceanDotSpacing = 6;
    for (let x = oceanDotSpacing; x < canvas.width; x += oceanDotSpacing) {
      for (let y = oceanDotSpacing; y < canvas.height; y += oceanDotSpacing) {
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        if (distFromCenter < radius) {
          const normalizedDist = distFromCenter / radius;
          const vignetteIntensity = Math.max(0.2, 1 - normalizedDist * 0.8);
          
          // Smaller, dimmer dots for ocean
          ctx.fillStyle = `rgba(0, 168, 255, ${vignetteIntensity * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    ctx.restore();
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const orthographicEarthTexture = createOrthographicEarthTexture();
  
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
          map={orthographicEarthTexture}
          transparent={false}
        />
      </mesh>
      
      {/* Rim glow - 2% thickness as specified */}
      <mesh scale={[2.04, 2.04, 2.04]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x007bff)}
          transparent={true}
          opacity={0.8}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Under glow - subtle blue underglow */}
      <mesh scale={[2.02, 2.02, 2.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x0094ff)}
          transparent={true}
          opacity={0.6}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
