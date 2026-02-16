import { MlsSearchBox } from './MlsSearchBox';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' as const } }
};

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video - YouTube Embed */}
      <motion.div 
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="w-full h-full relative overflow-hidden">
          {/* Video wrapper to maintain aspect ratio */}
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/vw0LXVVuKjc?autoplay=1&mute=1&loop=1&playlist=vw0LXVVuKjc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&vq=hd1080"
              title="Hero Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                border: 'none',
                width: '100vw',
                height: '56.25vw', /* 16:9 aspect ratio */
                minHeight: '100vh',
                minWidth: '177.78vh', /* 16:9 aspect ratio */
              }}
            />
          </div>
        </div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8">
        
        {/* Center - Find Your Dream Home + Search Box (TOP) */}
        <motion.div 
          className="flex flex-col items-center justify-center w-full mb-8 sm:mb-12 relative"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Ambient Glow behind search and heading */}
          <div className="absolute inset-0 -z-10 bg-black/40 blur-[100px] rounded-full scale-110 opacity-60" />

          {/* CTA Heading with Luxury Gold Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 relative py-2 w-full max-w-[90vw] sm:max-w-none">
            {/* Soft text shadow/glow */}
            <div className="absolute inset-0 bg-black/20 blur-2xl rounded-full" />
            <div className="h-px w-8 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent relative z-10 flex-shrink" />
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#FFD700] font-normal tracking-[0.1em] sm:tracking-wide relative z-10 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)] whitespace-nowrap"
            >
              Find Your Dream Home
            </h2>
            <div className="h-px w-8 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent relative z-10 flex-shrink" />
          </div>
          
          {/* Premium Search Box */}
          <div className="w-full max-w-4xl relative">
            <div className="absolute -inset-4 bg-black/10 blur-3xl rounded-full -z-10" />
            <MlsSearchBox />
          </div>
        </motion.div>

        {/* Bottom Left - Other Content */}
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-4 sm:left-6 md:left-12 lg:left-16 text-left max-w-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
        >
          {/* Main Heading */}
          <h1 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-normal tracking-tight leading-tight relative"
          >
            <span className="text-[#FFD700] text-xl sm:text-2xl md:text-3xl lg:text-4xl">Orlando & Central Florida's</span>
            <br />
            <span className="text-white">Real Estate Experts</span>
          </h1>

          {/* Description - Hidden on mobile */}
          <p className="hidden sm:block mt-2 sm:mt-3 font-sans text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm"
          >
            With 35+ years of experience, Real Estate 360 delivers exceptional results
            for buyers, sellers, and investors throughout Central Florida.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
