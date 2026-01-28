import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockFactories } from '@/data/mockData';
import { 
  Search, Bot, Upload, Link as LinkIcon, Image, Send, 
  Sparkles, CheckCircle, Factory, ArrowLeft, Loader2
} from 'lucide-react';

const AISearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'text' | 'link' | 'image'>('text');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockFactories | null>(null);
  const [aiResponse, setAiResponse] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setAiResponse('');
    
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAiResponse(`بناءً على بحثك عن "${query}"، وجدت لك ${mockFactories.length} مصانع مباشرة موثقة يمكنها تصنيع هذا المنتج.

تم التحقق من جميع المصانع بالذكاء الاصطناعي للتأكد من:
✅ أنها مصانع مباشرة وليست وسطاء
✅ لديها القدرة الإنتاجية المطلوبة
✅ لديها الشهادات والتراخيص اللازمة

إليك أفضل المصانع المطابقة لطلبك:`);
    
    setSearchResults(mockFactories);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white mb-6">
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Agent للبحث عن المصانع</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ابحث بذكاء عن المصنع المناسب
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              استخدم الذكاء الاصطناعي للبحث عن مصانع بالنص، رابط منتج، أو صورة. نتحقق تلقائياً من أن المصنع مباشر وليس وسيط.
            </p>
          </div>

          {/* Search Type Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={searchType === 'text' ? 'hero' : 'outline'}
              onClick={() => setSearchType('text')}
              className={searchType !== 'text' ? 'border-white/30 text-white hover:bg-white/10' : ''}
            >
              <Search className="w-4 h-4 ml-2" />
              بحث بالنص
            </Button>
            <Button
              variant={searchType === 'link' ? 'hero' : 'outline'}
              onClick={() => setSearchType('link')}
              className={searchType !== 'link' ? 'border-white/30 text-white hover:bg-white/10' : ''}
            >
              <LinkIcon className="w-4 h-4 ml-2" />
              رابط منتج
            </Button>
            <Button
              variant={searchType === 'image' ? 'hero' : 'outline'}
              onClick={() => setSearchType('image')}
              className={searchType !== 'image' ? 'border-white/30 text-white hover:bg-white/10' : ''}
            >
              <Image className="w-4 h-4 ml-2" />
              صورة منتج
            </Button>
          </div>

          {/* Search Input */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-4">
              {searchType === 'text' && (
                <div className="flex flex-col gap-4">
                  <Textarea
                    placeholder="صف المنتج الذي تريد استيراده... مثال: سماعات بلوتوث لاسلكية بجودة عالية، كمية 1000 قطعة"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] text-lg"
                  />
                </div>
              )}

              {searchType === 'link' && (
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="الصق رابط المنتج من علي بابا أو أي موقع آخر..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 text-lg"
                  />
                </div>
              )}

              {searchType === 'image' && (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center border-2 border-dashed border-white/30">
                    <Upload className="w-10 h-10 text-white/50" />
                  </div>
                  <p className="text-white/70">اسحب صورة المنتج هنا أو</p>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    اختر صورة
                  </Button>
                </div>
              )}

              <Button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                variant="hero"
                size="lg"
                className="w-full mt-4"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري البحث بالذكاء الاصطناعي...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 ml-2" />
                    ابحث عن مصانع
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {(aiResponse || isSearching) && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* AI Response */}
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">محقق IFROF الذكي</h3>
                  {isSearching ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري تحليل طلبك والبحث عن المصانع المناسبة...
                    </div>
                  ) : (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {aiResponse}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results */}
            {searchResults && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((factory) => (
                  <a
                    key={factory.id}
                    href={`/factory/${factory.id}`}
                    className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={factory.coverImage}
                        alt={factory.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white gap-1">
                        <CheckCircle className="w-3 h-3" />
                        موثق {factory.verificationScore}%
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <Factory className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold group-hover:text-primary transition-colors">
                            {factory.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{factory.location}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {factory.mainProducts.join(' • ')}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          الحد الأدنى: ${factory.minOrderValue}
                        </span>
                        <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features */}
      {!searchResults && !isSearching && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">كيف يعمل البحث الذكي؟</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">تحليل الطلب</h3>
                <p className="text-muted-foreground">
                  الذكاء الاصطناعي يحلل طلبك ويفهم المنتج والمواصفات المطلوبة
                </p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">البحث في المصانع</h3>
                <p className="text-muted-foreground">
                  نبحث في قاعدة بيانات +500 مصنع موثق للعثور على الأنسب
                </p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">التحقق التلقائي</h3>
                <p className="text-muted-foreground">
                  نتحقق من كل مصنع للتأكد أنه مباشر وليس وسيط
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default AISearch;
