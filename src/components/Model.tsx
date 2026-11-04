"use client";
import { Component, Suspense, useMemo, type ReactNode } from "react";
import { useGLTF } from "@react-three/drei";

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

function GLB({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={obj} scale={scale} />;
}

// Render .glb kalau ada; kalau file belum ada / gagal load -> pakai primitif (fallback)
export default function Model({ glb, scale = 1, fallback }: { glb?: string; scale?: number; fallback: ReactNode }) {
  if (!glb) return <>{fallback}</>;
  return (
    <Boundary fallback={fallback}>
      <Suspense fallback={null}><GLB url={glb} scale={scale} /></Suspense>
    </Boundary>
  );
}
