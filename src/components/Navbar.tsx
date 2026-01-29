import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            IF
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-white">IFROF</h1>
            <p className="text-xs text-white/70">استورد مباشرة من المصنع</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-white/90">
          <a href="#how-it-works" className="hover:text-white transition-colors">كيف يعمل</a>
          <a href="#pricing" className="hover:text-white transition-colors">الأسعار</a>
          <a href="#shipping" className="hover:text-white transition-colors">الشحن</a>
          <a href="#blog" className="hover:text-white transition-colors">المدونة</a>
          <a href="#support" className="hover:text-white transition-colors">الدعم</a>
          <a href="/direct-factory" className="hover:text-white transition-colors">بحث متقدم</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">
            <Globe className="w-4 h-4" />
            <span>EN</span>
          </button>
          <Button variant="hero" size="lg" className="hidden sm:flex">
            ابدأ طلب استيراد
            <span className="mr-2">←</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
