import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-secondary to-accent rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">ابدأ رحلة الاستيراد الآن</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              هل أنت جاهز للاستيراد
              <span className="text-gradient-orange"> مباشرة من المصنع؟</span>
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              انضم إلى آلاف المستوردين الذين يوفرون حتى 30% من تكاليف الاستيراد بالتعامل المباشر مع المصانع الصينية.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl">
                ابدأ طلب استيراد مجاناً
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                تحدث مع خبير
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
