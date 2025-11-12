import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* === Brand Section === */}
        <div className="footer-brand">
          <h3 className="footer-company">ADM Travels</h3>
          <p className="footer-slogan">
            Crafting Unforgettable Journeys Across South Africa
          </p>
        </div>

        {/* === Navigation Links === */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tours">Tours</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* === Contact Info === */}
        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>Email: <a href="mailto:admtravels.sa@gmail.com">admtravels.sa@gmail.com</a></p>
          <p>Phone: <a href="tel:+27630454587">+27 63 045 4587</a></p>
          <p>Cape Town, South Africa</p>
        </div>
      </div>

      {/* === Bottom Copyright === */}
      <div className="footer-bottom">
        <p>© {currentYear} ADM Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
