import React from 'react';
import '../styles/Terms.css';

const Terms = () => {
  return (
    <section className="terms-section">
      <div className="terms-container">
        <h1 className="terms-heading">Terms and Conditions</h1>
        <div className="gold-divider"></div>
        <p className="terms-last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="terms-content">
          <section className="terms-section-item">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using ADM Travels website (https://admtravelssa.com) and booking our services, 
              you accept and agree to be bound by the terms and provision of this agreement. If you do not 
              agree to these Terms and Conditions, please do not use our services.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>2. Services</h2>
            <p>
              ADM Travels provides travel and tour services in Cape Town, South Africa, including but not 
              limited to:
            </p>
            <ul>
              <li>City tours and sightseeing</li>
              <li>Table Mountain tours</li>
              <li>Robben Island tours</li>
              <li>Wine tasting tours</li>
              <li>Safari tours</li>
              <li>Airport transfers</li>
              <li>Customized private tours</li>
            </ul>
          </section>

          <section className="terms-section-item">
            <h2>3. Booking and Payment</h2>
            <h3>3.1 Booking Process</h3>
            <p>
              All bookings are subject to availability. A booking is confirmed once payment has been 
              received and processed. You will receive a confirmation email with booking details.
            </p>

            <h3>3.2 Payment Methods</h3>
            <p>
              We accept payments through a secure online payment gateway (such as Yoco). By using our online 
              payment services, you agree to the terms and conditions of the payment provider. We do not store 
              your full payment card details on our servers. All payment information is processed securely 
              through the provider's encrypted payment gateway.
            </p>

            <h3>3.3 Pricing</h3>
            <p>
              All prices are displayed in South African Rand (ZAR) unless otherwise stated. Prices are 
              subject to change without notice, but confirmed bookings will be honored at the price agreed 
              at the time of booking.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>4. Cancellation and Refund Policy</h2>
            <h3>4.1 Cancellation by Customer</h3>
            <ul>
              <li><strong>More than 7 days before tour:</strong> Full refund minus 5% processing fee</li>
              <li><strong>3-7 days before tour:</strong> 50% refund</li>
              <li><strong>Less than 3 days before tour:</strong> No refund</li>
              <li><strong>No-show:</strong> No refund</li>
            </ul>

            <h3>4.2 Cancellation by ADM Travels</h3>
            <p>
              In the unlikely event that we need to cancel a tour due to circumstances beyond our control 
              (weather, safety concerns, etc.), you will receive a full refund or the option to reschedule 
              at no additional cost.
            </p>

            <h3>4.3 Refund Processing</h3>
            <p>
              Refunds will be processed through the original payment method used at checkout within 5-10 business 
              days after approval, subject to the policies of the payment provider.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>5. Customer Responsibilities</h2>
            <ul>
              <li>Provide accurate personal information during booking</li>
              <li>Arrive on time at designated meeting points</li>
              <li>Follow all safety instructions provided by tour guides</li>
              <li>Respect local customs and regulations</li>
              <li>Inform us of any medical conditions or special requirements in advance</li>
              <li>Carry valid identification documents</li>
            </ul>
          </section>

          <section className="terms-section-item">
            <h2>6. Liability and Insurance</h2>
            <h3>6.1 Limitation of Liability</h3>
            <p>
              ADM Travels acts as an intermediary between customers and service providers. We are not 
              liable for any loss, damage, injury, or death that may occur during tours, except where 
              such loss is directly caused by our negligence.
            </p>

            <h3>6.2 Travel Insurance</h3>
            <p>
              We strongly recommend that all customers obtain comprehensive travel insurance covering 
              medical expenses, personal accident, and trip cancellation before traveling.
            </p>

            <h3>6.3 Force Majeure</h3>
            <p>
              ADM Travels shall not be liable for any failure to perform obligations due to circumstances 
              beyond our reasonable control, including natural disasters, pandemics, government actions, 
              or other force majeure events.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of ADM Travels or its content suppliers and is protected by South African and 
              international copyright laws.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy 
              Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>9. Modifications to Terms</h2>
            <p>
              ADM Travels reserves the right to modify these Terms and Conditions at any time. Changes 
              will be effective immediately upon posting on our website. Continued use of our services 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of South Africa. Any disputes arising 
              from these terms or our services shall be subject to the exclusive jurisdiction of the 
              courts of Cape Town, South Africa.
            </p>
          </section>

          <section className="terms-section-item">
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="contact-info">
              <li><strong>Email:</strong> <a href="mailto:admtravels.sa@gmail.com">admtravels.sa@gmail.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+27630454587">+27 63 045 4587</a></li>
              <li><strong>Location:</strong> Cape Town, South Africa</li>
            </ul>
          </section>

          <div className="terms-disclaimer">
            <p>
              <strong>Legal Disclaimer:</strong> These Terms and Conditions are provided for informational 
              purposes. While we strive to ensure accuracy, this document does not constitute legal advice. 
              We recommend consulting with a legal professional to ensure compliance with all applicable 
              laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;

