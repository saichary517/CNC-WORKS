import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FolderOpen } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';
import { motion } from 'framer-motion';

export const FolderCard = ({ folder, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="cursor-pointer h-full"
      onClick={() => navigate(`/folder/${encodeURIComponent(folder.name)}`)}
    >
      <GlowCard className="h-full flex flex-col justify-between group min-h-[170px] bg-gradient-to-br from-warm-cream/80 to-warm-beige/30">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-warm-softWhite flex items-center justify-center border border-warm-beige group-hover:bg-oak-light/10 group-hover:border-oak-light/30 transition-all duration-500 shadow-sm">
            <Folder className="w-6 h-6 text-oak-accent group-hover:hidden transition-transform duration-500" />
            <FolderOpen className="w-6 h-6 text-oak-dark hidden group-hover:block transition-transform duration-500" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-oak-accent/50 font-sans font-medium border border-warm-beige/50 px-2 py-0.5 rounded-full bg-warm-softWhite/50">
            Catalog
          </span>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-serif text-matte-black font-medium leading-snug group-hover:text-oak-dark transition-colors duration-300">
            {folder.name}
          </h3>
          <p className="text-xs font-sans font-light text-oak-accent/60 mt-1">
            {folder.pdfCount === 1 ? '1 Design' : `${folder.pdfCount} Designs`}
          </p>
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default FolderCard;
