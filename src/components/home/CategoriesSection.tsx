import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Factory } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoriesSection = () => {
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const content = {
    ar: {
      title: 'تصفح المصانع حسب القطاع',
      subtitle: 'اكتشف المصانع الصينية الموثقة حسب خطوط الإنتاج',
      factory: 'مصنع موثق',
    },
    en: {
      title: 'Browse Factories by Sector',
      subtitle: 'Discover verified Chinese factories by production lines',
      factory: 'Verified Factories',
    },
    zh: {
      title: '按行业浏览工厂',
      subtitle: '按生产线发现经过验证的中国工厂',
      factory: '认证工厂',
    },
  };

  const c = content[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Factory className="w-4 h-4" />
            <span>{language === 'ar' ? 'B2B استيراد مباشر' : 'Direct B2B Import'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/marketplace?category=${category.id}`}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-bold text-foreground text-sm md:text-base mb-2 group-hover:text-primary transition-colors leading-tight">
                {language === 'en' ? category.nameEn : category.name}
              </h3>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold text-sm">
                  {category.count} {c.factory}
                </span>
                <Arrow className={`w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
