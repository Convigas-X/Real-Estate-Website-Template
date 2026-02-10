import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Hook for counting animation
const useCountUp = (endValue: string, duration = 2000, delay = 0, start = 0) => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView || isComplete) return;
    
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const numericEnd = parseInt(endValue.replace(/[^0-9]/g, ''));
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * numericEnd);
        setCount(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(numericEnd);
          setIsComplete(true);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [inView, duration, delay, endValue, isComplete]);

  return { ref, count, isComplete };
};

// Counter Component
const StatCounter = ({ value, duration = 2000, delay = 0 }: { value: string; duration?: number; delay?: number }) => {
  const hasPlus = value.includes('+');
  const hasM = value.includes('M');
  const hasK = value.includes('k');
  const prefix = value.startsWith('$') ? '$' : '';
  const numericPart = value.replace(/[^0-9]/g, '');
  
  const { ref, count, isComplete } = useCountUp(numericPart, duration, delay);
  
  const displayValue = () => {
    if (isComplete) return value;
    
    let result = prefix + count.toLocaleString();
    if (hasM) result += 'M';
    if (hasK) result += 'k';
    if (hasPlus) result += '+';
    return result;
  };

  return <span ref={ref} className="inline-block">{displayValue()}</span>;
};

// Range Counter Component
const RangeCounter = ({ startValue, endValue, duration = 2000, delay = 0 }: { 
  startValue: string; 
  endValue: string; 
  duration?: number; 
  delay?: number; 
}) => {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const startInView = useInView(startRef, { once: true, margin: '-100px' });
  const endInView = useInView(endRef, { once: true, margin: '-100px' });
  
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const startNumeric = parseInt(startValue.replace(/[^0-9]/g, ''));
  const endNumeric = parseInt(endValue.replace(/[^0-9]/g, ''));
  const startPrefix = startValue.startsWith('$') ? '$' : '';
  const endPrefix = endValue.startsWith('$') ? '$' : '';
  const startSuffix = startValue.includes('k') ? 'k' : '';
  const endSuffix = endValue.includes('k') ? 'k' : '';
  
  useEffect(() => {
    if (!startInView || isComplete) return;
    
    const timer = setTimeout(() => {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentStart = Math.floor(progress * startNumeric);
        const currentEnd = Math.floor(progress * endNumeric);
        
        setStartCount(currentStart);
        setEndCount(currentEnd);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setStartCount(startNumeric);
          setEndCount(endNumeric);
          setIsComplete(true);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [startInView, duration, delay, startNumeric, endNumeric, isComplete]);
  
  const formatValue = (value: number, prefix: string, suffix: string) => {
    return `${prefix}${value.toLocaleString()}${suffix}`;
  };
  
  return (
    <span className="whitespace-nowrap">
      {isComplete ? (
        <>{startValue} - {endValue}</>
      ) : (
        <>
          <span ref={startRef}>{formatValue(startCount, startPrefix, startSuffix)}</span>
          {' - '}
          <span ref={endRef}>{formatValue(endCount, endPrefix, endSuffix)}</span>
        </>
      )}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-6 max-w-7xl mx-auto">
          {/* Total Sales Volume */}
          <div
            className="text-center"
          >
            <div className="stat-number text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <StatCounter value="$15M+" duration={2000} delay={200} />
            </div>
            <p className="mt-2 sm:mt-3 font-sans text-[10px] sm:text-xs md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase text-muted-foreground">
              Total Sales Volume
            </p>
          </div>

          {/* Homes Sold */}
          <div
            className="text-center"
          >
            <div className="stat-number text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <StatCounter value="34+" duration={2000} delay={500} />
            </div>
            <p className="mt-2 sm:mt-3 font-sans text-[10px] sm:text-xs md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase text-muted-foreground">
              Homes Sold
            </p>
          </div>

          {/* Price-Range - Now Animated! */}
          <div
            className="text-center"
          >
            <div className="stat-number text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <RangeCounter startValue="$19k" endValue="$896k" duration={2000} delay={300} />
            </div>
            <p className="mt-2 sm:mt-3 font-sans text-[10px] sm:text-xs md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase text-muted-foreground">
              Price-Range
            </p>
          </div>

          {/* Average Price Point */}
          <div
            className="text-center"
          >
            <div className="stat-number text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <StatCounter value="$475k" duration={2000} delay={800} />
            </div>
            <p className="mt-2 sm:mt-3 font-sans text-[10px] sm:text-xs md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase text-muted-foreground">
              Average Price Point
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};