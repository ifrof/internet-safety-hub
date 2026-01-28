import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  CreditCard, Check, Sparkles, Clock, AlertCircle,
  Zap, Users, Search, FileText, ArrowLeft
} from 'lucide-react';
import { subscriptionPlans } from '@/data/mockData';

interface Profile {
  subscription_plan: string | null;
  subscription_status: string | null;
  subscription_end_date: string | null;
}

const Subscription = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('subscription_plan, subscription_status, subscription_end_date')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const currentPlan = profile?.subscription_plan || 'free';
  const isActive = profile?.subscription_status === 'active';
  const endDate = profile?.subscription_end_date 
    ? new Date(profile.subscription_end_date).toLocaleDateString('ar-SA')
    : null;

  const planFeatures = {
    free: {
      name: 'تجريبي',
      features: ['تصفح المصانع', 'البحث الأساسي', '1 طلب تواصل']
    },
    basic: {
      name: 'أساسي',
      features: ['الوصول لسوق المصانع', 'البحث الذكي', '5 طلبات/شهر', '10 تواصل مع مصانع']
    },
    premium: {
      name: 'متميز',
      features: ['طلبات غير محدودة', 'تواصل غير محدود', 'أولوية الدعم', 'خصم 10% على الخدمات']
    }
  };

  const currentPlanInfo = planFeatures[currentPlan as keyof typeof planFeatures] || planFeatures.free;

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">الاشتراك</h1>
          <p className="text-muted-foreground">إدارة خطة اشتراكك ومميزاتك</p>
        </div>

        {/* Current Plan */}
        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{currentPlanInfo.name}</h2>
                  <Badge className={isActive ? 'bg-green-500' : 'bg-yellow-500'}>
                    {isActive ? 'نشط' : 'تجريبي'}
                  </Badge>
                </div>
                {endDate && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ينتهي في: {endDate}
                  </p>
                )}
              </div>
            </div>
            
            {currentPlan !== 'premium' && (
              <Link to="/pricing">
                <Button variant="hero">
                  <Sparkles className="w-4 h-4 ml-2" />
                  ترقية الخطة
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-semibold mb-3">مميزات خطتك الحالية:</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {currentPlanInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upgrade Options */}
        {currentPlan !== 'premium' && (
          <div>
            <h2 className="text-xl font-bold mb-4">ترقية خطتك</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6 border-2 transition-all ${
                    plan.priority
                      ? 'bg-secondary text-white border-primary shadow-xl'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {plan.priority && (
                    <Badge className="absolute -top-3 right-6 bg-primary">
                      <Sparkles className="w-3 h-3 ml-1" />
                      الأكثر شعبية
                    </Badge>
                  )}

                  <h3 className={`text-xl font-bold mb-2 ${plan.priority ? 'text-white' : ''}`}>
                    {plan.nameAr}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-3xl font-bold ${plan.priority ? 'text-white' : 'text-primary'}`}>
                      ${plan.price}
                    </span>
                    <span className={plan.priority ? 'text-white/70' : 'text-muted-foreground'}>
                      /شهر
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${plan.priority ? 'text-primary' : 'text-green-500'}`} />
                        <span className={plan.priority ? 'text-white/90' : ''}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.priority ? 'hero' : 'outline'}
                    className="w-full"
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? 'خطتك الحالية' : 'اختر هذه الخطة'}
                    {currentPlan !== plan.id && <ArrowLeft className="w-4 h-4 mr-2" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Stats */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-bold mb-6">استخدامك هذا الشهر</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">عمليات بحث</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">تواصل مع مصانع</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">طلبات استيراد</p>
            </div>
          </div>
        </div>

        {/* Billing Info */}
        <div className="bg-muted/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">
                <strong>ملاحظة:</strong> سيتم تجديد اشتراكك تلقائياً في نهاية كل فترة.
              </p>
              <p>
                يمكنك إلغاء الاشتراك في أي وقت. لن يتم استرداد المبالغ المدفوعة للفترة الحالية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
