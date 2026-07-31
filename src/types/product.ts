export interface Product {
  id: string;
  name: string;
  flavor: string;
  flavorCn: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: string;
  image: string;
  color: string;
  gradient: string;
  badge?: string;
  isActive: boolean;
  createdAt: string;
}

export interface WhatsAppConfig {
  phone: string;
  message: string;
}
