import { Link } from 'react-router-dom';
import { mockFactories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, MapPin, ArrowLeft } from 'lucide-react';

const FeaturedFactories = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              مصانع مميزة
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              مصانع موثقة ومعتمدة بأعلى التقييمات
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" size="lg">
              عرض الكل
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockFactories.map((factory, index) => (
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
                {factory.verificationStatus === 'verified' && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white gap-1">
                    <CheckCircle className="w-3 h-3" />
                    موثق
                  </Badge>
                )}
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

                {/* Category */}
                <Badge variant="secondary" className="mb-3">
                  {factory.category}
                </Badge>

                {/* Rating & Response */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{factory.rating}</span>
                    <span className="text-muted-foreground">({factory.reviewsCount})</span>
                  </div>
                  <span className="text-muted-foreground">
                    رد {factory.responseTime}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFactories;
