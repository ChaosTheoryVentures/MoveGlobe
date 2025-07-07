import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a realistic Earth texture with continents and digital overlay
  const createEarthWithDataOverlay = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create base ocean gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#001122');   // Dark navy at poles
    oceanGradient.addColorStop(0.5, '#002244'); // Medium navy at equator
    oceanGradient.addColorStop(1, '#001122');   // Dark navy at poles
    
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simplified continental shapes
    const continents = [
      // North America
      { x: 150, y: 150, width: 200, height: 180, shape: 'irregular' },
      // South America
      { x: 220, y: 280, width: 80, height: 200, shape: 'triangle' },
      // Europe
      { x: 450, y: 120, width: 80, height: 60, shape: 'irregular' },
      // Africa
      { x: 470, y: 180, width: 100, height: 220, shape: 'oval' },
      // Asia
      { x: 550, y: 80, width: 280, height: 200, shape: 'irregular' },
      // Australia
      { x: 750, y: 350, width: 120, height: 80, shape: 'oval' },
    ];
    
    // Draw continents with realistic colors
    continents.forEach(continent => {
      ctx.fillStyle = '#0a4d2a'; // Dark green for land
      ctx.beginPath();
      
      if (continent.shape === 'oval') {
        ctx.ellipse(continent.x + continent.width/2, continent.y + continent.height/2, 
                   continent.width/2, continent.height/2, 0, 0, Math.PI * 2);
      } else if (continent.shape === 'triangle') {
        ctx.moveTo(continent.x + continent.width/2, continent.y);
        ctx.lineTo(continent.x, continent.y + continent.height);
        ctx.lineTo(continent.x + continent.width, continent.y + continent.height);
        ctx.closePath();
      } else {
        // Irregular shape - simplified continent outline
        ctx.moveTo(continent.x, continent.y + continent.height/2);
        ctx.quadraticCurveTo(continent.x + continent.width/4, continent.y, 
                            continent.x + continent.width/2, continent.y + continent.height/4);
        ctx.quadraticCurveTo(continent.x + continent.width, continent.y + continent.height/3, 
                            continent.x + continent.width, continent.y + continent.height/2);
        ctx.quadraticCurveTo(continent.x + continent.width * 0.8, continent.y + continent.height, 
                            continent.x + continent.width/2, continent.y + continent.height);
        ctx.quadraticCurveTo(continent.x + continent.width/4, continent.y + continent.height * 0.8, 
                            continent.x, continent.y + continent.height/2);
        ctx.closePath();
      }
      ctx.fill();
    });
    
    // Add ice caps
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, 30); // North pole
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30); // South pole
    
    // Add digital data grid overlay
    const dotSpacing = 20;
    const dotRadius = 1.5;
    
    for (let x = dotSpacing; x < canvas.width; x += dotSpacing) {
      for (let y = dotSpacing; y < canvas.height; y += dotSpacing) {
        // Calculate distance from center for intensity variation
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const normalizedDist = distFromCenter / (Math.max(canvas.width, canvas.height) / 2);
        
        // Brightest at rim, fading toward center
        const intensity = Math.max(0.2, 1 - normalizedDist * 0.6);
        
        ctx.fillStyle = `rgba(0, 114, 255, ${intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Add subtle grid lines for tech feel
    ctx.strokeStyle = 'rgba(0, 96, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Longitude lines
    for (let x = 0; x < canvas.width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Latitude lines
    for (let y = 0; y < canvas.height; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const earthTexture = createEarthWithDataOverlay();
  
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
          map={earthTexture}
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
