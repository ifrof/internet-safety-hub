import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowRight, Send, Loader2, MessageSquare, Factory,
  User, Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface FactoryInfo {
  id: string;
  name: string;
  logo_url: string | null;
}

const Messages = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { messages, conversations, loading, sendMessage } = useMessages(conversationId);
  
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [factoryInfo, setFactoryInfo] = useState<Record<string, FactoryInfo>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch factory info for conversations
  useEffect(() => {
    const fetchFactoryInfo = async () => {
      const factoryIds = conversations
        .map(c => c.factory_id)
        .filter(Boolean) as string[];

      if (factoryIds.length === 0) return;

      const { data } = await supabase
        .from('factories')
        .select('id, name, logo_url')
        .in('id', factoryIds);

      if (data) {
        const info: Record<string, FactoryInfo> = {};
        data.forEach(f => {
          info[f.id] = f;
        });
        setFactoryInfo(info);
      }
    };

    fetchFactoryInfo();
  }, [conversations]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    await sendMessage(newMessage.trim());
    setNewMessage('');
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Conversations List */}
      <aside className="w-full md:w-80 border-b md:border-b-0 md:border-l border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              المحادثات
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[200px] md:h-[calc(100vh-80px)]">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد محادثات</p>
              <Link to="/marketplace">
                <Button variant="link" className="mt-2">
                  تصفح المصانع
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {conversations.map((conv) => {
                const factory = conv.factory_id ? factoryInfo[conv.factory_id] : null;
                const isActive = conversationId === conv.id;

                return (
                  <Link
                    key={conv.id}
                    to={`/messages/${conv.id}`}
                    className={`block p-4 hover:bg-muted/50 transition-colors ${
                      isActive ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Factory className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {factory?.name || 'مصنع'}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {conv.last_message_at
                            ? format(new Date(conv.last_message_at), 'dd MMM', { locale: ar })
                            : 'جديد'}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-200px)] md:h-screen">
        {!conversationId ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">اختر محادثة</h2>
              <p className="text-muted-foreground">
                اختر محادثة من القائمة للبدء
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.sender_id === user.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          isMe
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {format(new Date(msg.created_at), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  placeholder="اكتب رسالتك..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={sending}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sending}
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Messages;
