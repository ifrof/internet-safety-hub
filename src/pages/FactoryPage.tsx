import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useFactory } from '@/hooks/useFactories';
import { mockProducts } from '@/data/mockData';
import { 
  Star, CheckCircle, MapPin, Calendar, Users, Factory, 
  Award, Clock, DollarSign, MessageSquare, Phone, Share2,
  Package, Shield, TrendingUp, Loader2
} from 'lucide-react';

const FactoryPage = () => {
  const { id } = useParams();
  const { data: factory, isLoading, error } = useFactory(id || '');
  const factoryProducts = mockProducts.filter(p => p.factoryId === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="relative h-48 md:h-64 lg:h-80 bg-secondary">
          <Skeleton className="w-full h-full" />
        </div>
        <section className="bg-secondary pb-6 md:pb-8 -mt-16 md:-mt-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 md:h-8 w-48 md:w-64" />
                <Skeleton className="h-4 w-36 md:w-48" />
                <Skeleton className="h-4 w-32 md:w-40" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !factory) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
          <Factory className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl md:text-2xl font-bold mb-4">المصنع غير موجود</h1>
          <Link to="/marketplace">
            <Button>العودة للسوق</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-secondary">
        <img
          src={factory.cover_image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'}
          alt={factory.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
      </div>

      {/* Factory Info Header */}
      <section className="bg-secondary pb-6 md:pb-8 -mt-16 md:-mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            {/* Logo */}
            <img
              src={factory.logo_url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'}
              alt={factory.name}
              className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-xl md:rounded-2xl border-4 border-background object-cover shadow-xl"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{factory.name}</h1>
                {factory.verification_status === 'verified' && (
                  <Badge className="bg-green-500 text-white gap-1 text-xs md:text-sm">
                    <CheckCircle className="w-3 h-3" />
                    موثق بنسبة {factory.verification_score}%
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/70 mb-3 md:mb-4 text-xs md:text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  {factory.location || 'الصين'}
                </span>
                {factory.established_year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    منذ {factory.established_year}
                  </span>
                )}
                {factory.employees_count && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    {factory.employees_count} موظف
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-base md:text-lg">{factory.rating || 4.5}</span>
                  <span className="text-white/70">({factory.reviews_count || 0} تقييم)</span>
                </div>
                <span className="text-white/50 hidden sm:inline">|</span>
                <span className="text-green-400">نسبة الرد {factory.response_rate || 90}%</span>
                <span className="text-white/50 hidden sm:inline">|</span>
                <span className="text-white/70">رد خلال {factory.response_time || '< 24 ساعة'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
              <Button variant="hero" size="default" className="flex-1 md:flex-none text-sm md:text-base">
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                تواصل الآن
              </Button>
              <Button variant="outline" size="default" className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                طلب اتصال
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-6 md:mb-8 bg-muted/50 p-1 rounded-xl overflow-x-auto flex-nowrap">
              <TabsTrigger value="overview" className="rounded-lg text-xs md:text-sm whitespace-nowrap">نظرة عامة</TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg text-xs md:text-sm whitespace-nowrap">المنتجات ({factoryProducts.length})</TabsTrigger>
              <TabsTrigger value="certifications" className="rounded-lg text-xs md:text-sm whitespace-nowrap">الشهادات</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg text-xs md:text-sm whitespace-nowrap">التقييمات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {/* About */}
                  <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">عن المصنع</h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {factory.description || 'مصنع متخصص في إنتاج منتجات عالية الجودة بأسعار تنافسية.'}
                    </p>
                  </div>

                  {/* Main Products */}
                  <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">المنتجات الرئيسية</h2>
                    <div className="flex flex-wrap gap-2">
                      {(factory.main_products || ['منتجات متنوعة']).map((product, index) => (
                        <Badge key={index} variant="secondary" className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Export Countries */}
                  {factory.export_countries && factory.export_countries.length > 0 && (
                    <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
                      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">دول التصدير</h2>
                      <div className="flex flex-wrap gap-2">
                        {factory.export_countries.map((country, index) => (
                          <Badge key={index} variant="outline" className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4 md:space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
                    <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">معلومات سريعة</h3>
                    <div className="space-y-3 md:space-y-4">
                      {factory.production_capacity && (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Factory className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-muted-foreground">الطاقة الإنتاجية</p>
                            <p className="font-semibold text-sm md:text-base">{factory.production_capacity}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground">الحد الأدنى للطلب</p>
                          <p className="font-semibold text-sm md:text-base">${factory.min_order_value || 1000}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground">سرعة الرد</p>
                          <p className="font-semibold text-sm md:text-base">{factory.response_time || '< 24 ساعة'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground">نسبة الرد</p>
                          <p className="font-semibold text-sm md:text-base">{factory.response_rate || 90}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="bg-green-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                      <div>
                        <h3 className="font-bold text-green-700 text-sm md:text-base">مصنع موثق</h3>
                        <p className="text-xs md:text-sm text-green-600">تم التحقق والاعتماد</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      هذا المصنع تم التحقق منه بنسبة {factory.verification_score || 90}% كمصنع مباشر وليس وسيط.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {factoryProducts.map((product) => (
                  <div key={product.id} className="bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all">
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div>
                          <span className="text-primary font-bold text-base md:text-lg">${product.minPrice}</span>
                          <span className="text-muted-foreground text-xs md:text-sm"> - ${product.maxPrice}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">{product.unit}</Badge>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        الحد الأدنى: {product.minOrderQuantity} {product.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {factoryProducts.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <Package className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm md:text-base">لا توجد منتجات حالياً</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="certifications">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {(factory.certifications || ['ISO 9001']).map((cert, index) => (
                  <div key={index} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border text-center">
                    <Award className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                    <h3 className="font-bold text-sm md:text-base">{cert}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">شهادة معتمدة</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="text-center py-12 md:py-16">
                <Star className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm md:text-base">التقييمات ستظهر قريباً</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FactoryPage;
