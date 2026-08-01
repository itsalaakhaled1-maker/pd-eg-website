import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pd-dark border-t border-pd-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo-icon.png" alt="Press&Drink" width={32} height={32} className="rounded-lg" />
              <Image src="/logo.png" alt="Press&Drink" width={140} height={35} className="h-7 w-auto object-contain" />
            </Link>
            <p className="text-pd-accent/50 text-sm leading-relaxed"> قهوة بجودة مختارة بعناية ، محفوظة بتنقية النيتروجين في كبسولة صغيرة تناسب حياتك السريعة</p>
          </div>

          <div>
            <h4 className="text-pd-cream font-semibold mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-pd-accent/50 hover:text-pd-gold transition-colors text-sm">الرئيسية</Link>
              <Link href="/products/" className="text-pd-accent/50 hover:text-pd-gold transition-colors text-sm">المنتجات</Link>
              <Link href="/about/" className="text-pd-accent/50 hover:text-pd-gold transition-colors text-sm">عنا</Link>
            </div>
          </div>

          <div>
            <h4 className="text-pd-cream font-semibold mb-4">تواصل معنا</h4>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/201064688315" target="_blank" rel="noopener noreferrer" className="text-pd-accent/50 hover:text-whatsapp transition-colors text-sm">واتساب: +20 106 468 8315</a>
              <p className="text-pd-accent/50 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /><span>مصر</span></p>
            </div>
          </div>
        </div>

        <div className="border-t border-pd-gold/10 mt-8 pt-8 text-center">
          <p className="text-pd-accent/30 text-sm">Press&Drink · pd-eg.com · جميع الحقوق محفوظة © 2026</p>
        </div>
      </div>
    </footer>
  );
}
