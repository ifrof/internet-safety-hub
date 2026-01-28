import { Shield, Search, Eye, BadgeCheck, AlertTriangle, XCircle } from 'lucide-react';

const verificationFeatures = [
  {
    icon: Search,
    title: 'تحليل متقدم',
    description: 'نستخدم تقنيات متقدمة لتحليل بيانات المصنع والتحقق من أصالته',
  },
  {
    icon: Eye,
    title: 'فحص يدوي',
    description: 'فريقنا يتحقق يدوياً من كل مصنع لضمان الجودة والموثوقية',
  },
  {
    icon: Shield,
    title: 'التحقق من السجلات',
    description: 'نراجع السجلات التجارية والشهادات الرسمية للمصنع',
  },
  {
    icon: BadgeCheck,
    title: 'شهادة موثوقية IFROF',
    description: 'المصانع المعتمدة تحصل على شهادة موثوقية موثقة',
  },
];

const eliminatedMiddlemen = [
  'الشركات التجارية',
  'الوسطاء المحليين',
  'تجار الجملة',
  'المكاتب التجارية',
  'السماسرة',
];

const VerificationSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - How We Verify */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              كيف نتحقق من المصانع؟
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
              نستخدم تقنيات متقدمة لضمان أن كل مصنع على منصتنا هو مصنع مباشر وموثوق.
            </p>

            <div className="space-y-4 md:space-y-6">
              {verificationFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-sm md:text-base">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Who We Eliminate */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">نقضي على الوسطاء</h3>
                <p className="text-muted-foreground text-sm md:text-base">لا مكان لهم على منصتنا</p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              {eliminatedMiddlemen.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 md:p-4 bg-destructive/5 rounded-xl border border-destructive/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm md:text-base">{item}</span>
                  <span className="text-destructive text-xs md:text-sm mr-auto">مرفوض</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground text-sm md:text-base">نقبل فقط المصانع المباشرة</h4>
                  <p className="text-muted-foreground text-xs md:text-sm">موثقة ومعتمدة بنسبة تحقق 95%+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
