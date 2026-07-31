'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function CapsuleHalf({ position, rotation, color, isLeft }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  isLeft: boolean;
}) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.3,
    roughness: 0.4,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  }), [color]);

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh material={material} scale={1.2}>
        <capsuleGeometry args={[0.5, 2.5, 8, 16]} />
      </mesh>
      <mesh position={[0, 0, 0.48]} scale={[0.8, 1.8, 0.05]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f5e6d3" transparent opacity={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.5, 0]} material={material} scale={1.2}>
        <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]} material={material} scale={1.2}>
        <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
}

function SplitScene({ scrollProgress }: { scrollProgress: number }) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const revealRef = useRef<THREE.Mesh>(null);

  const easedProgress = useMemo(() => {
    const t = Math.min(1, Math.max(0, scrollProgress));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, [scrollProgress]);

  useFrame(() => {
    if (leftRef.current) {
      leftRef.current.position.x = THREE.MathUtils.lerp(0, -2.2, easedProgress);
      leftRef.current.rotation.y = THREE.MathUtils.lerp(0, 0.5, easedProgress);
    }
    if (rightRef.current) {
      rightRef.current.position.x = THREE.MathUtils.lerp(0, 2.2, easedProgress);
      rightRef.current.rotation.y = THREE.MathUtils.lerp(0, -0.5, easedProgress);
    }
    if (revealRef.current) {
      revealRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.2, easedProgress));
      (revealRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(0, 1, easedProgress);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#c9944d" />
      <spotLight position={[-10, 5, 5]} angle={0.4} penumbra={1} intensity={1.5} color="#f5e6d3" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#3d2314" />

      <group ref={leftRef}>
        <CapsuleHalf position={[0, 0, 0]} color="#5a3a2a" isLeft={true} />
      </group>

      <group ref={rightRef}>
        <CapsuleHalf position={[0, 0, 0]} color="#4a3020" isLeft={false} />
      </group>

      <mesh ref={revealRef} position={[0, 0, 0]}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial color="#c9944d" transparent opacity={0} emissive="#c9944d" emissiveIntensity={0.5} />
      </mesh>

      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
    </>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c9944d" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function ProductSplit3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[80vh] relative" style={{ background: 'radial-gradient(ellipse at center, #2a1810 0%, #1a0f0a 70%)' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <SplitScene scrollProgress={scrollProgress} />
        <Particles />
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-pd-gold text-4xl font-bold tracking-wider" style={{ 
          opacity: scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0,
          transform: `scale(${scrollProgress > 0.5 ? 0.8 + (scrollProgress - 0.5) * 0.4 : 0.8})`,
          transition: 'opacity 0.3s, transform 0.3s'
        }}>
          MOCHA
        </p>
        <p className="text-pd-cream/60 text-sm mt-2" style={{ opacity: scrollProgress > 0.7 ? 1 : 0 }}>
          Nitrogen Preserved · Premium Coffee
        </p>
      </div>
    </div>
  );
}
