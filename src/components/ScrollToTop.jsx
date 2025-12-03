import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Using requestAnimationFrame for smoother scrolling
    const scrollToTop = () => {
      try {
        // Try the new scroll behavior API if available
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
      
      // Additional fallbacks for different browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // For mobile Safari
      const root = document.getElementById('root');
      if (root) root.scrollTop = 0;
    };

    // Small timeout to ensure the DOM is ready
    const timer = setTimeout(scrollToTop, 0);
    
    // Cleanup
    return () => clearTimeout(timer);
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;
