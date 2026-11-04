"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { colorOf } from "@/lib/catalog";
import { useGame, useProfile } from "@/store/game";

// Primitif placeholder. Untuk GLB: ganti isi group dengan <Model glb="/models/avatar.glb" .../> dan swap material per mesh.
export default function Avatar() {
  const { equipped: e } = useProfile();
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const g = root.current, b = body.current;
    if (!g || !b) return;
    const { target, visiting } = useGame.getState();
    const [tx, tz] = visiting ? [0, 2] : target;
    const dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
    const moving = d > 0.05;
    if (moving) {
      const step = Math.min(d, 2.5 * dt);
      g.position.x += (dx / d) * step; g.position.z += (dz / d) * step;
      g.rotation.y = Math.atan2(dx, dz);
    }
    b.position.y = Math.abs(Math.sin(clock.elapsedTime * (moving ? 10 : 2))) * (moving ? 0.06 : 0.02);
  });

  return (
    <group ref={root} position={[0, 0, 2]}>
      <group ref={body}>
        <mesh position={[0, 1.65, 0]} castShadow><sphereGeometry args={[0.25, 32, 32]} /><meshStandardMaterial color={colorOf(e.skin)} /></mesh>
        <mesh position={[0, 1.68, 0]} castShadow><sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={colorOf(e.hair)} /></mesh>
        <mesh position={[0, 1.05, 0]} castShadow><boxGeometry args={[0.6, 0.7, 0.3]} /><meshStandardMaterial color={colorOf(e.shirt)} /></mesh>
        {[-0.4, 0.4].map((x) => (
          <mesh key={x} position={[x, 1.05, 0]} castShadow><capsuleGeometry args={[0.08, 0.45]} /><meshStandardMaterial color={colorOf(e.shirt)} /></mesh>
        ))}
        {[-0.15, 0.15].map((x) => (
          <mesh key={x} position={[x, 0.35, 0]} castShadow><boxGeometry args={[0.25, 0.7, 0.25]} /><meshStandardMaterial color={colorOf(e.pants)} /></mesh>
        ))}
      </group>
    </group>
  );
}
