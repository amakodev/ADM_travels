import React from 'react';
import '../styles/Privacy.css';

const Privacy = () => {
  return (
    <section className="privacy-section">
      <div className="privacy-container">
        <h1 className="privacy-heading">Privacy Policy</h1>
        <div className="gold-divider"></div>
        <p className="privacy-last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="privacy-content">
          <section className="privacy-section-item">
            <h2>1. Introduction</h2>
            <p>
              ADM Travels ("we," "our," or "us") is committed to protecting your privacy. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information when you visit 
              our website (https://admtravelssa.com) and use our services.
            </p>
            <p>
              By using our website and services, you consent to the data practices described in this policy.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Book a tour or service</li>
              <li>Contact us through our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Complete a feedback form</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Postal address</li>
              <li>Payment information (processed securely through our payment provider, such as Yoco)</li>
              <li>Tour preferences and special requirements</li>
              <li>Travel dates and itinerary details</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="privacy-section-item">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li><strong>Service Delivery:</strong> To process bookings, manage tours, and provide customer support</li>
              <li><strong>Communication:</strong> To send booking confirmations, updates, and respond to inquiries</li>
              <li><strong>Payment Processing:</strong> To process payments securely through our trusted payment provider</li>
              <li><strong>Improvement:</strong> To analyze website usage and improve our services</li>
              <li><strong>Marketing:</strong> To send promotional materials (with your consent) about tours and special offers</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              <li><strong>Safety:</strong> To ensure the safety and security of our tours and customers</li>
            </ul>
          </section>

          <section className="privacy-section-item">
            <h2>4. Payment Information and Online Payments</h2>
            <h3>4.1 Payment Processing</h3>
            <p>
              We use trusted third-party payment processors (such as Yoco) to handle online payments. When you make a payment:
            </p>
            <ul>
              <li>Your payment information is processed directly by our payment provider, not stored on our servers</li>
              <li>We only receive confirmation of payment and basic transaction details</li>
              <li>The payment provider handles all sensitive financial data according to their own Privacy Policy and security standards</li>
              <li>We do not have access to your full card numbers or payment account passwords</li>
            </ul>
            <h3>4.2 Third-Party Payment Provider Policies</h3>
            <p>
              By using our online payment services, you also agree to the privacy and security policies of our payment providers
              (for example, Yoco). We encourage you to review their privacy practices on their official websites.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>5. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
            
            <h3>5.1 Service Providers</h3>
            <p>We may share information with trusted third-party service providers who assist us in:</p>
            <ul>
              <li>Payment processing (for example, Yoco)</li>
              <li>Email delivery services</li>
              <li>Website hosting and analytics</li>
              <li>Tour operators and guides (only necessary information for tour delivery)</li>
            </ul>

            <h3>5.2 Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to valid requests by public authorities.</p>

            <h3>5.3 Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
          </section>

          <section className="privacy-section-item">
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
            <p>Our security measures include:</p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through reputable payment providers</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
          </section>

          <section className="privacy-section-item">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required or permitted by law. 
              Booking information is typically retained for 7 years for accounting and legal compliance purposes.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>8. Your Rights (GDPR Compliance)</h2>
            <p>If you are located in the European Economic Area (EEA), you have certain data protection rights:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request copies of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain circumstances</li>
              <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your personal data</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:admtravels.sa@gmail.com">admtravels.sa@gmail.com</a>.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>9. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store 
              certain information. Cookies are files with a small amount of data that may include an 
              anonymous unique identifier.
            </p>
            <p>Types of cookies we use:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices of these external sites. We encourage you to review the privacy policies of any 
              third-party sites you visit.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>11. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children. If you become aware that a child has provided us with 
              personal information, please contact us immediately.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>12. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on computers located outside of your 
              state, province, country, or other governmental jurisdiction where data protection laws may 
              differ. By using our services, you consent to the transfer of your information to South Africa 
              and other countries where we operate.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="privacy-section-item">
            <h2>14. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
            <ul className="contact-info">
              <li><strong>Email:</strong> <a href="mailto:admtravels.sa@gmail.com">admtravels.sa@gmail.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+27630454587">+27 63 045 4587</a></li>
              <li><strong>Location:</strong> Cape Town, South Africa</li>
              <li><strong>Website:</strong> <a href="https://admtravelssa.com">https://admtravelssa.com</a></li>
            </ul>
          </section>

          <div className="privacy-disclaimer">
            <p>
              <strong>Legal Disclaimer:</strong> This Privacy Policy is provided for informational purposes. 
              While we strive to ensure compliance with applicable data protection laws including POPIA 
              (Protection of Personal Information Act) in South Africa and GDPR for EU residents, this 
              document does not constitute legal advice. We recommend consulting with a legal professional 
              to ensure full compliance with all applicable privacy laws.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;

