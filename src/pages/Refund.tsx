import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { RotateCcw, Clock, CheckCircle, XCircle, HelpCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Refund = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'سياسة الاسترداد',
      subtitle: 'نسعى لرضاك التام. إليك سياستنا الواضحة للاسترداد',
      lastUpdated: 'آخر تحديث: يناير 2024',
      guarantee: 'ضمان استرداد الأموال خلال 14 يوم',
      guaranteeDesc: 'إذا لم تكن راضياً عن خدماتنا خلال أول 14 يوماً، سنعيد لك المبلغ كاملاً بدون أي أسئلة.',
      sections: [
        {
          icon: CheckCircle,
          title: 'الحالات المؤهلة للاسترداد',
          items: [
            'إلغاء الاشتراك خلال فترة الـ 14 يوم الأولى',
            'خطأ تقني منعك من استخدام المنصة',
            'تكرار الدفع عن طريق الخطأ',
            'خدمة فحص لم يتم تنفيذها',
            'خدمة شحن لم تبدأ بعد'
          ]
        },
        {
          icon: XCircle,
          title: 'الحالات غير المؤهلة للاسترداد',
          items: [
            'بعد انتهاء فترة الـ 14 يوم',
            'استخدام الخدمة بشكل كامل (تواصل مع مصانع، إتمام طلبات)',
            'خدمات الفحص المكتملة',
            'الشحنات التي تم إرسالها',
            'التحويلات المالية المنفذة',
            'إغلاق الحساب بسبب مخالفة الشروط'
          ]
        },
        {
          icon: Clock,
          title: 'مدة معالجة الاسترداد',
          items: [
            'مراجعة الطلب: 1-2 يوم عمل',
            'الموافقة على الاسترداد: 3-5 أيام عمل',
            'وصول المبلغ للحساب: 5-10 أيام عمل',
            'المدة الإجمالية: 10-15 يوم عمل كحد أقصى'
          ]
        },
        {
          icon: HelpCircle,
          title: 'كيفية طلب الاسترداد',
          items: [
            'أرسل بريد إلكتروني إلى refunds@ifrof.com',
            'اذكر رقم الطلب أو معرف الحساب',
            'اشرح سبب طلب الاسترداد',
            'انتظر رد فريقنا خلال 48 ساعة',
            'اتبع التعليمات لإتمام العملية'
          ]
        }
      ],
      contact: 'هل لديك أسئلة حول الاسترداد؟',
      contactBtn: 'تواصل مع الدعم'
    },
    en: {
      title: 'Refund Policy',
      subtitle: 'We strive for your complete satisfaction. Here is our clear refund policy',
      lastUpdated: 'Last updated: January 2024',
      guarantee: '14-Day Money-Back Guarantee',
      guaranteeDesc: 'If you are not satisfied with our services within the first 14 days, we will refund your full payment, no questions asked.',
      sections: [
        {
          icon: CheckCircle,
          title: 'Eligible for Refund',
          items: [
            'Cancellation within first 14 days',
            'Technical error preventing platform use',
            'Duplicate payment by mistake',
            'Inspection service not performed',
            'Shipping service not started'
          ]
        },
        {
          icon: XCircle,
          title: 'Not Eligible for Refund',
          items: [
            'After the 14-day period',
            'Full service usage (factory contacts, completed orders)',
            'Completed inspection services',
            'Shipped orders',
            'Executed money transfers',
            'Account closure due to terms violation'
          ]
        },
        {
          icon: Clock,
          title: 'Refund Processing Time',
          items: [
            'Request review: 1-2 business days',
            'Refund approval: 3-5 business days',
            'Amount arrival: 5-10 business days',
            'Total: 10-15 business days maximum'
          ]
        },
        {
          icon: HelpCircle,
          title: 'How to Request a Refund',
          items: [
            'Email refunds@ifrof.com',
            'Include order/account ID',
            'Explain refund reason',
            'Wait for team response within 48 hours',
            'Follow instructions to complete'
          ]
        }
      ],
      contact: 'Have questions about refunds?',
      contactBtn: 'Contact Support'
    },
    zh: {
      title: '退款政策',
      subtitle: '我们追求您的完全满意。这是我们清晰的退款政策',
      lastUpdated: '最后更新：2024年1月',
      guarantee: '14天退款保证',
      guaranteeDesc: '如果您在前14天内对我们的服务不满意，我们将全额退款，无需解释。',
      sections: [
        {
          icon: CheckCircle,
          title: '符合退款条件',
          items: [
            '14天内取消',
            '技术错误阻止使用',
            '重复付款',
            '未执行的检验服务',
            '未开始的物流服务'
          ]
        },
        {
          icon: XCircle,
          title: '不符合退款条件',
          items: [
            '14天期限后',
            '完全使用服务',
            '已完成的检验',
            '已发货订单',
            '已执行的转账'
          ]
        },
        {
          icon: Clock,
          title: '退款处理时间',
          items: [
            '审核：1-2个工作日',
            '批准：3-5个工作日',
            '到账：5-10个工作日'
          ]
        },
        {
          icon: HelpCircle,
          title: '如何申请退款',
          items: [
            '发送邮件至refunds@ifrof.com',
            '包含订单/账户ID',
            '说明退款原因'
          ]
        }
      ],
      contact: '有退款问题？',
      contactBtn: '联系客服'
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
            <RotateCcw className="w-8 h-8 text-primary" />
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

      {/* Guarantee Banner */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 md:p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
              {c.guarantee}
            </h2>
            <p className="text-green-600 dark:text-green-300">
              {c.guaranteeDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {c.sections.map((section, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-green-500/10' :
                    index === 1 ? 'bg-red-500/10' :
                    index === 2 ? 'bg-blue-500/10' :
                    'bg-primary/10'
                  }`}>
                    <section.icon className={`w-5 h-5 ${
                      index === 0 ? 'text-green-500' :
                      index === 1 ? 'text-red-500' :
                      index === 2 ? 'text-blue-500' :
                      'text-primary'
                    }`} />
                  </div>
                  <h3 className="font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-4">{c.contact}</h2>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg">
              {c.contactBtn}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Refund;
