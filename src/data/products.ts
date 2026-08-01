import { Product } from '@/types/product';

export const initialProducts: Product[] = [
  {
    id: 'hymi-mocha',
    name: 'Mocha',
    flavor: 'قهوة',
    flavorCn: 'الموكا',
    description: 'Rich mocha coffee with dark chocolate notes, preserved with nitrogen technology to maintain authentic taste.',
    descriptionAr: 'قهوة موكا غنية بنكهة الشوكولاتة الداكنة، محفوظة بتقنية النيتروجين للحفاظ على الطعم الأصيل.',
    price: 420,
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
    name: 'Latte',
    flavor: 'قهوة',
    flavorCn: 'اللاتية',
    description: 'A smooth blend of coffee and milk, giving you the perfect balance between strength and softness.',
    descriptionAr: 'مزيج ناعم من القهوة والحليب، يمنحك توازناً مثالياً بين القوة والنعومة.',
    price: 415,
    currency: 'EGP',
    image: '/images/product-latte.png',
    color: '#6b4e3d',
    gradient: 'linear-gradient(135deg, #6b4e3d 0%, #3d2b1f 100%)',
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
