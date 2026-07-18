import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { pdfjs, Document, Page } from 'react-pdf';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { PdfToolbar } from '../components/pdf/PdfToolbar';
import { ErrorCard } from '../components/ui/ErrorCard';
import { FloatingBlobs } from '../components/ui/FloatingBlobs';
import { PageTransition } from '../components/layout/PageTransition';

// Local worker script for react-pdf loading to prevent network issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const PdfViewerPage = () => {
  const { folderName, pdfName } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // preview or normal

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // Clear PDF path name for nice visual display
  const cleanedPdfName = pdfName.replace(/\.pdf$/i, '');

  const pdfUrl = `/api/folders/${encodeURIComponent(folderName)}` + 
                 `?file=${encodeURIComponent(pdfName)}`;
  
  // Real URL is actually served statically from the express file structure
  const fileUrl = `/pdfs/${encodeURIComponent(folderName)}/${encodeURIComponent(pdfName)}`;

  useEffect(() => {
    // Reset view settings when PDF changes
    setPageNumber(1);
    setError(null);
    setScale(mode === 'preview' ? 0.75 : 1.0);
  }, [pdfName, mode]);

  // Keep track of fullscreen changes (e.g. Escape key exit)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error('PDF Load Error:', err);
    setError('Failed to open PDF document. The file might be corrupted or missing.');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Fullscreen request failed:', err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleBack = () => {
    navigate(`/folder/${encodeURIComponent(folderName)}`);
  };

  const breadcrumbsPaths = [
    { name: folderName, url: `/folder/${encodeURIComponent(folderName)}` },
    { name: cleanedPdfName, url: `/folder/${encodeURIComponent(folderName)}/pdf/${encodeURIComponent(pdfName)}` }
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-16 flex flex-col overflow-hidden">
        <FloatingBlobs />

        {/* Top bar with Breadcrumbs */}
        <section className="max-w-7xl w-full mx-auto px-6 pt-3 flex items-center justify-between">
          <Breadcrumbs paths={breadcrumbsPaths} />
        </section>

        {/* Main Viewer Wrapper */}
        <div 
          ref={containerRef}
          className={`flex-grow flex flex-col w-full max-w-7xl mx-auto px-6 mt-4 relative ${
            isFullscreen ? 'bg-matte-black p-0 max-w-none' : ''
          }`}
        >
          {/* Toolbar */}
          <PdfToolbar
            pageNumber={pageNumber}
            numPages={numPages}
            setPageNumber={setPageNumber}
            scale={scale}
            setScale={setScale}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            pdfName={cleanedPdfName}
            onBack={handleBack}
          />

          {/* Canvas Display */}
          <div 
            ref={viewerRef}
            className={`flex-grow flex items-start justify-center overflow-auto py-8 rounded-b-2xl border-x border-b border-warm-beige/35 bg-warm-cream/10 min-h-[500px] transition-colors duration-300 ${
              isFullscreen ? 'bg-matte-black/95 border-none rounded-none py-12' : ''
            }`}
          >
            {error ? (
              <ErrorCard message={error} onRetry={() => setError(null)} />
            ) : (
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex flex-col items-center justify-center space-y-4 py-20 select-none">
                    <div className="w-10 h-10 border-4 border-oak-light border-t-oak-accent rounded-full animate-spin" />
                    <p className="text-xs font-sans font-light tracking-wide text-oak-accent/70">
                      Loading design layout...
                    </p>
                  </div>
                }
                className="shadow-premium-hover rounded-lg overflow-hidden border border-warm-beige/20 bg-white"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={
                    <div className="flex items-center justify-center p-20 select-none">
                      <div className="w-6 h-6 border-2 border-oak-light border-t-oak-accent rounded-full animate-spin" />
                    </div>
                  }
                  className="mx-auto"
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PdfViewerPage;
