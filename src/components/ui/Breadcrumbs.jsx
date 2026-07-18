import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ paths = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs md:text-sm text-oak-accent/70 font-sans font-light select-none py-2" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center hover:text-oak-dark transition-colors outline-none focus-visible:ring-1 focus-visible:ring-oak-light"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-oak-accent/50" />
        <span className="hover:underline">Home</span>
      </Link>
      
      {paths.map((path, idx) => {
        const isLast = idx === paths.length - 1;
        return (
          <div key={idx} className="flex items-center space-x-2 min-w-0">
            <ChevronRight className="w-3 h-3 text-oak-light/50 flex-shrink-0" />
            {isLast ? (
              <span className="text-matte-black font-medium truncate max-w-[120px] md:max-w-[200px]" aria-current="page">
                {path.name}
              </span>
            ) : (
              <Link
                to={path.url}
                className="hover:text-oak-dark transition-colors truncate max-w-[120px] md:max-w-[200px] hover:underline outline-none focus-visible:ring-1 focus-visible:ring-oak-light"
              >
                {path.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
