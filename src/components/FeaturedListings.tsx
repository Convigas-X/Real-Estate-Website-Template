import { useEffect, useState } from 'react';
import { PropertyGrid } from './PropertyGrid';
import { fetchListings, Listing, formatPrice } from '@/services/idxApi';
import { properties as staticProperties } from '@/data/properties';

// Fallback image for properties without photos
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80';

// Internal search page URL - all properties link here
const SEARCH_PAGE_URL = '/search';

// Convert IDX Listing to Property format expected by PremiumPropertyGrid
const convertListingToProperty = (listing: Listing, index: number) => {
  const address = `${listing.address}, ${listing.city}, ${listing.state} ${listing.zipcode}`;
  
  // Generate photo URL using IDX Broker format
  const photoUrl = listing.photoUrl || 
    (listing.listingID ? `https://realestate360.idxbroker.com/idx/media/photos/${listing.listingID}/0` : FALLBACK_IMAGE);
  
  return {
    id: listing.listingID || `mls-${index}`,
    image: photoUrl,
    name: listing.propertyType || 'Property',
    address: address,
    beds: listing.bedrooms || 0,
    baths: listing.bathrooms || 0,
    sqft: listing.sqft || 0,
    price: formatPrice(listing.price),
    status: (listing.status?.toLowerCase().includes('sold') ? 'Sold' : 'For Sale') as 'For Sale' | 'Sold',
    linkUrl: SEARCH_PAGE_URL,
  };
};

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
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoading(true);
        setUsingFallback(false);
        
        // Try to fetch from API first - filter for more affordable properties (under $600k)
        const listings = await fetchListings({
          city: 'Orlando',
          state: 'FL',
          perPage: 20,
          status: 'Active',
          maxPrice: '600000',
        });

        if (listings && listings.length > 0) {
          // Shuffle and take 6 random properties
          const shuffled = shuffleArray(listings);
          const selected = shuffled.slice(0, 6);

          // Convert to property format
          const convertedProperties = selected.map((listing, index) =>
            convertListingToProperty(listing, index)
          );

          setProperties(convertedProperties);
        } else {
          // No listings returned, use fallback
          throw new Error('No listings returned from API');
        }
      } catch (err) {
        console.warn('API fetch failed, using fallback static properties:', err);

        // Use static properties as fallback - shuffle them for variety
        // All properties link to the internal search page
        const shuffledStatic = shuffleArray(staticProperties);
        const selectedStatic = shuffledStatic.slice(0, 6).map(p => ({
          ...p,
          linkUrl: SEARCH_PAGE_URL
        }));
        
        setProperties(selectedStatic);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover exceptional homes in Orlando's most desirable neighborhoods
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight">
            Featured Properties
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover exceptional homes in Orlando's most desirable neighborhoods
          </p>
          {usingFallback && (
            <p className="mt-2 text-sm text-muted-foreground/70">
              Showing featured listings
            </p>
          )}
        </div>

        {/* Property Grid - Displaying Properties */}
        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
};
