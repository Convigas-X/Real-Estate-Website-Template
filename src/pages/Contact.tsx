import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '/herosection.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Contact"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Contact Us
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gold mx-auto mt-4 sm:mt-6 rounded-full"></div>
            <p className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-white/90 leading-relaxed">
              Get in touch with our luxury real estate specialists. We're here to help you find your dream property in Orlando, Central Florida and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
            
            {/* Contact Information Card */}
            <div className="lg:col-span-1">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-gold/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-5 sm:p-8">
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gold/20">
                    Get In Touch
                    <div className="w-12 sm:w-16 h-0.5 bg-gold mt-2 sm:mt-3"></div>
                  </h2>

                  <div className="space-y-5 sm:space-y-8">
                    {[
                      {
                        icon: MapPin,
                        title: "Visit Our Office",
                        content: (
                          <>
                            6441 S Chickasaw Trl
                            <br />Orlando, FL 32829
                          </>
                        ),
                      },
                      {
                        icon: Phone,
                        title: "Call Us",
                        content: (
                          <a 
                            href="tel:+13212286880" 
                            className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                          >
                            <span className="border-b border-transparent group-hover:border-accent transition-colors">(321) 228-6880</span>
                          </a>
                        ),
                      },
                      {
                        icon: Mail,
                        title: "Email Us",
                        content: (
                          <a 
                            href="mailto:aubrey@realestate360.realtor" 
                            className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                          >
                            <span className="border-b border-transparent group-hover:border-accent transition-colors">aubrey@realestate360.realtor</span>
                          </a>
                        ),
                      },
                      {
                        icon: Clock,
                        title: "Office Hours",
                        content: (
                          <>
                            <span className="font-medium text-primary">Mon-Fri:</span> 9am-7pm
                            <br /><span className="font-medium text-primary">Sat:</span> 10am-6pm
                            <br /><span className="font-medium text-primary">Sun:</span> By Appointment
                          </>
                        ),
                      },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 sm:gap-4 group"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-sans font-semibold text-primary text-sm sm:text-base">{item.title}</h3>
                          <p className="mt-0.5 sm:mt-1 font-sans text-muted-foreground leading-relaxed text-xs sm:text-sm">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-gold/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-5 sm:p-8">
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gold/20">
                    Send Us a Message
                    <div className="w-12 sm:w-16 h-0.5 bg-gold mt-2 sm:mt-3"></div>
                  </h2>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 sm:gap-3"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="font-sans text-green-700 text-xs sm:text-sm">Thank you! Your message has been sent successfully.</span>
                    </motion.div>
                  )}

                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block font-sans text-xs sm:text-sm font-medium text-charcoal-light mb-1.5 sm:mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-10 sm:h-12"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="email" className="block font-sans text-xs sm:text-sm font-medium text-charcoal-light mb-1.5 sm:mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-10 sm:h-12"
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block font-sans text-xs sm:text-sm font-medium text-charcoal-light mb-1.5 sm:mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-10 sm:h-12"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className="block font-sans text-xs sm:text-sm font-medium text-charcoal-light mb-1.5 sm:mb-2">
                        I'm Interested In
                      </label>
                      <Select
                        value={formData.interest}
                        onValueChange={(value) => handleChange('interest', value)}
                      >
                        <SelectTrigger className="w-full h-10 sm:h-12 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200">
                          <SelectValue placeholder="Select your interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying a Luxury Home</SelectItem>
                          <SelectItem value="selling">Selling My Property</SelectItem>
                          <SelectItem value="investing">Investment Properties</SelectItem>
                          <SelectItem value="consultation">Market Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-sans text-xs sm:text-sm font-medium text-charcoal-light mb-1.5 sm:mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 resize-none"
                        required
                        placeholder="Tell us about your real estate needs..."
                      />
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-gold to-gold-dark text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:from-gold-dark hover:to-gold hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
                      >
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Map Section - Above Footer */}
      <section className="relative py-12 sm:py-16 md:py-24 bg-[#2a2a2a]">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>
        <div className="absolute -left-1/4 -bottom-1/4 w-full h-full rounded-full bg-gold/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
              Visit Our Orlando Office
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gold mx-auto mt-4 sm:mt-6 rounded-full"></div>
            <p className="mt-4 sm:mt-6 font-sans text-sm sm:text-lg text-white/80 max-w-2xl mx-auto">
              Conveniently located in Orlando, FL. Schedule an appointment or drop by during business hours.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Premium frame effect */}
              <div className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold opacity-30 blur-sm"></div>
              
              <div className="relative h-64 sm:h-80 md:h-96 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-gold/20 bg-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.202850147928!2d-81.29847668488758!3d28.538383482339053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e768e0c077c5e5%3A0x605931a201592677!2sOrlando%2C%20FL%2032829%2C%20USA!5e0!3m2!1sen!2sus!4v1705791234567!5m2!1sen!2sus"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'none' }} 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Real Estate 360 Orlando Office Location"
                  className="w-full h-full"
                />
              </div>

              {/* Map Location Pin - Premium Design */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ marginTop: '-40px' }}
              >
                {/* Pin container */}
                <div className="relative">
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping"></div>
                  
                  {/* Main pin */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-2xl flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Pin stem - hidden on mobile */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-gold to-gold-dark hidden sm:block"></div>
                  
                  {/* Location info card - mobile responsive */}
                  <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 bg-primary/95 backdrop-blur-sm border border-gold/30 rounded-lg sm:rounded-xl p-2.5 sm:p-5 shadow-2xl w-max max-w-[90vw] sm:max-w-xs md:max-w-sm"
                  >
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary/95 border-r border-b border-gold/30 rotate-45"></div>
                    
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" />
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <h3 className="font-sans font-semibold text-white text-xs sm:text-sm">Real Estate 360</h3>
                        <p className="font-sans text-white/80 text-[10px] sm:text-xs leading-relaxed mt-0.5">
                          6441 S Chickasaw Trl<br />
                          Orlando, FL 32829<br />
                          <span className="hidden sm:inline">United States</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium badge */}
              <div className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-gradient-to-r from-gold to-gold-dark text-primary px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg font-sans font-semibold text-[10px] sm:text-xs shadow-lg whitespace-nowrap">
                Prestige Location
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="font-sans text-white/70 text-xs sm:text-sm">
              <span className="font-semibold text-gold">Directions:</span> 
              Located in the heart of Orlando, easily accessible from major highways. 
              Free parking available on-site.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;