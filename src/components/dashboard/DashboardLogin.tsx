'use client';

import { useState } from 'react';
import { loginAdmin } from '@/lib/storage';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface DashboardLoginProps {
  onLogin: () => void;
}

export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (loginAdmin(password)) {
        onLogin();
      } else {
        setError('كلمة المرور غير صحيحة');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-pd-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-pd-gold mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-pd-cream mb-2">لوحة تحكم Press&Drink</h1>
          <p className="text-pd-accent/50 text-sm">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-pd-coffee/20 rounded-2xl p-8 border border-pd-gold/10">
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور" className="w-full bg-pd-dark/50 border border-pd-gold/20 rounded-xl px-4 py-3 text-pd-cream placeholder-pd-accent/30 focus:outline-none focus:border-pd-gold/50 transition-colors pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-pd-accent/40 hover:text-pd-gold transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          <button type="submit" disabled={loading} className="w-full mt-6 bg-pd-gold text-pd-dark font-bold py-3 rounded-xl hover:bg-pd-gold/90 transition-colors disabled:opacity-50">
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>

        <p className="text-center text-pd-accent/30 text-xs mt-6">كلمة المرور الافتراضية: pressdrink2026</p>
      </div>
    </div>
  );
}
