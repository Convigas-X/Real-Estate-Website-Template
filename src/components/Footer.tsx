import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  properties: [
    { name: 'Featured Listings', href: '/listings' },
    { name: 'Search Properties', href: '/search' },
    { name: 'Off-Market', href: '/off-market' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Market Reports', href: '/reports' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8">
        
        {/* Top Section - 4 Columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          
          {/* Brand & Contact */}
          <div
            className="text-center sm:text-left"
          >
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.1em] text-white">
                RealEstate 360
              </span>
            </Link>
            <p className="mt-3 font-sans text-sm text-white/60 leading-relaxed">
              Orlando's trusted real estate partner for over 35 years.
            </p>
            
            <div className="mt-6 flex gap-3 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/80 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties Links */}
          <div
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">
              Properties
            </h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/80 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="text-center sm:text-left"
          >
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="font-sans text-sm text-white/80 leading-relaxed">
                  Orlando, Central Florida
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a 
                  href="tel:+13212286880" 
                  className="font-sans text-sm text-white/80 hover:text-gold transition-colors"
                >
                  321-228-6880
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a 
                  href="mailto:Aubrey@realestate360.realtor" 
                  className="font-sans text-sm text-white/80 hover:text-gold transition-colors"
                >
                  Aubrey@realestate360.realtor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Agent Profile Section */}
        <div
          className="mt-10 sm:mt-12 py-6 sm:py-8 border-t border-b border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold/40">
                <img 
                  src="/aubary.png" 
                  alt="Aubrey Hamid" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h5 className="font-serif text-base sm:text-lg text-white">Aubrey Hamid</h5>
              <p className="font-sans text-xs sm:text-sm text-white/60">Broker & Founder · 35+ Years Experience</p>
            </div>
            <div className="sm:ml-auto mt-2 sm:mt-0">
              <a 
                href="tel:+13212286880"
                className="inline-flex items-center gap-2 bg-gold text-primary px-4 sm:px-5 py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-medium hover:bg-gold/90 transition-colors"
              >
                <Phone size={14} className="sm:w-4 sm:h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
          <p className="font-sans text-[10px] sm:text-xs text-white/40">
            © 2026 RealEstate 360. All rights reserved.
          </p>
          <span className="font-sans text-[10px] sm:text-xs text-white/40">
            Designed by Convigas-X
          </span>
        </div>
      </div>
    </footer>
  );
};
