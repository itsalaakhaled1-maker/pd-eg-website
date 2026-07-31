import Link from 'next/link';
import { Coffee, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pd-dark flex items-center justify-center px-4">
      <div className="text-center">
        <Coffee className="w-16 h-16 text-pd-gold/30 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-pd-cream mb-4">404</h1>
        <p className="text-pd-accent/50 text-lg mb-8">الصفحة غير موجودة</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-pd-gold text-pd-dark px-6 py-3 rounded-full font-semibold hover:bg-pd-gold/90 transition-colors">
          العودة للرئيسية<ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
