import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePdfs } from '../hooks/usePdfs';
import { useSearch } from '../hooks/useSearch';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SearchBar } from '../components/ui/SearchBar';
import { PdfCard } from '../components/cards/PdfCard';
import { SkeletonGrid } from '../components/ui/SkeletonLoader';
import { EmptyState } from '../components/ui/EmptyState';
import { FloatingBlobs } from '../components/ui/FloatingBlobs';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowLeft } from 'lucide-react';
import { RippleButton } from '../components/ui/RippleButton';
import { MagneticButton } from '../components/ui/MagneticButton';
import { motion } from 'framer-motion';

export const FolderPage = () => {
  const { folderName } = useParams();
  const navigate = useNavigate();
  const { pdfs, loading, error } = usePdfs(folderName);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPdfs = useSearch(pdfs, searchQuery, ['displayName', 'name']);

  const breadcrumbsPaths = [
    { name: folderName, url: `/folder/${encodeURIComponent(folderName)}` }
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20 overflow-hidden">
        <FloatingBlobs />

        {/* Top bar with Breadcrumbs & Back */}
        <section className="max-w-7xl mx-auto px-6 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumbs paths={breadcrumbsPaths} />
          
          <MagneticButton>
            <RippleButton
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-warm-beige bg-warm-softWhite/80 text-oak-accent text-xs font-sans tracking-wide uppercase hover:bg-warm-cream/45 hover:text-oak-dark transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalogs</span>
            </RippleButton>
          </MagneticButton>
        </section>

        {/* Title Section */}
        <section className="max-w-7xl mx-auto px-6 pt-4 pb-6">
          <motion.h2 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-serif text-matte-black font-semibold"
          >
            {folderName}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-sans font-light text-oak-accent/50 mt-1"
          >
            {pdfs ? `${pdfs.length} design files available` : '--'}
          </motion.p>
        </section>

        {/* Search within this folder */}
        <section className="max-w-7xl mx-auto px-6 mb-8">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder={`Search designs inside ${folderName}...`} 
          />
        </section>

        {/* PDFs Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {loading ? (
            <SkeletonGrid type="pdf" count={6} />
          ) : error ? (
            <div className="text-center py-10 border border-red-100 bg-red-50/20 rounded-2xl p-6">
              <p className="text-red-500 font-sans text-sm font-semibold">{error}</p>
            </div>
          ) : filteredPdfs.length === 0 ? (
            <EmptyState 
              title="No Designs Found" 
              description={searchQuery ? "No designs match your search query." : "There are currently no PDFs in this folder."} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPdfs.map((pdf, index) => (
                <PdfCard 
                  key={pdf.name} 
                  pdf={pdf} 
                  folderName={folderName} 
                  index={index} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default FolderPage;
