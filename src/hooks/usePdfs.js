import { useState, useEffect, useCallback } from 'react';

export const usePdfs = (folderName) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPdfs = useCallback(async () => {
    if (!folderName) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/folders/${encodeURIComponent(folderName)}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Folder not found on server');
        }
        throw new Error(`Failed to fetch PDFs: ${response.statusText}`);
      }
      const data = await response.json();
      setPdfs(data.pdfs || []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching PDFs for folder ${folderName}:`, err);
      setError(err.message || 'Something went wrong while scanning files.');
    } finally {
      setLoading(false);
    }
  }, [folderName]);

  useEffect(() => {
    fetchPdfs();

    // Refetch on window focus
    const handleFocus = () => {
      fetchPdfs();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchPdfs, folderName]);

  return { pdfs, loading, error, refetch: fetchPdfs };
};
