import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Gentle three.js particle field — soft drifting motes in cream/gold tones,
 * rendered additively over the hero. Reacts subtly to pointer movement and
 * slows to a near-still drift on touch devices. Pauses when offscreen.
 */
export default function HeroCanvas({ className = "", paused = false }: { className?: string; paused?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // --- particle field -------------------------------------------------
    const COUNT = 420;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      seeds[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.5 + Math.random() * 1.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute float aSize;
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          float t = uTime * 0.18;
          p.y += sin(t + aSeed * 3.0) * 0.9 + t * 0.35;
          p.x += cos(t * 0.8 + aSeed * 5.0) * 0.7 + uPointer.x * (0.4 + aSize * 0.25);
          p.y = mod(p.y + 6.0, 12.0) - 6.0;
          p.y += uPointer.y * 0.35;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float twinkle = 0.55 + 0.45 * sin(uTime * 0.9 + aSeed * 7.0);
          vAlpha = twinkle * smoothstep(8.0, 2.0, -mv.z);
          gl_PointSize = aSize * uPixelRatio * 26.0 * (1.0 / -mv.z) * twinkle;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.55;
          vec3 cream = vec3(0.965, 0.949, 0.929);
          vec3 gold  = vec3(0.788, 0.663, 0.42);
          vec3 col = mix(cream, gold, 0.35);
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- interaction / loop ----------------------------------------------
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
      target.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(mount);

    let raf = 0;
    let elapsed = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible) return;
      if (pausedRef.current) {
        // Paused: render one still frame and stop moving (WCAG 2.2.2)
        renderer.render(scene, camera);
        return;
      }
      elapsed += dt;
      pointer.lerp(target, 0.04);
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uPointer.value.copy(pointer);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
