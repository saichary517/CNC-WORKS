import React from 'react';
import { Instagram, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer = () => {
  return (
    <footer className="border-t border-warm-beige/25 bg-warm-cream/10 py-6 mt-auto font-sans font-light select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side copyright */}
        <div className="text-[11px] text-oak-accent/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Premium architectural collections.
        </div>

        {/* Center contact info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] text-oak-accent/70">
          <a 
            href={`mailto:${siteConfig.contact.email}`} 
            className="flex items-center space-x-1.5 hover:text-oak-dark transition-colors outline-none focus-visible:underline"
          >
            <Mail className="w-3.5 h-3.5 text-oak-light" />
            <span>{siteConfig.contact.email}</span>
          </a>
          <span className="hidden sm:inline opacity-30">|</span>
          <a 
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} 
            className="flex items-center space-x-1.5 hover:text-oak-dark transition-colors outline-none focus-visible:underline"
          >
            <Phone className="w-3.5 h-3.5 text-oak-light" />
            <span>{siteConfig.contact.phone}</span>
          </a>
        </div>

        {/* Right side social icons */}
        <div className="flex items-center space-x-3">
          <a 
            href={siteConfig.social.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-1 text-oak-accent/60 hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href={siteConfig.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-1 text-oak-accent/60 hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={siteConfig.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-1 text-oak-accent/60 hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light rounded"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
