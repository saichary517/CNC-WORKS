import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const WhatsappChatbot = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show the helper chat bubble after 4 seconds
    const dismissed = sessionStorage.getItem('whatsapp-bubble-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBubble(false);
    sessionStorage.setItem('whatsapp-bubble-dismissed', 'true');
  };

  const handleChatRedirect = () => {
    setShowBubble(false);
    window.open(siteConfig.contact.whatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none select-none font-sans">
      {/* Interactive Chatbot Greeting Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={handleChatRedirect}
            className="mb-3 max-w-[280px] sm:max-w-[320px] bg-warm-cream border border-warm-beige/50 rounded-2xl p-4 shadow-premium-card pointer-events-auto cursor-pointer hover:border-oak-light transition-all duration-300 relative group"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full text-oak-accent/40 hover:bg-warm-beige/30 hover:text-oak-dark transition-colors outline-none cursor-pointer"
              aria-label="Dismiss chat alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Content */}
            <div className="flex items-start space-x-3 pr-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5 animate-pulse">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h6 className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                  Sri Sai Maruti Support
                </h6>
                <p className="text-xs text-oak-accent/90 mt-1 leading-relaxed font-light">
                  Hi there! Looking for custom wood carving or jali cutting designs? Chat with us directly to send your inquiry!
                </p>
                <span className="inline-block mt-2 text-[10px] font-semibold text-oak-accent group-hover:text-oak-light underline transition-colors">
                  Start Chat Now
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={handleChatRedirect}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-premium-glow pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-warm-white relative group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle Ping/Pulse Outer Ring */}
        <span className="absolute -inset-1.5 rounded-full border-2 border-[#25D366]/30 animate-ping pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* WhatsApp Custom Outline Icon SVG */}
        <svg className="w-8 h-8 text-white fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Speech bubble outline */}
          <path 
            d="M12 21.98c-1.74 0-3.41-.45-4.89-1.3l-.35-.2-3.64.95.97-3.55-.22-.35A9.927 9.927 0 0 1 2.02 12c0-5.5 4.48-9.98 9.98-9.98 5.5 0 9.98 4.48 9.98 9.98s-4.48 9.98-9.98 9.98zm0-18.42c-4.65 0-8.44 3.79-8.44 8.44 0 1.63.47 3.22 1.35 4.6l.22.35-.57 2.1 2.15-.56.34.2a8.41 8.41 0 0 0 4.95 1.57c4.65 0 8.44-3.79 8.44-8.44s-3.79-8.44-8.44-8.44z" 
            fill="currentColor" 
          />
          {/* Phone receiver */}
          <path 
            d="M15.93 13.62c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.15.22-.58.72-.71.87-.13.15-.26.17-.48.06a6.066 6.066 0 0 1-1.8-1.11 6.69 6.69 0 0 1-1.25-1.55c-.13-.22-.01-.35.1-.46.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.69-1.65-.18-.44-.36-.38-.5-.39-.13 0-.28 0-.44 0-.15 0-.41.06-.63.28-.22.22-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.17-.06-.11-.22-.17-.44-.28z" 
            fill="currentColor" 
          />
        </svg>
      </button>
    </div>
  );
};

export default WhatsappChatbot;
