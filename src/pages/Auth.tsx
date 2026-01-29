import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff, Loader2, Factory, ShoppingBag, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  companyName: z.string().optional(),
  userType: z.enum(['buyer', 'factory']),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const selectedPlan = searchParams.get('plan') || 'professional';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    userType: 'buyer' as 'buyer' | 'factory',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          formData.companyName,
          formData.userType
        );
        if (!error) {
          navigate('/dashboard');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const translations = {
    ar: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      fullName: 'الاسم الكامل',
      companyName: 'اسم الشركة',
      factoryName: 'اسم المصنع',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      accountType: 'نوع الحساب',
      buyer: 'مشتري',
      factory: 'مصنع',
      loading: 'جاري التحميل...',
      createAccount: 'إنشاء حساب',
      loginBtn: 'تسجيل الدخول',
      terms: 'بإنشاء حساب، أنت توافق على',
      termsLink: 'شروط الاستخدام',
      and: 'و',
      privacyLink: 'سياسة الخصوصية',
      backHome: 'العودة للصفحة الرئيسية',
      tagline: 'استورد مباشرة من المصنع',
      subscriptionNote: 'الاشتراك يبدأ بعد التسجيل',
      noPlan: 'اختر خطة أولاً',
      goToPricing: 'اختر خطة اشتراك',
    },
    en: {
      login: 'Login',
      signup: 'Sign Up',
      fullName: 'Full Name',
      companyName: 'Company Name',
      factoryName: 'Factory Name',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      accountType: 'Account Type',
      buyer: 'Buyer',
      factory: 'Factory',
      loading: 'Loading...',
      createAccount: 'Create Account',
      loginBtn: 'Login',
      terms: 'By creating an account, you agree to our',
      termsLink: 'Terms of Service',
      and: 'and',
      privacyLink: 'Privacy Policy',
      backHome: 'Back to Home',
      tagline: 'Import directly from factory',
      subscriptionNote: 'Subscription starts after registration',
      noPlan: 'Choose a plan first',
      goToPricing: 'Choose a subscription plan',
    },
    zh: {
      login: '登录',
      signup: '注册',
      fullName: '全名',
      companyName: '公司名称',
      factoryName: '工厂名称',
      email: '电子邮件',
      password: '密码',
      forgotPassword: '忘记密码？',
      accountType: '账户类型',
      buyer: '买家',
      factory: '工厂',
      loading: '加载中...',
      createAccount: '创建账户',
      loginBtn: '登录',
      terms: '创建账户即表示您同意我们的',
      termsLink: '服务条款',
      and: '和',
      privacyLink: '隐私政策',
      backHome: '返回首页',
      tagline: '直接从工厂进口',
      subscriptionNote: '注册后开始订阅',
      noPlan: '请先选择计划',
      goToPricing: '选择订阅计划',
    },
  };

  const t = translations[language];

  // If signup mode but no plan selected, redirect to pricing
  if (mode === 'signup' && !searchParams.get('plan')) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-8 md:py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            <CreditCard className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4">{t.noPlan}</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              {language === 'ar' 
                ? 'يجب اختيار خطة اشتراك قبل إنشاء حساب'
                : language === 'zh'
                ? '创建账户前必须选择订阅计划'
                : 'You must choose a subscription plan before creating an account'
              }
            </p>
            <Link to="/pricing">
              <Button variant="hero" size="lg" className="w-full">
                {t.goToPricing}
                <ArrowLeft className="w-5 h-5 mr-2" />
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
            <p className="text-xs text-white/70">{t.tagline}</p>
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
              {t.login}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                mode === 'signup' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t.signup}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {mode === 'signup' && (
              <>
                {/* User Type Selection */}
                <div className="space-y-2">
                  <Label className="text-sm">{t.accountType}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: 'buyer' })}
                      className={`flex items-center justify-center gap-2 p-3 md:p-4 rounded-xl border-2 transition-all ${
                        formData.userType === 'buyer'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium text-sm">{t.buyer}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: 'factory' })}
                      className={`flex items-center justify-center gap-2 p-3 md:p-4 rounded-xl border-2 transition-all ${
                        formData.userType === 'factory'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <Factory className="w-5 h-5" />
                      <span className="font-medium text-sm">{t.factory}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm">{t.fullName}</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pr-10 text-sm"
                      required
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm">
                    {formData.userType === 'factory' ? t.factoryName : t.companyName}
                  </Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="pr-10 text-sm"
                      required={formData.userType === 'factory'}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pr-10 text-sm"
                  required
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10 text-sm"
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
                  {t.forgotPassword}
                </Link>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full text-sm" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  {t.loading}
                </>
              ) : mode === 'login' ? (
                <>
                  {t.loginBtn}
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </>
              ) : (
                <>
                  {t.createAccount}
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </>
              )}
            </Button>
          </form>

          {mode === 'signup' && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              {t.terms}{' '}
              <a href="/terms" className="text-primary hover:underline">{t.termsLink}</a>
              {' '}{t.and}{' '}
              <a href="/privacy" className="text-primary hover:underline">{t.privacyLink}</a>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white/70 hover:text-white text-xs">
            ← {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
