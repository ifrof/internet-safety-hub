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
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Send, 
  Loader2,
  ArrowLeft,
  MessageSquare,
  MapPin,
  Shield,
  Clock
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
  email: z.string().email('البريد الإلكتروني غير صحيح').max(255),
  subject: z.string().min(3, 'الموضوع يجب أن يكون 3 أحرف على الأقل').max(200),
  message: z.string().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل').max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
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
    
    try {
      // Create a support conversation if user is logged in
      if (user) {
        const { error } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            type: 'support',
          });
        
        if (error) throw error;
      }
      
      toast({
        title: 'تم إرسال رسالتك',
        description: 'سنرد عليك عبر المنصة في أقرب وقت ممكن',
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل إرسال الرسالة، حاول مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MessageSquare,
      title: 'التواصل',
      value: 'عبر المنصة فقط',
      description: 'سجل دخول لإرسال رسالة مباشرة'
    },
    {
      icon: MapPin,
      title: 'الموقع',
      value: 'الصين',
      description: 'مقرنا الرئيسي'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      value: 'الأحد - الخميس',
      description: '9 ص - 6 م (توقيت الصين)'
    },
    {
      icon: Shield,
      title: 'الأمان',
      value: 'تواصل آمن',
      description: 'جميع المحادثات مشفرة'
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
              نحن هنا لمساعدتك. أرسل لنا رسالة عبر المنصة وسنرد عليك في أقرب وقت ممكن
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
                  <p className="text-sm text-muted-foreground">سنرد عليك عبر المنصة خلال 24 ساعة</p>
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
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-muted/50 rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                      <p className="font-semibold">{info.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">سياسة التواصل</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      نحرص على أن يتم كل التواصل عبر المنصة حصرياً لضمان أمان معاملاتك وحماية بياناتك. 
                      لا نستخدم أي وسائل تواصل خارجية مثل الهاتف أو واتساب أو وسائل التواصل الاجتماعي.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-card rounded-2xl p-6 border border-border">
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
