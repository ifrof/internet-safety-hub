import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/data/mockData';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const servicesDetails = [
  {
    id: 'inspection',
    name: 'فحص الجودة',
    icon: '🔍',
    description: 'فحص المنتجات قبل الشحن للتأكد من مطابقتها للمواصفات المطلوبة',
    features: [
      'فحص شامل للمنتجات',
      'تقرير مفصل بالصور والفيديو',
      'التحقق من الكميات والمواصفات',
      'فحص التغليف والتعبئة',
      'تقرير خلال 48 ساعة',
    ],
    startingPrice: 150,
    popular: true,
  },
  {
    id: 'shipping',
    name: 'الشحن الدولي',
    icon: '🚢',
    description: 'خدمات شحن بحري وجوي وبري بأسعار تنافسية مع تتبع الشحنات',
    features: [
      'شحن بحري وجوي وبري',
      'أسعار تنافسية مع شركات موثوقة',
      'تتبع الشحنات لحظة بلحظة',
      'تأمين على البضائع',
      'التخليص الجمركي',
    ],
    startingPrice: 'حسب الوزن والحجم',
    popular: false,
  },
  {
    id: 'money_transfer',
    name: 'التحويلات المالية',
    icon: '💰',
    description: 'تحويل الأموال للمصانع بشكل آمن ومضمون مع حماية المشتري',
    features: [
      'تحويل آمن ومضمون',
      'حماية المشتري',
      'عمولة تنافسية 1%',
      'تأكيد الاستلام من المصنع',
      'دعم العملات المتعددة',
    ],
    startingPrice: '1%',
    popular: true,
  },
  {
    id: 'customs',
    name: 'التخليص الجمركي',
    icon: '📋',
    description: 'إجراءات التخليص الجمركي في بلدك مع توفير كل الوثائق اللازمة',
    features: [
      'إعداد كافة المستندات',
      'حساب الرسوم الجمركية',
      'متابعة الإجراءات',
      'التعامل مع الجمارك',
      'توصيل للمستودع',
    ],
    startingPrice: 100,
    popular: false,
  },
  {
    id: 'sourcing',
    name: 'البحث عن منتجات',
    icon: '🎯',
    description: 'نجد لك المنتج والمصنع المناسب حسب احتياجاتك ومتطلباتك',
    features: [
      'بحث شامل عن المنتجات',
      'مقارنة بين المصانع',
      'التفاوض على الأسعار',
      'طلب عينات',
      'تقرير مفصل',
    ],
    startingPrice: 50,
    popular: false,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            خدمات شاملة لنجاح استيرادك
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            نقدم لك مجموعة متكاملة من الخدمات لتسهيل عملية الاستيراد من البداية حتى النهاية
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesDetails.map((service) => (
              <div
                key={service.id}
                className={`relative bg-card rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                  service.popular ? 'border-primary' : 'border-border'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    الأكثر طلباً
                  </div>
                )}

                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">يبدأ من</p>
                    <p className="text-xl font-bold text-primary">
                      {typeof service.startingPrice === 'number' 
                        ? `$${service.startingPrice}` 
                        : service.startingPrice}
                    </p>
                  </div>
                  <Link to={`/services/${service.id}`}>
                    <Button variant={service.popular ? 'hero' : 'outline'}>
                      اطلب الخدمة
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            تحتاج خدمة مخصصة؟
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            تواصل معنا لنفهم احتياجاتك ونقدم لك الحل المناسب
          </p>
          <Link to="/ai-chat">
            <Button variant="hero" size="xl">
              تحدث مع المساعد الذكي
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
