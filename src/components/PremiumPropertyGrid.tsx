import { Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  image: string;
  name: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  status: 'For Sale' | 'Sold';
  linkUrl: string;
}

interface PremiumPropertyGridProps {
  properties: Property[];
}

export const PremiumPropertyGrid = ({ properties }: PremiumPropertyGridProps) => {
  // Create combined card for Siena (index 1) and Hollywood Hills (index 3)
  const combinedCardIndex = 1;
  const isCombinedCard = (index: number) => index === combinedCardIndex;
  const isChateauCard = (propertyId: string) => propertyId === 'chateau-lumiere';
  
  const getCardSize = (index: number, propertyId?: string): string => {
    // Mobile: all cards full width, no complex spans
    // Desktop: masonry layout
    
    // Special case: Combined card spans FULL WIDTH and double height on desktop
    if (isCombinedCard(index)) {
      return 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2'; 
    }
    
    // Special case: Chateau Lumière spans ALL 3 COLUMNS on desktop
    if (propertyId && isChateauCard(propertyId)) {
      return 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-1';
    }
    
    // Default: single cell on mobile, normal grid on desktop
    return 'col-span-1 row-span-1';
  };
  
  // Filter out Hollywood Hills (index 3) since it's in the combined card
  const filteredProperties = properties.filter((p) => p.id !== 'hollywood-hills-villa');
  
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Premium Compact Masonry Grid - Responsive: mobile single column, desktop masonry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-5 auto-rows-[350px] sm:auto-rows-[250px] md:auto-rows-[280px] lg:auto-rows-[320px]">
        {filteredProperties.map((property, index) => {
          // Create combined card for Siena + Hollywood Hills
          if (property.id === 'siena-residence') {
            const siena = property;
            const hollywood = properties.find(p => p.id === 'hollywood-hills-villa');
            if (!hollywood) return null;
            
            return (
              <Link
                key={`combined-${siena.id}-${hollywood.id}`}
                to={siena.linkUrl || '/search'}
                className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 ${getCardSize(index)}`}
              >
                {/* Mobile: Stack properties vertically, Desktop: side by side split */}
                <div className="absolute inset-0 flex flex-col sm:flex-col">
                  {/* Top Property - Siena Luxury Residence (larger portion) */}
                  <div className="relative flex-[2] bg-muted">
                    <img
                      src={siena.image}
                      alt={siena.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Status Badge - Top */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2 py-1 rounded-full text-xs tracking-wider uppercase font-semibold shadow-md backdrop-blur-sm bg-white/90 text-primary">
                        {siena.status}
                      </span>
                    </div>
                    
                    {/* Property Info - Top */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3 md:p-4 text-white z-10">
                      <div className="space-y-0.5 sm:space-y-1">
                        <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold mb-0.5 drop-shadow-lg leading-tight">
                          {siena.name}
                        </h3>
                        <p className="font-sans text-xs sm:text-xs md:text-sm text-white/90 mb-1 truncate">
                          {siena.address}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/80">
                          <span>{siena.beds} BD</span>
                          <span>•</span>
                          <span>{siena.baths} BA</span>
                          <span>•</span>
                          <span>{siena.sqft.toLocaleString()}</span>
                        </div>
                        <p className="font-serif text-base sm:text-lg md:text-xl font-bold text-accent drop-shadow-lg">
                          {siena.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider with luxury accent */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent hidden sm:block" />
                  
                  {/* Bottom Property - Hollywood Hills Villa (smaller portion) */}
                  <div className="relative flex-1 bg-muted">
                    <img
                      src={hollywood.image}
                      alt={hollywood.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Property Info - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3 md:p-4 text-white z-10">
                      <div className="space-y-0.5 sm:space-y-1">
                        <h3 className="font-serif text-sm sm:text-sm md:text-base font-bold mb-0.5 drop-shadow-lg leading-tight">
                          {hollywood.name}
                        </h3>
                        <p className="font-sans text-[10px] sm:text-xs text-white/90 mb-1 truncate">
                          {hollywood.address}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/80">
                          <span>{hollywood.beds} BD</span>
                          <span>•</span>
                          <span>{hollywood.baths} BA</span>
                          <span>•</span>
                          <span>{hollywood.sqft.toLocaleString()}</span>
                        </div>
                        <p className="font-serif text-sm sm:text-base md:text-lg font-bold text-accent drop-shadow-lg">
                          {hollywood.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </Link>
            );
          }
          
          // Regular single property cards (Bel Air, Beverly Park)
          // Special styling for Chateau to ensure full image display
          return (
            <Link
              key={property.id}
              to={property.linkUrl || '/search'}
              className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 ${getCardSize(index, property.id)}`}
            >
              {/* Property Image - Full height for ultra-wide cards */}
              <div className={`absolute inset-0 bg-muted ${
                isChateauCard(property.id) ? 'h-full w-full' : ''
              }`}>
                <img
                  src={property.image}
                  alt={property.name}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                    isChateauCard(property.id)
                      ? 'object-cover min-h-full min-w-full'
                      : 'object-cover'
                  }`}
                  style={isChateauCard(property.id) ? { objectPosition: 'center' } : {}}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />
              </div>
              
              {/* Status Badge - Top Left */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs tracking-wider uppercase font-semibold shadow-md backdrop-blur-sm ${
                  property.status === 'For Sale'
                    ? 'bg-white/90 text-primary'
                    : 'bg-primary/90 text-white'
                }`}>
                  {property.status}
                </span>
              </div>
              
              {/* Property Info - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white z-10">
                <div className="space-y-0.5 sm:space-y-1">
                  {/* Property Name */}
                  <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-0.5 drop-shadow-lg leading-tight">
                    {property.name}
                  </h3>
                  
                  {/* Address */}
                  <p className="font-sans text-[10px] sm:text-xs md:text-sm text-white/90 mb-1 truncate">
                    {property.address}
                  </p>
                  
                  {/* Specs - Compact */}
                  <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[10px] sm:text-xs text-white/80 mb-1">
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Bed size={10} className="sm:w-3 sm:h-3 text-accent" />
                      <span className="font-medium">{property.beds}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Bath size={10} className="sm:w-3 sm:h-3 text-accent" />
                      <span className="font-medium">{property.baths}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Square size={10} className="sm:w-3 sm:h-3 text-accent" />
                      <span className="font-medium">{property.sqft.toLocaleString()}</span>
                    </span>
                  </div>
                  
                  {/* Price - Prominent */}
                  <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-accent drop-shadow-lg">
                    {property.price}
                  </p>
                </div>
              </div>
              
              {/* Hover Overlay - Very subtle */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
