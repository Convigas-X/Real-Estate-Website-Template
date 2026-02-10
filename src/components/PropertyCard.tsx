import { Bed, Bath, Square } from 'lucide-react';
import type { Property } from '@/data/properties';

interface PropertyCardProps extends Property {
  index?: number;
}

export const PropertyCard = ({
  image,
  name,
  address,
  beds,
  baths,
  sqft,
  price,
  status = 'For Sale',
  index = 0,
  variant = 'default',
}: PropertyCardProps) => {
  return (
    <article
      className="property-card group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="property-image w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`badge-sale px-3 py-1.5 ${
            status === 'For Sale' 
              ? 'bg-white text-primary' 
              : 'bg-primary text-white'
          }`}>
            {status}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="pt-4 sm:pt-5 pb-2">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-primary">
          {name}
        </h3>
        <p className="mt-1 font-sans text-xs sm:text-sm text-muted-foreground">
          {address}
        </p>

        {/* Specs */}
        <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-6 font-sans text-xs sm:text-sm text-charcoal-light">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Bed size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
            <span>{beds} BD</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Bath size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
            <span>{baths} BA</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Square size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
            <span>{sqft.toLocaleString()} Sq.Ft.</span>
          </div>
        </div>

        {/* Price */}
        <p className="mt-3 sm:mt-4 font-serif text-xl sm:text-2xl text-primary">
          {price}
        </p>
      </div>
    </article>
  );
};
