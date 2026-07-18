import { useState, useEffect } from 'react';

export const useMagnetic = (ref, strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = node.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Trigger radius: 80 pixels
      if (distance < 80) {
        // Linear scale factor that dampens displacement based on proximity
        const force = (80 - distance) / 80;
        setPosition({
          x: distanceX * strength * force,
          y: distanceY * strength * force,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (node) {
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [ref, strength]);

  return position;
};
