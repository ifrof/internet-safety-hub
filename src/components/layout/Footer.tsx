import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
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
                <p className="text-sm text-white/70">استورد مباشرة من المصنع</p>
              </div>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              منصة B2B موثوقة تربطك مباشرة بالمصانع الصينية. نستخدم الذكاء الاصطناعي للتحقق من المصانع وضمان القضاء على الوسطاء.
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
            <h3 className="font-bold text-lg mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-white/70 hover:text-primary transition-colors">سوق المصانع</Link></li>
              <li><Link to="/ai-search" className="text-white/70 hover:text-primary transition-colors">البحث الذكي</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-primary transition-colors">الخدمات</Link></li>
              <li><Link to="/pricing" className="text-white/70 hover:text-primary transition-colors">الأسعار</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-primary transition-colors">المدونة</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">الخدمات</h3>
            <ul className="space-y-3">
              <li><Link to="/services/inspection" className="text-white/70 hover:text-primary transition-colors">فحص الجودة</Link></li>
              <li><Link to="/services/shipping" className="text-white/70 hover:text-primary transition-colors">الشحن الدولي</Link></li>
              <li><Link to="/services/payment" className="text-white/70 hover:text-primary transition-colors">التحويلات المالية</Link></li>
              <li><Link to="/services/customs" className="text-white/70 hover:text-primary transition-colors">التخليص الجمركي</Link></li>
              <li><Link to="/services/sourcing" className="text-white/70 hover:text-primary transition-colors">البحث عن منتجات</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">تواصل معنا</h3>
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
                <span className="text-white/70">قوانغتشو، الصين</span>
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
              © 2024 IFROF. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">شروط الاستخدام</Link>
              <Link to="/refund" className="text-white/60 hover:text-white transition-colors">سياسة الاسترداد</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
