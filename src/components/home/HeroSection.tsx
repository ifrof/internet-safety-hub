import { CheckCircle, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ai-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const content = {
    ar: {
      badge: 'منصة B2B موثوقة - بدون وسطاء',
      title: 'استورد مباشرة من المصنع الصيني',
      titleHighlight: 'بدون وسطاء',
      subtitle: 'نربطك مباشرة بالمصانع الصينية الموثقة. نتحقق من كل مصنع بتقنيات متقدمة لضمان أنه مصنع مباشر وليس وسيط.',
      searchPlaceholder: 'ابحث عن منتج، صورة، أو رابط...',
      searchButton: 'ابحث عن مصانع',
      searchHint: 'يمكنك البحث بالنص، رابط منتج، أو رفع صورة للمنتج',
      howItWorks: 'شاهد كيف يعمل',
      browseFactories: 'تصفح المصانع',
      stats: {
        factories: { value: '+500', label: 'مصنع صيني موثق' },
        buyers: { value: '+2,000', label: 'مشتري نشط' },
        orders: { value: '+10,000', label: 'طلب استيراد ناجح' },
        savings: { value: '30%', label: 'توفير في التكاليف' },
      },
      badges: ['بدون وسطاء', 'موثق ومعتمد', 'بحث متقدم', 'دفع آمن', 'دعم 24/7'],
      warning: 'نحن نقضي على الوسطاء! نتحقق من كل مصنع بتقنيات متقدمة لضمان أنه مصنع مباشر وليس تاجر أو شركة تجارية.',
    },
    en: {
      badge: 'Trusted B2B Platform - No Middlemen',
      title: 'Import Directly from Chinese Factory',
      titleHighlight: 'No Middlemen',
      subtitle: 'We connect you directly with verified Chinese factories. We verify each factory with advanced technology to ensure it\'s a direct manufacturer, not a middleman.',
      searchPlaceholder: 'Search for product, image, or link...',
      searchButton: 'Find Factories',
      searchHint: 'You can search by text, product link, or upload an image',
      howItWorks: 'See How It Works',
      browseFactories: 'Browse Factories',
      stats: {
        factories: { value: '+500', label: 'Verified Chinese Factories' },
        buyers: { value: '+2,000', label: 'Active Buyers' },
        orders: { value: '+10,000', label: 'Successful Import Orders' },
        savings: { value: '30%', label: 'Cost Savings' },
      },
      badges: ['No Middlemen', 'Verified & Certified', 'Advanced Search', 'Secure Payment', '24/7 Support'],
      warning: 'We eliminate middlemen! We verify every factory with advanced technology to ensure it\'s a direct manufacturer, not a trader or trading company.',
    },
    zh: {
      badge: '可信赖的B2B平台 - 无中间商',
      title: '直接从中国工厂进口',
      titleHighlight: '无中间商',
      subtitle: '我们直接将您与经过验证的中国工厂连接。我们使用先进技术验证每家工厂，确保它是直接制造商，而不是中间商。',
      searchPlaceholder: '搜索产品、图片或链接...',
      searchButton: '查找工厂',
      searchHint: '您可以通过文字、产品链接或上传图片进行搜索',
      howItWorks: '了解工作原理',
      browseFactories: '浏览工厂',
      stats: {
        factories: { value: '+500', label: '认证中国工厂' },
        buyers: { value: '+2,000', label: '活跃买家' },
        orders: { value: '+10,000', label: '成功进口订单' },
        savings: { value: '30%', label: '成本节省' },
      },
      badges: ['无中间商', '认证工厂', '高级搜索', '安全支付', '24/7支持'],
      warning: '我们消除中间商！我们用先进技术验证每家工厂，确保它是直接制造商，而不是贸易商或贸易公司。',
    },
  };

  const c = content[language];
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

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
            <span>{c.badge}</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {c.title}
            <span className="block text-gradient-orange mt-2">{c.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {c.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-white/50`} />
              <Input
                type="text"
                placeholder={c.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${language === 'ar' ? 'pr-12' : 'pl-12'} py-6 text-lg`}
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="sm:w-auto">
              <span>{c.searchButton}</span>
              <Arrow className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </div>
          <p className="text-white/50 text-sm text-center mt-3">
            {c.searchHint}
          </p>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
            {c.howItWorks}
          </Button>
          <Button variant="hero" size="xl" onClick={() => navigate('/marketplace')}>
            {c.browseFactories}
            <Arrow className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatItem icon="📊" value={c.stats.factories.value} label={c.stats.factories.label} delay={0} />
          <StatItem icon="👥" value={c.stats.buyers.value} label={c.stats.buyers.label} delay={100} />
          <StatItem icon="📦" value={c.stats.orders.value} label={c.stats.orders.label} delay={200} />
          <StatItem icon="📈" value={c.stats.savings.value} label={c.stats.savings.label} delay={300} />
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="mt-16 py-4 bg-secondary/50 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <TrustBadge icon="🎯" text={c.badges[0]} />
            <TrustBadge icon="✅" text={c.badges[1]} />
            <TrustBadge icon="🤖" text={c.badges[2]} />
            <TrustBadge icon="🔒" text={c.badges[3]} />
            <TrustBadge icon="💬" text={c.badges[4]} />
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="py-4 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xl">⚠️</span>
            <span>{c.warning}</span>
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
