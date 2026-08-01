import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';
import { Droplets, Award, Truck, Coffee } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-pd-cream mb-6">
              قصة <span className="text-pd-gold">Press&Drink</span>
            </h1>
            <p className="text-pd-accent/60 text-lg leading-relaxed max-w-2xl mx-auto">
              نؤمن بأن القهوة ليست مجرد مشروب، بل هي تجربة. من هنا جاءت فكرة Press&Drink — 
              جلب تجربة القهوة الممتازة إلى يدك في أي وقت وأي مكان.
            </p>
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-pd-cream">كيف بدأنا؟</h2>
              <p className="text-pd-accent/60 leading-relaxed">
                بدأت Press&Drink برؤية بسيطة: جعل القهوة الممتازة متاحة للجميع، في أي وقت وأي مكان. 
                لاحظنا أن معظم الناس يضطرون للتنازل عن جودة القهوة بسبب انشغالهم، 
                فقررنا أن نغير ذلك.
              </p>
              <p className="text-pd-accent/60 leading-relaxed">
                باستخدام تقنية حفظ النيتروجين المتطورة، تمكنا من حبس نكهة القهوة الطازجة 
                في كبسولة صغيرة أنيقة. النتيجة؟ قهوة ممتازة بنقرة واحدة.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pd-coffee/30 to-pd-dark rounded-3xl p-8 border border-pd-gold/10 flex items-center justify-center">
              <div className="text-center">
                <Image 
                  src="/logo.png" 
                  alt="Press&Drink Logo" 
                  width={200} 
                  height={80} 
                  className="mx-auto mb-4 object-contain"
                />
                <p className="text-pd-gold font-bold text-2xl">Press&Drink</p>
                <p className="text-pd-accent/40 text-sm mt-2">منذ 2024</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-pd-cream text-center mb-10">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10">
                <Droplets className="w-10 h-10 text-pd-gold mx-auto mb-3" />
                <h3 className="text-pd-cream font-bold mb-2">الجودة</h3>
                <p className="text-pd-accent/50 text-sm">أفضل حبوب القهوة من حول العالم</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10">
                <Award className="w-10 h-10 text-pd-gold mx-auto mb-3" />
                <h3 className="text-pd-cream font-bold mb-2">الابتكار</h3>
                <p className="text-pd-accent/50 text-sm">تقنية النيتروجين لتجربة فريدة</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10">
                <Truck className="w-10 h-10 text-pd-gold mx-auto mb-3" />
                <h3 className="text-pd-cream font-bold mb-2">السرعة</h3>
                <p className="text-pd-accent/50 text-sm">توصيل سريع إلى باب منزلك</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-pd-coffee/10 border border-pd-gold/10">
                <Coffee className="w-10 h-10 text-pd-gold mx-auto mb-3" />
                <h3 className="text-pd-cream font-bold mb-2">الشغف</h3>
                <p className="text-pd-accent/50 text-sm">نحب ما نفعله ويبدو ذلك في كل كبسولة</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-pd-coffee/20 to-pd-dark rounded-3xl p-8 md:p-12 border border-pd-gold/10 text-center">
            <h2 className="text-2xl font-bold text-pd-cream mb-4">تواصل معنا</h2>
            <p className="text-pd-accent/60 mb-6">
              هل لديك استفسار أو اقتراح؟ نحن هنا للمساعدة
            </p>
            <a
              href="https://wa.me/201064688315"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-white px-8 py-3 rounded-full font-semibold hover:bg-whatsapp-dark transition-colors"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
