import * as THREE from "three";

/** Evenly distributes n points on the surface of a sphere. */
export function fibonacciSphere(
  n: number,
  radius: number
): [number, number, number][] {
  if (n === 1) return [[0, 0, 0]];
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    return [Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius];
  });
}

/**
 * Arranges n points in a flattened pentagon/ring facing the camera.
 * zJitter adds depth variation so it never looks like a flat 2-D circle.
 */
export function pentagonSpread(
  n: number,
  radius: number
): [number, number, number][] {
  const Z_JITTER = [-0.15, 0.25, -0.05, 0.35, -0.20, 0.10, -0.30, 0.20];
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.52,
      Z_JITTER[i % Z_JITTER.length],
    ];
  });
}

/** Re-usable temp vector — avoids per-frame allocations. */
const _tmp = new THREE.Vector3();

/** Lerps a Vector3 in-place toward a tuple target. */
export function lerpToTuple(
  current: THREE.Vector3,
  target: [number, number, number],
  t: number
): void {
  _tmp.set(target[0], target[1], target[2]);
  current.lerp(_tmp, t);
}

/** Frame-rate–independent lerp factor: same result regardless of FPS. */
export function stableLerp(base: number, delta: number): number {
  return 1 - Math.pow(1 - base, delta * 60);
}
