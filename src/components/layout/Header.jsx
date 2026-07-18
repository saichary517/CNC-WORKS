import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { ContactDrawer } from '../ui/ContactDrawer';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: '2D Designs', path: '/folder/2d-Designs' },
    { name: '3D Designs', path: '/folder/3d-Designs' },
    { name: 'Gift Articles', path: '/gift-articles' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 h-16 ${
        scrolled || isMobileMenuOpen
          ? 'bg-warm-white/90 backdrop-blur-md shadow-premium-card border-b border-warm-beige/30' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-start select-none group outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded px-1.5 py-0.5 z-50 text-left"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm md:text-base font-bold tracking-wide text-matte-black group-hover:text-oak-accent transition-colors duration-300 uppercase">
                {siteConfig.shortName}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] font-medium tracking-wider text-oak-accent/80 group-hover:text-oak-light transition-colors duration-300 uppercase mt-0.5">
                Wood Carving & Jali Cutting Works
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-oak-light group-hover:bg-oak-accent transition-colors duration-300 mt-2 ml-1" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-xs tracking-wider uppercase font-semibold transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded px-2 py-1 ${
                    isActive 
                      ? 'text-oak-dark underline decoration-oak-light decoration-2 underline-offset-4' 
                      : 'text-oak-accent/70 hover:text-oak-dark'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-sans text-xs tracking-wider uppercase font-semibold text-oak-accent/70 hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded px-2 py-1 cursor-pointer"
            >
              Contact
            </button>

            {/* Theme Toggle icon */}
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-oak-accent/60 hover:bg-warm-cream/40 hover:text-oak-dark transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-oak-light"
              title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-oak-accent/60 outline-none focus-visible:ring-1 focus-visible:ring-oak-light cursor-pointer"
              title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-oak-accent/80 hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-warm-white/95 backdrop-blur-md shadow-premium-card border-b border-warm-beige/35 py-6 px-6 space-y-4 flex flex-col z-30">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-sm tracking-wider uppercase font-semibold py-2 border-b border-warm-beige/10 ${
                    isActive ? 'text-oak-dark pl-2 border-l-2 border-oak-light' : 'text-oak-accent/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="font-sans text-sm tracking-wider uppercase font-semibold text-left py-2 text-oak-accent/70 cursor-pointer"
            >
              Contact Details
            </button>
          </div>
        )}
      </header>

      {/* Drawer */}
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;
