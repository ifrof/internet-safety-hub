import { FileText, Search, MessageSquare, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '1',
    icon: Search,
    title: 'ابحث عن المنتج',
    description: 'ابحث بالنص، رابط، أو صورة - الذكاء الاصطناعي يجد المصانع المناسبة',
  },
  {
    number: '2',
    icon: ShieldCheck,
    title: 'نتحقق من المصنع',
    description: 'نتأكد أنه مصنع مباشر وليس وسيط أو شركة تجارية',
  },
  {
    number: '3',
    icon: MessageSquare,
    title: 'تفاوض مباشرة',
    description: 'تواصل مع المصنع عبر المنصة وتفاوض على السعر والمواصفات',
  },
  {
    number: '4',
    icon: CreditCard,
    title: 'ادفع بأمان',
    description: 'نحول الأموال للمصنع بشكل آمن ومضمون',
  },
  {
    number: '5',
    icon: FileText,
    title: 'فحص الجودة',
    description: 'نفحص المنتجات قبل الشحن للتأكد من الجودة',
  },
  {
    number: '6',
    icon: Truck,
    title: 'استلم بضاعتك',
    description: 'نتابع الشحن وأوراق الاستيراد حتى الوصول',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            كيف يعمل IFROF؟
          </h2>
          <p className="text-muted-foreground text-lg">
            6 خطوات بسيطة للاستيراد المباشر من المصنع
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="xl">
              ابدأ الآن - $9.99/شهر
              <span className="mr-2">←</span>
            </Button>
          </Link>
          <p className="text-muted-foreground text-sm mt-3">
            اشترك واحصل على وصول كامل لجميع الميزات
          </p>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ number, icon: Icon, title, description, index }: {
  number: string;
  icon: typeof FileText;
  title: string;
  description: string;
  index: number;
}) => (
  <div 
    className="relative bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:border-primary/50 transition-all group animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Step number */}
    <div className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
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
