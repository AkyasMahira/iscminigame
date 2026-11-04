"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import House from "./House";
import Avatar from "./Avatar";
import Vehicle from "./Vehicle";

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.5]} shadows camera={{ position: [9, 8, 11], fov: 45 }}>
      <color attach="background" args={["#bfcbff"]} />
      <hemisphereLight args={["#ffffff", "#b8a98a", 0.9]} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
      <Suspense fallback={null}><House /><Avatar /><Vehicle /></Suspense>
      <OrbitControls target={[2, 0.5, 0]} enablePan={false} minDistance={5} maxDistance={20} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
