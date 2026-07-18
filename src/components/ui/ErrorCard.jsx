import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { RippleButton } from './RippleButton';

export const ErrorCard = ({ message = "Failed to load document", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 max-w-lg mx-auto w-full">
      <motion.div
        initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100 mb-6 shadow-premium-card"
      >
        <AlertCircle className="w-8 h-8 stroke-[1.5]" />
      </motion.div>
      
      <h3 className="text-xl font-serif text-matte-black mb-2">
        Something went wrong
      </h3>
      
      <p className="text-sm font-sans font-light text-oak-accent/80 mb-6 max-w-md leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <RippleButton
          onClick={onRetry}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-oak-accent text-oak-accent text-xs font-sans tracking-wider uppercase hover:bg-oak-accent hover:text-white transition-colors duration-300 shadow-premium-card"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </RippleButton>
      )}
    </div>
  );
};

export default ErrorCard;
