import React, { useState, lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tours, categoryLabels } from '../data/tours';
import '../styles/Tour.css';

// Lazy load TourModal since it includes heavy dependencies (framer-motion, react-datepicker, payment integrations)
const TourModal = lazy(() => import('./TourModal'));

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'nature', label: 'Nature' },
  { key: 'cultural', label: 'Cultural' },
  { key: 'city', label: 'City' },
  { key: 'tasting', label: 'Tasting' },
];

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isPageReady) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isPageReady]);

  const totalImages = tours.length;

  const filteredTours =
    activeFilter === 'all'
      ? tours
      : tours.filter((tour) => tour.category === activeFilter);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
  };
  const handleImageLoadedOrError = () => {
    setLoadedImageCount((prev) => {
      const next = prev + 1;
      if (next >= totalImages) {
        setIsPageReady(true);
      }
      return next;
    });
  };
  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <div className="tours-page">
      {!isPageReady && (
        <div className="tours-loading-screen">
          <div className="tours-loading-spinner" />
          <p className="tours-loading-text">Loading tours...</p>
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* ========================= */}
        {/* HEADER SECTION */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="page-heading">Explore Our Tours</h1>
          <div className="gold-divider"></div>
          <p className="page-subtext">
            Discover the beauty of Cape Town and South Africa with <span>ADM Travels</span>.
            Choose a category to browse our curated experiences.
          </p>
        </motion.div>

        {/* ========================= */}
        {/* CATEGORY OR TOUR SECTION */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="tour-filter-bar">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleFilterChange(filter.key)}
                className={
                  filter.key === activeFilter
                    ? 'tour-filter-button tour-filter-button--active'
                    : 'tour-filter-button'
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="tour-grid">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="tour-card"
              >
                <div className="tour-image">
                  <img
                    src={
                      tour.images?.[0] ||
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                    }
                    alt={tour.name}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
                      handleImageLoadedOrError();
                    }}
                    onLoad={handleImageLoadedOrError}
                  />
                </div>
                <div className="tour-info">
                  <span className="tour-category-tag">
                    {categoryLabels[tour.category] || 'Other'}
                  </span>
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>
                  <button
                    type="button"
                    className="tour-cta-button"
                    onClick={() => handleTourClick(tour)}
                  >
                    View Tour
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      

      {/* ========================= */}
      {/* TOUR MODAL */}
      {/* ========================= */}
      <Suspense fallback={null}>
        <TourModal tour={selectedTour} isOpen={isModalOpen} onClose={handleCloseModal} />
      </Suspense>
    </div>
  );
};

export default Tours;
