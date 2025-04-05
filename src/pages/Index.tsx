
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import NeedyFamiliesSection from "@/components/home/NeedyFamiliesSection";
import CallToActionSection from "@/components/home/CallToActionSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatisticsSection />
      <NeedyFamiliesSection />
      <CallToActionSection />
    </Layout>
  );
};

export default Index;
