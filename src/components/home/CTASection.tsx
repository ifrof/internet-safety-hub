import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = forwardRef<HTMLElement>((_, ref) => {
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const content = {
    ar: {
      badge: 'ابدأ رحلة الاستيراد الآن',
      title: 'جاهز للاستيراد مباشرة من المصنع؟',
      subtitle: 'انضم لأكثر من 2,000 مستورد يستخدمون IFROF للتواصل المباشر مع المصانع الصينية',
      cta: 'ابدأ الآن - $9.99/شهر',
      support: 'تواصل مع الدعم الفني',
      guarantee: 'ضمان استرداد الأموال خلال 14 يوم • بدون عقود طويلة الأجل',
    },
    en: {
      badge: 'Start Your Import Journey Now',
      title: 'Ready to Import Directly from the Factory?',
      subtitle: 'Join over 2,000 importers using IFROF to connect directly with Chinese factories',
      cta: 'Start Now - $9.99/month',
      support: 'Contact Support',
      guarantee: '14-day money-back guarantee • No long-term contracts',
    },
    zh: {
      badge: '立即开始您的进口之旅',
      title: '准备好直接从工厂进口了吗？',
      subtitle: '加入超过2,000名进口商，使用IFROF直接与中国工厂联系',
      cta: '立即开始 - $9.99/月',
      support: '联系客服支持',
      guarantee: '14天退款保证 • 无长期合同',
    },
  };

  const c = content[language];

  return (
    <section ref={ref} className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-secondary to-accent rounded-3xl p-6 md:p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base">{c.badge}</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
              {c.title}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
              {c.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  {c.cta}
                  <Arrow className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Headphones className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {c.support}
                </Button>
              </Link>
            </div>

            <p className="text-white/50 text-xs md:text-sm mt-6">
              {c.guarantee}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
