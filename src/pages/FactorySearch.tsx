import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  Link as LinkIcon, 
  Package, 
  Hash, 
  Search, 
  ArrowLeft, 
  X, 
  ImageIcon,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const FactorySearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [activeTab, setActiveTab] = useState('image');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  
  // Input states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [hsCode, setHsCode] = useState('');
  
  // Optional fields
  const [quantity, setQuantity] = useState('');
  const [oemOdm, setOemOdm] = useState('');
  const [material, setMaterial] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [certifications, setCertifications] = useState<string[]>([]);

  const certOptions = [
    { id: 'iso9001', label: 'ISO 9001' },
    { id: 'iso14001', label: 'ISO 14001' },
    { id: 'ce', label: 'CE' },
    { id: 'fda', label: 'FDA' },
    { id: 'rohs', label: 'RoHS' },
    { id: 'reach', label: 'REACH' },
    { id: 'bsci', label: 'BSCI' },
    { id: 'sedex', label: 'SEDEX' }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const toggleCertification = (certId: string) => {
    setCertifications(prev => 
      prev.includes(certId) 
        ? prev.filter(c => c !== certId)
        : [...prev, certId]
    );
  };

  const loadingSteps = [
    'جمع معلومات المنتج...',
    'بحث شبكي عن المصانع...',
    'تدقيق وفلترة المصانع...',
    'تجهيز النتائج...'
  ];

  const handleSearch = async () => {
    // Validate that at least one input is provided
    const hasInput = 
      (activeTab === 'image' && imageFile) ||
      (activeTab === 'url' && productUrl.trim()) ||
      (activeTab === 'name' && productName.trim()) ||
      (activeTab === 'hsCode' && hsCode.trim());

    if (!hasInput) {
      toast({
        title: 'خطأ في الإدخال',
        description: 'يرجى إدخال صورة أو رابط أو اسم المنتج أو HS CODE',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate loading steps for UX
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(loadingSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Prepare request body
      let requestBody: any = {
        optional: {}
      };

      if (activeTab === 'image' && imageFile) {
        // Convert image to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Remove data:image/...;base64, prefix
          };
          reader.readAsDataURL(imageFile);
        });
        requestBody.imageBase64 = base64;
      } else if (activeTab === 'url') {
        requestBody.productUrl = productUrl.trim();
      } else if (activeTab === 'name') {
        requestBody.productName = productName.trim();
      } else if (activeTab === 'hsCode') {
        requestBody.hsCode = hsCode.trim();
      }

      // Add optional fields
      if (quantity) requestBody.optional.qty = parseInt(quantity);
      if (oemOdm) requestBody.optional.oemOdm = oemOdm;
      if (material) requestBody.optional.material = material;
      if (shipTo) requestBody.optional.shipTo = shipTo;
      if (certifications.length > 0) requestBody.optional.certs = certifications;

      // Call edge function
      const { data, error } = await supabase.functions.invoke('factory-search', {
        body: requestBody
      });

      if (error) {
        throw new Error(error.message || 'حدث خطأ أثناء البحث');
      }

      if (data?.searchId) {
        navigate(`/factory-results/${data.searchId}`);
      } else {
        throw new Error('لم يتم العثور على نتائج');
      }

    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: 'خطأ في البحث',
        description: error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <Link 
            to="/direct-factory" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">بحث متقدم عن مصانع</h1>
          <p className="text-muted-foreground text-lg">
            أدخل طريقة واحدة فقط للبحث عن مصانع مباشرة لمنتجك
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>طريقة البحث</CardTitle>
            <CardDescription>اختر طريقة واحدة فقط لإدخال معلومات المنتج</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">صورة</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">رابط</span>
                </TabsTrigger>
                <TabsTrigger value="name" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">اسم</span>
                </TabsTrigger>
                <TabsTrigger value="hsCode" className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  <span className="hidden sm:inline">HS</span>
                </TabsTrigger>
              </TabsList>

              {/* Image Upload Tab */}
              <TabsContent value="image">
                <div className="space-y-4">
                  <Label>صورة المنتج</Label>
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="w-full max-h-64 object-contain rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 left-2"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted-foreground/25 hover:border-primary/50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        {isDragActive 
                          ? 'أفلت الصورة هنا...'
                          : 'اسحب وأفلت صورة المنتج هنا'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        أو انقر لاختيار صورة (PNG, JPG, WEBP - حد أقصى 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* URL Tab */}
              <TabsContent value="url">
                <div className="space-y-4">
                  <Label htmlFor="productUrl">رابط المنتج</Label>
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://www.alibaba.com/product/..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="text-left"
                    dir="ltr"
                  />
                  <p className="text-sm text-muted-foreground">
                    ألصق رابط المنتج من Alibaba أو Made-in-China أو 1688 أو أي موقع آخر
                  </p>
                </div>
              </TabsContent>

              {/* Name Tab */}
              <TabsContent value="name">
                <div className="space-y-4">
                  <Label htmlFor="productName">اسم المنتج</Label>
                  <Input
                    id="productName"
                    type="text"
                    placeholder="مثال: علب تغليف كرتون مموج للشحن"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    اكتب اسم المنتج بالعربية أو الإنجليزية أو الصينية
                  </p>
                </div>
              </TabsContent>

              {/* HS Code Tab */}
              <TabsContent value="hsCode">
                <div className="space-y-4">
                  <Label htmlFor="hsCode">كود HS (التعريفة الجمركية)</Label>
                  <Input
                    id="hsCode"
                    type="text"
                    placeholder="مثال: 4819.10"
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    className="text-left"
                    dir="ltr"
                  />
                  <p className="text-sm text-muted-foreground">
                    أدخل كود HS الدولي للمنتج (4-10 أرقام)
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Optional Fields Toggle */}
            <div className="mt-8 border-t pt-6">
              <button
                type="button"
                onClick={() => setShowOptional(!showOptional)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showOptional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>خيارات إضافية (اختياري)</span>
              </button>

              {showOptional && (
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">الكمية المطلوبة</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="مثال: 1000"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="oemOdm">نوع التصنيع</Label>
                    <Select value={oemOdm} onValueChange={setOemOdm}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع التصنيع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OEM">OEM (تصنيع بعلامتك)</SelectItem>
                        <SelectItem value="ODM">ODM (تصميم وتصنيع)</SelectItem>
                        <SelectItem value="Both">كلاهما</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material">المادة الخام</Label>
                    <Input
                      id="material"
                      type="text"
                      placeholder="مثال: بلاستيك ABS"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipTo">بلد الشحن</Label>
                    <Input
                      id="shipTo"
                      type="text"
                      placeholder="مثال: السعودية"
                      value={shipTo}
                      onChange={(e) => setShipTo(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label>الشهادات المطلوبة</Label>
                    <div className="flex flex-wrap gap-3">
                      {certOptions.map((cert) => (
                        <label
                          key={cert.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={certifications.includes(cert.id)}
                            onCheckedChange={() => toggleCertification(cert.id)}
                          />
                          <span className="text-sm">{cert.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="mt-8">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                size="lg"
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {loadingStep || 'جارِ البحث...'}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    ابحث عن مصانع
                  </>
                )}
              </Button>
            </div>

            {/* Loading Progress */}
            {isLoading && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-medium">{loadingStep}</span>
                </div>
                <div className="space-y-2">
                  {loadingSteps.map((step, index) => {
                    const currentIndex = loadingSteps.indexOf(loadingStep);
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-2 text-sm ${
                          isCompleted ? 'text-green-600' : 
                          isCurrent ? 'text-primary font-medium' : 
                          'text-muted-foreground'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          isCompleted ? 'bg-green-600' : 
                          isCurrent ? 'bg-primary animate-pulse' : 
                          'bg-muted-foreground/30'
                        }`} />
                        {step}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default FactorySearch;
