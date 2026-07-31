'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/data/products';

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WhatsAppButton({ productName, className = '', size = 'md' }: WhatsAppButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  return (
    <a href={getWhatsAppLink(productName)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center bg-gradient-to-r from-whatsapp to-whatsapp-dark text-white font-semibold rounded-full shadow-lg shadow-whatsapp/30 hover:shadow-whatsapp/50 hover:-translate-y-0.5 transition-all duration-300 ${sizeClasses[size]} ${className}`}>
      <MessageCircle className="w-5 h-5" />
      <span>اطلب عبر واتساب</span>
    </a>
  );
}
