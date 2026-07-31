'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { X, Save } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || '',
    flavor: product?.flavor || '',
    flavorCn: product?.flavorCn || '',
    description: product?.description || '',
    descriptionAr: product?.descriptionAr || '',
    price: product?.price || 0,
    currency: product?.currency || 'EGP',
    image: product?.image || '/images/product-default.png',
    color: product?.color || '#5a3a2a',
    gradient: product?.gradient || 'linear-gradient(135deg, #5a3a2a 0%, #2a1810 100%)',
    badge: product?.badge || '',
    isActive: product?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: product?.id || `product-${Date.now()}`,
      name: formData.name || 'منتج جديد',
      flavor: formData.flavor || '',
      flavorCn: formData.flavorCn || '',
      description: formData.description || '',
      descriptionAr: formData.descriptionAr || '',
      price: formData.price || 0,
      currency: formData.currency || 'EGP',
      image: formData.image || '/images/product-default.png',
      color: formData.color || '#5a3a2a',
      gradient: formData.gradient || 'linear-gradient(135deg, #5a3a2a 0%, #2a1810 100%)',
      badge: formData.badge || undefined,
      isActive: formData.isActive ?? true,
      createdAt: product?.createdAt || new Date().toISOString().split('T')[0],
    };
    onSave(newProduct);
  };

  const inputClass = "w-full bg-pd-dark/50 border border-pd-gold/20 rounded-xl px-4 py-2.5 text-pd-cream placeholder-pd-accent/30 focus:outline-none focus:border-pd-gold/50 transition-colors text-sm";
  const labelClass = "block text-pd-accent/70 text-sm font-medium mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-pd-dark border border-pd-gold/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-pd-dark/95 backdrop-blur-xl border-b border-pd-gold/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-pd-cream font-bold text-lg">{product ? 'تعديل منتج' : 'إضافة منتج جديد'}</h2>
          <button onClick={onCancel} className="text-pd-accent/50 hover:text-pd-cream transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>اسم المنتج</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="HYMI @once Mocha" className={inputClass} required /></div>
            <div><label className={labelClass}>النكهة (English)</label><input type="text" value={formData.flavor} onChange={(e) => setFormData({ ...formData, flavor: e.target.value })} placeholder="Mocha" className={inputClass} /></div>
            <div><label className={labelClass}>النكهة (中文)</label><input type="text" value={formData.flavorCn} onChange={(e) => setFormData({ ...formData, flavorCn: e.target.value })} placeholder="摩卡风味" className={inputClass} /></div>
            <div><label className={labelClass}>السعر</label><div className="flex gap-2"><input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="45" className={`${inputClass} flex-1`} min="0" required /><select value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} className={`${inputClass} w-24`}><option value="EGP">EGP</option><option value="USD">USD</option><option value="AED">AED</option></select></div></div>
          </div>

          <div><label className={labelClass}>الوصف (English)</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Product description..." rows={2} className={`${inputClass} resize-none`} /></div>
          <div><label className={labelClass}>الوصف (العربية)</label><textarea value={formData.descriptionAr} onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })} placeholder="وصف المنتج..." rows={2} className={`${inputClass} resize-none`} dir="rtl" /></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>اللون الرئيسي</label><div className="flex gap-2"><input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-12 h-10 rounded-lg border border-pd-gold/20 cursor-pointer" /><input type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className={`${inputClass} flex-1`} /></div></div>
            <div><label className={labelClass}>الشارة (Badge)</label><select value={formData.badge || ''} onChange={(e) => setFormData({ ...formData, badge: e.target.value || undefined })} className={inputClass}><option value="">بدون</option><option value="Bestseller">الأكثر مبيعاً</option><option value="New">جديد</option><option value="Limited">كمية محدودة</option></select></div>
            <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-pd-gold/30 text-pd-gold focus:ring-pd-gold" /><span className="text-pd-cream text-sm">نشط</span></label></div>
          </div>

          <div><label className={labelClass}>Gradient CSS</label><input type="text" value={formData.gradient} onChange={(e) => setFormData({ ...formData, gradient: e.target.value })} placeholder="linear-gradient(135deg, #5a3a2a 0%, #2a1810 100%)" className={inputClass} /></div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-pd-gold text-pd-dark font-bold py-3 rounded-xl hover:bg-pd-gold/90 transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" />حفظ</button>
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-pd-gold/30 text-pd-gold rounded-xl hover:bg-pd-gold/10 transition-colors">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
