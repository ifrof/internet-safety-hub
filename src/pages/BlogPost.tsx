import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBlogPosts } from '@/data/mockData';
import { Clock, User, ArrowRight, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
          <Link to="/blog">
            <Button>العودة للمدونة</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Full article content based on the post
  const articleContent = {
    'beginners-guide-to-importing-from-china': {
      intro: `يعتبر الاستيراد من الصين من أكثر المشاريع التجارية ربحية في العالم العربي، لكنه يتطلب فهماً عميقاً للسوق والإجراءات. في هذا الدليل الشامل، سنأخذك خطوة بخطوة في رحلتك الأولى للاستيراد.`,
      sections: [
        {
          title: 'لماذا الاستيراد من الصين؟',
          content: `تُعد الصين "مصنع العالم" لأسباب وجيهة. تتميز بـ:
          
• **أسعار تنافسية**: تكلفة العمالة والإنتاج أقل بكثير من معظم الدول
• **تنوع هائل**: يمكنك إيجاد أي منتج تقريباً
• **طاقة إنتاجية ضخمة**: القدرة على تلبية طلبات كبيرة
• **خبرة تصنيعية**: عقود من الخبرة في التصنيع للعالم

التوفير يمكن أن يصل إلى 40-70% مقارنة بالشراء من الموزعين المحليين.`
        },
        {
          title: 'الخطوة الأولى: البحث والتخطيط',
          content: `قبل البدء، يجب عليك:

1. **تحديد المنتج**: اختر منتجاً تفهم سوقه المحلي
2. **دراسة السوق**: تعرف على المنافسين والأسعار
3. **حساب التكاليف**: تذكر أن السعر النهائي = سعر المنتج + الشحن + الجمارك + الضرائب
4. **تحديد الميزانية**: ابدأ بميزانية صغيرة للتجربة الأولى ($3,000-$5,000)
5. **معرفة اللوائح**: تأكد من أن المنتج مسموح به في بلدك`
        },
        {
          title: 'الخطوة الثانية: إيجاد المصنع المناسب',
          content: `هذه أهم خطوة في العملية. عليك التمييز بين:

**المصنع المباشر (Factory)**:
• أسعار أفضل
• إمكانية التخصيص
• يتطلب كميات أكبر عادة

**شركة التجارة (Trading Company)**:
• كميات أقل
• أسعار أعلى
• قد يفتقر للتخصيص

نصيحتنا: استخدم منصة مثل IFROF للتحقق من المصانع وضمان التعامل مع مصانع مباشرة موثقة.`
        },
        {
          title: 'الخطوة الثالثة: التواصل والتفاوض',
          content: `عند التواصل مع المصنع:

• **اطلب عينات**: لا تشتري كميات كبيرة قبل فحص العينات ($20-$100)
• **تفاوض على السعر**: السعر الأول ليس نهائياً عادة
• **اطلب شهادات الجودة**: ISO, CE, RoHS حسب المنتج
• **حدد شروط الدفع**: ابدأ بـ 30% مقدم و 70% قبل الشحن
• **اتفق على الضمان**: ماذا لو كان المنتج معيباً؟

استخدم WeChat أو Alibaba للتواصل، لكن احتفظ بكل شيء مكتوباً.`
        },
        {
          title: 'الخطوة الرابعة: الفحص والشحن',
          content: `قبل الشحن:

• **فحص الجودة**: استخدم شركة فحص محايدة (مثل خدماتنا)
• **اختر طريقة الشحن**:
  - الجوي: سريع (5-7 أيام) لكن مكلف
  - البحري: اقتصادي لكن بطيء (25-40 يوم)
  - السريع (DHL/FedEx): للعينات فقط

**التخليص الجمركي**:
• جهز الفاتورة التجارية
• جهز بوليصة الشحن
• جهز شهادة المنشأ
• احسب الرسوم الجمركية مسبقاً`
        }
      ],
      conclusion: `الاستيراد من الصين رحلة تستحق العناء إذا تمت بشكل صحيح. ابدأ صغيراً، تعلم من الأخطاء، واستخدم منصات موثوقة مثل IFROF للتحقق من المصانع. بالتوفيق في رحلتك!`
    },
    'how-to-choose-right-factory': {
      intro: `اختيار المصنع الصحيح هو العامل الأكثر تأثيراً على نجاح عملية الاستيراد. في هذا المقال، سنشارك معك 10 معايير أساسية لاختيار المصنع المناسب.`,
      sections: [
        {
          title: '1. التحقق من أنه مصنع حقيقي',
          content: `أول وأهم خطوة هي التأكد أنك تتعامل مع مصنع وليس وسيط:

• اطلب صور وفيديوهات للمصنع
• تحقق من رخصة التصنيع
• استخدم خدمات التحقق من IFROF
• ابحث عن المصنع في السجلات الرسمية`
        },
        {
          title: '2. تقييم الطاقة الإنتاجية',
          content: `تأكد أن المصنع قادر على تلبية طلباتك:

• ما هي الطاقة الإنتاجية الشهرية؟
• هل يمكنهم زيادة الإنتاج إذا احتجت؟
• ما هي أوقات التسليم المعتادة؟`
        },
        {
          title: '3. فحص شهادات الجودة',
          content: `الشهادات مهمة للتأكد من جودة المنتج والامتثال للمعايير:

• ISO 9001: نظام إدارة الجودة
• CE: للمنتجات الموجهة لأوروبا
• FDA: للمنتجات الغذائية والطبية
• RoHS: للإلكترونيات`
        },
        {
          title: '4. مراجعة سجل التصدير',
          content: `المصانع ذات الخبرة في التصدير أفضل:

• إلى أي دول يصدرون؟
• كم سنة من الخبرة لديهم؟
• هل لديهم عملاء راضين؟`
        }
      ],
      conclusion: `اختيار المصنع الصحيح يوفر عليك الكثير من المشاكل. خذ وقتك في البحث والتحقق، ولا تتردد في استخدام خدمات التحقق المتخصصة.`
    },
    'factory-vs-trading-company': {
      intro: `من أكثر الأسئلة شيوعاً بين المستوردين الجدد: هل أتعامل مع المصنع مباشرة أم مع شركة تجارة؟ في هذا المقال، سنوضح الفروقات ونساعدك على اتخاذ القرار الصحيح.`,
      sections: [
        {
          title: 'ما هو المصنع المباشر؟',
          content: `المصنع المباشر هو المنشأة التي تصنع المنتج فعلياً. تتميز بـ:

• أسعار أقل (لا عمولة وسطاء)
• إمكانية التخصيص والتعديل
• تحكم أكبر في الجودة
• علاقة مباشرة مع المنتج

لكن قد تتطلب كميات أكبر وقد تكون أقل خبرة في التعامل مع العملاء الأجانب.`
        },
        {
          title: 'ما هي شركة التجارة؟',
          content: `شركة التجارة (Trading Company) هي وسيط بينك وبين المصنع:

• تتعامل مع عدة مصانع
• تقدم خدمات إضافية (فحص، شحن)
• أكثر مرونة في الكميات
• خبرة أكبر في التصدير

لكن أسعارها أعلى بسبب هامش الربح.`
        },
        {
          title: 'كيف تفرق بينهما؟',
          content: `إليك بعض العلامات:

**علامات المصنع**:
• لديهم موقع إنتاج يمكن زيارته
• يتحدثون بتفصيل عن عملية التصنيع
• لديهم شهادات مصنع
• رخصة التصنيع واضحة

**علامات شركة التجارة**:
• مكتب فقط بدون مصنع
• يمكنهم توفير أي منتج
• أسعار متقاربة لمنتجات مختلفة
• لا يعرفون تفاصيل التصنيع`
        }
      ],
      conclusion: `الخيار الأفضل يعتمد على احتياجاتك. للطلبات الكبيرة والمنتجات المخصصة، المصنع أفضل. للكميات الصغيرة والمنتجات المتنوعة، شركة التجارة قد تكون أنسب.`
    }
  };

  const content = articleContent[slug as keyof typeof articleContent] || {
    intro: post.excerpt,
    sections: [],
    conclusion: 'شكراً لقراءتك!'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ الرابط إلى الحافظة',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowRight className="w-4 h-4" />
              العودة للمدونة
            </Link>
            
            <Badge className="bg-primary mb-4">{post.category}</Badge>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} دقائق قراءة
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="-mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <article className="lg:col-span-3 prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {content.intro}
                </p>

                {content.sections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{section.title}</h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))}

                <div className="bg-primary/10 rounded-2xl p-6 mt-8">
                  <h3 className="font-bold mb-2">الخلاصة</h3>
                  <p className="text-muted-foreground">{content.conclusion}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Share */}
                <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    شارك المقال
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">فيسبوك</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-sky-500" />
                      <span className="text-sm">تويتر</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-700/10 hover:bg-blue-700/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      <span className="text-sm">لينكد إن</span>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                      <span className="text-sm">{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">مقالات ذات صلة</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mockBlogPosts.filter(p => p.slug !== slug).slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <img
                  src={relatedPost.coverImage}
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 text-sm">{relatedPost.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
