import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoriesSection = () => {
  const { t, language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const content = {
    ar: {
      title: 'تصفح حسب الفئة',
      subtitle: 'اكتشف المصانع حسب نوع المنتجات',
      factory: 'مصنع',
    },
    en: {
      title: 'Browse by Category',
      subtitle: 'Discover factories by product type',
      factory: 'Factories',
    },
    zh: {
      title: '按类别浏览',
      subtitle: '按产品类型发现工厂',
      factory: '工厂',
    },
  };

  const c = content[language];

  const categoryNames: Record<string, Record<string, string>> = {
    electronics: { ar: 'الإلكترونيات', en: 'Electronics', zh: '电子产品' },
    clothing: { ar: 'الملابس', en: 'Clothing', zh: '服装' },
    furniture: { ar: 'الأثاث', en: 'Furniture', zh: '家具' },
    machinery: { ar: 'الآلات', en: 'Machinery', zh: '机械' },
    beauty: { ar: 'التجميل', en: 'Beauty', zh: '美容' },
    food: { ar: 'الأغذية', en: 'Food', zh: '食品' },
    toys: { ar: 'الألعاب', en: 'Toys', zh: '玩具' },
    auto: { ar: 'السيارات', en: 'Auto Parts', zh: '汽车配件' },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/marketplace?category=${category.id}`}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                {categoryNames[category.id]?.[language] || category.name}
              </h3>
              <p className="text-muted-foreground text-xs">{category.count} {c.factory}</p>
              <Arrow className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} bottom-6 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
