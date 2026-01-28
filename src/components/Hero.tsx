import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>منصة B2B موثوقة</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            استورد مباشرة من المصنع الصيني
            <span className="block text-gradient-orange">بدون وسطاء</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            نربطك مباشرة بالمصانع الصينية الموثقة. نتحقق من كل مصنع بالذكاء الاصطناعي لضمان أنه مصنع مباشر وليس وسيط.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
            شاهد كيف يعمل
          </Button>
          <Button variant="hero" size="xl">
            ابدأ طلب استيراد
            <span className="mr-2">←</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatItem icon="📊" value="+500" label="مصنع صيني موثق" delay={0} />
          <StatItem icon="👥" value="+2,000" label="مشتري نشط" delay={100} />
          <StatItem icon="📦" value="+10,000" label="طلب استيراد ناجح" delay={200} />
          <StatItem icon="📈" value="30%" label="توفير في التكاليف" delay={300} />
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="mt-16 py-4 bg-secondary/50 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <TrustBadge icon="🎯" text="بدون وسطاء" />
            <TrustBadge icon="✅" text="موثق" />
            <TrustBadge icon="🤖" text="ذكاء اصطناعي" />
            <TrustBadge icon="🔒" text="آمن" />
            <TrustBadge icon="💬" text="دعم 24/7" />
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="py-4 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white flex items-center justify-center gap-2">
            <span className="text-xl">⚠️</span>
            <span>نحن نقضي على الوسطاء! نتحقق من كل مصنع بالذكاء الاصطناعي لضمان أنه مصنع مباشر وليس تاجر أو شركة تجارية.</span>
            <span className="text-xl">⚠️</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ icon, value, label, delay }: { icon: string; value: string; label: string; delay: number }) => (
  <div 
    className="text-center animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{value}</div>
    <div className="text-white/70 text-sm">{label}</div>
  </div>
);

const TrustBadge = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-2">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default Hero;
