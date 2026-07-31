'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function HeroCapsule() {
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#5a3a2a'),
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <group rotation={[0.3, 0, 0.1]}>
          <mesh material={material} scale={1.5}>
            <capsuleGeometry args={[0.4, 2, 8, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.38]} scale={[1.1, 1.8, 0.05]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="#f5e6d3" transparent opacity={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.3, 0]} material={material} scale={1.5}>
            <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]} material={material} scale={1.5}>
            <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[0.42, 0.02, 8, 32]} />
            <meshStandardMaterial color="#c9944d" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#c9944d" />
        <spotLight position={[-5, 3, 3]} angle={0.4} penumbra={1} intensity={1.5} color="#f5e6d3" />
        <HeroCapsule />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={8} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
