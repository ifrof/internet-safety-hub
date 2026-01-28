import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Arabic translations
const ar: Record<string, string> = {
  // Navbar
  'nav.howItWorks': 'كيف يعمل',
  'nav.pricing': 'الأسعار',
  'nav.shipping': 'الشحن',
  'nav.blog': 'المدونة',
  'nav.support': 'الدعم',
  'nav.aiSearch': 'محقق IFROF الذكي للمصانع',
  'nav.startImport': 'ابدأ طلب استيراد',
  'nav.marketplace': 'المصانع',
  'nav.services': 'الخدمات',
  'nav.dashboard': 'لوحة التحكم',
  'nav.login': 'تسجيل الدخول',
  
  // Hero
  'hero.title': 'استورد مباشرة من المصانع الصينية',
  'hero.subtitle': 'منصة IFROF تربطك مباشرة بالمصانع المعتمدة في الصين. تخطى الوسطاء ووفر حتى 40% من تكاليفك',
  'hero.cta': 'ابدأ البحث الآن',
  'hero.secondaryCta': 'تعرف على الخدمات',
  'hero.stats.factories': 'مصنع معتمد',
  'hero.stats.countries': 'دولة نخدمها',
  'hero.stats.orders': 'طلب ناجح',
  
  // Categories
  'categories.title': 'تصفح حسب الفئة',
  'categories.subtitle': 'اكتشف آلاف المصانع المتخصصة في مختلف الصناعات',
  'categories.electronics': 'الإلكترونيات',
  'categories.clothing': 'الملابس والأزياء',
  'categories.furniture': 'الأثاث والديكور',
  'categories.machinery': 'الآلات والمعدات',
  'categories.beauty': 'مستحضرات التجميل',
  'categories.food': 'الأغذية والمشروبات',
  'categories.toys': 'الألعاب والهدايا',
  'categories.auto': 'قطع السيارات',
  
  // How it works
  'howItWorks.title': 'كيف يعمل IFROF؟',
  'howItWorks.subtitle': 'عملية بسيطة وشفافة من البحث حتى استلام البضائع',
  'howItWorks.step1.title': 'ابحث عن المصنع',
  'howItWorks.step1.desc': 'استخدم البحث الذكي أو تصفح الفئات للعثور على المصنع المناسب',
  'howItWorks.step2.title': 'تواصل واطلب عرض سعر',
  'howItWorks.step2.desc': 'تواصل مباشرة مع المصنع واحصل على عرض سعر مفصل',
  'howItWorks.step3.title': 'أكد الطلب والدفع',
  'howItWorks.step3.desc': 'بعد الموافقة، قم بتأكيد الطلب والدفع بشكل آمن',
  'howItWorks.step4.title': 'استلم بضائعك',
  'howItWorks.step4.desc': 'تتبع شحنتك واستلم بضائعك بكل سهولة',
  
  // Verification
  'verification.title': 'مصانع موثوقة ومعتمدة',
  'verification.subtitle': 'نتحقق من كل مصنع قبل إضافته للمنصة',
  'verification.feature1': 'فحص ميداني للمصانع',
  'verification.feature2': 'التحقق من التراخيص والشهادات',
  'verification.feature3': 'مراجعة سجل التصدير',
  'verification.feature4': 'تقييمات المستوردين السابقين',
  
  // Services
  'services.title': 'خدمات شاملة لنجاح استيرادك',
  'services.subtitle': 'نقدم لك كل ما تحتاجه من البداية حتى النهاية',
  'services.inspection': 'فحص الجودة',
  'services.shipping': 'الشحن الدولي',
  'services.payment': 'التحويلات المالية',
  'services.customs': 'التخليص الجمركي',
  
  // Pricing
  'pricing.title': 'أسعار بسيطة وشفافة',
  'pricing.subtitle': 'اختر الباقة المناسبة لاحتياجاتك',
  'pricing.basic': 'الباقة الأساسية',
  'pricing.premium': 'الباقة المتقدمة',
  'pricing.perMonth': '/شهر',
  'pricing.cta': 'ابدأ الآن',
  'pricing.popular': 'الأكثر شعبية',
  
  // Blog
  'blog.title': 'المدونة التعليمية',
  'blog.subtitle': 'تعلم كل ما تحتاجه عن الاستيراد من الصين',
  'blog.readMore': 'اقرأ المزيد',
  'blog.minutes': 'دقائق',
  
  // CTA
  'cta.title': 'جاهز للبدء في الاستيراد؟',
  'cta.subtitle': 'انضم لآلاف المستوردين الناجحين',
  'cta.button': 'ابدأ مجاناً',
  
  // Footer
  'footer.description': 'منصة IFROF تربطك مباشرة بالمصانع المعتمدة في الصين',
  'footer.quickLinks': 'روابط سريعة',
  'footer.services': 'الخدمات',
  'footer.contact': 'تواصل معنا',
  'footer.rights': 'جميع الحقوق محفوظة',
  
  // Common
  'common.viewAll': 'عرض الكل',
  'common.learnMore': 'اعرف المزيد',
  'common.search': 'بحث',
  'common.filter': 'تصفية',
  'common.sort': 'ترتيب',
  'common.verified': 'موثق',
  'common.rating': 'التقييم',
  'common.reviews': 'تقييمات',
  'common.minOrder': 'الحد الأدنى للطلب',
  'common.responseTime': 'وقت الاستجابة',
  'common.products': 'منتجات',
  'common.factory': 'مصنع',
};

// English translations
const en: Record<string, string> = {
  // Navbar
  'nav.howItWorks': 'How it Works',
  'nav.pricing': 'Pricing',
  'nav.shipping': 'Shipping',
  'nav.blog': 'Blog',
  'nav.support': 'Support',
  'nav.aiSearch': 'IFROF AI Factory Finder',
  'nav.startImport': 'Start Import Request',
  'nav.marketplace': 'Factories',
  'nav.services': 'Services',
  'nav.dashboard': 'Dashboard',
  'nav.login': 'Login',
  
  // Hero
  'hero.title': 'Import Directly from Chinese Factories',
  'hero.subtitle': 'IFROF connects you directly with verified factories in China. Skip the middlemen and save up to 40% on your costs',
  'hero.cta': 'Start Searching Now',
  'hero.secondaryCta': 'Learn About Services',
  'hero.stats.factories': 'Verified Factories',
  'hero.stats.countries': 'Countries Served',
  'hero.stats.orders': 'Successful Orders',
  
  // Categories
  'categories.title': 'Browse by Category',
  'categories.subtitle': 'Discover thousands of specialized factories across various industries',
  'categories.electronics': 'Electronics',
  'categories.clothing': 'Clothing & Fashion',
  'categories.furniture': 'Furniture & Decor',
  'categories.machinery': 'Machinery & Equipment',
  'categories.beauty': 'Beauty & Cosmetics',
  'categories.food': 'Food & Beverages',
  'categories.toys': 'Toys & Gifts',
  'categories.auto': 'Auto Parts',
  
  // How it works
  'howItWorks.title': 'How Does IFROF Work?',
  'howItWorks.subtitle': 'Simple and transparent process from search to delivery',
  'howItWorks.step1.title': 'Find the Factory',
  'howItWorks.step1.desc': 'Use smart search or browse categories to find the right factory',
  'howItWorks.step2.title': 'Connect & Request Quote',
  'howItWorks.step2.desc': 'Communicate directly with the factory and get a detailed quote',
  'howItWorks.step3.title': 'Confirm Order & Pay',
  'howItWorks.step3.desc': 'After approval, confirm the order and pay securely',
  'howItWorks.step4.title': 'Receive Your Goods',
  'howItWorks.step4.desc': 'Track your shipment and receive your goods easily',
  
  // Verification
  'verification.title': 'Verified & Trusted Factories',
  'verification.subtitle': 'We verify every factory before adding them to the platform',
  'verification.feature1': 'On-site Factory Inspection',
  'verification.feature2': 'License & Certificate Verification',
  'verification.feature3': 'Export History Review',
  'verification.feature4': 'Previous Importer Reviews',
  
  // Services
  'services.title': 'Complete Services for Your Import Success',
  'services.subtitle': 'We provide everything you need from start to finish',
  'services.inspection': 'Quality Inspection',
  'services.shipping': 'International Shipping',
  'services.payment': 'Money Transfer',
  'services.customs': 'Customs Clearance',
  
  // Pricing
  'pricing.title': 'Simple & Transparent Pricing',
  'pricing.subtitle': 'Choose the plan that fits your needs',
  'pricing.basic': 'Basic Plan',
  'pricing.premium': 'Premium Plan',
  'pricing.perMonth': '/month',
  'pricing.cta': 'Get Started',
  'pricing.popular': 'Most Popular',
  
  // Blog
  'blog.title': 'Educational Blog',
  'blog.subtitle': 'Learn everything you need about importing from China',
  'blog.readMore': 'Read More',
  'blog.minutes': 'minutes',
  
  // CTA
  'cta.title': 'Ready to Start Importing?',
  'cta.subtitle': 'Join thousands of successful importers',
  'cta.button': 'Start for Free',
  
  // Footer
  'footer.description': 'IFROF connects you directly with verified factories in China',
  'footer.quickLinks': 'Quick Links',
  'footer.services': 'Services',
  'footer.contact': 'Contact Us',
  'footer.rights': 'All rights reserved',
  
  // Common
  'common.viewAll': 'View All',
  'common.learnMore': 'Learn More',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',
  'common.verified': 'Verified',
  'common.rating': 'Rating',
  'common.reviews': 'Reviews',
  'common.minOrder': 'Min Order',
  'common.responseTime': 'Response Time',
  'common.products': 'Products',
  'common.factory': 'Factory',
};

// Chinese translations
const zh: Record<string, string> = {
  // Navbar
  'nav.howItWorks': '工作原理',
  'nav.pricing': '价格',
  'nav.shipping': '物流',
  'nav.blog': '博客',
  'nav.support': '支持',
  'nav.aiSearch': 'IFROF智能工厂搜索',
  'nav.startImport': '开始进口申请',
  'nav.marketplace': '工厂',
  'nav.services': '服务',
  'nav.dashboard': '控制台',
  'nav.login': '登录',
  
  // Hero
  'hero.title': '直接从中国工厂进口',
  'hero.subtitle': 'IFROF平台直接连接您与中国认证工厂。跳过中间商，节省高达40%的成本',
  'hero.cta': '立即开始搜索',
  'hero.secondaryCta': '了解服务',
  'hero.stats.factories': '认证工厂',
  'hero.stats.countries': '服务国家',
  'hero.stats.orders': '成功订单',
  
  // Categories
  'categories.title': '按类别浏览',
  'categories.subtitle': '发现各行业数千家专业工厂',
  'categories.electronics': '电子产品',
  'categories.clothing': '服装时尚',
  'categories.furniture': '家具装饰',
  'categories.machinery': '机械设备',
  'categories.beauty': '美容化妆品',
  'categories.food': '食品饮料',
  'categories.toys': '玩具礼品',
  'categories.auto': '汽车配件',
  
  // How it works
  'howItWorks.title': 'IFROF如何工作？',
  'howItWorks.subtitle': '从搜索到交付的简单透明流程',
  'howItWorks.step1.title': '寻找工厂',
  'howItWorks.step1.desc': '使用智能搜索或浏览类别找到合适的工厂',
  'howItWorks.step2.title': '联系并获取报价',
  'howItWorks.step2.desc': '直接与工厂沟通并获取详细报价',
  'howItWorks.step3.title': '确认订单并付款',
  'howItWorks.step3.desc': '批准后，确认订单并安全付款',
  'howItWorks.step4.title': '接收您的货物',
  'howItWorks.step4.desc': '跟踪您的货运并轻松收货',
  
  // Verification
  'verification.title': '认证可信赖的工厂',
  'verification.subtitle': '我们在添加到平台之前验证每家工厂',
  'verification.feature1': '现场工厂检查',
  'verification.feature2': '许可证和证书验证',
  'verification.feature3': '出口历史审查',
  'verification.feature4': '以往进口商评价',
  
  // Services
  'services.title': '全方位进口成功服务',
  'services.subtitle': '我们提供从头到尾所需的一切',
  'services.inspection': '质量检验',
  'services.shipping': '国际物流',
  'services.payment': '资金转账',
  'services.customs': '海关清关',
  
  // Pricing
  'pricing.title': '简单透明的价格',
  'pricing.subtitle': '选择适合您需求的方案',
  'pricing.basic': '基础套餐',
  'pricing.premium': '高级套餐',
  'pricing.perMonth': '/月',
  'pricing.cta': '立即开始',
  'pricing.popular': '最受欢迎',
  
  // Blog
  'blog.title': '教育博客',
  'blog.subtitle': '了解从中国进口所需的一切',
  'blog.readMore': '阅读更多',
  'blog.minutes': '分钟',
  
  // CTA
  'cta.title': '准备开始进口？',
  'cta.subtitle': '加入数千名成功进口商',
  'cta.button': '免费开始',
  
  // Footer
  'footer.description': 'IFROF平台直接连接您与中国认证工厂',
  'footer.quickLinks': '快速链接',
  'footer.services': '服务',
  'footer.contact': '联系我们',
  'footer.rights': '版权所有',
  
  // Common
  'common.viewAll': '查看全部',
  'common.learnMore': '了解更多',
  'common.search': '搜索',
  'common.filter': '筛选',
  'common.sort': '排序',
  'common.verified': '已认证',
  'common.rating': '评分',
  'common.reviews': '评价',
  'common.minOrder': '最低订单',
  'common.responseTime': '响应时间',
  'common.products': '产品',
  'common.factory': '工厂',
};

const translations: Record<Language, Record<string, string>> = { ar, en, zh };

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ifrof-language');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ifrof-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
