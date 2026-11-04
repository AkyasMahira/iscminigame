"use client";
import { useEffect } from "react";
import Scene from "./Scene";
import Hud from "./Hud";
import Sheets from "./Sheets";
import { useGame } from "@/store/game";

export default function Game() {
  const ready = useGame((s) => s.ready);
  useEffect(() => { useGame.getState().init(); }, []);
  if (!ready) return (
    <div className="grid h-dvh place-items-center bg-bg p-6">
      <div className="w-64 rounded-card border-2 border-ink bg-paper p-4 shadow-brutal-lg">
        <p className="mb-2 font-bold">Memuat…</p>
        <div className="h-3 overflow-hidden rounded-chip border-2 border-ink bg-bg">
          <div className="h-full w-1/2 animate-pulse bg-yellow motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-bg">
      <Scene /><Hud /><Sheets />
    </main>
  );
}
