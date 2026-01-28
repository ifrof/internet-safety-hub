import { FileText, Search, MessageSquare, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "أرسل طلب استيراد",
    description: "حدد المنتج والكمية والمواصفات المطلوبة",
  },
  {
    number: "2",
    icon: Search,
    title: "نجد لك المصنع المناسب",
    description: "الذكاء الاصطناعي يبحث ويتحقق من المصانع المباشرة",
  },
  {
    number: "3",
    icon: MessageSquare,
    title: "تفاوض مباشرة",
    description: "تواصل مع المصنع مباشرة عبر المنصة",
  },
  {
    number: "4",
    icon: Truck,
    title: "استلم بضاعتك",
    description: "نتابع الشحن حتى وصول البضاعة",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            كيف يعمل IFROF؟
          </h2>
          <p className="text-muted-foreground text-lg">
            4 خطوات بسيطة للاستيراد المباشر
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="xl">
            ابدأ طلب استيراد
            <span className="mr-2">←</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ number, icon: Icon, title, description }: {
  number: string;
  icon: typeof FileText;
  title: string;
  description: string;
}) => (
  <div className="relative bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow group">
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

export default HowItWorks;
