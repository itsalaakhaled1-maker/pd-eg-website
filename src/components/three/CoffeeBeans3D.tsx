'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function CoffeeBean({ position, rotation, scale = 1 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#3d2314'),
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  }), []);

  // Bean shape using scaled sphere
  return (
    <mesh ref={meshRef} position={position} rotation={rotation || [0, 0, 0]} scale={[0.3 * scale, 0.5 * scale, 0.25 * scale]} material={material}>
      <sphereGeometry args={[1, 16, 16]} />
    </mesh>
  );
}

function FloatingBeans() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const beans = useMemo(() => {
    const items = [];
    for (let i = 0; i < 40; i++) {
      items.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = mouse.y * 0.1;
      groupRef.current.rotation.z = mouse.x * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {beans.map((bean) => (
        <FloatingBean key={bean.id} {...bean} time={0} />
      ))}
    </group>
  );
}

function FloatingBean({ position, rotation, speed, floatOffset, id }: {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  floatOffset: number;
  id: number;
  time: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed + floatOffset) * 0.3;
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.003;
    }
  });

  return <CoffeeBean position={position} rotation={rotation} scale={0.8 + Math.random() * 0.4} />;
}

// Gold dust particles
function GoldDust() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c9944d" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function CoffeeBeans3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 5, 5]} angle={0.4} penumbra={1} intensity={1.5} color="#c9944d" />
        <spotLight position={[-5, 3, 3]} angle={0.5} penumbra={1} intensity={1} color="#f5e6d3" />
        <pointLight position={[0, -3, 2]} intensity={0.3} color="#3d2314" />

        <FloatingBeans />
        <GoldDust />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
