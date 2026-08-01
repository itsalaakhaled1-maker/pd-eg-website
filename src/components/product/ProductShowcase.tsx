'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProductShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)));
      setScrollProgress(progress);

      // Parallax effect
      const translateY = (1 - progress) * 50;
      const scale = 0.8 + progress * 0.2;
      const rotateX = (1 - progress) * 15;

      imageRef.current.style.transform = `translateY(${translateY}px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2a1810_0%,#1a0f0a_70%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-pd-gold/20 rounded-full animate-float"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`, 
              animationDuration: `${3 + Math.random() * 4}s` 
            }} 
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pd-cream mb-4">تجربة فريدة في كل رشة</h2>
          <p className="text-pd-accent/60 max-w-lg mx-auto leading-relaxed">
            صُممت خصيصاً لتناسب حياتك السريعة. تقنية حفظ النيتروجين تحافظ على نكهة القهوة الأصيلة
          </p>
        </div>

        {/* Product Image with scroll animation */}
        <div ref={imageRef} className="relative transition-transform duration-100">
          <Image
            src="/images/product-mocha.png"
            alt="HYMI @once Mocha"
            width={1000}
            height={400}
            className="w-full h-auto drop-shadow-2xl"
          />

          {/* Glow */}
          <div className="absolute -inset-8 bg-pd-gold/5 blur-3xl rounded-full -z-10" />
        </div>

        {/* Reveal text */}
        <div className="text-center mt-12" style={{ opacity: scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0 }}>
          <p className="text-pd-gold text-3xl font-bold tracking-wider">MOCHA</p>
          <p className="text-pd-cream/50 text-sm mt-2">Nitrogen Preserved · Premium Coffee</p>
        </div>
      </div>
    </div>
  );
}
