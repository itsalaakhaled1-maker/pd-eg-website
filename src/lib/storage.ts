import { Product } from '@/types/product';
import { initialProducts } from './products';

const STORAGE_KEY = 'pd-products';
const ADMIN_KEY = 'pd-admin-auth';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return initialProducts;
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Product): void {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

export function updateProduct(updated: Product): void {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updated.id);
  if (index !== -1) {
    products[index] = updated;
    saveProducts(products);
  }
}

export function deleteProduct(id: string): void {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
}

export function toggleProductActive(id: string): void {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index].isActive = !products[index].isActive;
    saveProducts(products);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_KEY) === 'true';
}

export function loginAdmin(password: string): boolean {
  if (password === 'pressdrink2026') {
    localStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_KEY);
}
