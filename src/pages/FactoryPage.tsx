import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockFactories, mockProducts } from '@/data/mockData';
import { 
  Star, CheckCircle, MapPin, Calendar, Users, Factory, 
  Award, Clock, DollarSign, MessageSquare, Phone, Share2,
  ChevronLeft, Package, Shield, TrendingUp
} from 'lucide-react';

const FactoryPage = () => {
  const { id } = useParams();
  const factory = mockFactories.find(f => f.id === id);
  const factoryProducts = mockProducts.filter(p => p.factoryId === id);

  if (!factory) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">المصنع غير موجود</h1>
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
      <div className="relative h-64 md:h-80 bg-secondary">
        <img
          src={factory.coverImage}
          alt={factory.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
      </div>

      {/* Factory Info Header */}
      <section className="bg-secondary pb-8 -mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <img
              src={factory.logo}
              alt={factory.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background object-cover shadow-xl"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{factory.name}</h1>
                {factory.verificationStatus === 'verified' && (
                  <Badge className="bg-green-500 text-white gap-1">
                    <CheckCircle className="w-3 h-3" />
                    موثق بنسبة {factory.verificationScore}%
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {factory.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  منذ {factory.establishedYear}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {factory.employeesCount} موظف
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg">{factory.rating}</span>
                  <span className="text-white/70">({factory.reviewsCount} تقييم)</span>
                </div>
                <span className="text-white/70">|</span>
                <span className="text-green-400">نسبة الرد {factory.responseRate}%</span>
                <span className="text-white/70">|</span>
                <span className="text-white/70">رد خلال {factory.responseTime}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg">
                <MessageSquare className="w-5 h-5 ml-2" />
                تواصل الآن
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Phone className="w-5 h-5 ml-2" />
                طلب اتصال
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">نظرة عامة</TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg">المنتجات ({factoryProducts.length})</TabsTrigger>
              <TabsTrigger value="certifications" className="rounded-lg">الشهادات</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">التقييمات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="text-xl font-bold mb-4">عن المصنع</h2>
                    <p className="text-muted-foreground leading-relaxed">{factory.description}</p>
                  </div>

                  {/* Main Products */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="text-xl font-bold mb-4">المنتجات الرئيسية</h2>
                    <div className="flex flex-wrap gap-2">
                      {factory.mainProducts.map((product, index) => (
                        <Badge key={index} variant="secondary" className="py-2 px-4">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Export Countries */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="text-xl font-bold mb-4">دول التصدير</h2>
                    <div className="flex flex-wrap gap-2">
                      {factory.exportCountries.map((country, index) => (
                        <Badge key={index} variant="outline" className="py-2 px-4">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h3 className="font-bold mb-4">معلومات سريعة</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Factory className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">الطاقة الإنتاجية</p>
                          <p className="font-semibold">{factory.productionCapacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">الحد الأدنى للطلب</p>
                          <p className="font-semibold">${factory.minOrderValue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">سرعة الرد</p>
                          <p className="font-semibold">{factory.responseTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">نسبة الرد</p>
                          <p className="font-semibold">{factory.responseRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-8 h-8 text-green-500" />
                      <div>
                        <h3 className="font-bold text-green-700">مصنع موثق</h3>
                        <p className="text-sm text-green-600">تم التحقق بالذكاء الاصطناعي</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      هذا المصنع تم التحقق منه بنسبة {factory.verificationScore}% كمصنع مباشر وليس وسيط.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {factoryProducts.map((product) => (
                  <div key={product.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-primary font-bold text-lg">${product.minPrice}</span>
                          <span className="text-muted-foreground text-sm"> - ${product.maxPrice}</span>
                        </div>
                        <Badge variant="secondary">{product.unit}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        الحد الأدنى: {product.minOrderQuantity} {product.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {factoryProducts.length === 0 && (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد منتجات حالياً</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="certifications">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {factory.certifications.map((cert, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold">{cert}</h3>
                    <p className="text-sm text-muted-foreground mt-2">شهادة معتمدة</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="text-center py-16">
                <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">التقييمات ستظهر قريباً</p>
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
