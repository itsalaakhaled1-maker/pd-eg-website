'use client';

import { Product } from '@/types/product';
import { Edit, Trash2, Eye, EyeOff, Plus } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: () => void;
}

export default function ProductList({ products, onEdit, onDelete, onToggle, onAdd }: ProductListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-pd-cream font-bold text-xl">المنتجات ({products.length})</h2>
        <button onClick={onAdd} className="bg-pd-gold text-pd-dark px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-pd-gold/90 transition-colors"><Plus className="w-4 h-4" />إضافة منتج</button>
      </div>

      <div className="bg-pd-coffee/10 rounded-2xl border border-pd-gold/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-pd-gold/10">
              <th className="text-right text-pd-accent/50 text-xs font-medium px-4 py-3">المنتج</th>
              <th className="text-right text-pd-accent/50 text-xs font-medium px-4 py-3">النكهة</th>
              <th className="text-right text-pd-accent/50 text-xs font-medium px-4 py-3">السعر</th>
              <th className="text-right text-pd-accent/50 text-xs font-medium px-4 py-3">الحالة</th>
              <th className="text-right text-pd-accent/50 text-xs font-medium px-4 py-3">إجراءات</th>
            </tr></thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-pd-gold/5 hover:bg-pd-coffee/10 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: product.gradient }} /><div><p className="text-pd-cream font-medium text-sm">{product.name}</p>{product.badge && <span className="text-pd-gold text-xs">{product.badge}</span>}</div></div></td>
                  <td className="px-4 py-3"><p className="text-pd-accent/70 text-sm">{product.flavor}</p><p className="text-pd-accent/40 text-xs">{product.flavorCn}</p></td>
                  <td className="px-4 py-3"><p className="text-pd-gold font-bold text-sm">{product.price} {product.currency}</p></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${product.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{product.isActive ? 'نشط' : 'معطل'}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1">
                    <button onClick={() => onEdit(product)} className="p-2 text-pd-accent/50 hover:text-pd-gold hover:bg-pd-gold/10 rounded-lg transition-all" title="تعديل"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => onToggle(product.id)} className="p-2 text-pd-accent/50 hover:text-pd-gold hover:bg-pd-gold/10 rounded-lg transition-all" title={product.isActive ? 'تعطيل' : 'تفعيل'}>{product.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    <button onClick={() => onDelete(product.id)} className="p-2 text-pd-accent/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="حذف"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && <div className="text-center py-12"><p className="text-pd-accent/30 text-sm">لا توجد منتجات حالياً</p><button onClick={onAdd} className="mt-4 text-pd-gold text-sm hover:underline">أضف منتجك الأول</button></div>}
      </div>
    </div>
  );
}
