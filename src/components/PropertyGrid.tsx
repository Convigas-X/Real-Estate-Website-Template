import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart, ArrowRight } from 'lucide-react';

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

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  // Take only 6 properties for the layout
  const displayProperties = properties.slice(0, 6);
  
  // Destructure for the layout
  const [largeProperty, smallTop, smallBottom, landscapeLeft, landscapeCenter, landscapeRight] = displayProperties;

  // Property Card Component
  const PropertyCard = ({ 
    property, 
    className = '', 
    height = '400px',
    isLandscape = false 
  }: { 
    property: Property; 
    className?: string;
    height?: string;
    isLandscape?: boolean;
  }) => (
    <div
      className={`group relative ${className}`}
    >
      <Link
        to={property.linkUrl || '/search'}
        className="block relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
        style={{ height }}
      >
        {/* Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md backdrop-blur-sm ${
            property.status === 'For Sale'
              ? 'bg-green-500/90 text-white'
              : 'bg-gray-600/90 text-white'
          }`}>
            {property.status}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Property Info */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 ${isLandscape ? 'p-4' : 'p-5'}`}>
          {/* Price - CSS Transition instead of Framer Motion */}
          <div className="mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
            <span className={`font-bold text-white drop-shadow-lg ${isLandscape ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
              {property.price}
            </span>
          </div>

          {/* Property Name */}
          <h3 className={`font-bold text-white mb-1 drop-shadow-md truncate ${isLandscape ? 'text-base' : 'text-lg lg:text-xl'}`}>
            {property.name}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-white/80 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <p className="text-xs truncate">{property.address}</p>
          </div>

          {/* Specs */}
          <div className={`flex items-center gap-3 text-white/90 ${isLandscape ? 'text-xs' : 'text-sm'}`}>
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">{property.beds} bd</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">{property.baths} ba</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1">
              <Square className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* View Details Button - CSS Transition */}
          <div className="mt-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-xs">
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-500 pointer-events-none" />
      </Link>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
      >
        {/* Top Row */}
        {largeProperty && (
          <div className="lg:row-span-2"
          >
            <PropertyCard 
              property={largeProperty} 
              height="100%"
              className="h-[500px] lg:h-full min-h-[500px]"
            />
          </div>
        )}
        
        {/* Right Side - Two Small Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          {smallTop && (
            <PropertyCard 
              property={smallTop} 
              height="240px"
            />
          )}
          {smallBottom && (
            <PropertyCard 
              property={smallBottom} 
              height="240px"
            />
          )}
        </div>

        {/* Bottom Row - Three Landscape Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
        >
          {landscapeLeft && (
            <PropertyCard 
              property={landscapeLeft} 
              height="280px"
              isLandscape={true}
            />
          )}
          {landscapeCenter && (
            <PropertyCard 
              property={landscapeCenter} 
              height="280px"
              isLandscape={true}
            />
          )}
          {landscapeRight && (
            <PropertyCard 
              property={landscapeRight} 
              height="280px"
              isLandscape={true}
            />
          )}
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
        >
          View All Properties
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
