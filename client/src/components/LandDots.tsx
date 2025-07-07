import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// Helper function to convert lat/lon to 3D coordinates
function latLonToVector3(lat: number, lon: number, radius = 2.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface LandDotsProps {
  url?: string;
  radius?: number;
}

export function LandDots({ url = "/landDots.json", radius = 2.02 }: LandDotsProps) {
  const [coords, setCoords] = useState<Array<[number, number]>>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const obj = useMemo(() => new THREE.Object3D(), []);

  // Load lat/lon pairs once
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setCoords)
      .catch((err) => console.error("❌ Could not load landDots:", err));
  }, [url]);

  // Update instanced mesh positions when coords change
  useEffect(() => {
    if (!meshRef.current || coords.length === 0) return;
    
    coords.forEach(([lat, lon], i) => {
      const v = latLonToVector3(lat, lon, radius);
      obj.position.copy(v);
      obj.updateMatrix();
      meshRef.current!.setMatrixAt(i, obj.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [coords, radius, obj]);

  if (coords.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, coords.length]} frustumCulled={false}>
      <sphereGeometry args={[0.008, 6, 6]} />
      <meshBasicMaterial 
        color={0x0072ff} 
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
}