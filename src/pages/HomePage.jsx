import React, { useState, useMemo } from 'react';
import { useFolders } from '../hooks/useFolders';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/ui/SearchBar';
import { FolderCard } from '../components/cards/FolderCard';
import { SkeletonGrid } from '../components/ui/SkeletonLoader';
import { EmptyState } from '../components/ui/EmptyState';
import { FloatingBlobs } from '../components/ui/FloatingBlobs';
import { PageTransition } from '../components/layout/PageTransition';
import { motion } from 'framer-motion';

const LazyHeroScene = React.lazy(() => import('../components/three/HeroScene'));

export const HomePage = () => {
  const { folders, loading, error } = useFolders();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter folders by search query
  const searchedFolders = useSearch(folders, searchQuery, ['name']);

  // Extract categories dynamically from folders (e.g., 2d-Designs -> 2D, 3d-Designs -> 3D)
  const categories = useMemo(() => {
    if (!folders) return ['All'];
    const names = folders.map(f => {
      const match = f.name.match(/^(\d+[a-zA-Z]+|\w+)/);
      return match ? match[0].toUpperCase() : f.name;
    });
    return ['All', ...new Set(names)];
  }, [folders]);

  // Filter folders by category
  const filteredFolders = useMemo(() => {
    if (selectedCategory === 'All') return searchedFolders;
    return searchedFolders.filter(folder => {
      const match = folder.name.match(/^(\d+[a-zA-Z]+|\w+)/);
      const catName = match ? match[0].toUpperCase() : folder.name;
      return catName === selectedCategory;
    });
  }, [searchedFolders, selectedCategory]);

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20 overflow-hidden">
        <FloatingBlobs />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-left space-y-5 z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-sans font-bold tracking-[0.25em] text-oak-accent uppercase block"
            >
              Premium Architectural Catalog
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-matte-black leading-[1.12]"
            >
              Simplicity in <br />
              <span className="font-semibold text-oak-dark italic">Architectural</span> Design.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm font-sans font-light text-oak-accent/80 max-w-md leading-relaxed"
            >
              Browse and view high-quality 2D vector plans and 3D volume concepts directly in your browser. Auto-detects additions instantly.
            </motion.p>
          </div>
          
          {/* Lazy loaded 3D Canvas side */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <React.Suspense fallback={<div className="w-full h-[300px] bg-warm-cream/10 rounded-2xl animate-pulse" />}>
              <LazyHeroScene />
            </React.Suspense>
          </div>
        </section>

        {/* Navigation, Search and Filter Controls */}
        <section className="max-w-7xl mx-auto px-6 mb-10 space-y-5">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Categories Filter Pills */}
          {categories.length > 2 && (
            <div className="flex items-center justify-center space-x-2 overflow-x-auto py-1 scrollbar-none select-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1 rounded-full text-xs font-sans tracking-wide transition-all duration-300 outline-none border cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-oak-accent border-oak-accent text-white shadow-sm font-semibold'
                      : 'bg-warm-softWhite/70 border-warm-beige/40 text-oak-accent hover:border-oak-light hover:text-oak-dark'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Folders Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {loading ? (
            <SkeletonGrid type="folder" count={6} />
          ) : error ? (
            <div className="text-center py-10 border border-red-100 bg-red-50/20 rounded-2xl p-6">
              <p className="text-red-500 font-sans text-sm font-semibold">{error}</p>
            </div>
          ) : filteredFolders.length === 0 ? (
            <EmptyState 
              title="No Folders Found" 
              description={searchQuery ? "No folders match your search query." : "Drag some folders containing designs to public/pdfs/."} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFolders.map((folder, index) => (
                <FolderCard key={folder.name} folder={folder} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default HomePage;
