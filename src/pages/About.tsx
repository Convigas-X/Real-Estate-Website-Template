import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import heroImage from '/herosection.jpg';
import { Award, Users, Target, Heart } from 'lucide-react';

const values = [
  { icon: Target, title: "Excellence", description: "We strive for the highest standards in everything we do." },
  { icon: Heart, title: "Integrity", description: "Honesty and transparency guide every interaction." },
  { icon: Users, title: "Client Focus", description: "Your goals and satisfaction are our top priority." },
  { icon: Award, title: "Innovation", description: "We embrace technology to deliver better results." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="RealEstate 360"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              About Real Estate 360
            </h1>
            <p className="mt-3 sm:mt-4 font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2 sm:px-0">
              Our mission is to provide exceptional real estate services with integrity, 
              expertise, and a commitment to exceeding expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Excellence Section - New Section Added Below Hero */}
      <section className="py-10 sm:py-12 md:py-20" style={{ backgroundColor: '#fefefe' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-6 sm:mb-8">
                          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary">
                          35+ Years of Excellence, Innovation & Trust            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <div>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src="/abot.jpeg" 
                  alt="Real Estate 360 Excellence" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Right Side - Text */}
            <div>
              <p className="font-sans text-sm sm:text-lg text-charcoal-light leading-relaxed">
                Real Estate 360 was built on a foundation of integrity, expertise, and forward-thinking strategies. For more than three decades, we've helped thousands of clients build wealth, secure homes, and seize high-value investment opportunities.
              </p>
              
              <p className="font-sans text-sm sm:text-lg text-charcoal-light leading-relaxed mt-4 sm:mt-6">
                Our growth is driven by our expanding Joint Venture Network and the rising demand from investors seeking creative, profitable, and reliable real estate solutions.
              </p>
              
              <p className="font-sans text-sm sm:text-lg text-charcoal-light leading-relaxed mt-4 sm:mt-6">
                We serve clients across Orlando, Central Florida, and nationwide as well as international investors searching for unique U.S. opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
                Our Story
              </h2>
            </div>

            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-left">
              <p className="font-sans text-sm sm:text-lg text-charcoal-light leading-relaxed">
                For over 35 years, Real Estate 360 has been Central Florida's trusted 
                partner in residential real estate. Founded in 1989 by Aubrey Hamid, 
                our mission has always been simple: deliver exceptional results through 
                personalized service and deep market expertise.
              </p>
              <p className="font-sans text-sm sm:text-lg text-charcoal-light leading-relaxed">
                What started as a single-agent practice has grown into a full-service 
                brokerage serving buyers, sellers, and investors throughout the Orlando 
                metropolitan area. With over 1,200 successful transactions and $850 million 
                in sales volume, we've built our reputation on trust, transparency, and results.
                Today, we continue to embrace innovation while maintaining the personal 
                touch that has made us a leader in Orlando real estate. Our clients aren't 
                just transactions—they're neighbors, friends, and the foundation of our success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-10 sm:py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
              Our Mission & Values
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-cream rounded-full mb-4 sm:mb-6 flex items-center justify-center">
                  <value.icon className="w-6 h-6 sm:w-10 sm:h-10 text-accent" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-primary">{value.title}</h3>
                <p className="mt-1 sm:mt-2 font-sans text-xs sm:text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;