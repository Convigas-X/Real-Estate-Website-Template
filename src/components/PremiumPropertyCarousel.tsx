import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bed, Bath, Square } from 'lucide-react';

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
  description?: string;
}

interface PremiumPropertyCarouselProps {
  properties: Property[];
  autoPlay?: boolean;
  interval?: number;
}

export const PremiumPropertyCarousel = ({
  properties,
  autoPlay = true,
  interval = 5000,
}: PremiumPropertyCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };
  
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };
  
  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const timer = setInterval(() => {
      next();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, interval, properties.length]);
  
  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        next(); // Swipe left = next
      } else {
        prev(); // Swipe right = previous
      }
    }
  };
  
  return (
    <div
      className="relative w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl bg-background shadow-2xl">
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative"
          >
            {/* Property Image */}
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              <img
                src={properties[currentIndex].image}
                alt={properties[currentIndex].name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Status Badge - Top Left */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 text-primary text-sm tracking-wider uppercase font-semibold rounded-full shadow-lg backdrop-blur-sm">
                  {properties[currentIndex].status}
                </span>
              </div>
              
              {/* Property Details - Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 text-white z-10">
                <div className="max-w-4xl">
                  {/* Property Name */}
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg"
                  >
                    {properties[currentIndex].name}
                  </h2>
                  
                  {/* Address */}
                  <p className="font-sans text-lg md:text-xl text-white/90 mb-6"
                  >
                    {properties[currentIndex].address}
                  </p>
                  
                  {/* Property Specs */}
                  <div className="flex flex-wrap items-center gap-6 mb-6"
                  >
                    <div className="flex items-center gap-3">
                      <Bed className="w-5 h-5 text-accent" />
                      <span className="font-sans text-lg">
                        <span className="font-bold">{properties[currentIndex].beds}</span> Beds
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bath className="w-5 h-5 text-accent" />
                      <span className="font-sans text-lg">
                        <span className="font-bold">{properties[currentIndex].baths}</span> Baths
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Square className="w-5 h-5 text-accent" />
                      <span className="font-sans text-lg">
                        <span className="font-bold">{properties[currentIndex].sqft.toLocaleString()}</span> Sq.Ft.
                      </span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-accent drop-shadow-xl"
                  >
                    {properties[currentIndex].price}
                  </p>
                  
                  {/* View Details Button */}
                  <div className="mt-8"
                  >
                    <button className="btn-gold">
                      View Property Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={prev}
          className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous property"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </motion.button>
        
        {/* Page Indicators */}
        <div className="flex gap-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-accent w-8'
                  : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to property ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.button
          onClick={next}
          className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next property"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </motion.button>
      </div>
    </div>
  );
};
