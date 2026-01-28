import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">حدث خطأ غير متوقع</h1>
            <p className="text-muted-foreground mb-6">
              نعتذر عن هذا الخطأ. يرجى تحديث الصفحة أو المحاولة مرة أخرى.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-muted rounded-lg p-4 mb-6 text-left overflow-auto max-h-48">
                <code className="text-xs text-destructive">
                  {this.state.error.message}
                </code>
              </div>
            )}
            <Button onClick={this.handleReset} variant="hero">
              <RefreshCw className="w-4 h-4 ml-2" />
              تحديث الصفحة
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
