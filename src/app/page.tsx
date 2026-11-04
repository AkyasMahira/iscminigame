"use client";

import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import ProfileSection from "@/components/home/ProfileSection";
import { FILTERS } from "@/components/home/data";

export default function Home() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [q, setQ] = useState("");

  return (
    <div className="min-h-screen text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-6">
        <Navbar />
        <Hero q={q} onQuery={setQ} />
        <ProfileSection q={q} filter={filter} onFilter={setFilter} />
        <footer className="mt-16 text-center text-[10px] font-bold">
          © 2026 All rights reserved by ISC Project
        </footer>
      </div>
    </div>
  );
}
