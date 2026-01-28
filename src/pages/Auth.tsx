import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            IF
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-white">IFROF</h1>
            <p className="text-xs text-white/70">استورد مباشرة من المصنع</p>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="bg-card rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                mode === 'login' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                mode === 'signup' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="أحمد محمد"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">اسم الشركة (اختياري)</Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="شركة التجارة العربية"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-left">
                <a href="#" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>
            )}

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
              {isLoading ? (
                'جاري التحميل...'
              ) : mode === 'login' ? (
                <>
                  تسجيل الدخول
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              ) : (
                <>
                  إنشاء حساب - $9.99/شهر
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              )}
            </Button>
          </form>

          {mode === 'signup' && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              بإنشاء حساب، أنت توافق على{' '}
              <a href="/terms" className="text-primary hover:underline">شروط الاستخدام</a>
              {' '}و{' '}
              <a href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</a>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-white/70 hover:text-white text-sm">
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
