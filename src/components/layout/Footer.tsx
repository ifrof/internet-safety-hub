import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      tagline: 'استورد مباشرة من المصنع',
      description: 'منصة B2B موثوقة تربطك مباشرة بالمصانع الصينية. نستخدم الذكاء الاصطناعي للتحقق من المصانع وضمان القضاء على الوسطاء.',
      quickLinks: 'روابط سريعة',
      marketplace: 'سوق المصانع',
      aiSearch: 'البحث الذكي',
      services: 'الخدمات',
      pricing: 'الأسعار',
      blog: 'المدونة',
      servicesTitle: 'الخدمات',
      inspection: 'فحص الجودة',
      shipping: 'الشحن الدولي',
      payment: 'التحويلات المالية',
      customs: 'التخليص الجمركي',
      sourcing: 'البحث عن منتجات',
      contact: 'تواصل معنا',
      location: 'قوانغتشو، الصين',
      copyright: '© 2024 IFROF. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      refund: 'سياسة الاسترداد',
    },
    en: {
      tagline: 'Import Directly from Factory',
      description: 'A trusted B2B platform that connects you directly with Chinese factories. We use AI to verify factories and eliminate middlemen.',
      quickLinks: 'Quick Links',
      marketplace: 'Factory Marketplace',
      aiSearch: 'AI Search',
      services: 'Services',
      pricing: 'Pricing',
      blog: 'Blog',
      servicesTitle: 'Services',
      inspection: 'Quality Inspection',
      shipping: 'International Shipping',
      payment: 'Money Transfer',
      customs: 'Customs Clearance',
      sourcing: 'Product Sourcing',
      contact: 'Contact Us',
      location: 'Guangzhou, China',
      copyright: '© 2024 IFROF. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
    },
    zh: {
      tagline: '直接从工厂进口',
      description: '可信赖的B2B平台，直接将您与中国工厂连接。我们使用AI验证工厂并消除中间商。',
      quickLinks: '快速链接',
      marketplace: '工厂市场',
      aiSearch: 'AI搜索',
      services: '服务',
      pricing: '价格',
      blog: '博客',
      servicesTitle: '服务',
      inspection: '质量检验',
      shipping: '国际物流',
      payment: '资金转账',
      customs: '海关清关',
      sourcing: '产品采购',
      contact: '联系我们',
      location: '中国广州',
      copyright: '© 2024 IFROF. 版权所有。',
      privacy: '隐私政策',
      terms: '服务条款',
      refund: '退款政策',
    },
  };

  const c = content[language];

  return (
    <footer className="bg-accent text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                IF
              </div>
              <div>
                <h2 className="text-xl font-bold">IFROF</h2>
                <p className="text-sm text-white/70">{c.tagline}</p>
              </div>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              {c.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">{c.quickLinks}</h3>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-white/70 hover:text-primary transition-colors">{c.marketplace}</Link></li>
              <li><Link to="/ai-search" className="text-white/70 hover:text-primary transition-colors">{c.aiSearch}</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-primary transition-colors">{c.services}</Link></li>
              <li><Link to="/pricing" className="text-white/70 hover:text-primary transition-colors">{c.pricing}</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-primary transition-colors">{c.blog}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">{c.servicesTitle}</h3>
            <ul className="space-y-3">
              <li><Link to="/services/inspection" className="text-white/70 hover:text-primary transition-colors">{c.inspection}</Link></li>
              <li><Link to="/services/shipping" className="text-white/70 hover:text-primary transition-colors">{c.shipping}</Link></li>
              <li><Link to="/services/payment" className="text-white/70 hover:text-primary transition-colors">{c.payment}</Link></li>
              <li><Link to="/services/customs" className="text-white/70 hover:text-primary transition-colors">{c.customs}</Link></li>
              <li><Link to="/services/sourcing" className="text-white/70 hover:text-primary transition-colors">{c.sourcing}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">{c.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-white/70">support@ifrof.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-white/70" dir="ltr">+86 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-white/70">{c.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {c.copyright}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">{c.privacy}</Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">{c.terms}</Link>
              <Link to="/refund" className="text-white/60 hover:text-white transition-colors">{c.refund}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
