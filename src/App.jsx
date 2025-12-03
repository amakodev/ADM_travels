import './App.css';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ScrollToTop from './components/ScrollToTop';
// Lazy load route components for code splitting
const Home = React.lazy(() => import('./components/Home'));
const Tours = React.lazy(() => import('./components/Tours'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Terms = React.lazy(() => import('./components/Terms'));
const Privacy = React.lazy(() => import('./components/Privacy'));
const PaymentStatus = React.lazy(() => import('./components/PaymentStatus'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh' 
  }}>
    <div>Loading...</div>
  </div>
);

const App = () => {
  // Add a global scroll restoration handler
  useEffect(() => {
    // Reset scroll position when the app loads
    window.history.scrollRestoration = 'manual';
    
    // Cleanup function
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  return (
    <CurrencyProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
      <div className="app">
        {/* Navbar rendered outside Routes to appear on all pages */}
        <Navbar />
        
        {/* Main content area with scroll restoration */}
        <main className="min-h-[calc(100vh-64px)]">
          <ScrollToTop>
            {/* Routes - each page is separate with lazy loading */}
            <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/payment/success" element={<PaymentStatus type="success" />} />
            <Route path="/payment/cancelled" element={<PaymentStatus type="cancelled" />} />
            <Route path="/payment/failed" element={<PaymentStatus type="failed" />} />
            </Routes>
          </Suspense>
          </ScrollToTop>
        </main>
        
        {/* Footer rendered outside Routes to appear on all pages */}
        <Footer />
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </Router>
    </CurrencyProvider>
  );
};

export default App;
