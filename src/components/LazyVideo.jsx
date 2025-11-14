import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/LazyVideo.css';

/**
 * LazyVideo Component
 * 
 * Features:
 * - Lazy loads videos only when visible in viewport
 * - Intersection Observer for visibility detection
 * - Placeholder before video loads
 * - Slide-in animation on mobile (max-width: 768px)
 * - No autoplay until visible
 * - Performance optimized with loading="lazy" and preload="metadata"
 * 
 * @param {string} videoId - Vimeo video ID
 * @param {string} title - Video title for accessibility
 * @param {string} poster - Optional poster image URL
 * @param {boolean} autoplay - Whether to autoplay when visible (default: true)
 * @param {boolean} loop - Whether to loop the video (default: true)
 * @param {boolean} muted - Whether video is muted (default: true)
 */
const LazyVideo = ({ 
  videoId, 
  title = "Video", 
  poster = null,
  autoplay = true,
  loop = true,
  muted = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Small delay before loading to ensure smooth experience
            setTimeout(() => {
              setShouldLoad(true);
            }, 100);
            // Stop observing once visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Build Vimeo URL with parameters
  const buildVimeoUrl = () => {
    const params = new URLSearchParams({
      badge: '0',
      autopause: '0',
      player_id: '0',
      app_id: '58479',
      autoplay: shouldLoad && isVisible && autoplay ? '1' : '0',
      muted: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      background: '1',
      controls: '0',
      loading: 'lazy',
      preload: 'metadata'
    });
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  };

  // Animation variants for mobile
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Animation variants for desktop (fade only)
  const desktopVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const animationVariants = isMobileView ? mobileVariants : desktopVariants;

  return (
    <div 
      ref={containerRef}
      className="lazy-video-container"
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      {/* Placeholder shown before video loads */}
      {!shouldLoad && (
        <div className="video-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-spinner"></div>
            <p className="placeholder-text">Loading video...</p>
          </div>
          {poster && (
            <img 
              src={poster} 
              alt={`${title} preview`}
              className="placeholder-poster"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Video embed - only loads when visible */}
      {shouldLoad && (
        <motion.div
          className="vimeo-embed-wrapper"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animationVariants}
          onAnimationComplete={() => setIsLoaded(true)}
          style={{ 
            padding: "56.25% 0 0 0", 
            position: "relative", 
            width: "100%", 
            height: 0,
            overflow: "hidden"
          }}
        >
          <iframe
            title={title}
            src={buildVimeoUrl()}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%",
              border: "none",
              borderRadius: "12px",
              objectFit: "cover"
            }}
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </motion.div>
      )}
    </div>
  );
};

export default LazyVideo;

