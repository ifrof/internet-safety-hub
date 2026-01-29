import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  FileText, Search, Plus, Clock, CheckCircle, 
  AlertCircle, Eye, Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceRequest {
  id: string;
  type: string;
  status: string;
  cost: number | null;
  created_at: string;
  details: Record<string, any>;
}

const serviceTypes: Record<string, { label: string; icon: string; color: string }> = {
  inspection: { label: 'فحص الجودة', icon: '🔍', color: 'bg-blue-500/10 text-blue-600' },
  shipping: { label: 'شحن دولي', icon: '🚢', color: 'bg-green-500/10 text-green-600' },
  customs: { label: 'تخليص جمركي', icon: '📋', color: 'bg-purple-500/10 text-purple-600' },
  other: { label: 'أخرى', icon: '📦', color: 'bg-gray-500/10 text-gray-600' },
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'في انتظار الموافقة', color: 'bg-yellow-500/10 text-yellow-600', icon: Clock },
  in_progress: { label: 'قيد التنفيذ', color: 'bg-blue-500/10 text-blue-600', icon: Clock },
  completed: { label: 'مكتمل', color: 'bg-green-500/10 text-green-600', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'bg-red-500/10 text-red-600', icon: AlertCircle },
};

const ServicesTab = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('service_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

  const filteredRequests = requests.filter(req => {
    const serviceType = serviceTypes[req.type] || serviceTypes.other;
    const matchesSearch = serviceType.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">طلبات الخدمات</h1>
            <p className="text-muted-foreground">إدارة ومتابعة طلبات الخدمات المختلفة</p>
          </div>
          <Link to="/services">
            <Button variant="hero">
              <Plus className="w-4 h-4 ml-2" />
              طلب خدمة جديدة
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن خدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 ml-2" />
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              {Object.entries(statusConfig).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {requests.length === 0 ? 'لا توجد طلبات خدمات بعد' : 'لا توجد نتائج'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {requests.length === 0 
                ? 'استكشف الخدمات المتاحة واطلب ما تحتاجه'
                : 'جرب تعديل معايير البحث'}
            </p>
            {requests.length === 0 && (
              <Link to="/services">
                <Button variant="hero">
                  استعرض الخدمات
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRequests.map((request) => {
              const serviceType = serviceTypes[request.type] || serviceTypes.other;
              const status = statusConfig[request.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={request.id}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${serviceType.color} flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{serviceType.icon}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{serviceType.label}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 ml-1" />
                      {status.label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    {request.cost && (
                      <span className="text-primary font-semibold">${request.cost}</span>
                    )}
                    <span>{new Date(request.created_at).toLocaleDateString('ar-SA')}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 ml-1" />
                    التفاصيل
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServicesTab;
