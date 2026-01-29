import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface QuickQuestion {
  label: string;
  question: string;
}

const AIChatWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    ar: {
      title: 'IFROF CUSTOMER SUPPORT',
      subtitle: 'نحن هنا لمساعدتك',
      placeholder: 'اكتب رسالتك...',
      greeting: 'مرحباً! 👋 أنا المساعد الذكي لـ IFROF. كيف يمكنني مساعدتك اليوم؟',
      error: 'عذراً، حدث خطأ. حاول مرة أخرى.',
      quickQuestionsTitle: 'أسئلة شائعة',
      quickQuestions: [
        { label: '🏭 ما هي IFROF؟', question: 'ما هي منصة IFROF وما الخدمات التي تقدمها؟' },
        { label: '💰 الأسعار', question: 'ما هي خطط الاشتراك والأسعار المتاحة؟' },
        { label: '✅ التحقق من المصانع', question: 'كيف يتم التحقق من المصانع على المنصة؟' },
        { label: '🚚 الشحن', question: 'كيف تعمل خدمات الشحن الدولي؟' },
      ] as QuickQuestion[],
    },
    en: {
      title: 'IFROF CUSTOMER SUPPORT',
      subtitle: 'We are here to help',
      placeholder: 'Type your message...',
      greeting: 'Hello! 👋 I am the IFROF Smart Assistant. How can I help you today?',
      error: 'Sorry, an error occurred. Please try again.',
      quickQuestionsTitle: 'Quick Questions',
      quickQuestions: [
        { label: '🏭 What is IFROF?', question: 'What is IFROF platform and what services do you offer?' },
        { label: '💰 Pricing', question: 'What are the subscription plans and pricing?' },
        { label: '✅ Factory Verification', question: 'How do you verify factories on the platform?' },
        { label: '🚚 Shipping', question: 'How does international shipping work?' },
      ] as QuickQuestion[],
    },
    zh: {
      title: 'IFROF CUSTOMER SUPPORT',
      subtitle: '我们在这里帮助您',
      placeholder: '输入您的消息...',
      greeting: '您好！👋 我是IFROF智能助手。今天我能为您做什么？',
      error: '抱歉，发生了错误。请重试。',
      quickQuestionsTitle: '常见问题',
      quickQuestions: [
        { label: '🏭 什么是IFROF？', question: 'IFROF平台是什么？提供什么服务？' },
        { label: '💰 价格', question: '订阅计划和价格是什么？' },
        { label: '✅ 工厂验证', question: '你们如何验证平台上的工厂？' },
        { label: '🚚 物流', question: '国际物流是如何运作的？' },
      ] as QuickQuestion[],
    },
  };

  const t = translations[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          role: 'assistant',
          content: t.greeting,
        },
      ]);
    }
  }, [isOpen, t.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          language 
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || t.error,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: t.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary animate-pulse" />
          </div>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{t.title}</h3>
                <p className="text-sm text-white/80">{t.subtitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="h-[320px] p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gradient-to-br from-primary/20 to-primary/10'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted rounded-tl-sm'
                    }`}
                  >
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Questions - Show only after greeting */}
              {messages.length === 1 && !isLoading && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">{t.quickQuestionsTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.quickQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(q.question)}
                        className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors border border-border hover:border-primary/50"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder={t.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-primary"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full w-10 h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
