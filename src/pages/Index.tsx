import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedFactories from '@/components/home/FeaturedFactories';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import VerificationSection from '@/components/home/VerificationSection';
import ServicesSection from '@/components/home/ServicesSection';
import PricingSection from '@/components/home/PricingSection';
import BlogSection from '@/components/home/BlogSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedFactories />
      <HowItWorksSection />
      <VerificationSection />
      <ServicesSection />
      <PricingSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
