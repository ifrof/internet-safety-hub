import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('البريد الإلكتروني غير صحيح');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      emailSchema.parse(email);
    } catch {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء إرسال رابط الاستعادة',
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        toast({
          title: 'تم الإرسال',
          description: 'تحقق من بريدك الإلكتروني لاستعادة كلمة المرور',
        });
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

  if (isSuccess) {
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

          {/* Success Card */}
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">تحقق من بريدك الإلكتروني</h2>
            <p className="text-muted-foreground mb-6">
              لقد أرسلنا رابط استعادة كلمة المرور إلى <strong dir="ltr">{email}</strong>
            </p>
            <Link to="/auth">
              <Button variant="outline" className="w-full">
                العودة لتسجيل الدخول
              </Button>
            </Link>
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
            <h2 className="text-xl font-bold mb-2">نسيت كلمة المرور؟</h2>
            <p className="text-muted-foreground text-sm">
              أدخل بريدك الإلكتروني وسنرسل لك رابط لاستعادة كلمة المرور
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 text-sm md:text-base"
                  required
                />
              </div>
              {error && <p className="text-destructive text-xs">{error}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full text-sm md:text-base" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  إرسال رابط الاستعادة
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/auth" className="text-sm text-primary hover:underline">
              العودة لتسجيل الدخول
            </Link>
          </div>
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

export default ForgotPassword;
