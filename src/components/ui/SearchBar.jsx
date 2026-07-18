import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = "Search folders or designs..." }) => {
  const inputRef = useRef(null);

  // Ctrl + K shortcut support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto z-10">
      <div className="relative flex items-center w-full h-12 rounded-full border border-warm-beige/70 bg-warm-white/60 backdrop-blur-md shadow-premium-card px-4 focus-within:border-oak-light focus-within:shadow-premium-glow transition-all duration-300">
        <Search className="w-5 h-5 text-oak-accent mr-3 select-none flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none text-matte-black placeholder-oak-accent/50 font-sans text-sm font-light"
        />
        {value ? (
          <button
            onClick={() => onChange("")}
            className="p-1 rounded-full text-oak-accent/60 hover:bg-warm-cream/50 hover:text-oak-accent transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <span className="hidden md:inline-flex items-center text-[10px] px-2 py-0.5 border border-warm-beige text-oak-accent/60 rounded bg-warm-cream/30 font-sans select-none flex-shrink-0">
            Ctrl+K
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
