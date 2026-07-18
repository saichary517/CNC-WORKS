import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';

export const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const position = useMagnetic(ref, 0.35);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.1 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
