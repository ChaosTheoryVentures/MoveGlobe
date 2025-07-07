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

// Create curved path between two points on sphere
function createCurvedPath(start: THREE.Vector3, end: THREE.Vector3, segments: number = 32): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  
  // Calculate mid-point with elevation for arc effect
  const midPoint = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  
  // Add elevation to mid-point for curved effect
  const distance = start.distanceTo(end);
  const elevation = Math.min(distance * 0.3, 0.8); // Limit elevation
  midPoint.normalize().multiplyScalar(2.01 + elevation);
  
  // Create quadratic bezier curve
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3()
      .copy(start)
      .multiplyScalar((1 - t) * (1 - t))
      .add(midPoint.clone().multiplyScalar(2 * (1 - t) * t))
      .add(end.clone().multiplyScalar(t * t));
    
    points.push(point);
  }
  
  return points;
}

interface Connection {
  from: THREE.Vector3;
  to: THREE.Vector3;
  fromId: string;
  toId: string;
  isToCore: boolean;
}

export function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  
  // Process network data and create 3D positions
  const { nodes, connections } = useMemo(() => {
    const allNodes = new Map();
    const allConnections: Connection[] = [];
    
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
    
    // Create connection lines with metadata
    allNodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach((connId: string) => {
          const targetNode = allNodes.get(connId);
          if (targetNode) {
            allConnections.push({
              from: node.position,
              to: targetNode.position,
              fromId: node.id,
              toId: connId,
              isToCore: connId === "AI-Core"
            });
          }
        });
      }
    });
    
    return { nodes: Array.from(allNodes.values()), connections: allConnections };
  }, []);
  
  useFrame((state, delta) => {
    time.current += delta;
  });
  
  return (
    <group ref={groupRef}>
      {/* Connection lines with different styles */}
      {connections.map((conn, index) => {
        const curvePoints = createCurvedPath(conn.from, conn.to, 16);
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const points = curve.getPoints(32);
        
        return (
          <group key={`${conn.fromId}-${conn.toId}-${index}`}>
            {/* Main connection line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={points.length}
                  array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={conn.isToCore ? 0xff6600 : 0x0072ff}
                transparent={true}
                opacity={conn.isToCore ? 0.7 : 0.5}
                linewidth={conn.isToCore ? 3 : 2}
              />
            </line>
            
            {/* Animated data pulse */}
            <mesh
              position={points[Math.floor((Math.sin(time.current * 2 + index) + 1) * 0.5 * (points.length - 1))]}
              scale={[0.8, 0.8, 0.8]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial
                color={conn.isToCore ? 0xffaa00 : 0x00aaff}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Network nodes with enhanced visuals */}
      {nodes.map((node) => (
        <group key={node.id}>
          {/* Main node */}
          <mesh position={node.position}>
            <sphereGeometry args={[node.isCore ? 0.12 : 0.06, 16, 16]} />
            <meshBasicMaterial
              color={node.isCore ? 0xff6600 : 0x0072ff}
              transparent={true}
              opacity={node.isCore ? 1.0 : 0.9}
            />
          </mesh>
          
          {/* Pulsing glow effect */}
          <mesh 
            position={node.position}
            scale={[
              1 + Math.sin(time.current * 3) * 0.2,
              1 + Math.sin(time.current * 3) * 0.2,
              1 + Math.sin(time.current * 3) * 0.2
            ]}
          >
            <sphereGeometry args={[node.isCore ? 0.16 : 0.08, 16, 16]} />
            <meshBasicMaterial
              color={node.isCore ? 0xff6600 : 0x0072ff}
              transparent={true}
              opacity={node.isCore ? 0.3 : 0.2}
            />
          </mesh>
          
          {/* Outer glow ring */}
          <mesh position={node.position}>
            <sphereGeometry args={[node.isCore ? 0.20 : 0.10, 16, 16]} />
            <meshBasicMaterial
              color={node.isCore ? 0xff6600 : 0x0072ff}
              transparent={true}
              opacity={0.1}
            />
          </mesh>
          
          {/* Data activity indicator */}
          {!node.isCore && (
            <mesh 
              position={node.position.clone().add(new THREE.Vector3(0, 0.08, 0))}
              rotation={[0, time.current * 2, 0]}
            >
              <ringGeometry args={[0.03, 0.05, 8]} />
              <meshBasicMaterial
                color={0x00ffff}
                transparent={true}
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}