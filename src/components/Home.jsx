import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <section id="home" className="home-section">
      {/* Background video */}
      <video className="home-video" autoPlay loop muted playsInline>
        <source src="/video-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gradient for cinematic depth */}
      <div className="home-overlay"></div>

      {/* Main content */}
      <div className="home-content fade-in">
        <h1 className="home-heading">
          Discover <span className="highlight">Cape Town</span> with{' '}
          <span className="brand">ADM Travels</span>
        </h1>

        <p className="home-subheading">
          Unforgettable experiences — tailored for you
        </p>

        <Link to="/tours" className="home-button">
          Explore Tours
        </Link>
      </div>

      {/* Scroll cue */}
      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Home;
