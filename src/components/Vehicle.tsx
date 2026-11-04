"use client";
import { byId, colorOf } from "@/lib/catalog";
import { useProfile } from "@/store/game";
import Model from "./Model";

export default function Vehicle() {
  const { equipped } = useProfile();
  const c = colorOf(equipped.car);
  const glb = byId(equipped.car)?.glb;
  return (
    <group position={[6, 0, 0]}>
      <Model glb={glb} fallback={
        <group>
          <mesh position={[0, 0.4, 0]} castShadow><boxGeometry args={[1.1, 0.4, 2.3]} /><meshStandardMaterial color={c} /></mesh>
          <mesh position={[0, 0.78, -0.1]} castShadow><boxGeometry args={[0.95, 0.36, 1.2]} /><meshStandardMaterial color="#a9c7e8" /></mesh>
          {[[-0.55, 0.75], [0.55, 0.75], [-0.55, -0.75], [0.55, -0.75]].map(([x, z]) => (
            <mesh key={`${x}${z}`} position={[x, 0.2, z]} rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} /><meshStandardMaterial color="#222" />
            </mesh>
          ))}
        </group>
      } />
    </group>
  );
}
