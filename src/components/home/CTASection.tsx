import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const content = {
    ar: {
      badge: 'ابدأ رحلة الاستيراد الآن',
      title: 'جاهز للاستيراد مباشرة من المصنع؟',
      subtitle: 'انضم لأكثر من 2,000 مستورد يستخدمون IFROF للتواصل المباشر مع المصانع الصينية',
      cta: 'ابدأ الآن - $9.99/شهر',
      chat: 'تحدث مع المساعد الذكي',
      guarantee: 'ضمان استرداد الأموال خلال 14 يوم • بدون عقود طويلة الأجل',
    },
    en: {
      badge: 'Start Your Import Journey Now',
      title: 'Ready to Import Directly from the Factory?',
      subtitle: 'Join over 2,000 importers using IFROF to connect directly with Chinese factories',
      cta: 'Start Now - $9.99/month',
      chat: 'Talk to AI Assistant',
      guarantee: '14-day money-back guarantee • No long-term contracts',
    },
    zh: {
      badge: '立即开始您的进口之旅',
      title: '准备好直接从工厂进口了吗？',
      subtitle: '加入超过2,000名进口商，使用IFROF直接与中国工厂联系',
      cta: '立即开始 - $9.99/月',
      chat: '与AI助手交谈',
      guarantee: '14天退款保证 • 无长期合同',
    },
  };

  const c = content[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-secondary to-accent rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>{c.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {c.title}
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              {c.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  {c.cta}
                  <Arrow className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link to="/ai-chat">
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <MessageSquare className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {c.chat}
                </Button>
              </Link>
            </div>

            <p className="text-white/50 text-sm mt-6">
              {c.guarantee}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
