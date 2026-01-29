import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserRound, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface HumanSupportRequestProps {
  onBack: () => void;
  conversationHistory: string[];
}

const HumanSupportRequest = ({ onBack, conversationHistory }: HumanSupportRequestProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translations = {
    ar: {
      title: 'التحدث مع موظف',
      subtitle: 'سيتواصل معك أحد موظفينا قريباً',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'رسالتك (اختياري)',
      messagePlaceholder: 'اكتب استفسارك هنا...',
      submit: 'إرسال الطلب',
      back: 'رجوع',
      successTitle: 'تم إرسال طلبك!',
      successMessage: 'سيتواصل معك أحد موظفينا خلال 24 ساعة عبر المنصة.',
      submitting: 'جاري الإرسال...',
      errorEmpty: 'يرجى إدخال الاسم والبريد الإلكتروني',
      errorSubmit: 'حدث خطأ، حاول مرة أخرى',
    },
    en: {
      title: 'Talk to a Human',
      subtitle: 'One of our team members will contact you soon',
      name: 'Name',
      email: 'Email',
      message: 'Your message (optional)',
      messagePlaceholder: 'Write your inquiry here...',
      submit: 'Submit Request',
      back: 'Back',
      successTitle: 'Request Sent!',
      successMessage: 'One of our team members will contact you within 24 hours via the platform.',
      submitting: 'Submitting...',
      errorEmpty: 'Please enter your name and email',
      errorSubmit: 'An error occurred, please try again',
    },
    zh: {
      title: '与人工客服交谈',
      subtitle: '我们的团队成员将很快与您联系',
      name: '姓名',
      email: '电子邮件',
      message: '您的留言（可选）',
      messagePlaceholder: '在此写下您的咨询...',
      submit: '提交请求',
      back: '返回',
      successTitle: '请求已发送！',
      successMessage: '我们的团队成员将在24小时内通过平台与您联系。',
      submitting: '提交中...',
      errorEmpty: '请输入您的姓名和电子邮件',
      errorSubmit: '发生错误，请重试',
    },
  };

  const t = translations[language];

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error(t.errorEmpty);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a service request for human support
      const { error } = await supabase.from('service_requests').insert({
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        type: 'other',
        status: 'pending',
        details: {
          request_type: 'human_support',
          name,
          email,
          message: message || 'طلب محادثة مع موظف',
          conversation_history: conversationHistory.slice(-10), // Last 10 messages
          language,
          requested_at: new Date().toISOString(),
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success(t.successTitle);
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast.error(t.errorSubmit);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{t.successTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.successMessage}</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <UserRound className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t.title}</h3>
            <p className="text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t.name}</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-sm"
            placeholder={t.name}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t.email}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
            placeholder={t.email}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t.message}</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className="text-sm resize-none"
            rows={3}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            t.submitting
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t.submit}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default HumanSupportRequest;
