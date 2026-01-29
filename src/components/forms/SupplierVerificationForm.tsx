import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Loader2, Shield, Search, Building, FileWarning, CheckCircle } from 'lucide-react';

const verificationSchema = z.object({
  companyName: z.string().min(2, 'اسم الشركة مطلوب').max(200),
  companyNameChinese: z.string().optional(),
  website: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
  registrationNumber: z.string().optional(),
  additionalInfo: z.string().max(1000).optional(),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface SupplierVerificationFormProps {
  onSuccess?: () => void;
}

const verificationServices = [
  {
    icon: Building,
    title: 'معلومات الشركة',
    description: 'اسم الشركة الرسمي والمالك الفعلي',
  },
  {
    icon: Shield,
    title: 'السجل القانوني',
    description: 'فحص المشاكل القانونية والقضايا السابقة',
  },
  {
    icon: FileWarning,
    title: 'سمعة المورد',
    description: 'تقييمات من مصادر موثوقة ومستقلة',
  },
  {
    icon: CheckCircle,
    title: 'التراخيص والشهادات',
    description: 'التحقق من صلاحية التراخيص والشهادات',
  },
];

const SupplierVerificationForm = ({ onSuccess }: SupplierVerificationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VerificationFormData>({
    companyName: '',
    companyNameChinese: '',
    website: '',
    registrationNumber: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'يجب تسجيل الدخول',
        description: 'سجل دخولك لطلب خدمة التحقق',
        variant: 'destructive',
      });
      return;
    }

    try {
      verificationSchema.parse(formData);
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
          type: 'inspection', // Using inspection type for verification
          status: 'pending',
          cost: 99, // Base verification cost
          details: {
            service_type: 'supplier_verification',
            company_name: formData.companyName,
            company_name_chinese: formData.companyNameChinese,
            website: formData.website,
            registration_number: formData.registrationNumber,
            additional_info: formData.additionalInfo,
          },
        });

      if (error) throw error;

      toast({
        title: 'تم إرسال طلبك',
        description: 'سنقوم بالتحقق من المورد وإرسال التقرير خلال 3-5 أيام عمل',
      });

      setFormData({
        companyName: '',
        companyNameChinese: '',
        website: '',
        registrationNumber: '',
        additionalInfo: '',
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

  return (
    <div className="space-y-8">
      {/* Service Features */}
      <div className="grid sm:grid-cols-2 gap-4">
        {verificationServices.map((service, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{service.title}</p>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">اسم الشركة (بالعربية أو الإنجليزية) *</Label>
            <Input
              id="companyName"
              placeholder="مثال: Shenzhen Electronics Co."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
            {errors.companyName && <p className="text-destructive text-xs">{errors.companyName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyNameChinese">اسم الشركة بالصينية (اختياري)</Label>
            <Input
              id="companyNameChinese"
              placeholder="مثال: 深圳电子有限公司"
              value={formData.companyNameChinese}
              onChange={(e) => setFormData({ ...formData, companyNameChinese: e.target.value })}
            />
          </div>
        </div>

        {/* Website & Registration */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">موقع الشركة</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            {errors.website && <p className="text-destructive text-xs">{errors.website}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">رقم السجل التجاري (اختياري)</Label>
            <Input
              id="registrationNumber"
              placeholder="إن كان متوفراً"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">معلومات إضافية</Label>
          <Textarea
            id="additionalInfo"
            placeholder="أي معلومات إضافية عن المورد أو نقاط تريد التحقق منها..."
            rows={4}
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
        </div>

        {/* Pricing Info */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">تكلفة خدمة التحقق</p>
              <p className="text-sm text-muted-foreground">تقرير شامل خلال 3-5 أيام عمل</p>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-primary">$99</p>
              <p className="text-xs text-muted-foreground">لكل مورد</p>
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading || !user}>
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
              جارِ الإرسال...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 ml-2" />
              طلب التحقق من المورد
            </>
          )}
        </Button>

        {!user && (
          <p className="text-center text-sm text-muted-foreground">
            يجب <a href="/auth" className="text-primary hover:underline">تسجيل الدخول</a> لطلب الخدمة
          </p>
        )}
      </form>
    </div>
  );
};

export default SupplierVerificationForm;
