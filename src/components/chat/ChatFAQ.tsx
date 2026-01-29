import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

const ChatFAQ = () => {
  const { language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData: Record<string, FAQItem[]> = {
    ar: [
      {
        question: 'ما هي منصة IFROF؟',
        answer: 'IFROF هي منصة B2B موثوقة تربط المشترين مباشرة بالمصانع الصينية الموثقة، مما يقضي على الوسطاء ويضمن أفضل الأسعار.',
      },
      {
        question: 'كيف يتم التحقق من المصانع؟',
        answer: 'نقوم بفحص شامل يتضمن زيارات ميدانية، التحقق من التراخيص والشهادات، مراجعة القدرة الإنتاجية، وتقييم جودة المنتجات.',
      },
      {
        question: 'ما هي خدمات الشحن المتاحة؟',
        answer: 'نوفر شحن بحري وجوي دولي، مع خدمات التخليص الجمركي الكاملة وتتبع الشحنات في الوقت الفعلي.',
      },
      {
        question: 'كيف أطلب عرض سعر؟',
        answer: 'يمكنك إرسال طلب عرض سعر من صفحة المنتج أو المصنع، أو استخدام خدمة البحث عن المنتجات وسنجد لك أفضل الخيارات.',
      },
      {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'ندعم التحويل البنكي، خطابات الاعتماد (L/C)، وخدمات الضمان لحماية مشترياتك.',
      },
    ],
    en: [
      {
        question: 'What is IFROF platform?',
        answer: 'IFROF is a trusted B2B platform that connects buyers directly with verified Chinese factories, eliminating middlemen and ensuring the best prices.',
      },
      {
        question: 'How are factories verified?',
        answer: 'We conduct comprehensive inspections including site visits, license and certification verification, production capacity review, and product quality assessment.',
      },
      {
        question: 'What shipping services are available?',
        answer: 'We offer international sea and air freight, with full customs clearance services and real-time shipment tracking.',
      },
      {
        question: 'How do I request a quote?',
        answer: 'You can submit a quote request from the product or factory page, or use our product sourcing service and we\'ll find the best options for you.',
      },
      {
        question: 'What payment methods are available?',
        answer: 'We support bank transfers, Letters of Credit (L/C), and escrow services to protect your purchases.',
      },
    ],
    zh: [
      {
        question: '什么是IFROF平台？',
        answer: 'IFROF是一个值得信赖的B2B平台，将买家直接与经过验证的中国工厂联系起来，消除中间商，确保最优价格。',
      },
      {
        question: '工厂如何验证？',
        answer: '我们进行全面检查，包括现场访问、许可证和认证验证、生产能力审查和产品质量评估。',
      },
      {
        question: '有哪些物流服务？',
        answer: '我们提供国际海运和空运，以及完整的清关服务和实时货运跟踪。',
      },
      {
        question: '如何请求报价？',
        answer: '您可以从产品或工厂页面提交报价请求，或使用我们的产品采购服务，我们会为您找到最佳选择。',
      },
      {
        question: '有哪些付款方式？',
        answer: '我们支持银行转账、信用证（L/C）和担保服务，以保护您的购买。',
      },
    ],
  };

  const translations = {
    ar: { title: 'الأسئلة الشائعة' },
    en: { title: 'Frequently Asked Questions' },
    zh: { title: '常见问题' },
  };

  const t = translations[language];
  const faqs = faqData[language] || faqData.ar;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">{t.title}</h4>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-muted/50 rounded-lg border border-border overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/80 transition-colors"
            >
              <span className="text-xs font-medium text-foreground pr-2">{faq.question}</span>
              {expandedIndex === index ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedIndex === index && (
              <div className="px-3 pb-3 text-xs text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatFAQ;
