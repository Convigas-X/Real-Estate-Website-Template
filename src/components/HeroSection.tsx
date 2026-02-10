import heroImage from '/herosection.png';
import { MlsSearchBox } from './MlsSearchBox';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <img
            src={heroImage}
            alt="Luxury Beverly Hills Estate"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay Gradient - Lighter for brighter appearance */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8">
        
        {/* Top Spacer for Navigation */}
        <div className="h-14 sm:h-16" />

        {/* Center - Premium Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 w-full max-w-5xl mx-auto px-2 sm:px-0">
          
          {/* Premium Text Section */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Subtitle with decorative line */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-accent to-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
              >
                Luxury Real Estate
              </span>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-accent to-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-normal tracking-tight leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]"
            >
              <span className="text-[#FFD700] drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Orlando & Central Florida's</span>
              <br />
              <span className="text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]">Real Estate Experts</span>
            </h1>

            {/* Description - Hidden on mobile */}
            <p className="hidden sm:block mt-4 sm:mt-6 font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              With 35+ years of experience, Real Estate 360 delivers exceptional results
              for buyers, sellers, and investors throughout Central Florida.
            </p>

            {/* CTA Heading */}
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-normal tracking-wide mt-6 sm:mt-8 drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)]"
            >
              Find Your Dream Home
            </h2>
          </div>
          
          {/* Premium Search Box */}
          <div className="w-full max-w-4xl">
            <MlsSearchBox />
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="pb-8 sm:pb-12 md:pb-16" />
      </div>

      {/* Bottom Center - Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/40 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-0.5 h-1.5 sm:h-2 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};
