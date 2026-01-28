import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { lovable } from '@/integrations/lovable/index';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  companyName: z.string().optional(),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      if (mode === 'login') {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(
          formData.email, 
          formData.password, 
          formData.fullName,
          formData.companyName
        );
        if (!error) {
          navigate('/dashboard');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تسجيل الدخول بـ Google',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center py-8 md:py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg md:text-xl">
            IF
          </div>
          <div className="text-right">
            <h1 className="text-lg md:text-xl font-bold text-white">IFROF</h1>
            <p className="text-xs text-white/70">استورد مباشرة من المصنع</p>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 md:mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                mode === 'login' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                mode === 'signup' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="أحمد محمد"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pr-10 text-sm md:text-base"
                      required
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm">اسم الشركة (اختياري)</Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="شركة التجارة العربية"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="pr-10 text-sm md:text-base"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pr-10 text-sm md:text-base"
                  required
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10 text-sm md:text-base"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
            </div>

            {mode === 'login' && (
              <div className="text-left">
                <Link to="/forgot-password" className="text-xs md:text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full text-sm md:text-base" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-spin" />
                  جاري التحميل...
                </>
              ) : mode === 'login' ? (
                <>
                  تسجيل الدخول
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                </>
              ) : (
                <>
                  إنشاء حساب - $9.99/شهر
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full text-sm md:text-base"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-spin" />
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isGoogleLoading ? 'جاري التحميل...' : 'تسجيل الدخول بـ Google'}
          </Button>

          {mode === 'signup' && (
            <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
              بإنشاء حساب، أنت توافق على{' '}
              <a href="/terms" className="text-primary hover:underline">شروط الاستخدام</a>
              {' '}و{' '}
              <a href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</a>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 md:mt-8">
          <Link to="/" className="text-white/70 hover:text-white text-xs md:text-sm">
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
