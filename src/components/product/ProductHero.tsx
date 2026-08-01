'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ProductHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const img = containerRef.current.querySelector('.product-image') as HTMLElement;
      if (img) {
        img.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
      }
    };

    const handleMouseLeave = () => {
      const img = containerRef.current?.querySelector('.product-image') as HTMLElement;
      if (img) {
        img.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto cursor-pointer">
      {/* Glow effects */}
      <div className="absolute -inset-8 bg-pd-gold/5 blur-3xl rounded-full" />
      <div className="absolute -inset-4 bg-pd-coffee/30 blur-2xl rounded-full" />

      {/* Product Image */}
      <div className="product-image transition-transform duration-300 ease-out">
        <Image
          src="/images/product-mocha.png"
          alt="HYMI @once Mocha - Premium Nitrogen Coffee"
          width={900}
          height={350}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </div>

      {/* Reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-pd-gold/10 to-transparent blur-xl rounded-full" />
    </div>
  );
}
