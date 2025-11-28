import React from 'react';
import GoogleReviewsCarousel from './GoogleReviewsCarousel';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* ============================= */}
        {/* HEADER TEXT */}
        {/* ============================= */}
        <h2 className="about-heading">About ADM Travels</h2>
        <div className="gold-divider"></div>
        <p className="about-subheading">
          Your trusted partner for unforgettable Cape Town experiences
        </p>

        {/* ============================= */}
        {/* ABOUT INTRO TEXT WITH VIDEO BACKGROUND */}
        {/* ============================= */}
        <div className="about-text-video-wrapper">
          {/* Background Video */}
          <video 
            className="about-background-video" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            {/* Placeholder: Replace with your video at /videos/about-bg.mp4 */}
            <source src="/paraGlide.mp4" type="video/mp4" />
            {/* When you add your video, change to: <source src="/videos/about-bg.mp4" type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better text readability */}
          <div className="about-video-overlay"></div>
          
          {/* Text Content */}
          <div className="about-text">
            <p className="about-paragraph">
              Welcome to <strong>ADM Travels</strong> — your Cape Town travel specialist dedicated to crafting
              breathtaking, personalized adventures. From scenic drives to Table Mountain's peak to tranquil
              wine tours and cultural journeys, we bring South Africa's Mother City to life.
            </p>
            <p className="about-paragraph">
              With deep local knowledge and years of experience, our mission is to turn your travels into
              lasting memories, built on authenticity, passion, and the spirit of discovery.
            </p>
          </div>
        </div>

        {/* ============================= */}
        {/* HERO IMAGE SHOWCASE */}
        {/* ============================= */}
        <div className="about-image-wrapper fade-in">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
            alt="Cape Town coastal view"
            loading="lazy"
            className="about-hero-image"
          />
        </div>

        {/* ============================= */}
        {/* TESTIMONIALS & REVIEWS */}
        {/* ============================= */}
        <div className="reviews-section">
          <h3 className="reviews-heading">What Our Travelers Say</h3>
          
          {/* GOOGLE REVIEWS CAROUSEL */}
          <GoogleReviewsCarousel />

          {/* TRIPADVISOR REVIEWS */}
          <div className="tripadvisor-section">
            <div className="review-card tripadvisor-review fade-in">
              <div className="review-header">
                <img
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                  alt="TripAdvisor Reviews"
                  loading="lazy"
                  className="review-logo"
                />
                <div className="review-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              <blockquote className="review-text">
                "Exceptional service and unforgettable experiences! ADM Travels provided us with an amazing tour of Cape Town. The attention to detail, professionalism, and local knowledge made our trip truly special. Highly recommended for anyone looking to explore the beauty of Cape Town!"
              </blockquote>
              <div className="review-footer">
                <span className="review-author">— Verified TripAdvisor Reviewer</span>
                <a
                  href="https://www.tripadvisor.com/ShowUserReviews-g312659-d33309520-r1036528445-ADM_TRAVELS-Cape_Town_Central_Western_Cape.html?m=19905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-link"
                >
                  Read Full Review →
                </a>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="review-cta">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g312659-d33309520-Reviews-ADM_TRAVELS-Cape_Town_Central_Western_Cape.html"
              target="_blank"
              rel="noopener noreferrer"
              className="review-button"
            >
              View TripAdvisor Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
