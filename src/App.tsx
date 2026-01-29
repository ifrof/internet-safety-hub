import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AIChatWidget from "@/components/chat/AIChatWidget";
import ProtectedRoute from "@/components/ProtectedRoute";

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-4 animate-pulse">
        IF
      </div>
      <p className="text-muted-foreground">جارِ التحميل...</p>
    </div>
  </div>
);

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const FactoryPage = lazy(() => import("./pages/FactoryPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Auth = lazy(() => import("./pages/Auth"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/dashboard/Orders"));
const Documents = lazy(() => import("./pages/dashboard/Documents"));
const Subscription = lazy(() => import("./pages/dashboard/Subscription"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const Admin = lazy(() => import("./pages/Admin"));
const Messages = lazy(() => import("./pages/Messages"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const DirectFactory = lazy(() => import("./pages/DirectFactory"));
const FactorySearch = lazy(() => import("./pages/FactorySearch"));
const FactoryResults = lazy(() => import("./pages/FactoryResults"));
const QuotePage = lazy(() => import("./pages/QuotePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public pages - no subscription required */}
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected pages - subscription required */}
              <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
              <Route path="/factory/:id" element={<ProtectedRoute><FactoryPage /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/services/:serviceId" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/dashboard/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
              <Route path="/dashboard/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/messages/:conversationId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/direct-factory" element={<ProtectedRoute><DirectFactory /></ProtectedRoute>} />
              <Route path="/factory-search" element={<ProtectedRoute><FactorySearch /></ProtectedRoute>} />
              <Route path="/factory-results/:id" element={<ProtectedRoute><FactoryResults /></ProtectedRoute>} />
              <Route path="/services/quote" element={<ProtectedRoute><QuotePage /></ProtectedRoute>} />
              <Route path="/services/verification" element={<ProtectedRoute><QuotePage /></ProtectedRoute>} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <AIChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
