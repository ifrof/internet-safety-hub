import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { subscriptionPlans } from '@/data/mockData';
import { Check, Sparkles, ArrowLeft, Star, Zap, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'اختر الباقة المناسبة لك',
      subtitle: 'ثلاث باقات مصممة لتناسب كل احتياجاتك في الاستيراد من الصين',
      month: '/شهر',
      starter: 'للتجربة',
      professional: 'للمستوردين النشطين',
      unlimited: 'للمستوردين المحترفين',
      getStarted: 'ابدأ الآن',
      choosePlan: 'اختر هذه الباقة',
      popular: 'الأكثر شعبية',
      best: 'الأفضل قيمة',
      trial: 'تجربة محدودة',
      guarantee: 'جميع الباقات تشمل ضمان استرداد الأموال خلال 7 أيام',
      faq: 'أسئلة شائعة',
      q1: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
      a1: 'نعم، يمكنك إلغاء اشتراكك في أي وقت. سيظل حسابك نشطاً حتى نهاية فترة الفوترة الحالية.',
      q2: 'ما هي طرق الدفع المتاحة؟',
      a2: 'نقبل بطاقات الائتمان (Visa, Mastercard, Amex) والتحويل البنكي.',
      q3: 'ما الفرق بين الباقات؟',
      a3: 'باقة التجربة للمبتدئين بـ 3 عمليات فقط، الاحترافية لـ 20 عملية شهرياً، والغير محدودة تفتح كل الخدمات بدون قيود.',
    },
    en: {
      title: 'Choose the Right Plan for You',
      subtitle: 'Three plans designed to fit all your China import needs',
      month: '/month',
      starter: 'For Trial',
      professional: 'For Active Importers',
      unlimited: 'For Professional Importers',
      getStarted: 'Get Started',
      choosePlan: 'Choose This Plan',
      popular: 'Most Popular',
      best: 'Best Value',
      trial: 'Limited Trial',
      guarantee: 'All plans include a 7-day money-back guarantee',
      faq: 'FAQ',
      q1: 'Can I cancel my subscription anytime?',
      a1: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of the current billing period.',
      q2: 'What payment methods are available?',
      a2: 'We accept credit cards (Visa, Mastercard, Amex) and bank transfers.',
      q3: 'What\'s the difference between plans?',
      a3: 'Starter is for beginners with only 3 operations, Professional for 20 operations monthly, and Unlimited unlocks all services without restrictions.',
    },
    zh: {
      title: '选择适合您的套餐',
      subtitle: '三种套餐，满足您所有的中国进口需求',
      month: '/月',
      starter: '试用版',
      professional: '活跃进口商',
      unlimited: '专业进口商',
      getStarted: '立即开始',
      choosePlan: '选择此套餐',
      popular: '最受欢迎',
      best: '最佳价值',
      trial: '限量试用',
      guarantee: '所有套餐均享有7天退款保证',
      faq: '常见问题',
      q1: '我可以随时取消订阅吗？',
      a1: '是的，您可以随时取消订阅。您的账户将保持活跃直到当前计费周期结束。',
      q2: '有哪些付款方式？',
      a2: '我们接受信用卡（Visa、Mastercard、Amex）和银行转账。',
      q3: '套餐之间有什么区别？',
      a3: '入门版仅限3次操作，专业版每月20次操作，无限版无限制开放所有服务。',
    },
  };

  const c = content[language];

  const planIcons = [Zap, Star, Crown];
  const planLabels = [c.trial, c.popular, c.best];
  const planDescs = [c.starter, c.professional, c.unlimited];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {c.title}
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => {
              const Icon = planIcons[index];
              const isPopular = index === 1;
              const isBest = index === 2;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-6 lg:p-8 border-2 transition-all duration-300 ${
                    isBest
                      ? 'bg-gradient-to-br from-primary/20 to-secondary text-white border-primary shadow-2xl shadow-primary/20 scale-105'
                      : isPopular
                      ? 'bg-secondary text-white border-primary/50'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {/* Badge */}
                  <div className={`absolute -top-3 ${language === 'ar' ? 'right-6' : 'left-6'} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    isBest 
                      ? 'bg-primary text-primary-foreground' 
                      : isPopular 
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-3 h-3" />
                    {planLabels[index]}
                  </div>

                  <div className="text-center mb-6 pt-4">
                    <h3 className={`text-xl lg:text-2xl font-bold mb-1 ${isBest || isPopular ? 'text-white' : 'text-foreground'}`}>
                      {plan.nameAr}
                    </h3>
                    <p className={`text-sm ${isBest || isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {planDescs[index]}
                    </p>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className={`text-4xl lg:text-5xl font-bold ${isBest || isPopular ? 'text-white' : 'text-foreground'}`}>
                        ${plan.price}
                      </span>
                      <span className={isBest || isPopular ? 'text-white/70' : 'text-muted-foreground'}>{c.month}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isBest ? 'bg-primary' : isPopular ? 'bg-primary/80' : 'bg-primary/10'
                        }`}>
                          <Check className={`w-3 h-3 ${isBest || isPopular ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <span className={`text-sm ${isBest || isPopular ? 'text-white/90' : 'text-foreground'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/auth?mode=signup&plan=${plan.id}`} className="block">
                    <Button 
                      variant={isBest ? 'hero' : isPopular ? 'default' : 'outline'} 
                      size="lg" 
                      className="w-full"
                    >
                      {isBest ? c.getStarted : c.choosePlan}
                      <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            {c.guarantee}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {c.faq}
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">{c.q1}</h3>
              <p className="text-muted-foreground">{c.a1}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">{c.q2}</h3>
              <p className="text-muted-foreground">{c.a2}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-2">{c.q3}</h3>
              <p className="text-muted-foreground">{c.a3}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
