import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `مرحباً! 👋 أنا مساعد IFROF الذكي.

يمكنني مساعدتك في:
• البحث عن مصانع مناسبة لمنتجاتك
• الإجابة على أسئلتك حول الاستيراد
• شرح خدماتنا وأسعارنا
• مساعدتك في إتمام طلبات الاستيراد

كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      default: `شكراً على سؤالك! 

لمساعدتك بشكل أفضل، يمكنك:
1. زيارة [سوق المصانع](/marketplace) لتصفح المصانع المتاحة
2. استخدام [البحث الذكي](/ai-search) للعثور على مصانع محددة
3. الاطلاع على [خدماتنا](/services) لمعرفة كيف يمكننا مساعدتك

هل هناك شيء محدد تريد السؤال عنه؟`,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responses.default,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    'كيف أبدأ الاستيراد؟',
    'ما هي الأسعار؟',
    'ابحث عن مصنع سماعات',
    'كيف أتحقق من المصنع؟',
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
              IF
            </div>
            <div>
              <h1 className="font-bold text-white">IFROF</h1>
              <p className="text-xs text-white/70">المساعد الذكي</p>
            </div>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' ? 'bg-primary/10' : 'bg-secondary'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-left' : ''}`}>
                <div className={`rounded-2xl p-4 ${
                  message.role === 'assistant' 
                    ? 'bg-card border border-border' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الكتابة...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">أسئلة شائعة:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action)}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 py-6"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              variant="hero"
              size="lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            <Sparkles className="w-3 h-3 inline ml-1" />
            مدعوم بالذكاء الاصطناعي
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
