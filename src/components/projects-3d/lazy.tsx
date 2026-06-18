"use client";

import dynamic from "next/dynamic";

export const ProjectsSceneLazy = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center">
      <span className="text-white/15 text-sm tracking-widest uppercase animate-pulse">
        Loading
      </span>
    </div>
  ),
});
