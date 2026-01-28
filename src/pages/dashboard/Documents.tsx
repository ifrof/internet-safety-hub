import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  FileText, Download, Search, Filter, 
  File, FileCheck, FileWarning, Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  order_id: string;
  created_at: string;
}

const documentTypes: Record<string, { label: string; icon: typeof File; color: string }> = {
  invoice: { label: 'فاتورة', icon: FileText, color: 'bg-blue-500/10 text-blue-600' },
  packing_list: { label: 'قائمة التعبئة', icon: FileCheck, color: 'bg-green-500/10 text-green-600' },
  bill_of_lading: { label: 'بوليصة الشحن', icon: File, color: 'bg-purple-500/10 text-purple-600' },
  certificate: { label: 'شهادة', icon: FileCheck, color: 'bg-yellow-500/10 text-yellow-600' },
  inspection_report: { label: 'تقرير الفحص', icon: FileWarning, color: 'bg-orange-500/10 text-orange-600' },
  other: { label: 'أخرى', icon: File, color: 'bg-gray-500/10 text-gray-600' },
};

const Documents = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;
      
      try {
        // First get user's orders
        const { data: orders } = await supabase
          .from('import_orders')
          .select('id')
          .eq('user_id', user.id);

        if (!orders || orders.length === 0) {
          setDocuments([]);
          setLoading(false);
          return;
        }

        const orderIds = orders.map(o => o.id);

        const { data, error } = await supabase
          .from('order_documents')
          .select('*')
          .in('order_id', orderIds)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
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
        <div>
          <h1 className="text-2xl font-bold">المستندات</h1>
          <p className="text-muted-foreground">جميع المستندات المتعلقة بطلباتك</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مستند..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 ml-2" />
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              {Object.entries(documentTypes).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Documents List */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {documents.length === 0 ? 'لا توجد مستندات بعد' : 'لا توجد نتائج'}
            </h2>
            <p className="text-muted-foreground">
              {documents.length === 0 
                ? 'ستظهر هنا المستندات المتعلقة بطلباتك'
                : 'جرب تعديل معايير البحث'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const docType = documentTypes[doc.type] || documentTypes.other;
              const DocIcon = docType.icon;
              
              return (
                <div
                  key={doc.id}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${docType.color} flex items-center justify-center mb-4`}>
                    <DocIcon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-semibold mb-1 truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {docType.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(doc.created_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={doc.url} download>
                        <Download className="w-4 h-4 ml-1" />
                        تحميل
                      </a>
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

export default Documents;
