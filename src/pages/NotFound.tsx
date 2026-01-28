import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowRight, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: '404',
      subtitle: 'الصفحة غير موجودة',
      description: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      home: 'العودة للرئيسية',
      marketplace: 'تصفح المصانع',
      help: 'تحتاج مساعدة؟',
      suggestions: 'جرب هذه الروابط:'
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      home: 'Go to Homepage',
      marketplace: 'Browse Factories',
      help: 'Need Help?',
      suggestions: 'Try these links:'
    },
    zh: {
      title: '404',
      subtitle: '页面未找到',
      description: '抱歉，您查找的页面不存在或已被移动。',
      home: '返回首页',
      marketplace: '浏览工厂',
      help: '需要帮助？',
      suggestions: '试试这些链接：'
    }
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-accent flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-white/10 leading-none select-none">
            {c.title}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Search className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {c.subtitle}
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          {c.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 ml-2" />
              {c.home}
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
              <Search className="w-5 h-5 ml-2" />
              {c.marketplace}
            </Button>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <p className="text-white/60 text-sm mb-4">{c.suggestions}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/services" className="text-white/80 hover:text-primary text-sm flex items-center gap-1 transition-colors">
              <ArrowRight className="w-3 h-3" />
              {language === 'ar' ? 'الخدمات' : language === 'zh' ? '服务' : 'Services'}
            </Link>
            <Link to="/pricing" className="text-white/80 hover:text-primary text-sm flex items-center gap-1 transition-colors">
              <ArrowRight className="w-3 h-3" />
              {language === 'ar' ? 'الأسعار' : language === 'zh' ? '价格' : 'Pricing'}
            </Link>
            <Link to="/blog" className="text-white/80 hover:text-primary text-sm flex items-center gap-1 transition-colors">
              <ArrowRight className="w-3 h-3" />
              {language === 'ar' ? 'المدونة' : language === 'zh' ? '博客' : 'Blog'}
            </Link>
            <Link to="/auth" className="text-white/80 hover:text-primary text-sm flex items-center gap-1 transition-colors">
              <ArrowRight className="w-3 h-3" />
              {language === 'ar' ? 'تسجيل الدخول' : language === 'zh' ? '登录' : 'Login'}
            </Link>
          </div>
        </div>

        {/* Help Link */}
        <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 text-white/60 hover:text-white mt-8 text-sm transition-colors">
          <HelpCircle className="w-4 h-4" />
          {c.help}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
