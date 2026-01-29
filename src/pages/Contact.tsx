import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2,
  ArrowLeft,
  MessageSquare,
  Clock,
  Globe
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
  email: z.string().email('البريد الإلكتروني غير صحيح').max(255),
  subject: z.string().min(3, 'الموضوع يجب أن يكون 3 أحرف على الأقل').max(200),
  message: z.string().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل').max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'تم إرسال رسالتك',
      description: 'سنتواصل معك في أقرب وقت ممكن',
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'support@ifrof.com',
      link: 'mailto:support@ifrof.com'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+966 55 123 4567',
      link: 'tel:+966551234567'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      link: null
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      value: 'الأحد - الخميس، 9 ص - 6 م',
      link: null
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
              تواصل <span className="text-primary">معنا</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">أرسل رسالة</h2>
                  <p className="text-sm text-muted-foreground">سنرد عليك خلال 24 ساعة</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      placeholder="أحمد محمد"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Input
                    id="subject"
                    placeholder="موضوع رسالتك"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      جارِ الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-6">معلومات التواصل</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                        {info.link ? (
                          <a href={info.link} className="font-semibold hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">تابعنا</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  تابعنا على وسائل التواصل الاجتماعي للحصول على آخر الأخبار والعروض
                </p>
                <div className="flex gap-3">
                  {['Twitter', 'LinkedIn', 'WhatsApp'].map((social) => (
                    <Button key={social} variant="outline" size="sm">
                      <Globe className="w-4 h-4 ml-2" />
                      {social}
                    </Button>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-bold mb-2">هل لديك أسئلة شائعة؟</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  قد تجد إجابة سؤالك في قسم الأسئلة الشائعة
                </p>
                <Button asChild variant="outline">
                  <Link to="/pricing">الأسئلة الشائعة</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;