import { CheckCircle, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ai-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="hero-gradient min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>منصة B2B موثوقة - بدون وسطاء</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            استورد مباشرة من المصنع الصيني
            <span className="block text-gradient-orange mt-2">بدون وسطاء</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            نربطك مباشرة بالمصانع الصينية الموثقة. نتحقق من كل مصنع بالذكاء الاصطناعي لضمان أنه مصنع مباشر وليس وسيط.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="ابحث عن منتج، صورة، أو رابط..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12 py-6 text-lg"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="sm:w-auto">
              <span>ابحث عن مصانع</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
          <p className="text-white/50 text-sm text-center mt-3">
            يمكنك البحث بالنص، رابط منتج، أو رفع صورة للمنتج
          </p>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
            شاهد كيف يعمل
          </Button>
          <Button variant="hero" size="xl" onClick={() => navigate('/marketplace')}>
            تصفح المصانع
            <ArrowLeft className="w-5 h-5 mr-2" />
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
            <TrustBadge icon="✅" text="موثق بالذكاء الاصطناعي" />
            <TrustBadge icon="🤖" text="AI Agent للبحث" />
            <TrustBadge icon="🔒" text="دفع آمن" />
            <TrustBadge icon="💬" text="دعم 24/7" />
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="py-4 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white flex items-center justify-center gap-2 flex-wrap">
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
    style={{ animationDelay: `${delay + 500}ms` }}
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

export default HeroSection;
