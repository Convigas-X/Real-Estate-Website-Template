import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PartnersMarquee } from '@/components/PartnersMarquee';
import { AboutVideoSection } from '@/components/AboutVideoSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturedListings } from '@/components/FeaturedListings';
import { ForbesSection } from '@/components/ForbesSection';
import { Footer } from '@/components/Footer';
import { BackgroundMusic } from '@/components/BackgroundMusic';

const Index = () => {
  return (
    <div className="min-h-screen">
      <BackgroundMusic />
      <Navigation />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <AboutVideoSection />
        <FeaturedListings />
        <StatsSection />
        <ForbesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
