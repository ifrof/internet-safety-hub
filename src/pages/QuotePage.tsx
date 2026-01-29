import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Ship, Shield } from 'lucide-react';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import SupplierVerificationForm from '@/components/forms/SupplierVerificationForm';

const QuotePage = () => {
  const [activeTab, setActiveTab] = useState('quote');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للخدمات
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            طلب خدمة
          </h1>
          <p className="text-white/70 max-w-2xl">
            اختر الخدمة المناسبة وأرسل طلبك، سنتواصل معك عبر المنصة
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="quote" className="gap-2">
                  <Package className="w-4 h-4" />
                  طلب عرض سعر
                </TabsTrigger>
                <TabsTrigger value="verification" className="gap-2">
                  <Shield className="w-4 h-4" />
                  التحقق من مورد
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quote">
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Ship className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">طلب عرض سعر</h2>
                      <p className="text-sm text-muted-foreground">للشحن أو الاستيراد</p>
                    </div>
                  </div>
                  <QuoteRequestForm />
                </div>
              </TabsContent>

              <TabsContent value="verification">
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">التحقق من المورد</h2>
                      <p className="text-sm text-muted-foreground">فحص شامل قبل التعامل</p>
                    </div>
                  </div>
                  <SupplierVerificationForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuotePage;
