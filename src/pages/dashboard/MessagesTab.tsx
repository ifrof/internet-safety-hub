import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  MessageSquare, Search, User, Clock, ChevronLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Conversation {
  id: string;
  type: string;
  factory_id: string | null;
  last_message_at: string | null;
  created_at: string;
  factory_name?: string;
}

const MessagesTab = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            factories:factory_id (name)
          `)
          .eq('user_id', user.id)
          .order('last_message_at', { ascending: false, nullsFirst: false });

        if (error) throw error;
        
        const formatted = data?.map(conv => ({
          ...conv,
          factory_name: conv.factories?.name || 'محادثة'
        })) || [];
        
        setConversations(formatted);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  const filteredConversations = conversations.filter(conv => 
    conv.factory_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'جديد';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'أمس';
    } else if (days < 7) {
      return `منذ ${days} أيام`;
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">الرسائل</h1>
          <p className="text-muted-foreground">محادثاتك مع المصانع وفريق الدعم</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في المحادثات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Conversations List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {conversations.length === 0 ? 'لا توجد محادثات بعد' : 'لا توجد نتائج'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {conversations.length === 0 
                ? 'ابدأ بالتواصل مع المصانع من صفحة المصنع'
                : 'جرب تعديل معايير البحث'}
            </p>
            {conversations.length === 0 && (
              <Link to="/marketplace">
                <Button variant="hero">
                  تصفح المصانع
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/messages/${conversation.id}`}
                className="block bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold truncate">{conversation.factory_name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(conversation.last_message_at || conversation.created_at)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.type === 'factory_chat' ? 'محادثة مع المصنع' : 'دعم فني'}
                      </p>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MessagesTab;
