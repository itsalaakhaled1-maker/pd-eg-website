'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Coffee, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-pd-dark/90 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Coffee className="w-6 h-6 text-pd-gold group-hover:rotate-12 transition-transform" />
          <span className="text-pd-cream font-bold text-xl tracking-tight">Press<span className="text-pd-gold">&</span>Drink</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-pd-cream/70 hover:text-pd-gold transition-colors text-sm font-medium">الرئيسية</Link>
          <Link href="/products/" className="text-pd-cream/70 hover:text-pd-gold transition-colors text-sm font-medium">المنتجات</Link>
          <Link href="/about/" className="text-pd-cream/70 hover:text-pd-gold transition-colors text-sm font-medium">عنا</Link>
          <Link href="/dashboard/" className="text-pd-gold/70 hover:text-pd-gold transition-colors text-sm font-medium border border-pd-gold/30 px-4 py-1.5 rounded-full hover:border-pd-gold">لوحة التحكم</Link>
        </div>

        <button className="md:hidden text-pd-cream" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-pd-dark/95 backdrop-blur-xl border-t border-pd-gold/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/" className="text-pd-cream/70 hover:text-pd-gold transition-colors" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link href="/products/" className="text-pd-cream/70 hover:text-pd-gold transition-colors" onClick={() => setMenuOpen(false)}>المنتجات</Link>
            <Link href="/about/" className="text-pd-cream/70 hover:text-pd-gold transition-colors" onClick={() => setMenuOpen(false)}>عنا</Link>
            <Link href="/dashboard/" className="text-pd-gold hover:text-pd-gold/80 transition-colors" onClick={() => setMenuOpen(false)}>لوحة التحكم</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
