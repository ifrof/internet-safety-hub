import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, CheckCircle, AlertTriangle, Scale, CreditCard, Ban } from 'lucide-react';

const Terms = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'شروط الاستخدام',
      subtitle: 'يرجى قراءة هذه الشروط بعناية قبل استخدام منصة IFROF',
      lastUpdated: 'آخر تحديث: يناير 2024',
      sections: [
        {
          icon: FileText,
          title: 'قبول الشروط',
          content: `باستخدام منصة IFROF، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يحق لك استخدام خدماتنا.

يجب أن يكون عمرك 18 عاماً على الأقل لاستخدام هذه المنصة. باستخدام المنصة، فإنك تقر بأنك تستوفي هذا المتطلب.`
        },
        {
          icon: CheckCircle,
          title: 'الخدمات المقدمة',
          content: `تقدم IFROF الخدمات التالية:
          
• **سوق المصانع**: ربط المستوردين بالمصانع الصينية الموثقة
• **فحص الجودة**: خدمات فحص المنتجات قبل الشحن
• **الشحن الدولي**: خدمات شحن بحري وجوي وبري
• **التحويلات المالية**: تحويل آمن للأموال للمصانع
• **التخليص الجمركي**: المساعدة في إجراءات الجمارك

نحتفظ بالحق في تعديل أو إيقاف أي خدمة في أي وقت.`
        },
        {
          icon: CreditCard,
          title: 'الاشتراكات والدفع',
          content: `**رسوم الاشتراك:**
• الباقة الأساسية: $9.99/شهر
• الباقة المتميزة: $29.99/شهر

**سياسة الفوترة:**
• يتم تجديد الاشتراك تلقائياً كل شهر
• يمكنك إلغاء الاشتراك في أي وقت
• لن يتم استرداد المبالغ المدفوعة للفترة الحالية
• رسوم الخدمات الإضافية (فحص، شحن، تحويلات) منفصلة عن الاشتراك`
        },
        {
          icon: AlertTriangle,
          title: 'المسؤوليات والتحذيرات',
          content: `**مسؤوليتك:**
• التحقق من جودة المنتجات قبل الشحن
• التأكد من الامتثال لقوانين الاستيراد في بلدك
• دفع جميع الرسوم الجمركية والضرائب المطلوبة
• الحفاظ على سرية بيانات حسابك

**إخلاء المسؤولية:**
• IFROF هي منصة وساطة وليست طرفاً في المعاملات
• لا نضمن جودة المنتجات (استخدم خدمة الفحص)
• لا نتحمل مسؤولية التأخير في الشحن
• لا نتحمل مسؤولية الخلافات مع المصانع`
        },
        {
          icon: Ban,
          title: 'الاستخدام المحظور',
          content: `يُحظر استخدام المنصة لـ:
          
• استيراد منتجات مخالفة للقانون
• استيراد منتجات مقلدة أو تنتهك حقوق الملكية الفكرية
• الاحتيال أو تقديم معلومات كاذبة
• إرسال رسائل مزعجة للمصانع
• محاولة اختراق أو إتلاف المنصة
• انتحال شخصية الآخرين

المخالفة قد تؤدي إلى إغلاق الحساب فوراً.`
        },
        {
          icon: Scale,
          title: 'حل النزاعات والقانون الواجب التطبيق',
          content: `**حل النزاعات:**
• نسعى أولاً للتسوية الودية
• يمكن اللجوء للتحكيم في حالة عدم التوصل لحل
• مركز التحكيم: غرفة التجارة الدولية في هونغ كونغ

**القانون الواجب التطبيق:**
• تخضع هذه الشروط لقوانين هونغ كونغ
• أي نزاع يُحال للمحاكم المختصة في هونغ كونغ

**التعديلات:**
• نحتفظ بحق تعديل هذه الشروط في أي وقت
• سيتم إخطارك بالتعديلات الجوهرية عبر البريد الإلكتروني`
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully before using the IFROF platform',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          icon: FileText,
          title: 'Acceptance of Terms',
          content: `By using IFROF, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use our services.

You must be at least 18 years old to use this platform.`
        },
        {
          icon: CheckCircle,
          title: 'Services Provided',
          content: `IFROF provides:
• Factory Marketplace
• Quality Inspection
• International Shipping
• Money Transfers
• Customs Clearance

We reserve the right to modify or discontinue any service.`
        },
        {
          icon: CreditCard,
          title: 'Subscriptions & Payment',
          content: `Subscription fees:
• Basic: $9.99/month
• Premium: $29.99/month

Billing: Auto-renewal, cancel anytime, no refunds for current period.`
        },
        {
          icon: AlertTriangle,
          title: 'Responsibilities & Disclaimers',
          content: `Your responsibilities:
• Verify product quality
• Comply with import laws
• Pay customs duties

Disclaimers:
• IFROF is a platform, not a party to transactions
• We don't guarantee product quality
• We're not liable for shipping delays`
        },
        {
          icon: Ban,
          title: 'Prohibited Use',
          content: `Prohibited activities:
• Importing illegal products
• Counterfeit goods
• Fraud or false information
• Spamming factories
• Hacking attempts`
        },
        {
          icon: Scale,
          title: 'Dispute Resolution',
          content: `Disputes:
• Amicable settlement first
• Arbitration through ICC Hong Kong

Governing Law:
• Hong Kong law applies
• Hong Kong courts have jurisdiction`
        }
      ]
    },
    zh: {
      title: '服务条款',
      subtitle: '使用IFROF平台前请仔细阅读这些条款',
      lastUpdated: '最后更新：2024年1月',
      sections: [
        {
          icon: FileText,
          title: '接受条款',
          content: `使用IFROF即表示您同意受这些条款约束。如果您不同意任何部分，则不得使用我们的服务。`
        },
        {
          icon: CheckCircle,
          title: '提供的服务',
          content: `IFROF提供：
• 工厂市场
• 质量检验
• 国际物流
• 资金转账
• 海关清关`
        },
        {
          icon: CreditCard,
          title: '订阅与付款',
          content: `订阅费用：
• 基础版：$9.99/月
• 高级版：$29.99/月`
        },
        {
          icon: AlertTriangle,
          title: '责任与免责声明',
          content: `您的责任：
• 验证产品质量
• 遵守进口法规
• 支付关税`
        },
        {
          icon: Ban,
          title: '禁止使用',
          content: `禁止活动：
• 进口非法产品
• 假冒商品
• 欺诈行为`
        },
        {
          icon: Scale,
          title: '争议解决',
          content: `争议：
• 首先友好协商
• 通过ICC香港仲裁

适用法律：
• 香港法律适用`
        }
      ]
    }
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {c.title}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4">
            {c.subtitle}
          </p>
          <p className="text-white/50 text-sm">{c.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {c.sections.map((section, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
