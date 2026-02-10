import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface PropertyCarouselProps {
  properties: Property[];
}

export const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, properties.length - itemsPerView);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Get visible properties
  const visibleProperties = properties.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full border-2 border-accent transition-all duration-300 ${
            currentIndex === 0
              ? 'opacity-50 cursor-not-allowed border-gray-400'
              : 'hover:bg-accent hover:text-white cursor-pointer'
          }`}
          aria-label="Previous properties"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`p-3 rounded-full border-2 border-accent transition-all duration-300 ${
            currentIndex >= maxIndex
              ? 'opacity-50 cursor-not-allowed border-gray-400'
              : 'hover:bg-accent hover:text-white cursor-pointer'
          }`}
          aria-label="Next properties"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid gap-4 sm:gap-6"
            style={{
              gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))`,
            }}
          >
            {visibleProperties.map((property) => (
              <Link
                key={property.id}
                to={property.linkUrl || '/search'}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
                style={{ height: '400px' }}
              >
                {/* Property Image */}
                <div className="absolute inset-0 bg-muted">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />
                </div>
                
                {/* Status Badge - Top Left */}
                <div className="absolute top-3 left-3 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase font-semibold shadow-md backdrop-blur-sm ${
                    property.status === 'For Sale'
                      ? 'bg-white/90 text-primary'
                      : 'bg-primary/90 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
                
                {/* Property Info - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white z-10">
                  <div className="space-y-1">
                    {/* Property Name */}
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold mb-1 drop-shadow-lg leading-tight">
                      {property.name}
                    </h3>
                    
                    {/* Address */}
                    <p className="font-sans text-xs sm:text-sm text-white/90 mb-2 truncate">
                      {property.address}
                    </p>
                    
                    {/* Specs */}
                    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-white/80 mb-2">
                      <span className="flex items-center gap-1">
                        <Bed size={14} className="text-accent" />
                        <span className="font-medium">{property.beds} BD</span>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Bath size={14} className="text-accent" />
                        <span className="font-medium">{property.baths} BA</span>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Square size={14} className="text-accent" />
                        <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
                      </span>
                    </div>
                    
                    {/* Price */}
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-accent drop-shadow-lg">
                      {property.price}
                    </p>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-accent w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
