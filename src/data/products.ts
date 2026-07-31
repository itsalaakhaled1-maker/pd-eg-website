import { Product } from '@/types/product';

export const initialProducts: Product[] = [
  {
    id: 'hymi-mocha',
    name: 'HYMI @once Mocha',
    flavor: 'Mocha',
    flavorCn: '摩卡风味',
    description: 'Rich mocha coffee with dark chocolate notes, preserved with nitrogen technology to maintain authentic taste.',
    descriptionAr: 'قهوة موكا غنية بنكهة الشوكولاتة الداكنة، محفوظة بتقنية النيتروجين للحفاظ على الطعم الأصيل.',
    price: 45,
    currency: 'EGP',
    image: '/images/product-mocha.png',
    color: '#5a3a2a',
    gradient: 'linear-gradient(135deg, #5a3a2a 0%, #2a1810 100%)',
    badge: 'Bestseller',
    isActive: true,
    createdAt: '2026-07-31',
  },
  {
    id: 'hymi-latte',
    name: 'HYMI @once Latte',
    flavor: 'Latte',
    flavorCn: '拿铁风味',
    description: 'A smooth blend of coffee and milk, giving you the perfect balance between strength and softness.',
    descriptionAr: 'مزيج ناعم من القهوة والحليب، يمنحك توازناً مثالياً بين القوة والنعومة.',
    price: 42,
    currency: 'EGP',
    image: '/images/product-latte.png',
    color: '#6b4e3d',
    gradient: 'linear-gradient(135deg, #6b4e3d 0%, #3d2b1f 100%)',
    isActive: true,
    createdAt: '2026-07-31',
  },
  {
    id: 'hymi-espresso',
    name: 'HYMI @once Espresso',
    flavor: 'Espresso',
    flavorCn: '浓缩咖啡',
    description: 'For coffee lovers who crave intensity. High concentration with a rich, bold flavor to power your day.',
    descriptionAr: 'لعشاق القهوة القوية. تركيز عالٍ بنكهة مكثفة وغنية لبداية يومك بقوة.',
    price: 40,
    currency: 'EGP',
    image: '/images/product-espresso.png',
    color: '#2a1a10',
    gradient: 'linear-gradient(135deg, #2a1a10 0%, #0d0704 100%)',
    badge: 'New',
    isActive: true,
    createdAt: '2026-07-31',
  },
];

export const WHATSAPP_PHONE = '+201064688315';

export function getWhatsAppLink(productName?: string): string {
  const baseMessage = productName 
    ? `مرحباً Press&Drink، أريد طلب ${productName}`
    : 'مرحباً Press&Drink، أريد الاستفسار عن المنتجات';

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(baseMessage)}`;
}
