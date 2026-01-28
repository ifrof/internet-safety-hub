import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  variant?: 'page' | 'card' | 'list' | 'dashboard';
}

const LoadingSkeleton = ({ variant = 'page' }: LoadingSkeletonProps) => {
  if (variant === 'card') {
    return (
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <Skeleton className="h-40 w-full" />
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border">
              <Skeleton className="w-8 h-8 mb-4" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        
        {/* Table */}
        <div className="bg-card rounded-2xl border border-border">
          <div className="p-6 border-b border-border">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="divide-y divide-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default page skeleton
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="h-20 bg-secondary">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="w-32 h-10" />
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-16 h-4" />
            ))}
          </div>
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-96 mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
              <Skeleton className="h-40 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
