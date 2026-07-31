'use client';

import { Product } from '@/types/product';
import WhatsAppButton from './WhatsAppButton';
import { Sparkles } from 'lucide-react';

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

      <div className="w-full h-48 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden" style={{ background: product.gradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-8 bg-pd-cream/20 rounded-full mx-auto mb-2 backdrop-blur-sm" />
          <p className="text-pd-cream font-bold text-lg tracking-wider">{product.name.split(' ')[0]}</p>
          <p className="text-pd-gold text-xs">{product.flavorCn}</p>
        </div>
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
