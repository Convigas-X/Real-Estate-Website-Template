import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  spacing?: string;
  className?: string;
}

export const Carousel = ({
  children,
  itemsPerView = 3,
  spacing = 'gap-8',
  className = '',
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;
  
  // Calculate how many slides we need
  const maxIndex = Math.max(0, totalItems - itemsPerView);
  
  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  
  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (isHovered || totalItems <= itemsPerView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isHovered, maxIndex, totalItems, itemsPerView]);
  
  // Handle responsive items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView;
    
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile
    if (width < 1024) return 2; // Tablet
    return itemsPerView; // Desktop
  };
  
  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView);
  
  useEffect(() => {
    const handleResize = () => {
      setResponsiveItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Reset to beginning on resize
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const responsiveMaxIndex = Math.max(0, totalItems - responsiveItemsPerView);
  
  // Center the active item on mobile
  const getTransformValue = () => {
    if (typeof window === 'undefined') return 0;
    
    if (window.innerWidth < 768) {
      // Center the current item on mobile
      return -currentIndex * 100;
    }
    return -currentIndex * (100 / responsiveItemsPerView);
  };
  
  const shouldShowArrows = totalItems > responsiveItemsPerView;
  
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className={`flex ${spacing} items-stretch`}
          animate={{
            x: `${getTransformValue()}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            width: window.innerWidth < 768 ? `${totalItems * 100}%` : '100%',
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={window.innerWidth < 768 ? 'w-full flex-shrink-0' : ''}
              style={{
                flex: window.innerWidth < 768 ? '0 0 100%' : `0 0 ${100 / responsiveItemsPerView}%`,
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation Arrows */}
      {shouldShowArrows && (
        <>
          {/* Previous Button */}
          <motion.button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className={`p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors ${
                currentIndex === 0
                  ? 'opacity-50 cursor-not-allowed bg-white/50'
                  : 'hover:bg-white hover:shadow-xl'
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </div>
          </motion.button>
          
          {/* Next Button */}
          <motion.button
            onClick={next}
            disabled={currentIndex >= responsiveMaxIndex}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className={`p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors ${
                currentIndex >= responsiveMaxIndex
                  ? 'opacity-50 cursor-not-allowed bg-white/50'
                  : 'hover:bg-white hover:shadow-xl'
              }`}
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </motion.button>
        </>
      )}
      
      {/* Pagination Dots */}
      {shouldShowArrows && totalItems > responsiveItemsPerView && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: responsiveMaxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-accent'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
