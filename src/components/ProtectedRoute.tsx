import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
}

// Pages that are accessible without subscription (only reading)
const PUBLIC_READ_ONLY_PATHS = [
  '/',
  '/blog',
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/refund',
];

// Check if path starts with any of the allowed paths
const isPublicPath = (pathname: string) => {
  // Allow blog posts
  if (pathname.startsWith('/blog/')) return true;
  return PUBLIC_READ_ONLY_PATHS.includes(pathname);
};

const ProtectedRoute = ({ children, requireSubscription = true }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to pricing page first (payment before registration)
        navigate('/pricing', { state: { from: location.pathname } });
      }
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
export { isPublicPath };
