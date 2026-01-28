import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Lock, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const passwordSchema = z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isValidSession, setIsValidSession] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!session);
      setIsChecking(false);
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      passwordSchema.parse(password);
    } catch {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تحديث كلمة المرور',
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث كلمة المرور بنجاح',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-8 md:py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center">
            <h2 className="text-xl font-bold mb-2">رابط غير صالح</h2>
            <p className="text-muted-foreground mb-6">
              رابط استعادة كلمة المرور غير صالح أو منتهي الصلاحية
            </p>
            <Link to="/forgot-password">
              <Button variant="hero" className="w-full">
                طلب رابط جديد
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-8 md:py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">تم تحديث كلمة المرور</h2>
            <p className="text-muted-foreground mb-6">
              جاري تحويلك للوحة التحكم...
            </p>
            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
          </div>
        </div>
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

        {/* Reset Card */}
        <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">تعيين كلمة مرور جديدة</h2>
            <p className="text-muted-foreground text-sm">
              أدخل كلمة المرور الجديدة
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 text-sm md:text-base"
                  required
                  minLength={8}
                />
              </div>
              {error && <p className="text-destructive text-xs">{error}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full text-sm md:text-base" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                <>
                  تحديث كلمة المرور
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                </>
              )}
            </Button>
          </form>
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

export default ResetPassword;
