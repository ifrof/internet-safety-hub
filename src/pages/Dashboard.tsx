import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Package, FileText, MessageSquare, Settings,
  CreditCard, Bell, Search, User, ChevronLeft, Menu, X, 
  Factory, TrendingUp, Clock
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/dashboard/orders', icon: Package, label: 'طلباتي' },
    { href: '/dashboard/documents', icon: FileText, label: 'المستندات' },
    { href: '/dashboard/messages', icon: MessageSquare, label: 'الرسائل', badge: 3 },
    { href: '/dashboard/subscription', icon: CreditCard, label: 'الاشتراك' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
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
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
              IF
            </div>
            <div>
              <h1 className="font-bold">IFROF</h1>
              <p className="text-xs text-muted-foreground">لوحة التحكم</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="mr-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">أحمد محمد</p>
              <p className="text-xs text-muted-foreground">الباقة المتميزة</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:mr-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث..."
                  className="w-full pl-4 pr-10 py-2 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <Link to="/marketplace">
                <Button variant="hero" size="sm">
                  تصفح المصانع
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">مرحباً، أحمد 👋</h1>
            <p className="text-muted-foreground">إليك ملخص نشاطك على المنصة</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-2xl border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold">آخر الطلبات</h2>
              <Link to="/dashboard/orders">
                <Button variant="ghost" size="sm">
                  عرض الكل
                  <ChevronLeft className="w-4 h-4 mr-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-6 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{order.product}</p>
                    <p className="text-sm text-muted-foreground truncate">{order.factory}</p>
                  </div>
                  <div className="text-left">
                    <Badge variant={
                      order.status === 'تم الشحن' ? 'default' :
                      order.status === 'قيد التصنيع' ? 'secondary' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Link to="/ai-search" className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors group">
              <Search className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">البحث الذكي</h3>
              <p className="text-sm text-muted-foreground">ابحث عن مصانع بالذكاء الاصطناعي</p>
            </Link>
            <Link to="/services" className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors group">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">طلب خدمة</h3>
              <p className="text-sm text-muted-foreground">تفتيش، شحن، تحويل أموال</p>
            </Link>
            <Link to="/ai-chat" className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors group">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">المساعد الذكي</h3>
              <p className="text-sm text-muted-foreground">تحدث معنا للمساعدة</p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
