import { Stars } from "@react-three/drei";

export function StarsBackground() {
  return (
    <Stars
      radius={300}
      depth={60}
      count={20000}
      factor={7}
      saturation={0}
      fade={true}
    />
  );
}