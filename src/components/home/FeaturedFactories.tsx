import { Link } from 'react-router-dom';
import { mockFactories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, MapPin, ArrowLeft, Factory, Calendar, Users, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedFactories = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'مصانع مميزة',
      subtitle: 'مصانع صينية موثقة للاستيراد المباشر',
      viewAll: 'عرض كل المصانع',
      verified: 'موثق',
      directFactory: 'مصنع مباشر',
      yearsExp: 'سنة خبرة',
      employees: 'موظف',
      moq: 'الحد الأدنى',
      response: 'رد',
      requestQuote: 'طلب عرض سعر',
    },
    en: {
      title: 'Featured Factories',
      subtitle: 'Verified Chinese factories for direct import',
      viewAll: 'View All Factories',
      verified: 'Verified',
      directFactory: 'Direct Factory',
      yearsExp: 'Years Experience',
      employees: 'Employees',
      moq: 'MOQ',
      response: 'Response',
      requestQuote: 'Request Quote',
    },
    zh: {
      title: '特色工厂',
      subtitle: '经过验证的中国工厂，可直接进口',
      viewAll: '查看所有工厂',
      verified: '已验证',
      directFactory: '直接工厂',
      yearsExp: '年经验',
      employees: '员工',
      moq: '起订量',
      response: '回复',
      requestQuote: '询价',
    },
  };

  const c = content[language];
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Factory className="w-4 h-4" />
              <span>{c.directFactory}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {c.title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {c.subtitle}
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" size="lg">
              {c.viewAll}
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockFactories.map((factory, index) => {
            const yearsInBusiness = currentYear - factory.establishedYear;
            
            return (
              <Link
                key={factory.id}
                to={`/factory/${factory.id}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Cover Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={factory.coverImage}
                    alt={factory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {factory.verificationStatus === 'verified' && (
                      <Badge className="bg-green-500 text-white gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {c.verified}
                      </Badge>
                    )}
                    {factory.isDirectFactory && (
                      <Badge className="bg-primary text-primary-foreground gap-1">
                        <Factory className="w-3 h-3" />
                        {c.directFactory}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={factory.logo}
                      alt={factory.name}
                      className="w-12 h-12 rounded-lg object-cover border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {factory.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{factory.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Factory Info Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{yearsInBusiness} {c.yearsExp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{factory.employeesCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                      <Package className="w-3 h-3" />
                      <span>{c.moq}: ${factory.minOrderValue?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {factory.certifications.slice(0, 3).map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs px-2 py-0">
                        {cert}
                      </Badge>
                    ))}
                    {factory.certifications.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{factory.certifications.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Rating & Response */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{factory.rating}</span>
                      <span className="text-muted-foreground">({factory.reviewsCount})</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {c.response} {factory.responseTime}
                    </span>
                  </div>

                  {/* Main Products */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {factory.mainProducts.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFactories;
