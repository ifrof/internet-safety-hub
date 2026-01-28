import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, Bell, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();
  const isHomePage = location.pathname === '/';
  const isLoggedIn = false; // Will be replaced with actual auth state

  const navLinks = [
    { href: '/marketplace', label: t('nav.marketplace') },
    { href: '/ai-search', label: t('nav.aiSearch') },
    { href: '/services', label: t('nav.services') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/blog', label: t('nav.blog') },
  ];

  return (
    <nav className={`${isHomePage ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-50 ${!isHomePage && 'bg-secondary shadow-lg'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg md:text-xl">
              IF
            </div>
            <div className={`hidden sm:block ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-lg md:text-xl font-bold text-white">IFROF</h1>
              <p className="text-xs text-white/70">
                {language === 'ar' ? 'استورد مباشرة من المصنع' : language === 'zh' ? '直接从工厂进口' : 'Import directly from factory'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-white/90">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`hover:text-white transition-colors text-sm ${
                  location.pathname === link.href ? 'text-primary font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button - Desktop */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">بحث</span>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher variant="light" />

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>

                {/* Messages */}
                <button className="relative p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">{t('nav.dashboard')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/orders">{language === 'ar' ? 'طلباتي' : language === 'zh' ? '我的订单' : 'My Orders'}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/documents">{language === 'ar' ? 'المستندات' : language === 'zh' ? '文档' : 'Documents'}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/settings">{language === 'ar' ? 'الإعدادات' : language === 'zh' ? '设置' : 'Settings'}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      {language === 'ar' ? 'تسجيل الخروج' : language === 'zh' ? '退出登录' : 'Logout'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hidden md:inline-flex">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="sm" className="hidden sm:inline-flex">
                    {t('nav.startImport')}
                    <span className={language === 'ar' ? 'mr-1' : 'ml-1'}>{language === 'ar' ? '←' : '→'}</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-secondary/95 backdrop-blur-lg rounded-xl mb-4 p-4 border border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors ${
                    location.pathname === link.href ? 'bg-primary text-primary-foreground' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2"></div>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/auth"
                    className="px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="hero" className="w-full">
                      {t('nav.startImport')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
