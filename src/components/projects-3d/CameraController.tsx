"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useProjectStore } from "./store";
import { projects } from "@/lib/data";
import { pentagonSpread, stableLerp } from "./utils";
import {
  CAMERA_Z_IDLE,
  CAMERA_Z_EXPLORING,
  CAMERA_Z_FOCUSED,
  SPREAD_RADIUS,
  LERP_CAMERA,
} from "./constants";

export function CameraController() {
  const { camera } = useThree();

  const targetPos    = useRef(new THREE.Vector3(0, 0, CAMERA_Z_IDLE));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Subscribe to the store — updates refs without causing re-renders
    const unsub = useProjectStore.subscribe(({ mode, selectedId }) => {
      if (mode === "idle") {
        targetPos.current.set(0, 0, CAMERA_Z_IDLE);
        targetLookAt.current.set(0, 0, 0);
      } else if (mode === "exploring") {
        targetPos.current.set(0, 0.3, CAMERA_Z_EXPLORING);
        targetLookAt.current.set(0, 0, 0);
      } else if ((mode === "focused" || mode === "detail") && selectedId) {
        // Selected orb animates to world origin in focused mode
        targetPos.current.set(0, 0.15, CAMERA_Z_FOCUSED);
        targetLookAt.current.set(0, 0, 0);
      }
    });
    return unsub;
  }, []);

  useFrame((_, delta) => {
    const t = stableLerp(LERP_CAMERA, delta);
    camera.position.lerp(targetPos.current, t);
    currentLookAt.current.lerp(targetLookAt.current, t * 1.3);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
