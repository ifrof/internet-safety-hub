import { Shield, Bot, Eye, BadgeCheck } from "lucide-react";

const verificationSteps = [
  {
    icon: Bot,
    title: "تحليل بالذكاء الاصطناعي",
    description: "نستخدم خوارزميات متقدمة لتحليل بيانات المصنع والتحقق من أصالته",
  },
  {
    icon: Eye,
    title: "فحص يدوي",
    description: "فريقنا يتحقق يدوياً من كل مصنع لضمان الجودة والموثوقية",
  },
  {
    icon: Shield,
    title: "التحقق من السجلات",
    description: "نراجع السجلات التجارية والشهادات الرسمية للمصنع",
  },
  {
    icon: BadgeCheck,
    title: "شهادة موثوقية",
    description: "المصانع المعتمدة تحصل على شهادة موثوقية IFROF",
  },
];

const Verification = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            كيف نتحقق؟
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            نستخدم الذكاء الاصطناعي والتحقق اليدوي لضمان أن كل مصنع على منصتنا هو مصنع مباشر وليس وسيط.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verificationSteps.map((step, index) => (
            <VerificationCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VerificationCard = ({ icon: Icon, title, description, index }: {
  icon: typeof Shield;
  title: string;
  description: string;
  index: number;
}) => (
  <div 
    className="glass-card rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

export default Verification;
