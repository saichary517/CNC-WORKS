import React from 'react';
import { FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState = ({ title = "No Designs Available", description = "We couldn't find any designs in this folder." }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 max-w-md mx-auto w-full select-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-20 h-20 rounded-3xl bg-warm-cream flex items-center justify-center text-oak-accent border border-warm-beige mb-6 shadow-premium-card"
      >
        <FileQuestion className="w-10 h-10 stroke-[1.25]" />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl font-serif font-light text-matte-black mb-2"
      >
        {title}
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-sm font-sans font-light text-oak-accent/70 leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default EmptyState;
