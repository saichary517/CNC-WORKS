import React from 'react';

export const FloatingBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Blob 1 - Warm Sand */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8DFD0]/30 mix-blend-multiply filter blur-[80px] animate-blob"
        style={{ animationDelay: '0s', animationDuration: '24s' }}
      />
      {/* Blob 2 - Soft Oak/Gold */}
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#C4A882]/20 mix-blend-multiply filter blur-[100px] animate-blob"
        style={{ animationDelay: '4s', animationDuration: '28s' }}
      />
      {/* Blob 3 - Light Cream */}
      <div 
        className="absolute top-[40%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#F5F0E8]/45 mix-blend-multiply filter blur-[90px] animate-blob"
        style={{ animationDelay: '8s', animationDuration: '20s' }}
      />
    </div>
  );
};

export default FloatingBlobs;
