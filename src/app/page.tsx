'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';
import ProductCard from '@/components/ui/ProductCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Footer from '@/components/ui/Footer';
import { getProducts } from '@/lib/storage';
import { Product } from '@/types/product';
import { Coffee, Droplets, Zap, ChevronDown } from 'lucide-react';

const Hero3D = dynamic(() => import('@/components/three/Hero3D'), { ssr: false });
const ProductSplit3D = dynamic(() => import('@/components/three/ProductSplit3D'), { ssr: false });

function LoadingFallback() {
  return <div className="w-full h-[500px] flex items-center justify-center"><div className="animate-pulse text-pd-gold/50">جاري التحميل...</div></div>;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProducts(getProducts().filter(p => p.isActive));
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,#2a1810_0%,#1a0f0a_70%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-pd-gold/20 rounded-full animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-pd-gold/60 text-sm font-medium tracking-[0.3em] uppercase mb-6">Nitrogen Preserved · Premium Coffee</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">Press</span><span className="text-pd-gold">&</span><span className="text-gradient">Drink</span>
          </h1>
          <p className="text-pd-accent/70 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">قهوة النيتروجين الممتازة، في كبسولة صغيرة تناسب حياتك السريعة</p>
          <WhatsAppButton size="lg" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto mt-8">
          {mounted ? <Suspense fallback={<LoadingFallback />}><Hero3D /></Suspense> : <LoadingFallback />}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pd-accent/30 animate-bounce">
          <span className="text-xs tracking-widest uppercase">اسحب للأسفل</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* 3D Split Section */}
      <section className="relative">
        <div className="text-center py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-pd-cream mb-4">تجربة فريدة في كل رشة</h2>
          <p className="text-pd-accent/60 max-w-lg mx-auto leading-relaxed">صُممت خصيصاً لتناسب حياتك السريعة. تقنية حفظ النيتروجين تحافظ على نكهة القهوة الأصيلة</p>
        </div>
        {mounted ? <Suspense fallback={<LoadingFallback />}><ProductSplit3D /></Suspense> : <LoadingFallback />}
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10 hover:border-pd-gold/20 transition-all">
              <div className="w-14 h-14 bg-pd-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><Droplets className="w-7 h-7 text-pd-gold" /></div>
              <h3 className="text-pd-cream font-bold text-lg mb-2">حفظ النيتروجين</h3>
              <p className="text-pd-accent/50 text-sm leading-relaxed">تقنية متطورة تحافظ على نكهة القهوة الطازجة لأطول فترة ممكنة</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10 hover:border-pd-gold/20 transition-all">
              <div className="w-14 h-14 bg-pd-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><Zap className="w-7 h-7 text-pd-gold" /></div>
              <h3 className="text-pd-cream font-bold text-lg mb-2">سريعة وسهلة</h3>
              <p className="text-pd-accent/50 text-sm leading-relaxed">كبسولة صغيرة يمكنك حملها في جيبك والاستمتاع بها في أي وقت</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10 hover:border-pd-gold/20 transition-all">
              <div className="w-14 h-14 bg-pd-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><Coffee className="w-7 h-7 text-pd-gold" /></div>
              <h3 className="text-pd-cream font-bold text-lg mb-2">نكهة أصيلة</h3>
              <p className="text-pd-accent/50 text-sm leading-relaxed">حبوب قهوة مختارة بعناية من أفضل المزارع حول العالم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4" id="products">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pd-cream mb-4">مجموعتنا</h2>
            <p className="text-pd-accent/50">اختر نكهتك المفضلة واطلبها الآن</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-pd-coffee/30 to-pd-dark rounded-3xl p-10 md:p-16 border border-pd-gold/10">
            <h2 className="text-3xl md:text-4xl font-bold text-pd-cream mb-4">جاهز لتجربة القهوة المختلفة؟</h2>
            <p className="text-pd-accent/60 mb-8 max-w-md mx-auto">اطلب الآن عبر واتساب واستمتع بتجربة قهوة فريدة لا مثيل لها</p>
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
