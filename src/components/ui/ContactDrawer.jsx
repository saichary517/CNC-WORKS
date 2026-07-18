import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { RippleButton } from './RippleButton';

export const ContactDrawer = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your enquiry. We will contact you shortly.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-warm-cream border-l border-warm-beige/40 shadow-premium-hover p-8 flex flex-col justify-between overflow-y-auto"
          >
            {/* Upper Content */}
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-warm-beige/25">
                <h3 className="text-2xl font-serif text-matte-black font-semibold">
                  Contact Details
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-oak-accent/60 hover:bg-warm-beige/40 hover:text-oak-dark transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-oak-light"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info Block */}
              <div className="space-y-5 py-8">
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-warm-beige/20 border border-warm-beige/40 flex items-center justify-center text-oak-light flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-sans font-bold uppercase tracking-wider text-oak-accent/50">Phone</h5>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-sans text-matte-black hover:text-oak-light transition-colors block mt-0.5">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-warm-beige/20 border border-warm-beige/40 flex items-center justify-center text-oak-light flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-sans font-bold uppercase tracking-wider text-oak-accent/50">Email</h5>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-sans text-matte-black hover:text-oak-light transition-colors block mt-0.5">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-warm-beige/20 border border-warm-beige/40 flex items-center justify-center text-oak-light flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="w-full">
                    <h5 className="text-[11px] font-sans font-bold uppercase tracking-wider text-oak-accent/50">Studio Address</h5>
                    <p className="text-xs font-sans text-oak-accent/80 leading-relaxed block mt-0.5">
                      {siteConfig.address}
                    </p>
                    {/* Embedded Google Map */}
                    {siteConfig.mapIframeUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-warm-beige/30 shadow-sm w-full h-[180px]">
                        <iframe
                          src={siteConfig.mapIframeUrl}
                          className="w-full h-full"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          title="Google Maps Location"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-warm-beige/25">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-oak-accent">
                  Send a Direct Message
                </h4>
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full h-10 px-3 rounded-lg border border-warm-beige/60 bg-warm-softWhite text-sm text-matte-black placeholder-oak-accent/40 outline-none focus:border-oak-light transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full h-10 px-3 rounded-lg border border-warm-beige/60 bg-warm-softWhite text-sm text-matte-black placeholder-oak-accent/40 outline-none focus:border-oak-light transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-3 rounded-lg border border-warm-beige/60 bg-warm-softWhite text-sm text-matte-black placeholder-oak-accent/40 outline-none focus:border-oak-light transition-colors resize-none"
                  />
                </div>

                <RippleButton
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-oak-accent hover:bg-oak-dark text-white font-sans text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </RippleButton>
              </form>
            </div>

            {/* Brand Footer */}
            <div className="text-center text-[10px] text-oak-accent/40 select-none pt-6 border-t border-warm-beige/10">
              {siteConfig.name} &copy; {new Date().getFullYear()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactDrawer;
