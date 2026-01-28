import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, Eye, Database, Mail, Clock } from 'lucide-react';

const Privacy = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'نلتزم بحماية خصوصيتك وبياناتك الشخصية',
      lastUpdated: 'آخر تحديث: يناير 2024',
      sections: [
        {
          icon: Database,
          title: 'البيانات التي نجمعها',
          content: `نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند:
          • إنشاء حساب على المنصة
          • التواصل مع المصانع
          • طلب خدماتنا (فحص الجودة، الشحن، التحويلات)
          • التواصل مع فريق الدعم
          
          تشمل هذه البيانات: الاسم، البريد الإلكتروني، رقم الهاتف، اسم الشركة، عنوان الشحن.`
        },
        {
          icon: Eye,
          title: 'كيف نستخدم بياناتك',
          content: `نستخدم بياناتك لـ:
          • تقديم خدماتنا وتحسينها
          • التواصل معك بخصوص طلباتك
          • إرسال تحديثات مهمة عن حسابك
          • تخصيص تجربتك على المنصة
          • الامتثال للمتطلبات القانونية
          
          لن نبيع أو نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.`
        },
        {
          icon: Lock,
          title: 'حماية البيانات',
          content: `نحمي بياناتك من خلال:
          • تشفير SSL/TLS لجميع الاتصالات
          • تخزين البيانات في خوادم آمنة
          • الوصول المحدود للموظفين المصرح لهم فقط
          • مراجعات أمنية دورية
          • الالتزام بمعايير PCI DSS للمدفوعات`
        },
        {
          icon: Shield,
          title: 'حقوقك',
          content: `لديك الحق في:
          • الوصول إلى بياناتك الشخصية
          • تصحيح أي معلومات غير دقيقة
          • طلب حذف بياناتك
          • الاعتراض على معالجة بياناتك
          • نقل بياناتك إلى خدمة أخرى
          
          للممارسة أي من هذه الحقوق، تواصل معنا على privacy@ifrof.com`
        },
        {
          icon: Clock,
          title: 'الاحتفاظ بالبيانات',
          content: `نحتفظ ببياناتك:
          • طوال فترة نشاط حسابك
          • لمدة 5 سنوات بعد آخر معاملة (للامتثال القانوني)
          • يمكنك طلب حذف حسابك في أي وقت
          
          بعد الحذف، قد نحتفظ ببعض البيانات المجهولة للإحصائيات.`
        },
        {
          icon: Mail,
          title: 'تواصل معنا',
          content: `إذا كان لديك أي استفسارات حول سياسة الخصوصية:
          • البريد الإلكتروني: privacy@ifrof.com
          • الهاتف: +86 123 456 7890
          • العنوان: قوانغتشو، الصين
          
          سنرد على استفساراتك خلال 48 ساعة عمل.`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'We are committed to protecting your privacy and personal data',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          icon: Database,
          title: 'Data We Collect',
          content: `We collect information you provide directly when:
          • Creating an account
          • Contacting factories
          • Requesting our services
          • Contacting support
          
          This includes: name, email, phone, company name, shipping address.`
        },
        {
          icon: Eye,
          title: 'How We Use Your Data',
          content: `We use your data to:
          • Provide and improve our services
          • Communicate about your orders
          • Send important account updates
          • Personalize your experience
          • Comply with legal requirements`
        },
        {
          icon: Lock,
          title: 'Data Protection',
          content: `We protect your data through:
          • SSL/TLS encryption
          • Secure server storage
          • Limited employee access
          • Regular security audits
          • PCI DSS compliance`
        },
        {
          icon: Shield,
          title: 'Your Rights',
          content: `You have the right to:
          • Access your personal data
          • Correct inaccurate information
          • Request data deletion
          • Object to data processing
          • Data portability`
        },
        {
          icon: Clock,
          title: 'Data Retention',
          content: `We retain your data:
          • While your account is active
          • 5 years after last transaction
          • You can request deletion anytime`
        },
        {
          icon: Mail,
          title: 'Contact Us',
          content: `For privacy inquiries:
          • Email: privacy@ifrof.com
          • Phone: +86 123 456 7890
          • Address: Guangzhou, China`
        }
      ]
    },
    zh: {
      title: '隐私政策',
      subtitle: '我们致力于保护您的隐私和个人数据',
      lastUpdated: '最后更新：2024年1月',
      sections: [
        {
          icon: Database,
          title: '我们收集的数据',
          content: `我们收集您直接提供的信息：
          • 创建账户时
          • 联系工厂时
          • 请求服务时
          • 联系客服时`
        },
        {
          icon: Eye,
          title: '数据使用方式',
          content: `我们使用您的数据：
          • 提供和改进服务
          • 沟通订单事宜
          • 发送重要更新
          • 个性化体验`
        },
        {
          icon: Lock,
          title: '数据保护',
          content: `我们通过以下方式保护您的数据：
          • SSL/TLS加密
          • 安全服务器存储
          • 有限员工访问
          • 定期安全审计`
        },
        {
          icon: Shield,
          title: '您的权利',
          content: `您有权：
          • 访问个人数据
          • 更正不准确信息
          • 请求删除数据
          • 反对数据处理`
        },
        {
          icon: Clock,
          title: '数据保留',
          content: `我们保留您的数据：
          • 账户活跃期间
          • 最后交易后5年
          • 可随时请求删除`
        },
        {
          icon: Mail,
          title: '联系我们',
          content: `隐私咨询：
          • 邮箱：privacy@ifrof.com
          • 电话：+86 123 456 7890
          • 地址：中国广州`
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
            <Shield className="w-8 h-8 text-primary" />
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

export default Privacy;
