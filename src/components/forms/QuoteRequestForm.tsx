import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Loader2, Send, Package, Ship, FileCheck } from 'lucide-react';

const quoteSchema = z.object({
  type: z.enum(['shipping', 'import', 'both']),
  productName: z.string().min(2, 'اسم المنتج مطلوب').max(200),
  quantity: z.string().min(1, 'الكمية مطلوبة'),
  origin: z.string().min(2, 'بلد المنشأ مطلوب'),
  destination: z.string().min(2, 'بلد الوصول مطلوب'),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  details: z.string().max(1000).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteRequestFormProps {
  onSuccess?: () => void;
  defaultType?: 'shipping' | 'import' | 'both';
}

const QuoteRequestForm = ({ onSuccess, defaultType = 'import' }: QuoteRequestFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    type: defaultType,
    productName: '',
    quantity: '',
    origin: 'الصين',
    destination: '',
    weight: '',
    dimensions: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'يجب تسجيل الدخول',
        description: 'سجل دخولك لإرسال طلب عرض السعر',
        variant: 'destructive',
      });
      return;
    }

    try {
      quoteSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('service_requests')
        .insert({
          user_id: user.id,
          type: formData.type === 'shipping' ? 'shipping' : 'other',
          status: 'pending',
          details: {
            quote_type: formData.type,
            product_name: formData.productName,
            quantity: formData.quantity,
            origin: formData.origin,
            destination: formData.destination,
            weight: formData.weight,
            dimensions: formData.dimensions,
            additional_details: formData.details,
          },
        });

      if (error) throw error;

      toast({
        title: 'تم إرسال طلبك',
        description: 'سنتواصل معك عبر المنصة بعرض السعر خلال 24-48 ساعة',
      });

      setFormData({
        type: defaultType,
        productName: '',
        quantity: '',
        origin: 'الصين',
        destination: '',
        weight: '',
        dimensions: '',
        details: '',
      });

      onSuccess?.();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل إرسال الطلب، حاول مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: 'import', label: 'استيراد منتج', icon: Package },
    { value: 'shipping', label: 'شحن فقط', icon: Ship },
    { value: 'both', label: 'استيراد + شحن', icon: FileCheck },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type Selection */}
      <div className="space-y-2">
        <Label>نوع الطلب</Label>
        <div className="grid grid-cols-3 gap-3">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, type: option.value as QuoteFormData['type'] })}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formData.type === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                formData.type === option.value ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productName">اسم المنتج *</Label>
          <Input
            id="productName"
            placeholder="مثال: أجهزة إلكترونية"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
          />
          {errors.productName && <p className="text-destructive text-xs">{errors.productName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">الكمية *</Label>
          <Input
            id="quantity"
            placeholder="مثال: 1000 قطعة"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
          {errors.quantity && <p className="text-destructive text-xs">{errors.quantity}</p>}
        </div>
      </div>

      {/* Location Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="origin">بلد المنشأ *</Label>
          <Select
            value={formData.origin}
            onValueChange={(value) => setFormData({ ...formData, origin: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر البلد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الصين">الصين</SelectItem>
              <SelectItem value="تايوان">تايوان</SelectItem>
              <SelectItem value="هونغ كونغ">هونغ كونغ</SelectItem>
            </SelectContent>
          </Select>
          {errors.origin && <p className="text-destructive text-xs">{errors.origin}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">بلد الوصول *</Label>
          <Select
            value={formData.destination}
            onValueChange={(value) => setFormData({ ...formData, destination: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر البلد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="السعودية">السعودية</SelectItem>
              <SelectItem value="الإمارات">الإمارات</SelectItem>
              <SelectItem value="الكويت">الكويت</SelectItem>
              <SelectItem value="البحرين">البحرين</SelectItem>
              <SelectItem value="قطر">قطر</SelectItem>
              <SelectItem value="عمان">عُمان</SelectItem>
              <SelectItem value="مصر">مصر</SelectItem>
              <SelectItem value="الأردن">الأردن</SelectItem>
              <SelectItem value="أخرى">أخرى</SelectItem>
            </SelectContent>
          </Select>
          {errors.destination && <p className="text-destructive text-xs">{errors.destination}</p>}
        </div>
      </div>

      {/* Shipping Details (for shipping requests) */}
      {(formData.type === 'shipping' || formData.type === 'both') && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">الوزن التقريبي</Label>
            <Input
              id="weight"
              placeholder="مثال: 500 كجم"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">الأبعاد التقريبية</Label>
            <Input
              id="dimensions"
              placeholder="مثال: 100x50x30 سم"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Additional Details */}
      <div className="space-y-2">
        <Label htmlFor="details">تفاصيل إضافية</Label>
        <Textarea
          id="details"
          placeholder="أي تفاصيل أخرى تريد إضافتها..."
          rows={4}
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading || !user}>
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
            جارِ الإرسال...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 ml-2" />
            إرسال طلب عرض السعر
          </>
        )}
      </Button>

      {!user && (
        <p className="text-center text-sm text-muted-foreground">
          يجب <a href="/auth" className="text-primary hover:underline">تسجيل الدخول</a> لإرسال طلب
        </p>
      )}
    </form>
  );
};

export default QuoteRequestForm;
