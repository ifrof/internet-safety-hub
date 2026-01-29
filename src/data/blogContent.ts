import { Language } from '@/contexts/LanguageContext';

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
  intro: string;
  sections: Array<{ title: string; content: string }>;
  conclusion: string;
}

export interface TranslatedBlogPost {
  id: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  translations: Record<Language, BlogPostTranslation>;
}

export const blogPosts: TranslatedBlogPost[] = [
  {
    id: '1',
    slug: 'beginners-guide-to-importing-from-china',
    coverImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=400&fit=crop',
    publishedAt: '2024-11-15',
    readTime: 8,
    translations: {
      ar: {
        title: 'دليل المبتدئين للاستيراد من الصين',
        excerpt: 'كل ما تحتاج معرفته للبدء في الاستيراد من الصين بشكل احترافي وآمن.',
        category: 'دليل الاستيراد',
        author: 'فريق IFROF',
        tags: ['استيراد', 'الصين', 'مبتدئين'],
        intro: 'يعتبر الاستيراد من الصين من أكثر المشاريع التجارية ربحية في العالم العربي، لكنه يتطلب فهماً عميقاً للسوق والإجراءات. في هذا الدليل الشامل، سنأخذك خطوة بخطوة في رحلتك الأولى للاستيراد.',
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
• **اتفق على الضمان**: ماذا لو كان المنتج معيباً؟`
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
        conclusion: 'الاستيراد من الصين رحلة تستحق العناء إذا تمت بشكل صحيح. ابدأ صغيراً، تعلم من الأخطاء، واستخدم منصات موثوقة مثل IFROF للتحقق من المصانع. بالتوفيق في رحلتك!'
      },
      en: {
        title: "Beginner's Guide to Importing from China",
        excerpt: 'Everything you need to know to start importing from China professionally and safely.',
        category: 'Import Guide',
        author: 'IFROF Team',
        tags: ['Import', 'China', 'Beginners'],
        intro: 'Importing from China is one of the most profitable business ventures, but it requires a deep understanding of the market and procedures. In this comprehensive guide, we will take you step by step through your first import journey.',
        sections: [
          {
            title: 'Why Import from China?',
            content: `China is called the "World's Factory" for good reasons:
            
• **Competitive Prices**: Labor and production costs are much lower than most countries
• **Huge Variety**: You can find almost any product
• **Massive Production Capacity**: Ability to fulfill large orders
• **Manufacturing Expertise**: Decades of experience manufacturing for the world

Savings can reach 40-70% compared to buying from local distributors.`
          },
          {
            title: 'Step 1: Research and Planning',
            content: `Before starting, you should:

1. **Identify the Product**: Choose a product whose local market you understand
2. **Market Research**: Know your competitors and prices
3. **Calculate Costs**: Remember final price = product price + shipping + customs + taxes
4. **Set Budget**: Start with a small budget for first trial ($3,000-$5,000)
5. **Know Regulations**: Ensure the product is allowed in your country`
          },
          {
            title: 'Step 2: Finding the Right Factory',
            content: `This is the most important step. You need to distinguish between:

**Direct Factory**:
• Better prices
• Customization options
• Usually requires larger quantities

**Trading Company**:
• Smaller quantities
• Higher prices
• May lack customization

Our advice: Use a platform like IFROF to verify factories and ensure dealing with verified direct manufacturers.`
          },
          {
            title: 'Step 3: Communication and Negotiation',
            content: `When communicating with the factory:

• **Request Samples**: Don't buy large quantities before inspecting samples ($20-$100)
• **Negotiate Price**: The first price is usually not final
• **Request Quality Certificates**: ISO, CE, RoHS depending on product
• **Set Payment Terms**: Start with 30% deposit and 70% before shipping
• **Agree on Warranty**: What if the product is defective?`
          },
          {
            title: 'Step 4: Inspection and Shipping',
            content: `Before shipping:

• **Quality Inspection**: Use an independent inspection company (like our services)
• **Choose Shipping Method**:
  - Air: Fast (5-7 days) but expensive
  - Sea: Economical but slow (25-40 days)
  - Express (DHL/FedEx): For samples only

**Customs Clearance**:
• Prepare commercial invoice
• Prepare bill of lading
• Prepare certificate of origin
• Calculate customs duties in advance`
          }
        ],
        conclusion: 'Importing from China is a journey worth taking if done correctly. Start small, learn from mistakes, and use reliable platforms like IFROF to verify factories. Good luck on your journey!'
      },
      zh: {
        title: '从中国进口新手指南',
        excerpt: '专业安全地开始从中国进口所需了解的一切。',
        category: '进口指南',
        author: 'IFROF团队',
        tags: ['进口', '中国', '新手'],
        intro: '从中国进口是最有利可图的商业项目之一，但需要深入了解市场和程序。在这份全面指南中，我们将带您逐步完成第一次进口之旅。',
        sections: [
          {
            title: '为什么从中国进口？',
            content: `中国被称为"世界工厂"是有充分理由的：
            
• **价格竞争力**：劳动力和生产成本比大多数国家低得多
• **种类繁多**：几乎可以找到任何产品
• **巨大产能**：能够完成大订单
• **制造专业知识**：数十年为世界制造的经验

与本地分销商购买相比，可节省40-70%。`
          },
          {
            title: '第一步：研究和规划',
            content: `开始之前，您应该：

1. **确定产品**：选择您了解当地市场的产品
2. **市场调研**：了解竞争对手和价格
3. **计算成本**：记住最终价格 = 产品价格 + 运费 + 关税 + 税费
4. **设定预算**：首次试验从小预算开始（$3,000-$5,000）
5. **了解法规**：确保产品在您的国家允许进口`
          },
          {
            title: '第二步：寻找合适的工厂',
            content: `这是最重要的一步。您需要区分：

**直接工厂**：
• 更好的价格
• 定制选项
• 通常需要更大的数量

**贸易公司**：
• 更小的数量
• 更高的价格
• 可能缺乏定制

我们的建议：使用像IFROF这样的平台来验证工厂，确保与经过验证的直接制造商打交道。`
          },
          {
            title: '第三步：沟通和谈判',
            content: `与工厂沟通时：

• **索取样品**：在检查样品之前不要购买大量产品（$20-$100）
• **谈判价格**：第一个价格通常不是最终价格
• **索取质量证书**：ISO、CE、RoHS等，取决于产品
• **设定付款条款**：从30%定金和发货前70%开始
• **商定保修**：如果产品有缺陷怎么办？`
          },
          {
            title: '第四步：检验和运输',
            content: `发货前：

• **质量检验**：使用独立检验公司（如我们的服务）
• **选择运输方式**：
  - 空运：快速（5-7天）但昂贵
  - 海运：经济但慢（25-40天）
  - 快递（DHL/FedEx）：仅用于样品

**清关**：
• 准备商业发票
• 准备提单
• 准备原产地证书
• 提前计算关税`
          }
        ],
        conclusion: '如果操作正确，从中国进口是一段值得的旅程。从小做起，从错误中学习，使用像IFROF这样可靠的平台来验证工厂。祝您旅途顺利！'
      }
    }
  },
  {
    id: '2',
    slug: 'how-to-choose-right-factory',
    coverImage: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop',
    publishedAt: '2024-11-10',
    readTime: 6,
    translations: {
      ar: {
        title: 'كيف تختار المصنع المناسب؟',
        excerpt: '10 معايير أساسية لاختيار المصنع الصيني المناسب لمنتجاتك.',
        category: 'نصائح الاستيراد',
        author: 'أحمد محمد',
        tags: ['مصانع', 'اختيار', 'جودة'],
        intro: 'اختيار المصنع الصحيح هو العامل الأكثر تأثيراً على نجاح عملية الاستيراد. في هذا المقال، سنشارك معك 10 معايير أساسية لاختيار المصنع المناسب.',
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
        conclusion: 'اختيار المصنع الصحيح يوفر عليك الكثير من المشاكل. خذ وقتك في البحث والتحقق، ولا تتردد في استخدام خدمات التحقق المتخصصة.'
      },
      en: {
        title: 'How to Choose the Right Factory?',
        excerpt: '10 essential criteria for choosing the right Chinese factory for your products.',
        category: 'Import Tips',
        author: 'Ahmed Mohamed',
        tags: ['Factories', 'Selection', 'Quality'],
        intro: 'Choosing the right factory is the most impactful factor on your import success. In this article, we share 10 essential criteria for selecting the right factory.',
        sections: [
          {
            title: '1. Verify It\'s a Real Factory',
            content: `The first and most important step is ensuring you're dealing with a factory, not a middleman:

• Request photos and videos of the factory
• Verify manufacturing license
• Use IFROF verification services
• Search for the factory in official records`
          },
          {
            title: '2. Evaluate Production Capacity',
            content: `Ensure the factory can meet your orders:

• What is the monthly production capacity?
• Can they increase production if needed?
• What are the typical delivery times?`
          },
          {
            title: '3. Check Quality Certificates',
            content: `Certificates are important to ensure product quality and standards compliance:

• ISO 9001: Quality management system
• CE: For products destined for Europe
• FDA: For food and medical products
• RoHS: For electronics`
          },
          {
            title: '4. Review Export History',
            content: `Factories with export experience are better:

• Which countries do they export to?
• How many years of experience do they have?
• Do they have satisfied customers?`
          }
        ],
        conclusion: 'Choosing the right factory saves you many problems. Take your time researching and verifying, and don\'t hesitate to use specialized verification services.'
      },
      zh: {
        title: '如何选择合适的工厂？',
        excerpt: '选择适合您产品的中国工厂的10个基本标准。',
        category: '进口技巧',
        author: '艾哈迈德·穆罕默德',
        tags: ['工厂', '选择', '质量'],
        intro: '选择正确的工厂是影响进口成功的最重要因素。在本文中，我们分享选择合适工厂的10个基本标准。',
        sections: [
          {
            title: '1. 验证它是真正的工厂',
            content: `第一步也是最重要的一步是确保您与工厂打交道，而不是中间商：

• 索取工厂的照片和视频
• 验证生产许可证
• 使用IFROF验证服务
• 在官方记录中搜索工厂`
          },
          {
            title: '2. 评估产能',
            content: `确保工厂能够满足您的订单：

• 月产能是多少？
• 如果需要，他们能增加产量吗？
• 通常的交货时间是多少？`
          },
          {
            title: '3. 检查质量证书',
            content: `证书对于确保产品质量和符合标准很重要：

• ISO 9001：质量管理体系
• CE：面向欧洲的产品
• FDA：食品和医疗产品
• RoHS：电子产品`
          },
          {
            title: '4. 审查出口历史',
            content: `有出口经验的工厂更好：

• 他们出口到哪些国家？
• 他们有多少年的经验？
• 他们有满意的客户吗？`
          }
        ],
        conclusion: '选择正确的工厂可以为您节省很多问题。花时间研究和验证，不要犹豫使用专业的验证服务。'
      }
    }
  },
  {
    id: '3',
    slug: 'factory-vs-trading-company',
    coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop',
    publishedAt: '2024-11-05',
    readTime: 5,
    translations: {
      ar: {
        title: 'الفرق بين المصنع والوسيط التجاري',
        excerpt: 'كيف تفرق بين المصنع المباشر والوسيط التجاري وأيهما أفضل لك.',
        category: 'معلومات عامة',
        author: 'فريق IFROF',
        tags: ['مصانع', 'وسطاء', 'تحقق'],
        intro: 'من أكثر الأسئلة شيوعاً بين المستوردين الجدد: هل أتعامل مع المصنع مباشرة أم مع شركة تجارة؟ في هذا المقال، سنوضح الفروقات ونساعدك على اتخاذ القرار الصحيح.',
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
        conclusion: 'الخيار الأفضل يعتمد على احتياجاتك. للطلبات الكبيرة والمنتجات المخصصة، المصنع أفضل. للكميات الصغيرة والمنتجات المتنوعة، شركة التجارة قد تكون أنسب.'
      },
      en: {
        title: 'Factory vs Trading Company: What\'s the Difference?',
        excerpt: 'How to distinguish between a direct factory and a trading company, and which is better for you.',
        category: 'General Information',
        author: 'IFROF Team',
        tags: ['Factories', 'Middlemen', 'Verification'],
        intro: 'One of the most common questions among new importers: Should I deal directly with the factory or with a trading company? In this article, we clarify the differences and help you make the right decision.',
        sections: [
          {
            title: 'What is a Direct Factory?',
            content: `A direct factory is the facility that actually manufactures the product. It features:

• Lower prices (no middleman commission)
• Customization and modification options
• Greater quality control
• Direct relationship with the manufacturer

However, it may require larger quantities and may have less experience dealing with foreign customers.`
          },
          {
            title: 'What is a Trading Company?',
            content: `A trading company is an intermediary between you and the factory:

• Works with multiple factories
• Offers additional services (inspection, shipping)
• More flexible with quantities
• More export experience

However, their prices are higher due to profit margins.`
          },
          {
            title: 'How to Tell Them Apart?',
            content: `Here are some signs:

**Factory Signs**:
• They have a production site that can be visited
• They speak in detail about the manufacturing process
• They have factory certificates
• Manufacturing license is clear

**Trading Company Signs**:
• Office only without factory
• Can provide any product
• Similar prices for different products
• Don't know manufacturing details`
          }
        ],
        conclusion: 'The best choice depends on your needs. For large orders and custom products, a factory is better. For small quantities and diverse products, a trading company may be more suitable.'
      },
      zh: {
        title: '工厂与贸易公司：有什么区别？',
        excerpt: '如何区分直接工厂和贸易公司，以及哪个更适合您。',
        category: '常规信息',
        author: 'IFROF团队',
        tags: ['工厂', '中间商', '验证'],
        intro: '新进口商最常见的问题之一：我应该直接与工厂打交道还是与贸易公司打交道？在本文中，我们阐明差异并帮助您做出正确的决定。',
        sections: [
          {
            title: '什么是直接工厂？',
            content: `直接工厂是实际制造产品的设施。其特点是：

• 价格更低（无中间商佣金）
• 定制和修改选项
• 更好的质量控制
• 与制造商的直接关系

但是，可能需要更大的数量，并且在与外国客户打交道方面可能经验不足。`
          },
          {
            title: '什么是贸易公司？',
            content: `贸易公司是您与工厂之间的中介：

• 与多家工厂合作
• 提供额外服务（检验、运输）
• 数量更灵活
• 出口经验更丰富

但是，由于利润率，他们的价格更高。`
          },
          {
            title: '如何区分它们？',
            content: `以下是一些标志：

**工厂标志**：
• 他们有可以参观的生产场所
• 他们详细讨论制造过程
• 他们有工厂证书
• 生产许可证清晰

**贸易公司标志**：
• 只有办公室没有工厂
• 可以提供任何产品
• 不同产品价格相似
• 不了解制造细节`
          }
        ],
        conclusion: '最佳选择取决于您的需求。对于大订单和定制产品，工厂更好。对于小批量和多样化产品，贸易公司可能更合适。'
      }
    }
  }
];

// Helper function to get blog post by slug with translations
export const getBlogPost = (slug: string, language: Language) => {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;
  
  const translation = post.translations[language];
  return {
    id: post.id,
    slug: post.slug,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    ...translation
  };
};

// Helper function to get all blog posts for listing
export const getAllBlogPosts = (language: Language) => {
  return blogPosts.map(post => {
    const translation = post.translations[language];
    return {
      id: post.id,
      slug: post.slug,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      title: translation.title,
      excerpt: translation.excerpt,
      category: translation.category,
      author: translation.author,
      tags: translation.tags
    };
  });
};
