import type { Item } from "@/lib/catalog";
import Model from "./Model";

const M = ({ c }: { c: string }) => <meshStandardMaterial color={c} />;

function Primitive({ type }: { type?: Item["furn"] }) {
  switch (type) {
    case "sofa": return (
      <group>
        <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[1.6, 0.5, 0.8]} /><M c="#8e6e53" /></mesh>
        <mesh position={[0, 0.65, -0.3]} castShadow><boxGeometry args={[1.6, 0.5, 0.2]} /><M c="#7a5c44" /></mesh>
      </group>);
    case "table": return (
      <group>
        <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1.2, 0.08, 0.8]} /><M c="#b08968" /></mesh>
        <mesh position={[0, 0.25, 0]}><boxGeometry args={[0.1, 0.5, 0.1]} /><M c="#8a6a4f" /></mesh>
      </group>);
    case "plant": return (
      <group>
        <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.2, 0.15, 0.4]} /><M c="#c0713b" /></mesh>
        <mesh position={[0, 0.65, 0]} castShadow><sphereGeometry args={[0.3, 16, 16]} /><M c="#3e9b4f" /></mesh>
      </group>);
    case "lamp": return (
      <group>
        <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.03, 0.03, 1.2]} /><M c="#555" /></mesh>
        <mesh position={[0, 1.25, 0]}><coneGeometry args={[0.25, 0.3, 16]} /><M c="#f5e6a8" /></mesh>
      </group>);
    default: return null;
  }
}

export default function Furniture({ item }: { item: Item }) {
  return <Model glb={item.glb} scale={item.scale} fallback={<Primitive type={item.furn} />} />;
}
