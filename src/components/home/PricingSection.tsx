import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { subscriptionPlans } from '@/data/mockData';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            أسعار بسيطة وشفافة
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اشترك بـ $9.99 شهرياً واحصل على وصول كامل للمنصة وجميع الخدمات
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-300 animate-fade-in-up ${
                plan.priority
                  ? 'bg-secondary text-white border-primary shadow-2xl shadow-primary/20 scale-105'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
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
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
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
  );
};

export default PricingSection;
