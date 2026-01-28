import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowRight, CheckCircle, Clock, DollarSign, 
  FileText, Phone, Mail, Loader2, Shield
} from 'lucide-react';

const servicesData = {
  inspection: {
    id: 'inspection',
    name: 'فحص الجودة',
    nameEn: 'Quality Inspection',
    icon: '🔍',
    description: 'فحص المنتجات قبل الشحن للتأكد من مطابقتها للمواصفات المطلوبة وضمان الجودة',
    longDescription: `خدمة فحص الجودة هي خط دفاعك الأول ضد المنتجات المعيبة. فريقنا من المفتشين المحترفين يزور المصنع شخصياً لفحص منتجاتك قبل الشحن.

نقوم بفحص:
• المواصفات الفنية والأبعاد
• جودة المواد والتشطيب
• الوظائف والأداء
• التغليف والتعبئة
• الكميات والملصقات`,
    features: [
      'فحص شامل للمنتجات بواسطة مفتشين محترفين',
      'تقرير مفصل بالصور والفيديو عالي الجودة',
      'التحقق من الكميات والمواصفات',
      'فحص التغليف والتعبئة',
      'تقرير خلال 48 ساعة من الفحص',
      'إعادة الفحص مجاناً في حال وجود مشاكل'
    ],
    pricing: [
      { name: 'فحص أساسي', price: 150, details: 'حتى 500 وحدة' },
      { name: 'فحص متوسط', price: 250, details: '500-2000 وحدة' },
      { name: 'فحص شامل', price: 400, details: 'أكثر من 2000 وحدة' },
    ],
    timeline: '24-48 ساعة للتقرير',
    formFields: ['productName', 'quantity', 'factoryAddress', 'inspectionDate', 'notes']
  },
  shipping: {
    id: 'shipping',
    name: 'الشحن الدولي',
    nameEn: 'International Shipping',
    icon: '🚢',
    description: 'خدمات شحن بحري وجوي وبري بأسعار تنافسية مع تتبع الشحنات',
    longDescription: `نقدم حلول شحن متكاملة من باب المصنع إلى باب مستودعك. نتعامل مع أفضل شركات الشحن العالمية لضمان وصول بضائعك بأمان وفي الوقت المحدد.

خيارات الشحن:
• الشحن البحري: الخيار الأقل تكلفة للشحنات الكبيرة
• الشحن الجوي: للشحنات العاجلة والقيمة العالية
• الشحن السريع: DHL, FedEx, UPS للعينات والطلبات الصغيرة`,
    features: [
      'شحن بحري وجوي وبري',
      'أسعار تنافسية مع شركات موثوقة',
      'تتبع الشحنات لحظة بلحظة',
      'تأمين على البضائع',
      'خدمة التخليص الجمركي',
      'التوصيل من الباب للباب'
    ],
    pricing: [
      { name: 'شحن جوي', price: 'من $4/كجم', details: '5-7 أيام' },
      { name: 'شحن بحري', price: 'من $50/CBM', details: '25-35 يوم' },
      { name: 'شحن سريع', price: 'من $8/كجم', details: '3-5 أيام' },
    ],
    timeline: 'حسب طريقة الشحن',
    formFields: ['productName', 'weight', 'dimensions', 'destination', 'notes']
  },
  payment: {
    id: 'payment',
    name: 'التحويلات المالية',
    nameEn: 'Money Transfer',
    icon: '💰',
    description: 'تحويل الأموال للمصانع بشكل آمن ومضمون مع حماية المشتري',
    longDescription: `نوفر لك طريقة آمنة ومضمونة لتحويل الأموال للمصانع الصينية. نحمي أموالك ولا نحولها للمصنع إلا بعد تأكيدك على استلام البضاعة بشكل صحيح.

مميزات الخدمة:
• حماية المشتري 100%
• تحويل بالدولار أو اليوان
• استلام من المصنع مضمون
• دعم متعدد اللغات`,
    features: [
      'تحويل آمن ومضمون 100%',
      'حماية المشتري حتى استلام البضاعة',
      'عمولة تنافسية 1% فقط',
      'تأكيد الاستلام من المصنع',
      'دعم العملات المتعددة (USD, CNY)',
      'تقارير مالية شفافة'
    ],
    pricing: [
      { name: 'تحويل عادي', price: '1%', details: 'خلال 2-3 أيام عمل' },
      { name: 'تحويل سريع', price: '1.5%', details: 'خلال 24 ساعة' },
    ],
    timeline: '1-3 أيام عمل',
    formFields: ['factoryName', 'amount', 'currency', 'notes']
  },
  customs: {
    id: 'customs',
    name: 'التخليص الجمركي',
    nameEn: 'Customs Clearance',
    icon: '📋',
    description: 'إجراءات التخليص الجمركي في بلدك مع توفير كل الوثائق اللازمة',
    longDescription: `نساعدك في إتمام جميع إجراءات التخليص الجمركي بسرعة وكفاءة. فريقنا متخصص في قوانين الاستيراد لمختلف الدول العربية.

نقدم:
• إعداد جميع المستندات المطلوبة
• حساب الرسوم الجمركية مسبقاً
• التعامل مع الجمارك نيابة عنك
• متابعة الشحنة حتى الاستلام`,
    features: [
      'إعداد كافة المستندات الجمركية',
      'حساب الرسوم الجمركية المتوقعة',
      'متابعة إجراءات التخليص',
      'التعامل مع الجمارك',
      'توصيل للمستودع',
      'دعم في جميع الدول العربية'
    ],
    pricing: [
      { name: 'تخليص أساسي', price: 100, details: 'شحنات صغيرة' },
      { name: 'تخليص كامل', price: 200, details: 'شحنات كبيرة + توصيل' },
    ],
    timeline: '3-7 أيام عمل',
    formFields: ['shipmentId', 'destination', 'productType', 'notes']
  },
  sourcing: {
    id: 'sourcing',
    name: 'البحث عن منتجات',
    nameEn: 'Product Sourcing',
    icon: '🎯',
    description: 'نجد لك المنتج والمصنع المناسب حسب احتياجاتك ومتطلباتك',
    longDescription: `هل تبحث عن منتج معين ولا تعرف من أين تبدأ؟ فريقنا المتخصص يبحث لك عن أفضل المصانع والموردين حسب مواصفاتك ومتطلباتك.

خطوات العمل:
1. تحليل متطلباتك
2. البحث في قاعدة بياناتنا
3. التواصل مع المصانع المناسبة
4. الحصول على عروض أسعار
5. التفاوض نيابة عنك`,
    features: [
      'بحث شامل في قاعدة بيانات ضخمة',
      'مقارنة بين عدة مصانع',
      'التفاوض على الأسعار نيابة عنك',
      'طلب عينات',
      'تقرير مفصل بالخيارات المتاحة',
      'متابعة حتى إتمام الصفقة'
    ],
    pricing: [
      { name: 'بحث أساسي', price: 50, details: '3 خيارات' },
      { name: 'بحث شامل', price: 150, details: '10 خيارات + تفاوض' },
    ],
    timeline: '3-7 أيام',
    formFields: ['productDescription', 'targetPrice', 'quantity', 'notes']
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">الخدمة غير موجودة</h1>
          <Link to="/services">
            <Button>العودة للخدمات</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'تسجيل الدخول مطلوب',
        description: 'يجب تسجيل الدخول لطلب الخدمة',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('service_requests').insert({
        user_id: user.id,
        type: service.id,
        details: formData,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: 'تم إرسال الطلب',
        description: 'سنتواصل معك قريباً لتأكيد التفاصيل',
      });

      setFormData({});
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال الطلب',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldLabels: Record<string, string> = {
    productName: 'اسم المنتج',
    quantity: 'الكمية',
    factoryAddress: 'عنوان المصنع',
    inspectionDate: 'تاريخ الفحص المطلوب',
    weight: 'الوزن (كجم)',
    dimensions: 'الأبعاد (سم)',
    destination: 'بلد الوصول',
    factoryName: 'اسم المصنع',
    amount: 'المبلغ',
    currency: 'العملة',
    shipmentId: 'رقم الشحنة',
    productType: 'نوع المنتج',
    productDescription: 'وصف المنتج المطلوب',
    targetPrice: 'السعر المستهدف',
    notes: 'ملاحظات إضافية'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowRight className="w-4 h-4" />
            العودة للخدمات
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{service.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {service.name}
              </h1>
              <p className="text-white/70">{service.nameEn}</p>
            </div>
          </div>
          
          <p className="text-white/80 text-lg max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">عن الخدمة</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">المميزات</h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">الأسعار</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.pricing.map((plan, index) => (
                    <div key={index} className="bg-muted/50 rounded-xl p-4 border border-border">
                      <h3 className="font-semibold mb-2">{plan.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-1">
                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                      </p>
                      <p className="text-sm text-muted-foreground">{plan.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Form */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">اطلب الخدمة</h2>
                
                {!user ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">يجب تسجيل الدخول لطلب الخدمة</p>
                    <Link to="/auth">
                      <Button variant="hero">تسجيل الدخول</Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {service.formFields.map((field) => (
                      <div key={field} className="space-y-2">
                        <Label htmlFor={field}>{fieldLabels[field]}</Label>
                        {field === 'notes' || field === 'productDescription' ? (
                          <Textarea
                            id={field}
                            value={formData[field] || ''}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            placeholder={fieldLabels[field]}
                            rows={4}
                          />
                        ) : (
                          <Input
                            id={field}
                            type={field === 'inspectionDate' ? 'date' : field === 'amount' || field === 'quantity' ? 'number' : 'text'}
                            value={formData[field] || ''}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            placeholder={fieldLabels[field]}
                            required={field !== 'notes'}
                          />
                        )}
                      </div>
                    ))}
                    
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        'إرسال الطلب'
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                <h3 className="font-bold mb-4">معلومات سريعة</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المدة</p>
                      <p className="font-semibold">{service.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">يبدأ من</p>
                      <p className="font-semibold text-primary">
                        {typeof service.pricing[0].price === 'number' 
                          ? `$${service.pricing[0].price}` 
                          : service.pricing[0].price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <h4 className="font-semibold mb-3">تحتاج مساعدة؟</h4>
                  <div className="space-y-2 text-sm">
                    <a href="mailto:support@ifrof.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                      <Mail className="w-4 h-4" />
                      support@ifrof.com
                    </a>
                    <a href="tel:+86123456789" className="flex items-center gap-2 text-muted-foreground hover:text-primary" dir="ltr">
                      <Phone className="w-4 h-4" />
                      +86 123 456 7890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
