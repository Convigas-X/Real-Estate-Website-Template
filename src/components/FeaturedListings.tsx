import { useEffect, useState } from 'react';
import { PropertyCarousel } from './PropertyCarousel';
import { properties as staticProperties } from '@/data/properties';
import propertyBackground from '/Property.jpg';

// Internal search page URL - all properties link here
const SEARCH_PAGE_URL = '/search';

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const FeaturedListings = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProperties = () => {
      setLoading(true);
      
      // Use static properties - shuffle them for variety
      const shuffledStatic = shuffleArray(staticProperties);
      const selectedStatic = shuffledStatic.slice(0, 10).map(p => ({
        ...p,
        linkUrl: SEARCH_PAGE_URL
      }));
      
      setProperties(selectedStatic);
      setLoading(false);
    };

    loadFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-fixed bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${propertyBackground})` }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-10 sm:mb-16 md:mb-20 relative">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-black/40 blur-[80px] rounded-full -z-10 scale-110" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFD700] tracking-tight drop-shadow-2xl">
              Featured Properties
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-base sm:text-lg md:text-xl text-[#FFD700]/90 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
              Discover exceptional homes in Orlando's most desirable neighborhoods
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-fixed bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${propertyBackground})` }}>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20 relative">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-black/40 blur-[80px] rounded-full -z-10 scale-110" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFD700] tracking-tight drop-shadow-2xl">
            Featured Properties
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-base sm:text-lg md:text-xl text-[#FFD700]/90 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
            Discover exceptional homes in Orlando's most desirable neighborhoods
          </p>

        </div>

        {/* Property Carousel with Premium Glass Morphism Box */}
        <div className="relative p-1 sm:p-2 md:p-4 lg:p-8 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
          {/* Glass Morphism Background Layers */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl -z-10" />
          <div className="absolute inset-0 border border-white/20 rounded-[2rem] sm:rounded-[3rem] -z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 -z-10" />
          
          {/* Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FFD700]/10 blur-[100px] rounded-full -z-10" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#FFD700]/10 blur-[100px] rounded-full -z-10" />

          {/* Carousel Component */}
          <div className="relative z-10 py-4">
            <PropertyCarousel properties={properties} />
          </div>
        </div>
      </div>
    </section>
  );
};
