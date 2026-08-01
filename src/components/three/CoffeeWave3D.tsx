'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function Bean({ position, scale = 1, color = '#3d2314' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.3,
  }), [color]);

  return (
    <mesh position={position} scale={[0.25 * scale, 0.4 * scale, 0.2 * scale]} material={material}>
      <sphereGeometry args={[1, 12, 12]} />
    </mesh>
  );
}

function WaveScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const beans = useMemo(() => {
    const items = [];
    const rows = 5;
    const cols = 8;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        items.push({
          x: (j - cols / 2) * 0.8,
          y: (i - rows / 2) * 0.6,
          z: 0,
          id: i * cols + j,
          delay: (i + j) * 0.1,
        });
      }
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        const bean = beans[i];
        if (bean) {
          const wave = Math.sin(t * 2 + bean.delay + scrollProgress * 5) * 0.3 * scrollProgress;
          child.position.y = bean.y + wave;
          child.position.z = bean.z + Math.cos(t + bean.delay) * 0.2 * scrollProgress;
          child.rotation.x += 0.01;
          child.rotation.y += 0.008;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {beans.map((bean) => (
        <Bean key={bean.id} position={[bean.x, bean.y, bean.z]} scale={0.8 + Math.random() * 0.3} />
      ))}
    </group>
  );
}

export default function CoffeeWave3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[70vh] relative" style={{ background: 'radial-gradient(ellipse at center, #2a1810 0%, #1a0f0a 70%)' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 5, 5]} angle={0.4} penumbra={1} intensity={2} color="#c9944d" />
        <spotLight position={[-5, 3, 3]} angle={0.5} penumbra={1} intensity={1.5} color="#f5e6d3" />
        <pointLight position={[0, -3, 2]} intensity={0.4} color="#3d2314" />

        <WaveScene scrollProgress={scrollProgress} />

        <Environment preset="city" />
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-pd-gold text-3xl font-bold tracking-wider" style={{ 
          opacity: scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0,
          transition: 'opacity 0.5s'
        }}>
          PREMIUM COFFEE
        </p>
        <p className="text-pd-cream/50 text-sm mt-2" style={{ opacity: scrollProgress > 0.7 ? 1 : 0 }}>
          Nitrogen Preserved · Authentic Taste
        </p>
      </div>
    </div>
  );
}
