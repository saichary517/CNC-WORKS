import React from 'react';

// Single folder skeleton card
export const FolderSkeleton = () => {
  return (
    <div className="border border-warm-beige/30 bg-warm-cream/30 rounded-2xl p-6 shadow-premium-card animate-pulse">
      <div className="w-12 h-12 bg-warm-beige/50 rounded-xl mb-4" />
      <div className="w-2/3 h-5 bg-warm-beige/50 rounded-md mb-2" />
      <div className="w-1/3 h-4 bg-warm-beige/40 rounded-md" />
    </div>
  );
};

// Single PDF card skeleton
export const PdfSkeleton = () => {
  return (
    <div className="border border-warm-beige/30 bg-warm-cream/20 rounded-xl p-5 shadow-premium-card animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-warm-beige/50 rounded-lg flex-shrink-0" />
        <div className="flex-grow space-y-2">
          <div className="w-3/4 h-4 bg-warm-beige/50 rounded-md" />
          <div className="w-1/3 h-3 bg-warm-beige/40 rounded-md" />
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2 border-t border-warm-beige/20">
        <div className="flex-1 h-9 bg-warm-beige/40 rounded-lg" />
        <div className="flex-1 h-9 bg-warm-beige/40 rounded-lg" />
      </div>
    </div>
  );
};

// Layout container skeleton loader
export const SkeletonGrid = ({ type = 'folder', count = 6 }) => {
  const Skeletons = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Skeletons.map((_, idx) => (
        type === 'folder' ? <FolderSkeleton key={idx} /> : <PdfSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
