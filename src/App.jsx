import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

// Lazy load route components for code splitting
const Home = React.lazy(() => import('./components/Home'));
const Tours = React.lazy(() => import('./components/Tours'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));

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
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app">
        {/* Navbar rendered outside Routes to appear on all pages */}
        <Navbar />
        
        {/* Routes - each page is separate with lazy loading */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        
        {/* Footer rendered outside Routes to appear on all pages */}
        <Footer />
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
