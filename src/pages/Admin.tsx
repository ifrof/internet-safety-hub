import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard, Factory, Users, Package, Settings,
  Search, Plus, Edit, Trash2, CheckCircle, XCircle,
  Shield, Loader2, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FactoryData {
  id: string;
  name: string;
  category: string;
  verification_status: string | null;
  country: string | null;
  created_at: string;
}

interface UserData {
  id: string;
  user_id: string;
  full_name: string | null;
  company_name: string | null;
  subscription_plan: string | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { toast } = useToast();

  const [factories, setFactories] = useState<FactoryData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        toast({
          title: 'غير مصرح',
          description: 'ليس لديك صلاحية الوصول لهذه الصفحة',
          variant: 'destructive',
        });
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate, toast]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      try {
        const [factoriesRes, usersRes] = await Promise.all([
          supabase.from('factories').select('id, name, category, verification_status, country, created_at'),
          supabase.from('profiles').select('id, user_id, full_name, company_name, subscription_plan, created_at'),
        ]);

        if (factoriesRes.data) setFactories(factoriesRes.data);
        if (usersRes.data) setUsers(usersRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoadingData(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleVerifyFactory = async (factoryId: string, status: 'verified' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('factories')
        .update({ verification_status: status })
        .eq('id', factoryId);

      if (error) throw error;

      setFactories(prev =>
        prev.map(f => f.id === factoryId ? { ...f, verification_status: status } : f)
      );

      toast({
        title: 'تم التحديث',
        description: status === 'verified' ? 'تم توثيق المصنع بنجاح' : 'تم رفض المصنع',
      });
    } catch (err) {
      console.error('Error updating factory:', err);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة المصنع',
        variant: 'destructive',
      });
    }
  };

  const filteredFactories = factories.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    (u.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (u.company_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">لوحة الإدارة</h1>
              <p className="text-xs text-muted-foreground">إدارة المنصة</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <Factory className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{factories.length}</p>
            <p className="text-sm text-muted-foreground">المصانع</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <Users className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-muted-foreground">المستخدمين</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">
              {factories.filter(f => f.verification_status === 'verified').length}
            </p>
            <p className="text-sm text-muted-foreground">مصانع موثقة</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <Package className="w-8 h-8 text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">
              {factories.filter(f => f.verification_status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">بانتظار التوثيق</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="factories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="factories" className="gap-2">
              <Factory className="w-4 h-4" />
              المصانع
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              المستخدمين
            </TabsTrigger>
          </TabsList>

          {/* Factories Tab */}
          <TabsContent value="factories">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {loadingData ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredFactories.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  لا توجد مصانع
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredFactories.map((factory) => (
                    <div key={factory.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Factory className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{factory.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {factory.category} • {factory.country}
                        </p>
                      </div>
                      <Badge
                        variant={
                          factory.verification_status === 'verified'
                            ? 'default'
                            : factory.verification_status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {factory.verification_status === 'verified'
                          ? 'موثق'
                          : factory.verification_status === 'rejected'
                          ? 'مرفوض'
                          : 'قيد المراجعة'}
                      </Badge>
                      <div className="flex gap-2">
                        {factory.verification_status !== 'verified' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyFactory(factory.id, 'verified')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {factory.verification_status !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyFactory(factory.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {loadingData ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  لا يوجد مستخدمين
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredUsers.map((userData) => (
                    <div key={userData.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {userData.full_name || 'مستخدم'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {userData.company_name || 'بدون شركة'}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {userData.subscription_plan === 'premium'
                          ? 'بريميوم'
                          : userData.subscription_plan === 'basic'
                          ? 'أساسي'
                          : 'مجاني'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
