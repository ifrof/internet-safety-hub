import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import {
  Star,
  CheckCircle,
  MapPin,
  Package,
  Clock,
  DollarSign,
  MessageSquare,
  Factory,
  Truck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Share2,
  Heart,
  ShoppingCart,
  ArrowLeft,
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [requestLoading, setRequestLoading] = useState(false);

  // Fetch product data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          factory:factories(
            id,
            name,
            name_en,
            logo_url,
            location,
            rating,
            verification_status,
            verification_score,
            response_time
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch similar products
  const { data: similarProducts } = useQuery({
    queryKey: ['similar-products', product?.category, product?.factory_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', product?.category)
        .neq('id', id)
        .limit(4);

      if (error) throw error;
      return data;
    },
    enabled: !!product?.category,
  });

  const handleRequestQuote = async () => {
    if (!user) {
      toast({
        title: 'تسجيل الدخول مطلوب',
        description: 'يجب تسجيل الدخول لطلب عرض سعر',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setRequestLoading(true);
    try {
      const { error } = await supabase.from('import_orders').insert({
        user_id: user.id,
        factory_id: product?.factory_id,
        product_id: product?.id,
        product_name: product?.name || '',
        quantity: product?.min_order_quantity || 1,
        status: 'inquiry',
        currency: product?.currency || 'USD',
      });

      if (error) throw error;

      toast({
        title: 'تم إرسال الطلب',
        description: 'سيتم الرد عليك قريباً',
      });
      navigate('/dashboard/orders');
    } catch (err: any) {
      toast({
        title: 'خطأ',
        description: err.message || 'حدث خطأ أثناء إرسال الطلب',
        variant: 'destructive',
      });
    } finally {
      setRequestLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/marketplace">
            <Button>العودة للسوق</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800',
  ];

  const specs = product.specifications as Record<string, string> || {};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link to="/marketplace" className="hover:text-primary">السوق</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Category & HS Code */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.subcategory && <Badge variant="outline">{product.subcategory}</Badge>}
                {product.hs_code && (
                  <Badge variant="outline" className="font-mono">
                    HS: {product.hs_code}
                  </Badge>
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

              {/* Factory Info */}
              {product.factory && (
                <Link
                  to={`/factory/${product.factory.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    src={product.factory.logo_url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100'}
                    alt={product.factory.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.factory.name}</span>
                      {product.factory.verification_status === 'verified' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{product.factory.rating || 4.5}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{product.factory.location || 'الصين'}</span>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
              )}

              {/* Price */}
              <div className="bg-primary/5 rounded-xl p-4 md:p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    ${product.min_price || product.price || 0}
                  </span>
                  {product.max_price && product.max_price !== product.min_price && (
                    <span className="text-xl text-muted-foreground">- ${product.max_price}</span>
                  )}
                  <span className="text-muted-foreground">/ {product.unit || 'قطعة'}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  الحد الأدنى للطلب: {product.min_order_quantity || 1} {product.unit || 'قطعة'}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">مدة التسليم</p>
                    <p className="font-medium text-sm">{product.lead_time || '15-30 يوم'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">الشحن</p>
                    <p className="font-medium text-sm">{product.shipping_available ? 'متاح' : 'غير متاح'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">العينة</p>
                    <p className="font-medium text-sm">
                      {product.sample_available ? `$${product.sample_price || 'مجاناً'}` : 'غير متاحة'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">التخصيص</p>
                    <p className="font-medium text-sm">{product.customizable ? 'متاح (OEM/ODM)' : 'غير متاح'}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={handleRequestQuote}
                  disabled={requestLoading}
                >
                  {requestLoading ? (
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-5 h-5 ml-2" />
                  )}
                  طلب عرض سعر
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate(`/factory/${product.factory_id}`)}>
                  <MessageSquare className="w-5 h-5 ml-2" />
                  تواصل
                </Button>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Specs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4">وصف المنتج</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4">المواصفات</h2>
              {Object.keys(specs).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">لا توجد مواصفات متاحة حالياً.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6">منتجات مشابهة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-primary font-bold">${p.min_price || p.price || 0}</span>
                      <span className="text-sm text-muted-foreground">/ {p.unit || 'قطعة'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;