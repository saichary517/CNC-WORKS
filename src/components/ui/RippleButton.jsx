import React, { useState } from 'react';

export const RippleButton = ({ children, className = '', onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // Clean up ripple after animation completes
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
      onClick={createRipple}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center w-full h-full">{children}</span>
    </button>
  );
};

export default RippleButton;
