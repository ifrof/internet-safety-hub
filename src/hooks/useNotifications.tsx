import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  created_at: string;
}

// Simulated notifications for now (will be connected to real DB later)
const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '',
    title: 'مرحباً بك في IFROF',
    message: 'شكراً لانضمامك لمنصتنا. استكشف المصانع الموثقة الآن.',
    type: 'success',
    read: false,
    link: '/marketplace',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: '',
    title: 'أكمل ملفك الشخصي',
    message: 'أضف معلومات شركتك للحصول على تجربة أفضل.',
    type: 'info',
    read: false,
    link: '/dashboard/settings',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    // For now, use mock notifications
    // In production, this would fetch from Supabase
    const userNotifications = mockNotifications.map(n => ({
      ...n,
      user_id: user.id,
    }));
    
    setNotifications(userNotifications);
    setUnreadCount(userNotifications.filter(n => !n.read).length);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearNotification = useCallback(async (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    clearNotification,
    refetch: fetchNotifications,
  };
};
