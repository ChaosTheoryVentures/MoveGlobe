import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Star {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  opacity: number;
  trail: THREE.Vector3[];
}

export function FallingStars() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create falling stars with pre-calculated random values
  const stars = useMemo(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 50; i++) {
      starArray.push({
        id: i,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          Math.random() * 50 + 20,
          (Math.random() - 0.5) * 100
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          -Math.random() * 0.8 - 0.2,
          (Math.random() - 0.5) * 0.5
        ),
        size: Math.random() * 0.08 + 0.02,
        opacity: Math.random() * 0.8 + 0.2,
        trail: []
      });
    }
    return starArray;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    stars.forEach((star) => {
      // Add current position to trail
      star.trail.push(star.position.clone());
      
      // Keep trail length manageable
      if (star.trail.length > 8) {
        star.trail.shift();
      }
      
      // Update position
      star.position.add(star.velocity.clone().multiplyScalar(delta * 20));
      
      // Reset star if it goes too far down or out of bounds
      if (star.position.y < -30 || Math.abs(star.position.x) > 50 || Math.abs(star.position.z) > 50) {
        star.position.set(
          (Math.random() - 0.5) * 100,
          Math.random() * 20 + 30,
          (Math.random() - 0.5) * 100
        );
        star.velocity.set(
          (Math.random() - 0.5) * 0.5,
          -Math.random() * 0.8 - 0.2,
          (Math.random() - 0.5) * 0.5
        );
        star.trail = [];
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star) => (
        <group key={star.id}>
          {/* Main star point */}
          <mesh position={star.position}>
            <sphereGeometry args={[star.size, 8, 8]} />
            <meshBasicMaterial
              color={0xffffff}
              transparent={true}
              opacity={star.opacity}
            />
          </mesh>
          
          {/* Star trail */}
          {star.trail.map((trailPoint, index) => {
            const trailOpacity = (index / star.trail.length) * star.opacity * 0.6;
            const trailSize = star.size * (0.3 + (index / star.trail.length) * 0.7);
            
            return (
              <mesh key={index} position={trailPoint}>
                <sphereGeometry args={[trailSize, 6, 6]} />
                <meshBasicMaterial
                  color={0xaaccff}
                  transparent={true}
                  opacity={trailOpacity}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}