import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useFactories } from '@/hooks/useFactories';
import { categories } from '@/data/mockData';
import { Search, Filter, Star, CheckCircle, MapPin, Grid, List, Factory } from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: factories, isLoading, error } = useFactories(selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-secondary pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            سوق المصانع
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8">
            تصفح +500 مصنع صيني موثق ومعتمد
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن مصنع أو منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 md:pr-12 py-5 md:py-6 text-sm md:text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 py-5 md:py-6">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.icon} {cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="py-5 md:py-6 px-5 md:px-6"
              >
                <Grid className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="py-5 md:py-6 px-5 md:px-6"
              >
                <List className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Factories Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <p className="text-muted-foreground text-sm md:text-base">
              عرض {factories?.length || 0} مصنع
            </p>
          </div>

          {isLoading ? (
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <Skeleton className="h-32 md:h-40 w-full" />
                  <div className="p-4 md:p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 md:py-16">
              <Factory className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-base md:text-lg mb-4">حدث خطأ في تحميل المصانع</p>
              <Button onClick={() => window.location.reload()}>
                إعادة المحاولة
              </Button>
            </div>
          ) : (
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {factories?.map((factory) => (
                <Link
                  key={factory.id}
                  to={`/factory/${factory.id}`}
                  className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                  }`}
                >
                  {/* Cover Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-32 sm:h-auto sm:w-48 flex-shrink-0' : 'h-32 md:h-40'}`}>
                    <img
                      src={factory.cover_image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'}
                      alt={factory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {factory.verification_status === 'verified' && (
                      <Badge className="absolute top-2 right-2 md:top-3 md:right-3 bg-green-500 text-white gap-1 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        موثق
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-4 md:p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                      <img
                        src={factory.logo_url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'}
                        alt={factory.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors text-sm md:text-base">
                          {factory.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{factory.location || 'الصين'}</span>
                        </div>
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-2 md:mb-3 text-xs">{factory.category}</Badge>

                    <div className="flex items-center justify-between text-xs md:text-sm mb-2 md:mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{factory.rating || 4.5}</span>
                        <span className="text-muted-foreground">({factory.reviews_count || 0})</span>
                      </div>
                      <span className="text-muted-foreground text-xs">رد {factory.response_time || '< 24 ساعة'}</span>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {(factory.main_products || []).slice(0, 4).join(' • ') || 'منتجات متنوعة'}
                    </p>

                    {viewMode === 'list' && (
                      <div className="mt-3 md:mt-4 flex items-center gap-4">
                        <span className="text-xs md:text-sm text-muted-foreground">
                          الحد الأدنى: ${factory.min_order_value || 1000}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && factories?.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <Factory className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-base md:text-lg mb-4">لم يتم العثور على مصانع</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;
