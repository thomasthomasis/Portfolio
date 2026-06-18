"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clampMagnitude(x: number, y: number, max: number) {
  const d = Math.sqrt(x * x + y * y);
  if (d <= max) return { x, y };
  return { x: (x / d) * max, y: (y / d) * max };
}

// X position in world-space per section
const SECTION_X: Record<string, number> = {
  hero:       0,
  about:     -2.4,
  skills:     2.4,
  experience:-2.4,
  projects:   2.4,
  contact:    0,
};

export function HeadScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);

    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.6, 6);
    camera.lookAt(0, -0.5, 0);
    setSize();

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(2.5, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99aaff, 0.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    // ── Materials ─────────────────────────────────────────────────────────────
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece6,
      roughness: 0.76,
      metalness: 0.0,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.9,
      metalness: 0.05,
    });

    // ── Head group ────────────────────────────────────────────────────────────
    const headGroup = new THREE.Group();
    headGroup.position.set(0, -0.8, 0);
    scene.add(headGroup);

    // Cranium
    const headMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 72, 72),
      skinMat
    );
    headMesh.scale.set(0.82, 1.0, 0.88);
    headGroup.add(headMesh);

    // Neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.27, 0.34, 0.7, 32),
      skinMat
    );
    neck.position.set(0, -1.26, 0);
    headGroup.add(neck);

    // Shirt collar / body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.72, 0.6, 32),
      darkMat
    );
    body.position.set(0, -1.82, 0);
    headGroup.add(body);

    // Shirt collar ring
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.06, 16, 48),
      darkMat
    );
    collar.position.set(0, -1.54, 0);
    collar.rotation.x = Math.PI / 2;
    headGroup.add(collar);

    // ── Eyes ──────────────────────────────────────────────────────────────────
    interface EyeRig {
      anchor: THREE.Group;
      irisGroup: THREE.Group;
    }

    function makeEye(xPos: number): EyeRig {
      const anchor = new THREE.Group();
      anchor.position.set(xPos, 0.14, 0);
      headGroup.add(anchor);

      // Sclera
      const sclera = new THREE.Mesh(
        new THREE.SphereGeometry(0.152, 40, 40),
        new THREE.MeshStandardMaterial({
          color: 0xfaf9f8,
          roughness: 0.18,
          metalness: 0.0,
        })
      );
      sclera.position.set(0, 0, 0.77);
      anchor.add(sclera);

      // Iris group — moves to track cursor
      const irisGroup = new THREE.Group();
      irisGroup.position.set(0, 0, 0.81);
      anchor.add(irisGroup);

      // Iris
      const iris = new THREE.Mesh(
        new THREE.SphereGeometry(0.086, 36, 36),
        new THREE.MeshStandardMaterial({
          color: 0x1a2d70,
          roughness: 0.12,
          metalness: 0.08,
        })
      );
      irisGroup.add(iris);

      // Pupil
      const pupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 32, 32),
        new THREE.MeshStandardMaterial({
          color: 0x030304,
          roughness: 0.05,
          metalness: 0.2,
        })
      );
      pupil.position.set(0, 0, 0.038);
      irisGroup.add(pupil);

      // Specular highlight
      const highlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 1.0,
          roughness: 0,
        })
      );
      highlight.position.set(0.032, 0.033, 0.072);
      irisGroup.add(highlight);

      return { anchor, irisGroup };
    }

    const leftEye  = makeEye(-0.275);
    const rightEye = makeEye( 0.275);

    // ── Nose ──────────────────────────────────────────────────────────────────
    const noseTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.062, 20, 20),
      skinMat
    );
    noseTip.position.set(0, -0.1, 0.872);
    noseTip.scale.set(0.75, 0.85, 0.65);
    headGroup.add(noseTip);

    // Nose bridge
    const noseBridge = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      skinMat
    );
    noseBridge.position.set(0, 0.04, 0.858);
    noseBridge.scale.set(0.6, 1.4, 0.5);
    headGroup.add(noseBridge);

    // ── Eyebrow ridges (very subtle) ─────────────────────────────────────────
    function makeEyebrow(xPos: number) {
      const brow = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 20, 20),
        skinMat
      );
      brow.position.set(xPos, 0.32, 0.76);
      brow.scale.set(1.6, 0.3, 0.55);
      headGroup.add(brow);
    }
    makeEyebrow(-0.275);
    makeEyebrow( 0.275);

    // ── Animation state ───────────────────────────────────────────────────────
    let mouseNX = 0, mouseNY = 0;
    let curRotY = 0, curRotX = 0;
    let targetRotY = 0, targetRotX = 0;
    let curX = 0, targetX = 0;
    let time = 0;

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseNX =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNY = -((e.clientY / window.innerHeight) * 2 - 1);
      targetRotY = mouseNX * 0.44;
      targetRotX = mouseNY * 0.22;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Section observer ──────────────────────────────────────────────────────
    const sectionEls = document.querySelectorAll("[data-section]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id && SECTION_X[id] !== undefined) {
              targetX = SECTION_X[id];
            }
          }
        });
      },
      { threshold: 0.45 }
    );
    sectionEls.forEach((el) => io.observe(el));

    window.addEventListener("resize", setSize);

    // ── Render loop ───────────────────────────────────────────────────────────
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.012;

      // Smooth lateral drift
      curX = lerp(curX, targetX, 0.036);
      headGroup.position.x = curX;

      // Smooth cursor-driven rotation
      curRotY = lerp(curRotY, targetRotY, 0.052);
      curRotX = lerp(curRotX, targetRotX, 0.052);
      headGroup.rotation.y = curRotY;
      headGroup.rotation.x = curRotX;

      // Gentle idle float
      headGroup.position.y = -0.8 + Math.sin(time * 0.75) * 0.045;

      // Pupil tracking — offset constrained to sclera
      const raw = clampMagnitude(mouseNX * 0.055, mouseNY * 0.048, 0.044);
      leftEye.irisGroup.position.x  = raw.x;
      leftEye.irisGroup.position.y  = raw.y;
      rightEye.irisGroup.position.x = raw.x;
      rightEye.irisGroup.position.y = raw.y;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", setSize);
      io.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {/* Gradient fade so content blends into the 3D canvas */}
      <div
        className="fixed bottom-[44vh] left-0 right-0 h-40 pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 70%, rgb(0,0,0) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        ref={mountRef}
        className="fixed bottom-0 left-0 w-full h-[44vh] pointer-events-none z-50"
        aria-hidden="true"
      />
    </>
  );
}
