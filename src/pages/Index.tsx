import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PartnersMarquee } from '@/components/PartnersMarquee';
import { AboutVideoSection } from '@/components/AboutVideoSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturedListings } from '@/components/FeaturedListings';
import { ForbesSection } from '@/components/ForbesSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <AboutVideoSection />
        <StatsSection />
        <FeaturedListings />
        <ForbesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
