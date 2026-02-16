import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Easing function for smoother, premium feel
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// Hook for counting animation
const useCountUp = (endValue: string, duration = 2500, delay = 0, start = 0) => {
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
        const easedProgress = easeOutCubic(progress);
        
        const current = Math.floor(easedProgress * numericEnd);
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
const StatCounter = ({ value, duration = 2500, delay = 0 }: { value: string; duration?: number; delay?: number }) => {
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

  return <span ref={ref} className="inline-block tabular-nums">{displayValue()}</span>;
};

// Range Counter Component
const RangeCounter = ({ startValue, endValue, duration = 2500, delay = 0 }: { 
  startValue: string; 
  endValue: string; 
  duration?: number; 
  delay?: number; 
}) => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  
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
    if (!inView || isComplete) return;
    
    const timer = setTimeout(() => {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        const currentStart = Math.floor(easedProgress * startNumeric);
        const currentEnd = Math.floor(easedProgress * endNumeric);
        
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
  }, [inView, duration, delay, startNumeric, endNumeric, isComplete]);
  
  const formatValue = (value: number, prefix: string, suffix: string) => {
    return `${prefix}${value.toLocaleString()}${suffix}`;
  };
  
  return (
    <span ref={containerRef} className="whitespace-nowrap tabular-nums">
      {isComplete ? (
        <>{startValue} - {endValue}</>
      ) : (
        <>
          <span>{formatValue(startCount, startPrefix, startSuffix)}</span>
          {' - '}
          <span>{formatValue(endCount, endPrefix, endSuffix)}</span>
        </>
      )}
    </span>
  );
};

export const StatsSection = () => {
  const stats = [
    { label: 'Total Sales Volume', value: '$15M+', counter: <StatCounter value="$15M+" /> },
    { label: 'Homes Sold', value: '34+', counter: <StatCounter value="34+" /> },
    { label: 'Price-Range', value: '$19k - $896k', counter: <RangeCounter startValue="$19k" endValue="$896k" /> },
    { label: 'Average Price Point', value: '$475k', counter: <StatCounter value="$475k" /> },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent -z-10" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-100 to-transparent -z-10 md:hidden" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
                className={`relative px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center group
                  ${index !== stats.length - 1 ? 'lg:border-r lg:border-gray-100' : ''}
                  ${index % 2 === 0 ? 'sm:border-r sm:lg:border-r-0' : ''}
                  ${index < 2 ? 'border-b border-gray-100 lg:border-b-0' : ''}
                  ${index === 1 ? 'sm:border-b-gray-100' : ''}
                `}
              >
                {/* Number Wrapper for better alignment */}
                <div className="flex flex-col items-center text-center">
                  <div className="stat-number text-primary text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 tracking-tight group-hover:scale-105 transition-transform duration-700">
                    {stat.counter}
                  </div>
                  
                  {/* Luxury Divider Animation */}
                  <div className="relative h-px w-10 bg-accent/20 mb-4 sm:mb-6 overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: "circOut" }}
                      className="absolute inset-0 bg-accent"
                    />
                  </div>
                  
                  <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground/70 font-medium group-hover:text-primary transition-colors duration-500 max-w-[150px] leading-relaxed">
                    {stat.label}
                  </p>
                </div>

                {/* Subtle Hover Background Effect */}
                <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};