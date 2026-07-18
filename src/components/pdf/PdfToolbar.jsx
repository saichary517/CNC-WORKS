import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, Maximize, ArrowLeft } from 'lucide-react';
import { RippleButton } from '../ui/RippleButton';
import { MagneticButton } from '../ui/MagneticButton';

export const PdfToolbar = ({
  pageNumber,
  numPages,
  setPageNumber,
  scale,
  setScale,
  isFullscreen,
  toggleFullscreen,
  pdfName,
  onBack
}) => {
  return (
    <div className="sticky top-16 z-30 w-full bg-warm-white/90 backdrop-blur-md border-b border-warm-beige/35 py-3 px-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
      {/* Title & Back */}
      <div className="flex items-center space-x-2.5 min-w-0">
        <MagneticButton>
          <RippleButton
            onClick={onBack}
            className="p-2 rounded-full border border-warm-beige text-oak-accent hover:bg-warm-cream/40 hover:text-oak-dark transition-all shadow-sm"
            aria-label="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </RippleButton>
        </MagneticButton>
        <span className="font-sans font-semibold text-matte-black truncate text-xs md:text-sm pr-2" title={pdfName}>
          {pdfName}
        </span>
      </div>

      {/* Pages Controls */}
      <div className="flex items-center justify-center space-x-1 self-center">
        <RippleButton
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent disabled:opacity-40 disabled:pointer-events-none hover:bg-warm-cream/30 transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </RippleButton>
        
        <div className="flex items-center text-xs text-oak-accent font-sans">
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val >= 1 && val <= numPages) {
                setPageNumber(val);
              }
            }}
            className="w-9 text-center border border-warm-beige rounded bg-warm-softWhite py-0.5 mx-1 font-semibold text-matte-black focus:outline-none focus:border-oak-light"
          />
          <span className="opacity-70">/ {numPages || '--'}</span>
        </div>

        <RippleButton
          onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
          disabled={pageNumber >= (numPages || 1)}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent disabled:opacity-40 disabled:pointer-events-none hover:bg-warm-cream/30 transition-all"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </RippleButton>
      </div>

      {/* Zooms & Fullscreen Controls */}
      <div className="flex items-center justify-center sm:justify-end space-x-1.5">
        <RippleButton
          onClick={() => setScale(Math.max(0.5, scale - 0.25))}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent hover:bg-warm-cream/30 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </RippleButton>
        
        <span className="text-[10px] text-oak-accent font-sans w-10 text-center font-medium">
          {Math.round(scale * 100)}%
        </span>

        <RippleButton
          onClick={() => setScale(Math.min(2.5, scale + 0.25))}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent hover:bg-warm-cream/30 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </RippleButton>

        <RippleButton
          onClick={() => setScale(1.0)}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent hover:bg-warm-cream/30 transition-all"
          title="Fit Width"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </RippleButton>

        <div className="h-5 w-px bg-warm-beige/50 mx-1" />

        <RippleButton
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg border border-warm-beige text-oak-accent hover:bg-warm-cream/30 transition-all"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </RippleButton>
      </div>
    </div>
  );
};

export default PdfToolbar;
