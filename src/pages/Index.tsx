import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedConsultants from "@/components/FeaturedConsultants";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <CategoriesSection />
    <FeaturedConsultants />
    <HowItWorks />
    <PricingSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
