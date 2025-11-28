import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/GoogleReviewsCarousel.css';

const reviews = [
    {
      id: 1,
      author: 'Fırathan Bakır',
      reviewCount: '1 review',
      timeAgo: '9 months ago',
      text: 'I have traveled to more than 50 countries and I can say without a doubt that Abdigani is by far the best tour guide I have ever seen in my life. You can easily understand that he does his job with passion. It would be amazing to visit even …More',
      likes: 1,
    },
    {
      id: 2,
      author: 'Louie-Zuta-Chong Family',
      badge: 'Local Guide',
      reviewCount: '14 reviews',
      photos: '34 photos',
      timeAgo: 'a year ago',
      text: 'If we could give a 100 stars, we would! As someone who loves to travel and has done many private tours, we highly recommend Abidigani. We had the pleasure of a chance meeting with Abidigani as our Uber driver. We …More',
    },
    {
      id: 3,
      author: 'RG Lewandowski',
      reviewCount: '1 review',
      timeAgo: 'a year ago',
      text: 'ADM Travels offers an exceptional travel experience with personalized service that truly stands out. From the first inquiry to the final leg of the journey, their team goes above and beyond to ensure every detail is perfect. With …More',
    },
    {
      id: 4,
      author: 'Amin Omar',
      reviewCount: '2 reviews',
      timeAgo: '9 months ago',
      text: 'Best company for tours thanks to Abdi G',
      likes: 1,
    },
    {
      id: 5,
      author: 'Mohammed Ibrahim',
      reviewCount: '1 review',
      timeAgo: 'a year ago',
      text: 'The best tour guy in cape town😍',
      likes: 1,
    },
    {
      id: 6,
      author: 'Dullah B',
      reviewCount: '2 reviews',
      timeAgo: 'a month ago',
      text: 'Excellent service and amazing tours! Highly recommended.',
    },
  ];

const GoogleReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  // Calculate how many cards to show based on screen width
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      // Desktop: show 3 cards, Tablet: show 2 cards, Mobile: show 1 card
      if (width >= 1024) {
        setCardsPerView(3);
      } else if (width >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Auto-rotate reviews every 5 seconds (only when in carousel mode)
  useEffect(() => {
    if (cardsPerView === 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [cardsPerView, reviews.length]);

  // Calculate visible reviews
  const getVisibleReviews = () => {
    if (cardsPerView >= reviews.length) {
      return reviews;
    }
    const visible = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();
  // Always show navigation when we have more reviews than cardsPerView
  const showNavigation = cardsPerView < reviews.length;

  return (
    <div className="google-reviews-carousel">
      <div className="carousel-header">
        <div className="header-left">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google"
            loading="lazy"
            className="google-logo"
          />
          <h3 className="carousel-title">Reviews</h3>
        </div>
        <a
          href="https://share.google/IYMrEGFt3jNH7Ns6u"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-button"
        >
          View All Reviews on Google →
        </a>
      </div>

      <div className="carousel-container">
        {showNavigation && (
          <button
            className="carousel-button carousel-button-prev"
            onClick={prevReview}
            aria-label="Previous review"
          >
            ‹
          </button>
        )}

        <div className={`carousel-content ${showNavigation ? 'carousel-mode' : 'grid-mode'}`}>
          {showNavigation ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="reviews-grid"
              >
                {visibleReviews.map((review, idx) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-rating">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>

                    <blockquote className="review-text">
                      "{review.text}"
                    </blockquote>

                    <div className="review-footer">
                      <div className="review-author-info">
                        <div className="author-name">{review.author}</div>
                        <div className="author-meta">
                          {review.badge && (
                            <span className="author-badge">{review.badge}</span>
                          )}
                          <span className="review-count">{review.reviewCount}</span>
                          {review.photos && (
                            <span className="photo-count">· {review.photos}</span>
                          )}
                        </div>
                        <div className="review-time">{review.timeAgo}</div>
                      </div>
                      {review.likes && (
                        <div className="review-likes">❤️ {review.likes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="review-card"
                >
                  <div className="review-header">
                    <div className="review-rating">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>

                  <blockquote className="review-text">
                    "{review.text}"
                  </blockquote>

                  <div className="review-footer">
                    <div className="review-author-info">
                      <div className="author-name">{review.author}</div>
                      <div className="author-meta">
                        {review.badge && (
                          <span className="author-badge">{review.badge}</span>
                        )}
                        <span className="review-count">{review.reviewCount}</span>
                        {review.photos && (
                          <span className="photo-count">· {review.photos}</span>
                        )}
                      </div>
                      <div className="review-time">{review.timeAgo}</div>
                    </div>
                    {review.likes && (
                      <div className="review-likes">❤️ {review.likes}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {showNavigation && (
          <button
            className="carousel-button carousel-button-next"
            onClick={nextReview}
            aria-label="Next review"
          >
            ›
          </button>
        )}
      </div>

      {showNavigation && (
        <div className="carousel-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToReview(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleReviewsCarousel;

