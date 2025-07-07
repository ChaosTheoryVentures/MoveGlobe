import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Network topology data
const networkData = {
  "aiCore": {
    "id": "AI-Core",
    "role": "single source of truth that every regional node syncs with in real-time"
  },
  "continents": [
    {
      "name": "North America",
      "nodes": [
        { "id": "NA-01", "lat": 49,  "lon": -123, "connections": ["NA-02", "EU-01", "AI-Core"] },
        { "id": "NA-02", "lat": 45,  "lon": -75,  "connections": ["NA-01", "NA-03", "EU-02", "AI-Core"] },
        { "id": "NA-03", "lat": 40,  "lon": -90,  "connections": ["NA-02", "NA-04", "SA-01", "AI-Core"] },
        { "id": "NA-04", "lat": 37,  "lon": -120, "connections": ["NA-03", "NA-05", "OC-01", "AI-Core"] },
        { "id": "NA-05", "lat": 30,  "lon": -100, "connections": ["NA-04", "AI-Core"] }
      ]
    },
    {
      "name": "Europe",
      "nodes": [
        { "id": "EU-01", "lat": 52,  "lon":  13,  "connections": ["EU-02", "EU-03", "NA-01", "AI-Core"] },
        { "id": "EU-02", "lat": 48,  "lon":   2,  "connections": ["EU-01", "EU-03", "NA-02", "AF-01", "AI-Core"] },
        { "id": "EU-03", "lat": 55,  "lon":  -1,  "connections": ["EU-01", "EU-02", "AI-Core"] },
        { "id": "EU-04", "lat": 41,  "lon":  -3,  "connections": ["EU-05", "AF-01", "AI-Core"] },
        { "id": "EU-05", "lat": 60,  "lon":  25,  "connections": ["EU-03", "AS-01", "AI-Core"] }
      ]
    },
    {
      "name": "Asia",
      "nodes": [
        { "id": "AS-01", "lat": 55,  "lon":  37,  "connections": ["AS-02", "EU-05", "AI-Core"] },
        { "id": "AS-02", "lat": 31,  "lon": 116, "connections": ["AS-01", "AS-03", "AI-Core"] },
        { "id": "AS-03", "lat": 35,  "lon": 139, "connections": ["AS-02", "OC-02", "AI-Core"] },
        { "id": "AS-04", "lat": 23,  "lon":  77, "connections": ["AS-02", "AF-02", "AI-Core"] },
        { "id": "AS-05", "lat": 22,  "lon": 114, "connections": ["AS-03", "OC-03", "AI-Core"] }
      ]
    },
    {
      "name": "Africa",
      "nodes": [
        { "id": "AF-01", "lat": 30,  "lon":  31, "connections": ["EU-02", "AF-02", "AI-Core"] },
        { "id": "AF-02", "lat":  0,  "lon":  25, "connections": ["AF-01", "AF-03", "AS-04", "AI-Core"] },
        { "id": "AF-03", "lat": -1,  "lon":  36, "connections": ["AF-02", "AF-04", "AI-Core"] },
        { "id": "AF-04", "lat": -15, "lon":  28, "connections": ["AF-03", "AF-05", "SA-02", "AI-Core"] },
        { "id": "AF-05", "lat": 14,  "lon":  -1, "connections": ["AF-04", "EU-04", "AI-Core"] }
      ]
    },
    {
      "name": "South America",
      "nodes": [
        { "id": "SA-01", "lat":   4, "lon": -74,  "connections": ["SA-02", "NA-03", "AI-Core"] },
        { "id": "SA-02", "lat": -12, "lon": -77,  "connections": ["SA-01", "SA-03", "AF-04", "AI-Core"] },
        { "id": "SA-03", "lat": -23, "lon": -46,  "connections": ["SA-02", "SA-04", "AI-Core"] },
        { "id": "SA-04", "lat": -34, "lon": -58,  "connections": ["SA-03", "SA-05", "AI-Core"] },
        { "id": "SA-05", "lat": -33, "lon": -70,  "connections": ["SA-04", "AI-Core"] }
      ]
    },
    {
      "name": "Oceania",
      "nodes": [
        { "id": "OC-01", "lat": -27, "lon": 153, "connections": ["OC-02", "NA-04", "AI-Core"] },
        { "id": "OC-02", "lat": -33, "lon": 151, "connections": ["OC-01", "AS-03", "AI-Core"] },
        { "id": "OC-03", "lat": -37, "lon": 144, "connections": ["OC-02", "AS-05", "AI-Core"] },
        { "id": "OC-04", "lat": -41, "lon": 174, "connections": ["OC-01", "OC-05", "AI-Core"] },
        { "id": "OC-05", "lat": -17, "lon": 145, "connections": ["OC-04", "AI-Core"] }
      ]
    }
  ]
};

// Convert lat/lon to 3D sphere coordinates
function latLonToCartesian(lat: number, lon: number, radius: number = 2.01): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

export function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const time = useRef(0);
  
  // Process network data and create 3D positions
  const { nodes, connections } = useMemo(() => {
    const allNodes = new Map();
    const allConnections: Array<{from: THREE.Vector3, to: THREE.Vector3}> = [];
    
    // Add AI-Core at center (0,0,0)
    allNodes.set("AI-Core", {
      id: "AI-Core",
      position: new THREE.Vector3(0, 0, 0),
      isCore: true
    });
    
    // Process all continental nodes
    networkData.continents.forEach(continent => {
      continent.nodes.forEach(node => {
        const position = latLonToCartesian(node.lat, node.lon);
        allNodes.set(node.id, {
          id: node.id,
          position,
          connections: node.connections,
          isCore: false
        });
      });
    });
    
    // Create connection lines
    allNodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach((connId: string) => {
          const targetNode = allNodes.get(connId);
          if (targetNode) {
            allConnections.push({
              from: node.position,
              to: targetNode.position
            });
          }
        });
      }
    });
    
    return { nodes: Array.from(allNodes.values()), connections: allConnections };
  }, []);
  
  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    connections.forEach(conn => {
      points.push(conn.from.x, conn.from.y, conn.from.z);
      points.push(conn.to.x, conn.to.y, conn.to.z);
    });
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [connections]);
  
  useFrame((state, delta) => {
    time.current += delta;
    
    // Pulse animation for connections
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time.current * 2) * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={0x0072ff}
          transparent={true}
          opacity={0.4}
        />
      </lineSegments>
      
      {/* Network nodes */}
      {nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[node.isCore ? 0.08 : 0.05, 16, 16]} />
          <meshBasicMaterial
            color={node.isCore ? 0xff6600 : 0x00aaff}
            transparent={true}
            opacity={node.isCore ? 0.9 : 0.8}
          />
          
          {/* Node glow effect */}
          <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
            <sphereGeometry args={[node.isCore ? 0.08 : 0.05, 16, 16]} />
            <meshBasicMaterial
              color={node.isCore ? 0xff6600 : 0x0072ff}
              transparent={true}
              opacity={0.2}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}