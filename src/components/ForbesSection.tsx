import { Link } from 'react-router-dom';

export const ForbesSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div
          >
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary">
              Full-Service Brokerage Built on Trust, Intelligence & Innovation
            </h2>

            <p className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto">
              From first-time buyers to luxury estates, we provide personalized service 
              and expert guidance every step of the way.
            </p>
          </div>
        </div>
        
        {/* New Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mt-10 sm:mt-16 md:mt-20 items-center">
          {/* Left Side - Image */}
          <div
            className="order-2 md:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/image.png" 
                alt="Real Estate 360" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Right Side - Content with Button */}
          <div
            className="order-1 md:order-2"
          >
            <div className="text-left">
              <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal-light leading-relaxed">
                Real Estate 360 is an Orlando-based brokerage with a proven 35 year legacy of delivering results for buyers, sellers, and investors across the nation and globally. We specialize in creative deal-making, strategic acquisitions, and end-to-end real estate solutions designed to help clients grow their portfolios with confidence.
              </p>
              
              <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal-light leading-relaxed mt-3 sm:mt-4">
                Our reputation is built on trust, integrity, and long-lasting partnerships. Whether you're purchasing your first home or expanding your investment footprint, we provide the expertise, insights, and opportunities needed to achieve your goals.
              </p>
              
              <div className="mt-6 sm:mt-8">
                <Link 
                  to="/about" 
                  className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white font-sans font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 text-sm sm:text-base"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
