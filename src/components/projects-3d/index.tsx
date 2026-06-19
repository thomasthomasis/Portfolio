"use client";

import { Suspense, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useProjectStore } from "./store";
import { CameraController } from "./CameraController";
import { BackgroundParticles } from "./BackgroundParticles";
import { OrbCluster } from "./OrbCluster";
import { ProjectDetail } from "./ProjectDetail";

function SceneContent() {
  return (
    <>
      <CameraController />

      {/* Scene lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]}   intensity={0.7} color="#ffffff" />
      <pointLight position={[-8, -4, -6]} intensity={0.35} color="#8899ff" />
      <pointLight position={[0, -6, 4]}   intensity={0.2} color="#ffffff" />

      <BackgroundParticles />

      <Suspense fallback={null}>
        <OrbCluster />
      </Suspense>
    </>
  );
}

export function ProjectsScene() {
  const mode = useProjectStore((s) => s.mode);
  const back = useProjectStore((s) => s.back);

  // ── Section-leave auto-collapse timer (3 s) ──────────────────────────
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onSectionEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const onSectionLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      const { mode: m, setIdle } = useProjectStore.getState();
      if (m === "exploring") setIdle();
    }, 3000);
  }, []);

  return (
    <div
      className="relative w-full h-[55vh] sm:h-[60vh] min-h-[320px]"
      onMouseEnter={onSectionEnter}
      onMouseLeave={onSectionLeave}
      style={{ touchAction: "none" }}
    >
      {/* Canvas dims when the detail panel is open */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: mode === "detail" ? 0.28 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          onPointerMissed={() => {
            const { mode, back } = useProjectStore.getState();
            // Clicking empty canvas space closes the detail panel.
            // Exploring → idle is handled by the section-leave timer instead,
            // so dragging/clicking the canvas background doesn't collapse the spread.
            if (mode === "focused" || mode === "detail") back();
          }}
        >
          <SceneContent />
        </Canvas>
      </motion.div>

      {/* Hint text — only in idle / exploring */}
      <motion.p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/20 tracking-widest uppercase select-none pointer-events-none"
        animate={{ opacity: mode === "idle" || mode === "exploring" ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {mode === "idle" ? "Click or drag to explore" : "Click a project"}
      </motion.p>

      {/* Project detail panel */}
      <ProjectDetail />
    </div>
  );
}

export default ProjectsScene;
