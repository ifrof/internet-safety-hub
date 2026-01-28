import { Factory, Product, BlogPost, SubscriptionPlan } from '@/types';

export const mockFactories: Factory[] = [
  {
    id: '1',
    name: 'مصنع قوانغتشو للإلكترونيات',
    nameEn: 'Guangzhou Electronics Factory',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    description: 'مصنع متخصص في إنتاج الإلكترونيات الاستهلاكية والأجهزة الذكية منذ عام 2008. نقدم منتجات عالية الجودة بأسعار تنافسية.',
    location: 'قوانغتشو، الصين',
    city: 'Guangzhou',
    country: 'China',
    category: 'الإلكترونيات',
    subcategory: 'الهواتف والإكسسوارات',
    establishedYear: 2008,
    employeesCount: '500-1000',
    productionCapacity: '100,000 وحدة/شهر',
    certifications: ['ISO 9001', 'CE', 'RoHS', 'FCC'],
    verificationStatus: 'verified',
    verificationScore: 95,
    isDirectFactory: true,
    rating: 4.8,
    reviewsCount: 245,
    responseRate: 98,
    responseTime: '< 24 ساعة',
    minOrderValue: 5000,
    mainProducts: ['سماعات بلوتوث', 'شواحن لاسلكية', 'كابلات USB', 'باور بانك'],
    exportCountries: ['السعودية', 'الإمارات', 'مصر', 'المغرب', 'تركيا'],
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01',
  },
  {
    id: '2',
    name: 'مصنع شينزن للملابس',
    nameEn: 'Shenzhen Garment Factory',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop',
    description: 'مصنع ملابس متكامل يقدم خدمات التصميم والإنتاج والتعبئة. متخصصون في الملابس الرياضية والكاجوال.',
    location: 'شينزن، الصين',
    city: 'Shenzhen',
    country: 'China',
    category: 'الملابس',
    subcategory: 'ملابس رياضية',
    establishedYear: 2012,
    employeesCount: '200-500',
    productionCapacity: '50,000 قطعة/شهر',
    certifications: ['ISO 9001', 'OEKO-TEX', 'BSCI'],
    verificationStatus: 'verified',
    verificationScore: 92,
    isDirectFactory: true,
    rating: 4.6,
    reviewsCount: 189,
    responseRate: 95,
    responseTime: '< 12 ساعة',
    minOrderValue: 3000,
    mainProducts: ['تي شيرت', 'بنطلونات رياضية', 'جاكيتات', 'ملابس رياضية'],
    exportCountries: ['السعودية', 'الإمارات', 'الكويت', 'قطر'],
    createdAt: '2024-02-20',
    updatedAt: '2024-11-28',
  },
  {
    id: '3',
    name: 'مصنع ييوو للمستلزمات المنزلية',
    nameEn: 'Yiwu Home Supplies Factory',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
    description: 'مصنع رائد في إنتاج المستلزمات المنزلية وأدوات المطبخ. جودة عالية وأسعار منافسة.',
    location: 'ييوو، الصين',
    city: 'Yiwu',
    country: 'China',
    category: 'المنزل والمطبخ',
    subcategory: 'أدوات المطبخ',
    establishedYear: 2005,
    employeesCount: '100-200',
    productionCapacity: '200,000 وحدة/شهر',
    certifications: ['ISO 9001', 'FDA', 'LFGB'],
    verificationStatus: 'verified',
    verificationScore: 88,
    isDirectFactory: true,
    rating: 4.5,
    reviewsCount: 156,
    responseRate: 92,
    responseTime: '< 24 ساعة',
    minOrderValue: 2000,
    mainProducts: ['أواني طهي', 'أدوات مائدة', 'حافظات طعام', 'أدوات تنظيف'],
    exportCountries: ['مصر', 'الجزائر', 'المغرب', 'تونس', 'ليبيا'],
    createdAt: '2024-03-10',
    updatedAt: '2024-11-25',
  },
  {
    id: '4',
    name: 'مصنع نينغبو للألعاب',
    nameEn: 'Ningbo Toys Factory',
    logo: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
    description: 'مصنع متخصص في إنتاج ألعاب الأطفال الآمنة والمبتكرة. معتمدون دولياً لجودة الإنتاج.',
    location: 'نينغبو، الصين',
    city: 'Ningbo',
    country: 'China',
    category: 'الألعاب',
    subcategory: 'ألعاب تعليمية',
    establishedYear: 2010,
    employeesCount: '300-500',
    productionCapacity: '150,000 وحدة/شهر',
    certifications: ['ISO 9001', 'EN71', 'ASTM F963', 'CPSIA'],
    verificationStatus: 'verified',
    verificationScore: 94,
    isDirectFactory: true,
    rating: 4.7,
    reviewsCount: 203,
    responseRate: 96,
    responseTime: '< 8 ساعة',
    minOrderValue: 4000,
    mainProducts: ['ألعاب بلاستيكية', 'ألعاب تعليمية', 'دمى', 'ألعاب خارجية'],
    exportCountries: ['السعودية', 'الإمارات', 'مصر', 'الأردن', 'العراق'],
    createdAt: '2024-01-25',
    updatedAt: '2024-12-02',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    factoryId: '1',
    name: 'سماعات بلوتوث لاسلكية TWS',
    nameEn: 'TWS Bluetooth Wireless Earbuds',
    description: 'سماعات بلوتوث 5.3 لاسلكية مع علبة شحن، عمر بطارية حتى 30 ساعة، مقاومة للماء IPX5',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
    ],
    category: 'الإلكترونيات',
    subcategory: 'سماعات',
    price: 8.5,
    minPrice: 6.5,
    maxPrice: 12,
    currency: 'USD',
    minOrderQuantity: 500,
    unit: 'قطعة',
    specifications: {
      'إصدار البلوتوث': '5.3',
      'عمر البطارية': '30 ساعة',
      'مقاومة الماء': 'IPX5',
      'نوع السائق': '10mm Dynamic',
    },
    customizable: true,
    leadTime: '15-20 يوم',
    sampleAvailable: true,
    samplePrice: 25,
    createdAt: '2024-10-01',
    updatedAt: '2024-11-30',
  },
  {
    id: '2',
    factoryId: '1',
    name: 'شاحن لاسلكي سريع 15W',
    nameEn: '15W Fast Wireless Charger',
    description: 'شاحن لاسلكي سريع بقوة 15 واط، متوافق مع جميع الهواتف الداعمة للشحن اللاسلكي',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&h=400&fit=crop',
    ],
    category: 'الإلكترونيات',
    subcategory: 'شواحن',
    price: 4.2,
    minPrice: 3.5,
    maxPrice: 6,
    currency: 'USD',
    minOrderQuantity: 1000,
    unit: 'قطعة',
    specifications: {
      'قوة الشحن': '15W',
      'التوافق': 'Qi Standard',
      'المادة': 'ABS + سيليكون',
    },
    customizable: true,
    leadTime: '10-15 يوم',
    sampleAvailable: true,
    samplePrice: 15,
    createdAt: '2024-10-15',
    updatedAt: '2024-11-28',
  },
  {
    id: '3',
    factoryId: '2',
    name: 'تي شيرت قطن عالي الجودة',
    nameEn: 'Premium Cotton T-Shirt',
    description: 'تي شيرت قطن 100% عالي الجودة، مناسب للطباعة والتطريز، ألوان متعددة',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    ],
    category: 'الملابس',
    subcategory: 'تي شيرت',
    price: 3.8,
    minPrice: 2.5,
    maxPrice: 5.5,
    currency: 'USD',
    minOrderQuantity: 500,
    unit: 'قطعة',
    specifications: {
      'المادة': 'قطن 100%',
      'الوزن': '180 جم/م²',
      'المقاسات': 'S - 4XL',
      'الألوان': '+20 لون',
    },
    customizable: true,
    leadTime: '20-25 يوم',
    sampleAvailable: true,
    samplePrice: 10,
    createdAt: '2024-09-20',
    updatedAt: '2024-11-25',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'دليل المبتدئين للاستيراد من الصين',
    slug: 'beginners-guide-to-importing-from-china',
    excerpt: 'كل ما تحتاج معرفته للبدء في الاستيراد من الصين بشكل احترافي وآمن.',
    content: 'محتوى المقال الكامل هنا...',
    coverImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=400&fit=crop',
    author: 'فريق IFROF',
    category: 'دليل الاستيراد',
    tags: ['استيراد', 'الصين', 'مبتدئين'],
    publishedAt: '2024-11-15',
    readTime: 8,
  },
  {
    id: '2',
    title: 'كيف تختار المصنع المناسب؟',
    slug: 'how-to-choose-right-factory',
    excerpt: '10 معايير أساسية لاختيار المصنع الصيني المناسب لمنتجاتك.',
    content: 'محتوى المقال الكامل هنا...',
    coverImage: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop',
    author: 'أحمد محمد',
    category: 'نصائح الاستيراد',
    tags: ['مصانع', 'اختيار', 'جودة'],
    publishedAt: '2024-11-10',
    readTime: 6,
  },
  {
    id: '3',
    title: 'الفرق بين المصنع والوسيط التجاري',
    slug: 'factory-vs-trading-company',
    excerpt: 'كيف تفرق بين المصنع المباشر والوسيط التجاري وأيهما أفضل لك.',
    content: 'محتوى المقال الكامل هنا...',
    coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop',
    author: 'فريق IFROF',
    category: 'معلومات عامة',
    tags: ['مصانع', 'وسطاء', 'تحقق'],
    publishedAt: '2024-11-05',
    readTime: 5,
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    nameAr: 'أساسي',
    price: 9.99,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'الوصول لسوق المصانع',
      'البحث الذكي بالذكاء الاصطناعي',
      '5 طلبات استيراد شهرياً',
      'التواصل مع 10 مصانع',
      'دعم عبر المنصة',
    ],
    maxOrders: 5,
    maxFactoryContacts: 10,
    aiSearches: 20,
    priority: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    nameAr: 'متميز',
    price: 29.99,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'كل مميزات الباقة الأساسية',
      'طلبات استيراد غير محدودة',
      'التواصل مع مصانع غير محدود',
      'أولوية في الدعم',
      'خصم 10% على خدمات التفتيش',
      'تقارير أسعار الشحن المتقدمة',
    ],
    maxOrders: -1,
    maxFactoryContacts: -1,
    aiSearches: -1,
    priority: true,
  },
];

export const serviceCategories = [
  {
    id: 'inspection',
    name: 'فحص الجودة',
    icon: '🔍',
    description: 'فحص المنتجات قبل الشحن للتأكد من الجودة',
    startingPrice: 150,
  },
  {
    id: 'shipping',
    name: 'الشحن الدولي',
    icon: '🚢',
    description: 'خدمات شحن بحري وجوي وبري بأسعار تنافسية',
    startingPrice: 'حسب الطلب',
  },
  {
    id: 'money_transfer',
    name: 'التحويلات المالية',
    icon: '💰',
    description: 'تحويل الأموال للمصانع بشكل آمن ومضمون',
    startingPrice: '1%',
  },
  {
    id: 'customs',
    name: 'التخليص الجمركي',
    icon: '📋',
    description: 'إجراءات التخليص الجمركي في بلدك',
    startingPrice: 100,
  },
  {
    id: 'sourcing',
    name: 'البحث عن منتجات',
    icon: '🎯',
    description: 'نجد لك المنتج والمصنع المناسب',
    startingPrice: 50,
  },
];

export const categories = [
  { id: 'electronics', name: 'الإلكترونيات', icon: '📱', count: 156 },
  { id: 'clothing', name: 'الملابس', icon: '👕', count: 243 },
  { id: 'home', name: 'المنزل والمطبخ', icon: '🏠', count: 189 },
  { id: 'toys', name: 'الألعاب', icon: '🧸', count: 98 },
  { id: 'beauty', name: 'التجميل والعناية', icon: '💄', count: 134 },
  { id: 'sports', name: 'الرياضة', icon: '⚽', count: 76 },
  { id: 'auto', name: 'السيارات', icon: '🚗', count: 65 },
  { id: 'industrial', name: 'صناعي', icon: '🏭', count: 112 },
];
