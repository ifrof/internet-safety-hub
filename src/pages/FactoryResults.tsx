import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  Download,
  FileText,
  MapPin,
  Globe,
  CheckCircle2,
  XCircle,
  Info,
  ChevronLeft
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Evidence {
  type: string;
  claim: string;
  sourceUrl: string;
}

interface FactoryResult {
  id: string;
  name: string;
  name_zh?: string;
  location?: string;
  website?: string;
  links: string[];
  score: number;
  why_factory: string[];
  evidence: Evidence[];
  red_flags: string[];
  verification_steps: string[];
}

interface NormalizedProduct {
  productTitle_ar?: string;
  productTitle_en?: string;
  productTitle_zh?: string;
  keywords_en?: string[];
  keywords_zh?: string[];
  category?: string;
}

interface SearchData {
  id: string;
  search_type: string;
  input_value: string;
  normalized_product: NormalizedProduct | null;
  status: string;
  created_at: string;
}

const FactoryResults = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [factories, setFactories] = useState<FactoryResult[]>([]);
  const [sortBy, setSortBy] = useState('score');
  const [selectedFactory, setSelectedFactory] = useState<FactoryResult | null>(null);

  useEffect(() => {
    if (id) {
      fetchResults();
    }
  }, [id]);

  const fetchResults = async () => {
    try {
      // Fetch search data
      const { data: search, error: searchError } = await supabase
        .from('factory_searches')
        .select('*')
        .eq('id', id)
        .single();

      if (searchError) throw searchError;
      
      // Parse normalized_product from Json type
      const parsedSearch: SearchData = {
        id: search.id,
        search_type: search.search_type,
        input_value: search.input_value,
        normalized_product: search.normalized_product as NormalizedProduct | null,
        status: search.status,
        created_at: search.created_at
      };
      setSearchData(parsedSearch);

      // Fetch factory results
      const { data: results, error: resultsError } = await supabase
        .from('factory_results')
        .select('*')
        .eq('search_id', id)
        .eq('is_excluded', false)
        .order('score', { ascending: false });

      if (resultsError) throw resultsError;
      
      // Parse evidence JSON
      const parsedResults = results?.map(r => ({
        ...r,
        evidence: typeof r.evidence === 'string' ? JSON.parse(r.evidence) : r.evidence || []
      })) || [];
      
      setFactories(parsedResults);

    } catch (error: any) {
      console.error('Error fetching results:', error);
      toast({
        title: 'خطأ في تحميل النتائج',
        description: error.message || 'حدث خطأ غير متوقع',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sortedFactories = [...factories].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'موثوق جداً';
    if (score >= 60) return 'موثوق';
    if (score >= 40) return 'متوسط';
    return 'يحتاج تحقق';
  };

  const exportToCSV = () => {
    const headers = ['اسم المصنع', 'الموقع', 'الموقع الإلكتروني', 'درجة الثقة', 'أسباب التصنيف'];
    const rows = factories.map(f => [
      f.name,
      f.location || '',
      f.website || '',
      f.score.toString(),
      f.why_factory.join(' | ')
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `factory-results-${id}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'تم التصدير بنجاح',
      description: 'تم تحميل ملف CSV بنجاح'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!searchData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center py-16">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h1 className="text-2xl font-bold mb-2">لم يتم العثور على النتائج</h1>
            <p className="text-muted-foreground mb-6">
              قد تكون النتائج منتهية الصلاحية أو غير موجودة
            </p>
            <Button asChild>
              <Link to="/factory-search">
                <ArrowLeft className="w-4 h-4 ml-2" />
                بحث جديد
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link 
              to="/factory-search" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              بحث جديد
            </Link>
            <h1 className="text-3xl font-bold mb-2">نتائج البحث</h1>
          </div>

          {/* Product Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                ملخص المنتج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">المنتج المستنتج</p>
                  <p className="font-medium">
                    {searchData.normalized_product?.productTitle_ar || searchData.input_value}
                  </p>
                </div>
                {searchData.normalized_product?.productTitle_en && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">English</p>
                    <p className="font-medium text-left" dir="ltr">
                      {searchData.normalized_product.productTitle_en}
                    </p>
                  </div>
                )}
                {searchData.normalized_product?.productTitle_zh && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">中文</p>
                    <p className="font-medium text-left" dir="ltr">
                      {searchData.normalized_product.productTitle_zh}
                    </p>
                  </div>
                )}
                {searchData.normalized_product?.keywords_en && searchData.normalized_product.keywords_en.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">كلمات مفتاحية</p>
                    <div className="flex flex-wrap gap-2">
                      {searchData.normalized_product.keywords_en.slice(0, 6).map((kw, i) => (
                        <Badge key={i} variant="secondary">{kw}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {factories.length} مصنع مقبول
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">درجة الثقة</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                تصدير CSV
              </Button>
            </div>
          </div>

          {/* Results */}
          {factories.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Info className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground mb-4">
                  لم نتمكن من العثور على مصانع مباشرة تطابق معايير البحث
                </p>
                <Button asChild>
                  <Link to="/factory-search">جرب بحثاً آخر</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedFactories.map((factory) => (
                <Card key={factory.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Score Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-xl ${getScoreColor(factory.score)} flex flex-col items-center justify-center text-white`}>
                          <span className="text-2xl font-bold">{factory.score}</span>
                          <span className="text-xs">%</span>
                        </div>
                        <p className="text-xs text-center mt-1 text-muted-foreground">
                          {getScoreLabel(factory.score)}
                        </p>
                      </div>

                      {/* Factory Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{factory.name}</h3>
                            {factory.name_zh && (
                              <p className="text-sm text-muted-foreground" dir="ltr">
                                {factory.name_zh}
                              </p>
                            )}
                          </div>
                          <Badge variant="default" className="bg-green-600 flex-shrink-0">
                            <ShieldCheck className="w-3 h-3 ml-1" />
                            مصنع مرجّح
                          </Badge>
                        </div>

                        {factory.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4" />
                            {factory.location}
                          </div>
                        )}

                        {/* Why Factory */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">لماذا مصنع؟</p>
                          <div className="flex flex-wrap gap-2">
                            {factory.why_factory.slice(0, 4).map((reason, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                <CheckCircle2 className="w-3 h-3 ml-1 text-green-600" />
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Red Flags */}
                        {factory.red_flags && factory.red_flags.length > 0 && (
                          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              أعلام خطر
                            </p>
                            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                              {factory.red_flags.map((flag, i) => (
                                <li key={i}>• {flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Links & Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                          {factory.website && (
                            <a
                              href={factory.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <Globe className="w-4 h-4" />
                              الموقع الرسمي
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {factory.links?.slice(0, 2).map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                            >
                              <ExternalLink className="w-3 h-3" />
                              رابط {i + 1}
                            </a>
                          ))}
                          
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedFactory(factory)}
                              >
                                عرض الأدلة
                                <ChevronLeft className="w-4 h-4 mr-1" />
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <DrawerHeader>
                                <DrawerTitle>أدلة المصنع: {factory.name}</DrawerTitle>
                                <DrawerDescription>
                                  الأدلة والمصادر التي تثبت أن هذه الجهة مصنع مباشر
                                </DrawerDescription>
                              </DrawerHeader>
                              <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-4">
                                  {factory.evidence && factory.evidence.length > 0 ? (
                                    factory.evidence.map((ev, i) => (
                                      <div 
                                        key={i} 
                                        className="p-4 border rounded-lg bg-muted/30"
                                      >
                                        <div className="flex items-start gap-3">
                                          <Badge variant="outline">{ev.type}</Badge>
                                          <div className="flex-grow">
                                            <p className="text-sm mb-2">{ev.claim}</p>
                                            {ev.sourceUrl && (
                                              <a
                                                href={ev.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                              >
                                                <ExternalLink className="w-3 h-3" />
                                                عرض المصدر
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-center text-muted-foreground py-4">
                                      لا توجد أدلة مفصلة متاحة
                                    </p>
                                  )}
                                </div>

                                {/* Verification Steps */}
                                {factory.verification_steps && factory.verification_steps.length > 0 && (
                                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                                      كيف تتحقق قبل الدفع؟
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700 dark:text-blue-300">
                                      {factory.verification_steps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                      ))}
                                    </ol>
                                  </div>
                                )}
                              </div>
                              <DrawerFooter>
                                <DrawerClose asChild>
                                  <Button variant="outline">إغلاق</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                  تنبيه مهم
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  النتائج استرشادية ومبنية على البيانات المتاحة على الإنترنت. 
                  يُنصح بشدة بالتحقق المباشر من المصنع (زيارة/مكالمة فيديو/فحص طرف ثالث) قبل إتمام أي عملية دفع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FactoryResults;
