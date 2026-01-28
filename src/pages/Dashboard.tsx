import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Package, FileText, MessageSquare, Settings,
  CreditCard, Bell, Search, User, ChevronLeft, Menu, X, 
  Factory, TrendingUp, Clock, LogOut, Loader2, Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { isAdmin } = useUserRole();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/dashboard/orders', icon: Package, label: 'طلباتي' },
    { href: '/dashboard/documents', icon: FileText, label: 'المستندات' },
    { href: '/messages', icon: MessageSquare, label: 'الرسائل', badge: 3 },
    { href: '/dashboard/subscription', icon: CreditCard, label: 'الاشتراك' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
    ...(isAdmin ? [{ href: '/admin', icon: Shield, label: 'الإدارة' }] : []),
  ];

  const stats = [
    { label: 'الطلبات النشطة', value: '3', icon: Package, color: 'text-blue-500' },
    { label: 'المصانع المتصلة', value: '12', icon: Factory, color: 'text-green-500' },
    { label: 'في انتظار الرد', value: '5', icon: Clock, color: 'text-yellow-500' },
    { label: 'نسبة التوفير', value: '28%', icon: TrendingUp, color: 'text-primary' },
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'سماعات بلوتوث TWS', factory: 'مصنع قوانغتشو للإلكترونيات', status: 'قيد التصنيع', date: '2024-01-15' },
    { id: 'ORD-002', product: 'تي شيرت قطن', factory: 'مصنع شينزن للملابس', status: 'في انتظار الدفع', date: '2024-01-12' },
    { id: 'ORD-003', product: 'أواني طهي', factory: 'مصنع ييوو للمستلزمات', status: 'تم الشحن', date: '2024-01-10' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'مستخدم';

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm md:text-base">
              IF
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base">IFROF</h1>
              <p className="text-xs text-muted-foreground">لوحة التحكم</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-3 md:p-4">
          <ul className="space-y-1.5 md:space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-colors text-sm md:text-base ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="mr-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-sm md:text-base">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs md:text-sm"
            onClick={handleSignOut}
          >
            <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:mr-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-3 md:px-4 lg:px-8 h-14 md:h-16">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="flex-1 max-w-md mx-2 md:mx-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث..."
                  className="w-full pl-4 pr-9 md:pr-10 py-1.5 md:py-2 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary text-sm md:text-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button className="relative p-1.5 md:p-2 rounded-lg hover:bg-muted">
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full" />
              </button>
              <Link to="/marketplace">
                <Button variant="hero" size="sm" className="text-xs md:text-sm hidden sm:flex">
                  تصفح المصانع
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-3 md:p-4 lg:p-8">
          {/* Welcome */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">مرحباً، {userName} 👋</h1>
            <p className="text-muted-foreground text-sm md:text-base">إليك ملخص نشاطك على المنصة</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                </div>
                <p className="text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-xl md:rounded-2xl border border-border">
            <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-base md:text-lg font-bold">آخر الطلبات</h2>
              <Link to="/dashboard/orders">
                <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                  عرض الكل
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-sm md:text-base">{order.product}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{order.factory}</p>
                  </div>
                  <div className="text-left hidden sm:block">
                    <Badge variant={
                      order.status === 'تم الشحن' ? 'default' :
                      order.status === 'قيد التصنيع' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
            <Link to="/marketplace" className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border hover:border-primary transition-colors group">
              <Search className="w-6 h-6 md:w-8 md:h-8 text-primary mb-3 md:mb-4" />
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">البحث المتقدم</h3>
              <p className="text-xs md:text-sm text-muted-foreground">ابحث عن مصانع موثقة</p>
            </Link>
            <Link to="/services" className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border hover:border-primary transition-colors group">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary mb-3 md:mb-4" />
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">طلب خدمة</h3>
              <p className="text-xs md:text-sm text-muted-foreground">تفتيش، شحن، تحويل أموال</p>
            </Link>
            <Link to="/services" className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border hover:border-primary transition-colors group">
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary mb-3 md:mb-4" />
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">الدعم الفني</h3>
              <p className="text-xs md:text-sm text-muted-foreground">تواصل معنا للمساعدة</p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
