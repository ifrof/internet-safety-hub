import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
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
              <span>ابدأ رحلة الاستيراد الآن</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              جاهز للاستيراد مباشرة من المصنع؟
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              انضم لأكثر من 2,000 مستورد يستخدمون IFROF للتواصل المباشر مع المصانع الصينية
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  ابدأ الآن - $9.99/شهر
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/ai-chat">
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <MessageSquare className="w-5 h-5 ml-2" />
                  تحدث مع المساعد الذكي
                </Button>
              </Link>
            </div>

            <p className="text-white/50 text-sm mt-6">
              ضمان استرداد الأموال خلال 14 يوم • بدون عقود طويلة الأجل
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
