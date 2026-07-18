import { useState, useEffect, useCallback } from 'react';

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/folders');
      if (!response.ok) {
        throw new Error(`Failed to fetch folders: ${response.statusText}`);
      }
      const data = await response.json();
      setFolders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching folders:', err);
      setError(err.message || 'Something went wrong while scanning folders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();

    // Refetch on window focus to ensure filesystem sync
    const handleFocus = () => {
      fetchFolders();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchFolders]);

  return { folders, loading, error, refetch: fetchFolders };
};
