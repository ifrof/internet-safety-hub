import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useFactories } from '@/hooks/useFactories';
import { categories } from '@/data/mockData';
import B2BFilters, { B2BFilterValues } from '@/components/marketplace/B2BFilters';
import { Search, Filter, Star, CheckCircle, MapPin, Grid, List, Factory, Calendar, Users, Package, Settings2, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const defaultFilters: B2BFilterValues = {
  country: 'all',
  moqRange: [0, 50000],
  certifications: [],
  manufacturingTypes: [],
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<B2BFilterValues>(defaultFilters);
  const { language } = useLanguage();

  const { data: factories, isLoading, error } = useFactories(selectedCategory, searchQuery);

  // Apply B2B filters
  const filteredFactories = useMemo(() => {
    if (!factories) return [];
    
    return factories.filter(factory => {
      // Country filter
      if (filters.country !== 'all' && factory.country !== filters.country) {
        return false;
      }
      
      // MOQ filter
      const moq = factory.min_order_value || 0;
      if (moq < filters.moqRange[0] || moq > filters.moqRange[1]) {
        return false;
      }
      
      // Certifications filter
      if (filters.certifications.length > 0) {
        const factoryCerts = factory.certifications || [];
        if (!filters.certifications.some(cert => factoryCerts.includes(cert))) {
          return false;
        }
      }
      
      // Manufacturing types filter
      if (filters.manufacturingTypes.length > 0) {
        const factoryTypes = factory.manufacturing_types || [];
        if (!filters.manufacturingTypes.some(type => factoryTypes.includes(type as any))) {
          return false;
        }
      }
      
      return true;
    });
  }, [factories, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.country !== 'all') count++;
    if (filters.moqRange[0] > 0 || filters.moqRange[1] < 50000) count++;
    if (filters.certifications.length > 0) count++;
    if (filters.manufacturingTypes.length > 0) count++;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const content = {
    ar: {
      title: 'سوق المصانع',
      subtitle: 'تصفح +500 مصنع صيني موثق للاستيراد المباشر',
      searchPlaceholder: 'ابحث عن مصنع أو خط إنتاج...',
      allCategories: 'جميع القطاعات',
      showing: 'عرض',
      factories: 'مصنع',
      verified: 'موثق',
      directFactory: 'مصنع مباشر',
      yearsExp: 'سنة خبرة',
      moq: 'الحد الأدنى',
      response: 'رد',
      error: 'حدث خطأ في تحميل المصانع',
      retry: 'إعادة المحاولة',
      noResults: 'لم يتم العثور على مصانع',
      resetSearch: 'إعادة ضبط البحث',
      b2bPlatform: 'منصة B2B للمصانع',
      filtersLabel: 'الفلاتر',
      manufacturingTypes: 'نوع التصنيع',
    },
    en: {
      title: 'Factory Marketplace',
      subtitle: 'Browse 500+ verified Chinese factories for direct import',
      searchPlaceholder: 'Search for factory or production line...',
      allCategories: 'All Sectors',
      showing: 'Showing',
      factories: 'factories',
      verified: 'Verified',
      directFactory: 'Direct Factory',
      yearsExp: 'Years Exp',
      moq: 'MOQ',
      response: 'Response',
      error: 'Error loading factories',
      retry: 'Retry',
      noResults: 'No factories found',
      resetSearch: 'Reset Search',
      b2bPlatform: 'B2B Factory Platform',
      filtersLabel: 'Filters',
      manufacturingTypes: 'Manufacturing Type',
    },
    zh: {
      title: '工厂市场',
      subtitle: '浏览500多家经过验证的中国工厂，直接进口',
      searchPlaceholder: '搜索工厂或生产线...',
      allCategories: '所有行业',
      showing: '显示',
      factories: '工厂',
      verified: '已验证',
      directFactory: '直接工厂',
      yearsExp: '年经验',
      moq: '起订量',
      response: '回复',
      error: '加载工厂时出错',
      retry: '重试',
      noResults: '未找到工厂',
      resetSearch: '重置搜索',
      b2bPlatform: 'B2B工厂平台',
      filtersLabel: '筛选',
      manufacturingTypes: '制造类型',
    },
  };

  const c = content[language];
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-secondary pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Factory className="w-4 h-4" />
            <span>{c.b2bPlatform}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            {c.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8">
            {c.subtitle}
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={c.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 md:pr-12 py-5 md:py-6 text-sm md:text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 py-5 md:py-6">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder={c.allCategories} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">{c.allCategories}</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.icon} {language === 'en' ? cat.nameEn : cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Mobile Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden py-5 md:py-6 relative">
                  <SlidersHorizontal className="w-4 h-4 ml-2" />
                  {c.filtersLabel}
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -left-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'} className="w-80 p-0 overflow-y-auto">
                <div className="p-4">
                  <B2BFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onReset={handleResetFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
              </SheetContent>
            </Sheet>

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

      {/* Main Content with Filters */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <B2BFilters
                filters={filters}
                onFiltersChange={setFilters}
                onReset={handleResetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Factories Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <p className="text-muted-foreground text-sm md:text-base">
                  {c.showing} {filteredFactories?.length || 0} {c.factories}
                </p>
              </div>

              {isLoading ? (
                <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
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
                  <p className="text-muted-foreground text-base md:text-lg mb-4">{c.error}</p>
                  <Button onClick={() => window.location.reload()}>
                    {c.retry}
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredFactories?.map((factory) => {
                    const yearsInBusiness = factory.established_year ? currentYear - factory.established_year : null;
                    
                    return (
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
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-1">
                            {factory.verification_status === 'verified' && (
                              <Badge className="bg-green-500 text-white gap-1 text-xs">
                                <CheckCircle className="w-3 h-3" />
                                {c.verified}
                              </Badge>
                            )}
                            {factory.is_direct_factory && (
                              <Badge className="bg-primary text-primary-foreground gap-1 text-xs">
                                <Factory className="w-3 h-3" />
                                {c.directFactory}
                              </Badge>
                            )}
                          </div>
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
                                <span className="truncate">{factory.location || (language === 'ar' ? 'الصين' : 'China')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Factory Info */}
                          <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                            {yearsInBusiness && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{yearsInBusiness} {c.yearsExp}</span>
                              </div>
                            )}
                            {factory.employees_count && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="w-3 h-3" />
                                <span>{factory.employees_count}</span>
                              </div>
                            )}
                          </div>

                          {/* Manufacturing Types */}
                          {factory.manufacturing_types && factory.manufacturing_types.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {factory.manufacturing_types.map((type) => (
                                <Badge key={type} variant="outline" className="text-xs px-2 py-0">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <Badge variant="secondary" className="mb-2 md:mb-3 text-xs">{factory.category}</Badge>

                          <div className="flex items-center justify-between text-xs md:text-sm mb-2 md:mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold">{factory.rating || 4.5}</span>
                              <span className="text-muted-foreground">({factory.reviews_count || 0})</span>
                            </div>
                            <span className="text-muted-foreground text-xs">{c.response} {factory.response_time || '< 24h'}</span>
                          </div>

                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                            {(factory.main_products || []).slice(0, 4).join(' • ') || (language === 'ar' ? 'منتجات متنوعة' : 'Various products')}
                          </p>

                          {viewMode === 'list' && factory.min_order_value && (
                            <div className="mt-3 md:mt-4 flex items-center gap-4">
                              <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                                <Package className="w-3 h-3" />
                                <span>{c.moq}: ${factory.min_order_value.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {!isLoading && filteredFactories?.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <Factory className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-base md:text-lg mb-4">{c.noResults}</p>
                  <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); handleResetFilters(); }}>
                    {c.resetSearch}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;
