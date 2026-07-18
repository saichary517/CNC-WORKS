import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, ExternalLink } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { RippleButton } from '../ui/RippleButton';

export const PdfCard = ({ pdf, folderName, index }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/folder/${encodeURIComponent(folderName)}/pdf/${encodeURIComponent(pdf.name)}`);
  };

  const handlePreview = () => {
    // Open in reader view mode (or preview route variant)
    navigate(`/folder/${encodeURIComponent(folderName)}/pdf/${encodeURIComponent(pdf.name)}?mode=preview`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <GlowCard className="h-full flex flex-col justify-between group bg-warm-softWhite/95 border border-warm-beige/30">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-warm-cream flex items-center justify-center border border-warm-beige group-hover:bg-oak-light/10 group-hover:border-oak-light/35 transition-all duration-300 shadow-sm flex-shrink-0">
            <FileText className="w-5 h-5 text-oak-accent group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="min-w-0 flex-grow">
            <h4 className="text-sm font-sans font-medium text-matte-black group-hover:text-oak-dark transition-colors duration-300 truncate" title={pdf.displayName}>
              {pdf.displayName}
            </h4>
            <p className="text-[11px] font-sans font-light text-oak-accent/50 mt-0.5">
              {pdf.sizeFormatted}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-5 pt-3.5 border-t border-warm-beige/25">
          <RippleButton
            onClick={handlePreview}
            className="flex-1 py-1.5 px-2.5 rounded-lg border border-warm-beige hover:border-oak-light text-[10px] tracking-wider text-oak-accent font-sans uppercase hover:bg-warm-cream/30 transition-all font-semibold"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5 inline" />
            <span>Preview</span>
          </RippleButton>
          
          <MagneticButton className="flex-1">
            <RippleButton
              onClick={handleOpen}
              className="w-full py-1.5 px-2.5 rounded-lg bg-oak-accent text-[10px] tracking-wider text-white font-sans uppercase hover:bg-oak-dark transition-all font-semibold shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 inline" />
              <span>Open</span>
            </RippleButton>
          </MagneticButton>
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default PdfCard;
