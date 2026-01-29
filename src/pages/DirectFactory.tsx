import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ShieldCheck, FileText, ArrowLeft, Upload, Link as LinkIcon, Package, Hash } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DirectFactory = () => {
  const features = [
    {
      icon: Upload,
      title: 'بحث بالصورة أو الرابط أو الاسم أو HS CODE',
      description: 'أدخل طريقة واحدة فقط للبحث عن المنتج المطلوب'
    },
    {
      icon: ShieldCheck,
      title: 'تصفية صارمة ضد الوسطاء',
      description: 'نستبعد شركات التجارة والسماسرة ونعرض المصانع فقط'
    },
    {
      icon: FileText,
      title: 'أدلة وروابط لكل مصنع',
      description: 'كل نتيجة تحتوي روابط مصادر وأسباب التصنيف ودرجة ثقة'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'إدخال واحد',
      description: 'ارفع صورة أو ضع رابط أو اكتب اسم المنتج أو كود HS'
    },
    {
      number: 2,
      title: 'تحليل المواصفات تلقائياً',
      description: 'نحلل المنتج ونستخرج الكلمات المفتاحية والمواصفات'
    },
    {
      number: 3,
      title: 'عرض مصانع مع أدلة',
      description: 'نعرض مصانع مباشرة فقط مع روابط الأدلة ودرجة الثقة'
    }
  ];

  const inputMethods = [
    { icon: Upload, label: 'صورة المنتج', color: 'bg-blue-500/10 text-blue-600' },
    { icon: LinkIcon, label: 'رابط المنتج', color: 'bg-green-500/10 text-green-600' },
    { icon: Package, label: 'اسم المنتج', color: 'bg-purple-500/10 text-purple-600' },
    { icon: Hash, label: 'HS CODE', color: 'bg-orange-500/10 text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-transparent">
              اعثر على مصانع الصين مباشرة
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              مع أدلة تثبت أنها مصانع حقيقية
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ارفع صورة أو ضع رابط أو اكتب اسم المنتج أو HS CODE، 
              ونُرجّح مصانع مباشرة فقط مع مصادر وروابط تثبت ذلك.
            </p>
            
            {/* Input Methods Preview */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {inputMethods.map((method, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${method.color}`}
                >
                  <method.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{method.label}</span>
                </div>
              ))}
            </div>
            
            <Button asChild size="xl" variant="hero" className="gap-2">
              <Link to="/factory-search">
                <Search className="w-5 h-5" />
                ابدأ البحث المتقدم
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">مميزات البحث المتقدم</h2>
            <p className="text-muted-foreground text-lg">نضمن لك مصانع مباشرة فقط بأدلة موثقة</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف يعمل البحث المتقدم؟</h2>
            <p className="text-muted-foreground text-lg">ثلاث خطوات بسيطة للوصول للمصنع المباشر</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-l from-primary/30 to-transparent" />
                )}
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-medium">تنبيه مهم</span>
            </div>
            <p className="text-amber-900 dark:text-amber-100 text-lg">
              النتائج استرشادية ويُنصح بالتحقق المباشر من المصنع قبل إتمام أي عملية دفع. 
              نقدم الأدلة والمصادر لمساعدتك في اتخاذ قرار مدروس.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">جاهز للبحث عن مصنعك المباشر؟</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            ابدأ الآن واحصل على قائمة مصانع موثقة بأدلة ومصادر قابلة للتحقق
          </p>
          <Button asChild size="xl" variant="hero" className="gap-2">
            <Link to="/factory-search">
              <Search className="w-5 h-5" />
              ابدأ البحث الآن
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DirectFactory;
