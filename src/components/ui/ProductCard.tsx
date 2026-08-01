'use client';

import { Product } from '@/types/product';
import WhatsAppButton from './WhatsAppButton';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-pd-coffee/30 to-pd-dark rounded-3xl p-6 border border-pd-gold/10 hover:border-pd-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pd-gold/5">
      {product.badge && (
        <div className="absolute -top-3 right-4 bg-pd-gold text-pd-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {product.badge}
        </div>
      )}
      
      {/* Product Image - REAL IMAGE */}
      <div className="w-full h-56 rounded-2xl mb-5 relative overflow-hidden bg-pd-coffee/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <h3 className="text-pd-cream font-bold text-xl mb-1">{product.name}</h3>
      <p className="text-pd-gold text-sm font-medium mb-2">{product.flavorCn} · {product.flavor}</p>
      <p className="text-pd-accent/60 text-sm leading-relaxed mb-4 line-clamp-2">{product.descriptionAr}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-pd-gold font-bold text-2xl">{product.price}</span>
          <span className="text-pd-accent/50 text-sm">{product.currency}</span>
        </div>
        <WhatsAppButton productName={product.name} size="sm" />
      </div>
    </div>
  );
}