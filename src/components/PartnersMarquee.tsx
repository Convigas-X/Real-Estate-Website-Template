const partners = [
  { name: 'Realtor', logo: '/realter.svg', type: 'image' },
  { name: 'Zillow', logo: '/zillow.svg', type: 'image' },
  { name: 'BBB A+', logo: '/bb.jpg', type: 'image' },
  { name: 'Trulia', logo: '/trulia.png', type: 'image' },
];

const PartnerItem = ({ partner }: { partner: typeof partners[0] }) => {
  if (partner.type === 'image' && partner.logo) {
    return (
      <div className="flex items-center justify-center h-14 sm:h-20 md:h-24 px-4 sm:px-8 flex-shrink-0">
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-8 sm:h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
      </div>
    );
  }
  
  if (partner.type === 'badge') {
    return (
      <div className="flex items-center justify-center h-14 sm:h-20 md:h-24 px-4 sm:px-8 flex-shrink-0">
        <div className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white rounded-lg shadow-md border border-gold/20">
          <span className="font-serif text-lg sm:text-2xl font-bold text-gold">A+</span>
          <span className="font-sans text-xs sm:text-sm font-semibold text-primary">BBB</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center h-14 sm:h-20 md:h-24 px-4 sm:px-8 flex-shrink-0">
      <span className="font-serif text-lg sm:text-xl md:text-2xl text-primary font-medium">
        {partner.name}
      </span>
    </div>
  );
};

export const PartnersMarquee = () => {
  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-12">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary mb-2">
            Trusted Partners & Certifications
          </h3>
          <div className="w-16 sm:w-24 h-[1px] bg-gold mx-auto" />
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee gap-16 w-max">
              {/* First set */}
              {partners.map((partner, index) => (
                <PartnerItem key={`${partner.name}-1-${index}`} partner={partner} />
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <PartnerItem key={`${partner.name}-2-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
