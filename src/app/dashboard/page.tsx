'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import DashboardLogin from '@/components/dashboard/DashboardLogin';
import ProductList from '@/components/dashboard/ProductList';
import ProductForm from '@/components/dashboard/ProductForm';
import { getProducts, saveProducts, addProduct, updateProduct, deleteProduct, toggleProductActive, isAdminAuthenticated, logoutAdmin } from '@/lib/storage';
import { Product } from '@/types/product';
import { LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    setProducts(getProducts());
  }, []);

  const handleLogin = () => { setAuthenticated(true); setProducts(getProducts()); };
  const handleLogout = () => { logoutAdmin(); setAuthenticated(false); };

  const handleSave = (product: Product) => {
    if (editingProduct) { updateProduct(product); }
    else { addProduct(product); }
    setProducts(getProducts());
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => { setEditingProduct(product); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) { deleteProduct(id); setProducts(getProducts()); } };
  const handleToggle = (id: string) => { toggleProductActive(id); setProducts(getProducts()); };
  const handleAdd = () => { setEditingProduct(null); setShowForm(true); };

  if (!authenticated) return <DashboardLogin onLogin={handleLogin} />;

  return (
    <main className="min-h-screen bg-pd-dark">
      <Navigation />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-pd-cream mb-1">لوحة التحكم</h1>
              <p className="text-pd-accent/50 text-sm">إدارة منتجات Press&Drink</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-pd-accent/50 hover:text-red-400 transition-colors text-sm">
              <LogOut className="w-4 h-4" />تسجيل الخروج
            </button>
          </div>
          <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} onAdd={handleAdd} />
        </div>
      </div>
      {showForm && <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingProduct(null); }} />}
    </main>
  );
}
