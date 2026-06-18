"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { useProjectStore } from "./store";
import { lerpToTuple, stableLerp } from "./utils";
import { LERP_ORB } from "./constants";
import type { Project } from "@/lib/data";

interface ProjectOrbProps {
  project: Project;
  targetPosition: [number, number, number];
  color: string;
  index: number;
  /** Shared drag-detection ref from OrbCluster — prevents clicks during drags. */
  hasDragged: React.MutableRefObject<boolean>;
}

export function ProjectOrb({
  project,
  targetPosition,
  color,
  index,
  hasDragged,
}: ProjectOrbProps) {
  const groupRef    = useRef<THREE.Group>(null);
  const matRef      = useRef<THREE.MeshPhysicalMaterial>(null);
  const haloMatRef  = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef    = useRef<THREE.PointLight>(null);

  // Stable color object — avoid recreating every render
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  // Per-frame animation state (all refs to avoid re-renders)
  const curPos      = useRef(new THREE.Vector3(...targetPosition));
  const curScale    = useRef(1);
  const curEmit     = useRef(0.12);
  const curOpacity  = useRef(1);
  const curHalo     = useRef(0.07);
  const curLight    = useRef(0.5);
  const time        = useRef(index * 1.4); // stagger float phase per orb

  // Store selectors that cause a single re-render on mode change (for label)
  const showLabel  = useProjectStore((s) => s.mode === "exploring");
  const setHovered = useProjectStore((s) => s.setHovered);
  const select     = useProjectStore((s) => s.select);

  useFrame((_, delta) => {
    if (!groupRef.current || !matRef.current || !haloMatRef.current) return;

    const { mode, hoveredId, selectedId } = useProjectStore.getState();
    const isSelected = selectedId === project.id;
    const isOther    = selectedId !== null && !isSelected;
    // Hover effects only active once the cluster has been opened (exploring mode)
    const activeHover = hoveredId === project.id && mode === "exploring";

    time.current += delta;
    const t = stableLerp(LERP_ORB, delta);

    // ── Target values ──────────────────────────────────────────────────────
    const tgtScale   = isSelected ? 1.5  : activeHover ? 1.18 : 1.0;
    const tgtEmit    = isSelected ? 0.95 : activeHover ? 0.65 : 0.12;
    const tgtOpacity = isOther ? 0.2 : 1.0;
    const tgtHalo    = isSelected ? 0.32 : activeHover ? 0.22 : 0.07;
    const tgtLight   = isSelected ? 3.5  : activeHover ? 2.2  : 0.5;

    // ── Lerp ───────────────────────────────────────────────────────────────
    curScale.current   = THREE.MathUtils.lerp(curScale.current,   tgtScale,   t);
    curEmit.current    = THREE.MathUtils.lerp(curEmit.current,    tgtEmit,    t);
    curOpacity.current = THREE.MathUtils.lerp(curOpacity.current, tgtOpacity, t);
    curHalo.current    = THREE.MathUtils.lerp(curHalo.current,    tgtHalo,    t);
    curLight.current   = THREE.MathUtils.lerp(curLight.current,   tgtLight,   t);

    // ── Apply material ─────────────────────────────────────────────────────
    matRef.current.emissiveIntensity = curEmit.current;
    matRef.current.opacity           = curOpacity.current;
    haloMatRef.current.opacity       = curHalo.current;
    if (lightRef.current) lightRef.current.intensity = curLight.current;

    // ── Position: lerp toward target + floating offset ─────────────────────
    lerpToTuple(curPos.current, targetPosition, t * 0.75);

    groupRef.current.scale.setScalar(curScale.current);
    groupRef.current.position.copy(curPos.current);

    // Float — suppressed for focused/selected orbs so they stay centered
    if (!isSelected && !isOther) {
      groupRef.current.position.y += Math.sin(time.current * 0.75) * 0.07;
    }


    // Slow idle rotation
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x  = Math.sin(time.current * 0.28) * 0.07;
  });

  // ── Event handlers ────────────────────────────────────────────────────────
  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      const { mode } = useProjectStore.getState();
      if (mode === "exploring") {
        setHovered(project.id);
        document.body.style.cursor = "pointer";
      }
    },
    [project.id, setHovered]
  );

  const onPointerOut = useCallback(() => {
    setHovered(null);
    document.body.style.cursor = "auto";
  }, [setHovered]);

  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (hasDragged.current) return; // drag, not a click
      const { mode } = useProjectStore.getState();
      if (mode === "exploring") {
        e.stopPropagation(); // prevent group onClick from also firing
        select(project.id);
      }
      // In idle mode: don't stop propagation — event bubbles to OrbCluster
      // group which handles the idle → exploring expansion.
    },
    [project.id, select, hasDragged]
  );

  // Shared geometries — created once per orb instance
  const orbGeo  = useMemo(() => new THREE.SphereGeometry(0.5, 48, 48), []);
  const haloGeo = useMemo(() => new THREE.SphereGeometry(0.7,  32, 32), []);

  return (
    <group ref={groupRef}>
      {/* ── Core orb ───────────────────────────────────────────────────── */}
      <mesh
        geometry={orbGeo}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <meshPhysicalMaterial
          ref={matRef}
          color={colorObj}
          emissive={colorObj}
          emissiveIntensity={0.12}
          roughness={0.06}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transparent
          opacity={1}
        />
      </mesh>

      {/* ── Glow halo ──────────────────────────────────────────────────── */}
      <mesh geometry={haloGeo}>
        <meshBasicMaterial
          ref={haloMatRef}
          color={colorObj}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Per-orb coloured point light ───────────────────────────────── */}
      <pointLight
        ref={lightRef}
        color={colorObj}
        intensity={0.5}
        distance={3.5}
        decay={2}
      />

      {/* ── Project name label ─────────────────────────────────────────── */}
      {showLabel && (
        <Html
          center
          position={[0, 0.92, 0]}
          distanceFactor={9}
          style={{ pointerEvents: "none" }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              userSelect: "none",
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
              fontFamily: "inherit",
              margin: 0,
            }}
          >
            {project.title}
          </p>
        </Html>
      )}
    </group>
  );
}
