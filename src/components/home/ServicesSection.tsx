import { Link } from 'react-router-dom';
import { serviceCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            خدمات إضافية لنجاح استيرادك
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            نقدم لك مجموعة شاملة من الخدمات لتسهيل عملية الاستيراد من البداية حتى النهاية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group glass-card rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-white/70 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">
                  {typeof service.startingPrice === 'number' 
                    ? `من $${service.startingPrice}` 
                    : service.startingPrice}
                </span>
                <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button variant="hero" size="xl">
              استعرض كل الخدمات
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
