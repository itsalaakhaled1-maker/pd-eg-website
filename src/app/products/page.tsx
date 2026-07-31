'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import ProductCard from '@/components/ui/ProductCard';
import Footer from '@/components/ui/Footer';
import { getProducts } from '@/lib/storage';
import { Product } from '@/types/product';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  useEffect(() => {
    const all = getProducts().filter(p => p.isActive);
    setProducts(all);
    setFiltered(all);
  }, []);

  useEffect(() => {
    let result = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.flavor.toLowerCase().includes(search.toLowerCase()) ||
      p.descriptionAr.includes(search)
    );
    switch (sortBy) {
      case 'price-asc': result = result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = result.sort((a, b) => b.price - a.price); break;
      case 'name': result = result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    setFiltered(result);
  }, [search, sortBy, products]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-pd-cream mb-4">جميع منتجاتنا</h1>
            <p className="text-pd-accent/50 max-w-lg mx-auto">اكتشف مجموعتنا المتنوعة من قهوة النيتروجين الممتازة</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pd-accent/30" />
              <input type="text" placeholder="ابحث عن منتج..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-pd-coffee/20 border border-pd-gold/10 rounded-xl pr-12 pl-4 py-3 text-pd-cream placeholder-pd-accent/30 focus:outline-none focus:border-pd-gold/30 transition-colors" />
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pd-accent/30" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-pd-coffee/20 border border-pd-gold/10 rounded-xl pr-12 pl-4 py-3 text-pd-cream focus:outline-none focus:border-pd-gold/30 transition-colors appearance-none cursor-pointer min-w-[180px]">
                <option value="name">الترتيب حسب الاسم</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-pd-accent/30 text-lg">لا توجد منتجات مطابقة لبحثك</p></div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
