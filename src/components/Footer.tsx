import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                IF
              </div>
              <div>
                <h3 className="text-xl font-bold">IFROF</h3>
                <p className="text-xs text-white/70">استورد مباشرة من المصنع</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              منصة B2B موثوقة تربطك مباشرة بالمصانع الصينية المعتمدة بدون وسطاء.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">كيف يعمل</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">الأسعار</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">المدونة</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">طلب استيراد</a></li>
              <li><a href="#" className="hover:text-white transition-colors">التحقق من المصانع</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تتبع الشحنات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الدعم الفني</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@ifrof.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2024 IFROF. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
