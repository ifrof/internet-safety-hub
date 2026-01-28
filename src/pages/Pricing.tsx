import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subscriptionPlans } from '@/data/mockData';
import { Check, Sparkles, ArrowLeft } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            أسعار بسيطة وشفافة
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجاتك وابدأ الاستيراد مباشرة من المصانع
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${
                  plan.priority
                    ? 'bg-secondary text-white border-primary shadow-2xl shadow-primary/20 scale-105'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                {plan.priority && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    الأكثر شعبية
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.priority ? 'text-white' : 'text-foreground'}`}>
                    {plan.nameAr}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-5xl font-bold ${plan.priority ? 'text-white' : 'text-foreground'}`}>
                      ${plan.price}
                    </span>
                    <span className={plan.priority ? 'text-white/70' : 'text-muted-foreground'}>/شهر</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.priority ? 'bg-primary' : 'bg-primary/10'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.priority ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className={plan.priority ? 'text-white/90' : 'text-foreground'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={`/auth?mode=signup&plan=${plan.id}`} className="block">
                  <Button 
                    variant={plan.priority ? 'hero' : 'outline'} 
                    size="xl" 
                    className="w-full"
                  >
                    {plan.priority ? 'ابدأ الآن' : 'اختر هذه الباقة'}
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            جميع الباقات تشمل ضمان استرداد الأموال خلال 14 يوم
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            أسئلة شائعة
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">هل يمكنني إلغاء الاشتراك في أي وقت؟</h3>
              <p className="text-muted-foreground">
                نعم، يمكنك إلغاء اشتراكك في أي وقت. سيظل حسابك نشطاً حتى نهاية فترة الفوترة الحالية.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">ما هي طرق الدفع المتاحة؟</h3>
              <p className="text-muted-foreground">
                نقبل بطاقات الائتمان (Visa, Mastercard, Amex)، PayPal، والتحويل البنكي.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">هل الخدمات الإضافية مشمولة؟</h3>
              <p className="text-muted-foreground">
                الاشتراك يتيح لك الوصول للمنصة والتواصل مع المصانع. خدمات التفتيش والشحن والتحويلات لها أسعار منفصلة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
