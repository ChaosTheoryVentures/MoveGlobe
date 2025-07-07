import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lon bounds to spherical coordinates and generate dots
  const createProcuralGlobeTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024; // 2:1 aspect ratio for equirectangular
    const ctx = canvas.getContext('2d')!;
    
    // Fill with base color
    ctx.fillStyle = '#001b54';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const continents = [
      {
        name: "Africa",
        bounds: { latMin: -35, latMax: 38, lonMin: -17, lonMax: 52 },
        density: "high"
      },
      {
        name: "Europe", 
        bounds: { latMin: 35, latMax: 71, lonMin: -25, lonMax: 40 },
        density: "medium"
      },
      {
        name: "Asia",
        bounds: { latMin: 0, latMax: 77, lonMin: 26, lonMax: 180 },
        density: "medium"
      },
      {
        name: "North America",
        bounds: { latMin: 7, latMax: 83, lonMin: -169, lonMax: -52 },
        density: "medium"
      },
      {
        name: "South America",
        bounds: { latMin: -56, latMax: 13, lonMin: -81, lonMax: -34 },
        density: "medium"
      },
      {
        name: "Oceania",
        bounds: { latMin: -48, latMax: 0, lonMin: 112, lonMax: 180 },
        density: "low"
      },
      {
        name: "Antarctica",
        bounds: { latMin: -90, latMax: -60, lonMin: -180, lonMax: 180 },
        density: "low"
      },
      {
        name: "Greenland",
        bounds: { latMin: 58, latMax: 83, lonMin: -73, lonMax: -12 },
        density: "low"
      }
    ];

    // Convert lat/lon to canvas coordinates
    const latLonToCanvas = (lat: number, lon: number) => {
      const x = ((lon + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      return { x, y };
    };

    // Generate dots for each continent
    continents.forEach(continent => {
      const densityMap = { high: 4, medium: 6, low: 12 };
      const spacing = densityMap[continent.density as keyof typeof densityMap];
      
      const { latMin, latMax, lonMin, lonMax } = continent.bounds;
      
      // Generate dots within bounds using Poisson-disk-like sampling
      for (let lat = latMin; lat <= latMax; lat += spacing * 0.1) {
        for (let lon = lonMin; lon <= lonMax; lon += spacing * 0.1) {
          // Add some randomness for natural distribution
          if (Math.random() < 0.6) {
            const jitteredLat = lat + (Math.random() - 0.5) * spacing * 0.05;
            const jitteredLon = lon + (Math.random() - 0.5) * spacing * 0.05;
            
            const { x, y } = latLonToCanvas(jitteredLat, jitteredLon);
            
            // Calculate falloff toward core (center of texture)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const distFromCenter = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
            const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
            const normalizedDist = distFromCenter / maxDist;
            
            // Falloff toward core - brighter at edges
            const falloffIntensity = Math.max(0.3, 1 - normalizedDist * 0.7);
            
            // Draw blue halo first
            ctx.fillStyle = `rgba(0, 180, 255, ${falloffIntensity * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw white dot center
            ctx.fillStyle = `rgba(255, 255, 255, ${falloffIntensity})`;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    });
    
    // Add sparse ocean dots
    for (let lat = -80; lat <= 80; lat += 8) {
      for (let lon = -180; lon <= 180; lon += 8) {
        if (Math.random() < 0.2) { // Very sparse
          const { x, y } = latLonToCanvas(lat, lon);
          
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
          const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
          const normalizedDist = distFromCenter / maxDist;
          const falloffIntensity = Math.max(0.1, 1 - normalizedDist * 0.9);
          
          // Tiny ocean dots
          ctx.fillStyle = `rgba(0, 180, 255, ${falloffIntensity * 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const proceduralGlobeTexture = createProcuralGlobeTexture();
  
  // Rotation: one full turn every 30 seconds (linear easing)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (Math.PI * 2) / 30; // 360° in 30 seconds
    }
  });
  
  return (
    <group>
      {/* Main Globe sphere - radius 1.0 */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshBasicMaterial
          map={proceduralGlobeTexture}
          transparent={false}
        />
      </mesh>
      
      {/* Rim glow - 2% thickness for radius 1.0 */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x007bff)}
          transparent={true}
          opacity={1.0}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Ground glow - blue underglow */}
      <mesh scale={[1.01, 1.01, 1.01]}>
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
