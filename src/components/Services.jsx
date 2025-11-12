import React, { useEffect, useState } from 'react';
import '../styles/Services.css';

const Services = () => {
  const services = [
    'Custom Tour Planning',
    'Group Bookings',
    'Airport Transfers',
    'Hotel & Lodge Reservations',
    'Guided Local Tours',
    'Private Chauffeur Services',
    'Adventure & Water Sports Packages',
    'Safari Day Trips from Cape Town',
    'Tea & Chocolate Tasting Arrangements',
    'City and Cultural Tours'
  ];

  const [videoSrc, setVideoSrc] = useState('/small.mp4');

  useEffect(() => {
    const chooseSrc = () => {
      if (window.innerWidth <= 768) {
        setVideoSrc('/small.mp4');
      } else {
        setVideoSrc('/service-bg.mp4');
      }
    };

    chooseSrc();
    window.addEventListener('resize', chooseSrc);
    return () => window.removeEventListener('resize', chooseSrc);
  }, []);

  return (
    <section id="services" className="services-section services-bg-fallback">
      <video className="services-video" autoPlay loop muted playsInline preload="metadata" poster="/logo.png">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="services-overlay"></div>
      <div className="services-container">
        <h2 className="services-heading">Our Services</h2>
        <p className="services-subheading">
          Comprehensive travel solutions tailored to your needs
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-item fade-in">
              <div className="service-checkmark">✓</div>
              <p className="service-text">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
