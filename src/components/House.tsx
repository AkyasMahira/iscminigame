"use client";
import { byId } from "@/lib/catalog";
import { useGame, useProfile } from "@/store/game";
import Furniture from "./Furniture";

const snap = (v: number) => Math.max(-3.5, Math.min(3.5, Math.round(v * 2) / 2));

export default function House() {
  const { placed } = useProfile();
  const visiting = useGame((s) => !!s.visiting);
  const building = useGame((s) => !s.visiting && s.sheet === "build");
  const { place, walkTo, removePlaced } = useGame.getState();

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow
        onClick={(e) => {
          if (e.delta > 4 || visiting) return;
          const x = snap(e.point.x), z = snap(e.point.z);
          if (building) place(x, z); else walkTo(x, z);
        }}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#d9c9a8" />
      </mesh>
      <gridHelper args={[8, 16, "#999999", "#bbbbbb"]} position-y={0.01} visible={building} />
      <mesh position={[0, 0.6, -4]}><boxGeometry args={[8.2, 1.2, 0.2]} /><meshStandardMaterial color="#f4efe6" /></mesh>
      <mesh position={[-4, 0.6, 0]}><boxGeometry args={[0.2, 1.2, 8]} /><meshStandardMaterial color="#efe8dc" /></mesh>
      {placed.map((p) => {
        const item = byId(p.itemId);
        if (!item) return null;
        return (
          <group key={p.id} position={[p.x, 0, p.z]}
            onClick={(e) => { if (building) { e.stopPropagation(); removePlaced(p.id); } }}>
            <Furniture item={item} />
          </group>
        );
      })}
    </group>
  );
}
