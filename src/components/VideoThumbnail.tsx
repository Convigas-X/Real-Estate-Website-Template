interface VideoThumbnailProps {
  onClick: () => void;
}

export const VideoThumbnail = ({ onClick }: VideoThumbnailProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden" onClick={onClick}>
      {/* Background - Luxury Home Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80')`,
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Vignette Effect */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
      }} />

      {/* Content Overlay - Video Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        
        {/* Real Estate 360 */}
        <div className="text-center">
          <h2 
            className="font-serif text-white text-3xl md:text-4xl font-medium tracking-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}
          >
            Real Estate
          </h2>
          <span
            className="font-serif text-[#d4af37] text-5xl md:text-6xl font-bold block"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}
          >
            360
          </span>
        </div>

        {/* Tagline */}
        <p
          className="mt-3 text-white/70 text-xs tracking-[0.2em] uppercase font-sans"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          Orlando & Central Florida
        </p>
      </div>

      {/* Duration Badge - YouTube Style */}
      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-sans px-2 py-1 rounded">
        2:34
      </div>

      {/* HD Badge */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-sans px-2 py-1 rounded">
        HD
      </div>
    </div>
  );
};
