import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PackageOpen, Home, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: typeof PackageOpen;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">{description}</p>
      
      {actionLabel && (actionHref || onAction) && (
        actionHref ? (
          <Link to={actionHref}>
            <Button variant="hero">
              {actionLabel}
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        ) : (
          <Button variant="hero" onClick={onAction}>
            {actionLabel}
            <ArrowRight className="w-4 h-4 mr-2" />
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
