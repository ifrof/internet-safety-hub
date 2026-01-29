import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type UserType = 'buyer' | 'factory' | 'admin';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string, companyName?: string, userType?: UserType) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string, companyName?: string, userType: UserType = 'buyer') => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          company_name: companyName,
          user_type: userType,
        }
      }
    });

    if (error) {
      let message = 'حدث خطأ أثناء إنشاء الحساب';
      if (error.message.includes('already registered')) {
        message = 'هذا البريد الإلكتروني مسجل مسبقاً';
      } else if (error.message.includes('password')) {
        message = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
      }
      toast({
        title: 'خطأ',
        description: message,
        variant: 'destructive',
      });
    } else {
      // Update profile with user_type after signup
      if (data.user) {
        setTimeout(async () => {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              email: email,
              company_name: companyName,
              user_type: userType,
            })
            .eq('user_id', data.user!.id);

          if (profileError) {
            console.error('Error updating profile:', profileError);
          }
        }, 0);
      }
      
      toast({
        title: 'تم إنشاء الحساب',
        description: userType === 'factory' ? 'مرحباً بك! يمكنك الآن إضافة مصنعك' : 'مرحباً بك في IFROF!',
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      let message = 'حدث خطأ أثناء تسجيل الدخول';
      if (error.message.includes('Invalid login credentials')) {
        message = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      }
      toast({
        title: 'خطأ',
        description: message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم تسجيل الدخول',
        description: 'أهلاً بك مرة أخرى!',
      });
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'تم تسجيل الخروج',
      description: 'نراك قريباً!',
    });
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
