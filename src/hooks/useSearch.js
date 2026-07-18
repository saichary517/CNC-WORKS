import { useMemo } from 'react';

export const useSearch = (items, query, keys = ['name']) => {
  return useMemo(() => {
    if (!items) return [];
    if (!query || !query.trim()) return items;

    const lowerQuery = query.toLowerCase().trim();
    
    return items.filter((item) => {
      return keys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  }, [items, query, keys]);
};
