import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            تصفح حسب الفئة
          </h2>
          <p className="text-muted-foreground text-lg">
            اكتشف المصانع حسب نوع المنتجات
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
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm">{category.count} مصنع</p>
              <ArrowLeft className="absolute left-4 bottom-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform group-hover:-translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
