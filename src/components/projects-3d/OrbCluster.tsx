"use client";

import { useMemo, useRef, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { useProjectStore } from "./store";
import { ProjectOrb } from "./ProjectOrb";
import { fibonacciSphere, pentagonSpread, stableLerp } from "./utils";
import { ORB_COLORS, CLUSTER_RADIUS, SPREAD_RADIUS } from "./constants";
import { projects } from "@/lib/data";

export function OrbCluster() {
  const mode       = useProjectStore((s) => s.mode);
  const selectedId = useProjectStore((s) => s.selectedId);

  const groupRef = useRef<THREE.Group>(null);

  // ── Drag state — all refs so useFrame never triggers re-renders ─────
  const isDragging = useRef(false);
  const hasDragged = useRef(false); // distinguishes click from drag
  const lastPtr    = useRef({ x: 0, y: 0 });
  const downPtr    = useRef({ x: 0, y: 0 });
  const rotVel     = useRef({ x: 0, y: 0 });
  const rot        = useRef({ x: 0, y: 0 });

  // ── Document-level listeners so dragging works even when pointer leaves mesh ─
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPtr.current.x;
      const dy = e.clientY - lastPtr.current.y;

      if (Math.hypot(e.clientX - downPtr.current.x, e.clientY - downPtr.current.y) > 5)
        hasDragged.current = true;

      const sens = 0.0068;
      rotVel.current.x = dy * sens;
      rotVel.current.y = dx * sens;
      rot.current.x += dy * sens;
      rot.current.y += dx * sens;
      lastPtr.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "auto";
      // Reset hasDragged AFTER the click event fires (click comes before rAF)
      requestAnimationFrame(() => {
        hasDragged.current = false;
      });
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, []);

  // ── Globe rotation + inertia ────────────────────────────────────────
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const { mode: m } = useProjectStore.getState();

    if (m === "idle" || m === "exploring") {
      if (!isDragging.current) {
        const decay = Math.pow(0.88, delta * 60);
        rotVel.current.x *= decay;
        rotVel.current.y *= decay;
        rot.current.x += rotVel.current.x;
        rot.current.y += rotVel.current.y;
      }
    } else {
      // Smooth-reset rotation so focused orb faces forward
      const t = stableLerp(0.04, delta);
      rot.current.x = THREE.MathUtils.lerp(rot.current.x, 0, t);
      rot.current.y = THREE.MathUtils.lerp(rot.current.y, 0, t);
      rotVel.current.x = 0;
      rotVel.current.y = 0;
    }

    groupRef.current.rotation.x = rot.current.x;
    groupRef.current.rotation.y = rot.current.y;
  });

  // ── Start drag on pointer-down anywhere in the group ─────────────────
  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    const { mode: m } = useProjectStore.getState();
    if (m !== "idle" && m !== "exploring") return;
    isDragging.current = true;
    hasDragged.current = false;
    lastPtr.current  = { x: e.clientX, y: e.clientY };
    downPtr.current  = { x: e.clientX, y: e.clientY };
    rotVel.current   = { x: 0, y: 0 };
    document.body.style.cursor = "grabbing";
  }, []);

  // ── Group click: expand cluster in idle (only if this was not a drag) ─
  const onGroupClick = useCallback(() => {
    if (hasDragged.current) return;
    const { mode: m } = useProjectStore.getState();
    if (m === "idle") useProjectStore.getState().setExploring();
  }, []);

  // ── Target positions per mode ────────────────────────────────────────
  const positions = useMemo<[number, number, number][]>(() => {
    if (mode === "idle")      return fibonacciSphere(projects.length, CLUSTER_RADIUS);
    if (mode === "exploring") return pentagonSpread(projects.length, SPREAD_RADIUS);
    return projects.map((p, i) => {
      if (p.id === selectedId) return [0, 0, 0];
      const angle = (i / projects.length) * Math.PI * 2;
      return [Math.cos(angle) * 4.4, Math.sin(angle) * 1.8, -2.5];
    });
  }, [mode, selectedId]);

  return (
    <group ref={groupRef} onPointerDown={onPointerDown} onClick={onGroupClick}>
      {/*
       * Invisible bounding sphere — two purposes:
       *   idle:      wider hit area (gap between clustered orbs) + grab cursor
       *   exploring: catch-all so dragging from empty space between spread orbs works
       */}
      {mode === "idle" && (
        <mesh
          onPointerOver={() => {
            if (!isDragging.current) document.body.style.cursor = "grab";
          }}
          onPointerOut={() => {
            if (!isDragging.current) document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[2.2, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      {mode === "exploring" && (
        <mesh>
          <sphereGeometry args={[5.5, 16, 16]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {projects.map((project, i) => (
        <ProjectOrb
          key={project.id}
          project={project}
          targetPosition={positions[i]}
          color={ORB_COLORS[project.id] ?? "#ffffff"}
          index={i}
          hasDragged={hasDragged}
        />
      ))}
    </group>
  );
}
