import { Shield, Bot, Eye, BadgeCheck, AlertTriangle, XCircle } from 'lucide-react';

const verificationFeatures = [
  {
    icon: Bot,
    title: 'تحليل بالذكاء الاصطناعي',
    description: 'نستخدم خوارزميات متقدمة لتحليل بيانات المصنع والتحقق من أصالته',
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
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - How We Verify */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف نتحقق من المصانع؟
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              نستخدم تقنيات متقدمة لضمان أن كل مصنع على منصتنا هو مصنع مباشر وموثوق.
            </p>

            <div className="space-y-6">
              {verificationFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Who We Eliminate */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">نقضي على الوسطاء</h3>
                <p className="text-muted-foreground">لا مكان لهم على منصتنا</p>
              </div>
            </div>

            <div className="space-y-4">
              {eliminatedMiddlemen.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-destructive/5 rounded-xl border border-destructive/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                  <span className="text-destructive text-sm mr-auto">مرفوض</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-bold text-foreground">نقبل فقط المصانع المباشرة</h4>
                  <p className="text-muted-foreground text-sm">موثقة ومعتمدة بنسبة تحقق 95%+</p>
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
