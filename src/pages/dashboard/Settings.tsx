import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, Mail, Phone, Building, MapPin, Globe,
  Bell, Lock, Loader2, Save, AlertTriangle
} from 'lucide-react';

interface Profile {
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  preferred_language: string | null;
}

const Settings = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    company_name: '',
    phone: '',
    city: '',
    country: 'SA',
    preferred_language: 'ar'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    messages: true,
    marketing: false
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, company_name, phone, city, country, preferred_language')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) {
          setProfile({
            full_name: data.full_name || '',
            company_name: data.company_name || '',
            phone: data.phone || '',
            city: data.city || '',
            country: data.country || 'SA',
            preferred_language: data.preferred_language || 'ar'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: 'تم الحفظ',
        description: 'تم تحديث بياناتك بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حفظ البيانات',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
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
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
        </div>

        {/* Profile Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            المعلومات الشخصية
          </h2>
          
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    value={profile.full_name || ''}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="pr-10"
                    placeholder="أحمد محمد"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">اسم الشركة</Label>
                <div className="relative">
                  <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    value={profile.company_name || ''}
                    onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                    className="pr-10"
                    placeholder="شركة التجارة العربية"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="pr-10 bg-muted"
                />
              </div>
              <p className="text-xs text-muted-foreground">لا يمكن تغيير البريد الإلكتروني</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="pr-10"
                    placeholder="+966 50 123 4567"
                    dir="ltr"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">المدينة</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="city"
                    value={profile.city || ''}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="pr-10"
                    placeholder="الرياض"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">البلد</Label>
                <Select 
                  value={profile.country || 'SA'} 
                  onValueChange={(value) => setProfile({ ...profile, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SA">🇸🇦 السعودية</SelectItem>
                    <SelectItem value="AE">🇦🇪 الإمارات</SelectItem>
                    <SelectItem value="EG">🇪🇬 مصر</SelectItem>
                    <SelectItem value="KW">🇰🇼 الكويت</SelectItem>
                    <SelectItem value="QA">🇶🇦 قطر</SelectItem>
                    <SelectItem value="BH">🇧🇭 البحرين</SelectItem>
                    <SelectItem value="OM">🇴🇲 عمان</SelectItem>
                    <SelectItem value="JO">🇯🇴 الأردن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">اللغة المفضلة</Label>
                <Select 
                  value={profile.preferred_language || 'ar'} 
                  onValueChange={(value) => setProfile({ ...profile, preferred_language: value })}
                >
                  <SelectTrigger>
                    <Globe className="w-4 h-4 ml-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            الإشعارات
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-muted-foreground">استلام الإشعارات عبر البريد</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">تحديثات الطلبات</p>
                <p className="text-sm text-muted-foreground">إشعارات عند تغيير حالة الطلب</p>
              </div>
              <Switch
                checked={notifications.orders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, orders: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">الرسائل الجديدة</p>
                <p className="text-sm text-muted-foreground">إشعارات عند استلام رسائل</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">العروض والتسويق</p>
                <p className="text-sm text-muted-foreground">استلام العروض الترويجية</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            الأمان
          </h2>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="w-4 h-4 ml-2" />
              تغيير كلمة المرور
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSignOut}>
            تسجيل الخروج
          </Button>
          
          <Button variant="hero" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            منطقة الخطر
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            هذه الإجراءات لا يمكن التراجع عنها. يرجى التأكد قبل المتابعة.
          </p>
          <Button variant="outline" className="border-red-500/50 text-red-600 hover:bg-red-500/10">
            حذف الحساب نهائياً
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
