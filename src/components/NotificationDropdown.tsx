import { Bell, Check, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface NotificationDropdownProps {
  variant?: 'light' | 'dark';
}

const NotificationDropdown = ({ variant = 'dark' }: NotificationDropdownProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={`relative p-2 rounded-lg transition-colors ${
            variant === 'light' 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'hover:bg-muted'
          }`}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold">الإشعارات</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={markAllAsRead}
            >
              <Check className="w-3 h-3 ml-1" />
              تحديد الكل كمقروء
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد إشعارات</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-3 border-b border-border last:border-0 ${
                  !notification.read ? 'bg-muted/50' : ''
                }`}
              >
                <div className={`rounded-lg p-3 ${getTypeStyles(notification.type)} border`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.created_at), { 
                          addSuffix: true, 
                          locale: ar 
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => clearNotification(notification.id)}
                      className="p-1 hover:bg-background rounded"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  
                  {notification.link && (
                    <Link 
                      to={notification.link}
                      onClick={() => markAsRead(notification.id)}
                      className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                    >
                      عرض التفاصيل
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="justify-center text-primary">
            عرض كل الإشعارات
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
