import { FileText, Search, MessageSquare, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorksSection = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'كيف يعمل IFROF؟',
      subtitle: '6 خطوات بسيطة للاستيراد المباشر من المصنع',
      cta: 'ابدأ الآن - $9.99/شهر',
      ctaNote: 'اشترك واحصل على وصول كامل لجميع الميزات',
      steps: [
        { title: 'ابحث عن المنتج', description: 'ابحث بالنص، رابط، أو صورة - الذكاء الاصطناعي يجد المصانع المناسبة' },
        { title: 'نتحقق من المصنع', description: 'نتأكد أنه مصنع مباشر وليس وسيط أو شركة تجارية' },
        { title: 'تفاوض مباشرة', description: 'تواصل مع المصنع عبر المنصة وتفاوض على السعر والمواصفات' },
        { title: 'ادفع بأمان', description: 'نحول الأموال للمصنع بشكل آمن ومضمون' },
        { title: 'فحص الجودة', description: 'نفحص المنتجات قبل الشحن للتأكد من الجودة' },
        { title: 'استلم بضاعتك', description: 'نتابع الشحن وأوراق الاستيراد حتى الوصول' },
      ],
    },
    en: {
      title: 'How Does IFROF Work?',
      subtitle: '6 simple steps to import directly from the factory',
      cta: 'Start Now - $9.99/month',
      ctaNote: 'Subscribe and get full access to all features',
      steps: [
        { title: 'Search for Product', description: 'Search by text, link, or image - AI finds the right factories' },
        { title: 'We Verify the Factory', description: 'We ensure it\'s a direct manufacturer, not a middleman or trading company' },
        { title: 'Negotiate Directly', description: 'Communicate with the factory through the platform and negotiate price and specs' },
        { title: 'Pay Securely', description: 'We transfer money to the factory safely and securely' },
        { title: 'Quality Inspection', description: 'We inspect products before shipping to ensure quality' },
        { title: 'Receive Your Goods', description: 'We follow up on shipping and import documents until arrival' },
      ],
    },
    zh: {
      title: 'IFROF如何工作？',
      subtitle: '6个简单步骤直接从工厂进口',
      cta: '立即开始 - $9.99/月',
      ctaNote: '订阅并获得所有功能的完全访问权限',
      steps: [
        { title: '搜索产品', description: '通过文字、链接或图片搜索 - AI找到合适的工厂' },
        { title: '我们验证工厂', description: '我们确保它是直接制造商，而不是中间商或贸易公司' },
        { title: '直接谈判', description: '通过平台与工厂沟通，协商价格和规格' },
        { title: '安全支付', description: '我们安全地将资金转给工厂' },
        { title: '质量检验', description: '我们在发货前检查产品以确保质量' },
        { title: '接收货物', description: '我们跟进物流和进口文件直到到达' },
      ],
    },
  };

  const c = content[language];

  const icons = [Search, ShieldCheck, MessageSquare, CreditCard, FileText, Truck];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {c.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {c.steps.map((step, index) => (
            <StepCard 
              key={index} 
              number={String(index + 1)}
              icon={icons[index]}
              title={step.title}
              description={step.description}
              index={index}
              language={language}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="xl">
              {c.cta}
              <span className={language === 'ar' ? 'mr-2' : 'ml-2'}>{language === 'ar' ? '←' : '→'}</span>
            </Button>
          </Link>
          <p className="text-muted-foreground text-sm mt-3">
            {c.ctaNote}
          </p>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ number, icon: Icon, title, description, index, language }: {
  number: string;
  icon: typeof FileText;
  title: string;
  description: string;
  index: number;
  language: string;
}) => (
  <div 
    className="relative bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:border-primary/50 transition-all group animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Step number */}
    <div className={`absolute -top-4 ${language === 'ar' ? 'right-6' : 'left-6'} w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg`}>
      {number}
    </div>
    
    {/* Icon */}
    <div className="mt-4 mb-4">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
    </div>
    
    {/* Content */}
    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default HowItWorksSection;
