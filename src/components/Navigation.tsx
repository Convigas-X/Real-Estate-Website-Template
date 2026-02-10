import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Search', href: '/search' },
  { name: 'About Us', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

interface NavigationProps {
  forceDark?: boolean;
}

export const Navigation = ({ forceDark = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use dark theme if forced or if scrolled
  const useDarkTheme = forceDark || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'nav-blur py-4' : 'nav-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={useDarkTheme ? '/logoblack.png' : '/logowhite.png'}
                alt="Aubrey Logo"
                className="h-12 md:h-14 transition-all duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link font-sans text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                    useDarkTheme
                      ? 'text-gray-800 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                useDarkTheme 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary"
          >
            <div className="w-full px-6 py-6">
              <div className="flex items-center justify-between">
                <img src="/logowhite.png" alt="Aubrey Logo" className="h-12" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-serif text-3xl text-white hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};