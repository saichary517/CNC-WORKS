import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FolderPage from './pages/FolderPage';
import PdfViewerPage from './pages/PdfViewerPage';
import GiftArticlesPage from './pages/GiftArticlesPage';
import { WhatsappChatbot } from './components/ui/WhatsappChatbot';

// Scroll to top on navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated routes wrapper to support AnimatePresence exits
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/folder/:folderName" element={<FolderPage />} />
        <Route path="/folder/:folderName/pdf/:pdfName" element={<PdfViewerPage />} />
        <Route path="/gift-articles" element={<GiftArticlesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-warm-white relative">
        {/* Animated dark gradient background */}
        <div className="shining-bg" />
        
        <ScrollToTop />
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col w-full z-10">
          <AnimatedRoutes />
        </main>
        
        <Footer />
        
        {/* WhatsApp chatbot floating button */}
        <WhatsappChatbot />
      </div>
    </BrowserRouter>
  );
};

export default App;
