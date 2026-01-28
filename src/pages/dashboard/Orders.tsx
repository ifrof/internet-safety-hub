import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Package, Plus, Search, Filter, Clock, CheckCircle, 
  Truck, AlertCircle, Eye, ChevronLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Order {
  id: string;
  product_name: string;
  quantity: number;
  status: string;
  estimated_price: number | null;
  final_price: number | null;
  created_at: string;
  factory_id: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'في انتظار الموافقة', color: 'bg-yellow-500/10 text-yellow-600', icon: Clock },
  confirmed: { label: 'تم التأكيد', color: 'bg-blue-500/10 text-blue-600', icon: CheckCircle },
  in_production: { label: 'قيد التصنيع', color: 'bg-purple-500/10 text-purple-600', icon: Package },
  shipped: { label: 'تم الشحن', color: 'bg-cyan-500/10 text-cyan-600', icon: Truck },
  delivered: { label: 'تم التسليم', color: 'bg-green-500/10 text-green-600', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'bg-red-500/10 text-red-600', icon: AlertCircle },
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('import_orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
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
            <h1 className="text-2xl font-bold">طلباتي</h1>
            <p className="text-muted-foreground">إدارة ومتابعة جميع طلبات الاستيراد</p>
          </div>
          <Link to="/marketplace">
            <Button variant="hero">
              <Plus className="w-4 h-4 ml-2" />
              طلب جديد
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن طلب..."
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

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {orders.length === 0 ? 'لا توجد طلبات بعد' : 'لا توجد نتائج'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {orders.length === 0 
                ? 'ابدأ رحلة الاستيراد بتصفح المصانع وطلب منتجاتك'
                : 'جرب تعديل معايير البحث'}
            </p>
            {orders.length === 0 && (
              <Link to="/marketplace">
                <Button variant="hero">
                  تصفح المصانع
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={order.id}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold truncate">{order.product_name}</h3>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 ml-1" />
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>الكمية: {order.quantity}</span>
                        {order.estimated_price && (
                          <span>السعر التقديري: ${order.estimated_price}</span>
                        )}
                        {order.final_price && (
                          <span className="text-primary font-semibold">
                            السعر النهائي: ${order.final_price}
                          </span>
                        )}
                        <span>
                          {new Date(order.created_at).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 ml-1" />
                      التفاصيل
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
