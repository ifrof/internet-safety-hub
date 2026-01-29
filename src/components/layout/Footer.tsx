import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { language } = useLanguage();

  const content = {
    ar: {
      tagline: 'استورد مباشرة من المصنع',
      description: 'منصة B2B موثوقة تربطك مباشرة بالمصانع الصينية. نستخدم تقنيات متقدمة للتحقق من المصانع وضمان القضاء على الوسطاء.',
      quickLinks: 'روابط سريعة',
      marketplace: 'سوق المصانع',
      advancedSearch: 'البحث المتقدم',
      services: 'الخدمات',
      pricing: 'الأسعار',
      blog: 'المدونة',
      servicesTitle: 'الخدمات',
      inspection: 'فحص الجودة',
      shipping: 'الشحن الدولي',
      payment: 'التحويلات المالية',
      customs: 'التخليص الجمركي',
      sourcing: 'البحث عن منتجات',
      verification: 'التحقق من المورد',
      contact: 'تواصل معنا',
      location: 'الصين',
      platformOnly: 'التواصل عبر المنصة فقط',
      copyright: '© 2026 IFROF. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      refund: 'سياسة الاسترداد',
      platformDescription: 'منصة IFROF تربط المشترين مباشرة بالمصانع الصينية الموثقة. نقضي على الوسطاء ونضمن لك أفضل الأسعار.',
      madeWith: 'صنع بـ ❤️ للتجارة العالمية',
    },
    en: {
      tagline: 'Import Directly from Factory',
      description: 'A trusted B2B platform that connects you directly with Chinese factories. We use advanced technology to verify factories and eliminate middlemen.',
      quickLinks: 'Quick Links',
      marketplace: 'Factory Marketplace',
      advancedSearch: 'Advanced Search',
      services: 'Services',
      pricing: 'Pricing',
      blog: 'Blog',
      servicesTitle: 'Services',
      inspection: 'Quality Inspection',
      shipping: 'International Shipping',
      payment: 'Money Transfer',
      customs: 'Customs Clearance',
      sourcing: 'Product Sourcing',
      verification: 'Supplier Verification',
      contact: 'Contact Us',
      location: 'China',
      platformOnly: 'Platform communication only',
      copyright: '© 2026 IFROF. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
      platformDescription: 'IFROF connects buyers directly with verified Chinese factories. We eliminate middlemen and guarantee you the best prices.',
      madeWith: 'Made with ❤️ for Global Trade',
    },
    zh: {
      tagline: '直接从工厂进口',
      description: '可信赖的B2B平台，直接将您与中国工厂连接。我们使用先进技术验证工厂并消除中间商。',
      quickLinks: '快速链接',
      marketplace: '工厂市场',
      advancedSearch: '高级搜索',
      services: '服务',
      pricing: '价格',
      blog: '博客',
      servicesTitle: '服务',
      inspection: '质量检验',
      shipping: '国际物流',
      payment: '资金转账',
      customs: '海关清关',
      sourcing: '产品采购',
      verification: '供应商验证',
      contact: '联系我们',
      location: '中国',
      platformOnly: '仅平台内沟通',
      copyright: '© 2026 IFROF. 版权所有。',
      privacy: '隐私政策',
      terms: '服务条款',
      refund: '退款政策',
      platformDescription: 'IFROF 将买家直接与经过验证的中国工厂联系起来。我们消除中间商，保证您获得最优惠的价格。',
      madeWith: '用 ❤️ 为全球贸易打造',
    },
  };

  const c = content[language];

  return (
    <footer ref={ref} className="bg-accent text-white" {...props}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                IF
              </div>
              <div>
                <h2 className="text-xl font-bold">IFROF</h2>
                <p className="text-sm text-white/70">{c.tagline}</p>
              </div>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed text-sm md:text-base">
              {c.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6">{c.quickLinks}</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><Link to="/marketplace" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.marketplace}</Link></li>
              <li><Link to="/direct-factory" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.advancedSearch}</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.services}</Link></li>
              <li><Link to="/pricing" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.pricing}</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.blog}</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{language === 'ar' ? 'عن الموقع' : language === 'zh' ? '关于我们' : 'About'}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6">{c.servicesTitle}</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><Link to="/services/inspection" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.inspection}</Link></li>
              <li><Link to="/services/shipping" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.shipping}</Link></li>
              <li><Link to="/services/payment" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.payment}</Link></li>
              <li><Link to="/services/customs" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.customs}</Link></li>
              <li><Link to="/services/sourcing" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.sourcing}</Link></li>
              <li><Link to="/services/verification" className="text-white/70 hover:text-primary transition-colors text-sm md:text-base">{c.verification}</Link></li>
            </ul>
          </div>

          {/* Contact - Platform Only */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6">{c.contact}</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="text-white/70 text-sm md:text-base">{c.platformOnly}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="text-white/70 text-sm md:text-base">{c.location}</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {language === 'ar' ? 'أرسل رسالة' : language === 'zh' ? '发送消息' : 'Send Message'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Platform Description - Left aligned */}
          <div className="mb-4 text-start">
            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-2xl">
              {c.platformDescription}
            </p>
            <p className="text-white/50 text-xs mt-2">
              {c.madeWith}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
            <p className="text-white/60 text-xs md:text-sm text-center md:text-start">
              {c.copyright}
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">{c.privacy}</Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">{c.terms}</Link>
              <Link to="/refund" className="text-white/60 hover:text-white transition-colors">{c.refund}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
