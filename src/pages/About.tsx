import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Shield, 
  Globe, 
  Users, 
  Target, 
  Award,
  CheckCircle,
  ArrowLeft 
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'الثقة والموثوقية',
      description: 'نتحقق من كل مصنع بعناية لضمان أنك تتعامل مع مصانع حقيقية وليس وسطاء'
    },
    {
      icon: Target,
      title: 'التركيز على العميل',
      description: 'نضع احتياجات عملائنا في المقام الأول ونعمل على تسهيل رحلة الاستيراد'
    },
    {
      icon: Globe,
      title: 'الانتشار العالمي',
      description: 'نربط المشترين العرب بأفضل المصانع الصينية المعتمدة'
    },
    {
      icon: Award,
      title: 'الجودة أولاً',
      description: 'نختار فقط المصانع التي تلتزم بأعلى معايير الجودة والشهادات الدولية'
    }
  ];

  const stats = [
    { number: '500+', label: 'مصنع موثق' },
    { number: '10,000+', label: 'منتج متنوع' },
    { number: '50+', label: 'دولة نخدمها' },
    { number: '95%', label: 'رضا العملاء' }
  ];

  const team = [
    {
      name: 'أحمد محمد',
      role: 'المدير التنفيذي',
      description: 'خبرة 15 سنة في التجارة الدولية'
    },
    {
      name: 'سارة علي',
      role: 'مديرة العمليات',
      description: 'متخصصة في سلاسل التوريد'
    },
    {
      name: 'محمد خالد',
      role: 'مدير التحقق',
      description: 'خبير في فحص المصانع والجودة'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              عن <span className="text-primary">IFROF</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              نحن منصة تجارة إلكترونية B2B نربط المشترين العرب بالمصانع الصينية المباشرة، 
              مع ضمان التحقق والموثوقية في كل معاملة
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">مهمتنا</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                نسعى لتمكين التجار والمستوردين العرب من الوصول المباشر إلى المصانع الصينية 
                الحقيقية، بدون وسطاء أو عمولات مخفية. نؤمن بأن الشفافية والثقة هما أساس 
                نجاح أي علاقة تجارية دولية.
              </p>
              <ul className="space-y-3">
                {['القضاء على الوسطاء والعمولات المخفية', 'توفير مصانع موثقة ومعتمدة فقط', 'دعم فني وتجاري على مدار الساعة', 'أسعار تنافسية مباشرة من المصنع'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800" 
                  alt="Factory" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">قيمنا</h2>
            <p className="text-muted-foreground text-lg">المبادئ التي نلتزم بها في كل ما نقوم به</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">فريقنا</h2>
            <p className="text-muted-foreground text-lg">خبراء متخصصون في التجارة الدولية</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">جاهز للبدء معنا؟</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف التجار العرب الذين يستوردون مباشرة من المصانع الصينية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="hero">
              <Link to="/auth?mode=signup">
                ابدأ الآن
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;