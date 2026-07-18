import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export const GlowCard = ({ children, className = '', ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-effect border border-warm-beige/40 bg-warm-softWhite/90 rounded-2xl p-6 shadow-premium-card hover:shadow-premium-hover transition-all duration-500 hover:border-oak-light/50 hover:-translate-y-2 overflow-hidden ${className}`}
      {...props}
    >
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
