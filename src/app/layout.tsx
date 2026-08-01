import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Press&Drink | Premium Nitrogen Coffee',
  description: 'قهوة النيتروجين الممتازة في كبسولة صغيرة. HYMI @once - تجربة قهوة فريدة في كل ضغطة.',
  keywords: 'coffee, nitrogen coffee, HYMI, Press&Drink, قهوة, نيتروجين, مصر',
  openGraph: {
    title: 'Press&Drink | Premium Nitrogen Coffee',
    description: 'قهوة النيتروجين الممتازة في كبسولة صغيرة',
    url: 'https://pd-eg.com',
    siteName: 'Press&Drink',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 960,
        height: 1280,
        alt: 'Press&Drink - Premium Nitrogen Coffee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press&Drink | Premium Nitrogen Coffee',
    description: 'قهوة بجودة عالية ومختارة بعناية ، محفوظة بتنقية النيتروجين في كبسولة صغيرة تناسب حياتك السريعة',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-pd-dark text-pd-cream antialiased">{children}</body>
    </html>
  );
}