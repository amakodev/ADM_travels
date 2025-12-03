import React, { useState, useMemo } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  };

  // Validate form
  const validateForm = () => {
    const validationErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    // Validate email
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      validationErrors.email = 'Email address is required';
    } else {
      // Check for spaces
      if (/\s/.test(trimmedEmail)) {
        validationErrors.email = 'Email address cannot contain spaces';
      }
      // Validate email format
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        validationErrors.email = 'Please enter a valid email address';
      }
    }

    // Validate phone
    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone number is required';
    }

    // Validate tour selection
    if (!formData.tour.trim()) {
      validationErrors.tour = 'Please select a tour';
    }

    // Validate message
    if (!formData.message.trim()) {
      validationErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      validationErrors.message = 'Message must be at least 10 characters';
    }

    return validationErrors;
  };

  const validationErrors = useMemo(() => validateForm(), [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          tour: '',
          message: ''
        });
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error('❌ Error handling contact form:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">Book Your Adventure</h2>
        <p className="contact-subheading">
          Get in touch with us to plan your perfect Cape Town experience
        </p>
        
        <div className="contact-content">
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-message fade-in">
                <h3>Thank you! We'll get back to you shortly.</h3>
                <p>Your inquiry has been received and we'll contact you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitError && (
                  <div className="error-message-general">
                    {submitError}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => {
                      const validationErrors = validateForm();
                      setErrors({ ...errors, name: validationErrors.name || '' });
                    }}
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      // Remove spaces from email
                      const emailValue = e.target.value.replace(/\s/g, '');
                      setFormData({ ...formData, email: emailValue });
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    onBlur={() => {
                      const trimmedEmail = formData.email.trim();
                      if (trimmedEmail !== formData.email) {
                        setFormData({ ...formData, email: trimmedEmail });
                      }
                      const validationErrors = validateForm();
                      setErrors({ ...errors, email: validationErrors.email || '' });
                    }}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => {
                      const validationErrors = validateForm();
                      setErrors({ ...errors, phone: validationErrors.phone || '' });
                    }}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="tour">Select a Tour</label>
                  <select
                    id="tour"
                    name="tour"
                    value={formData.tour}
                    onChange={handleChange}
                    onBlur={() => {
                      const validationErrors = validateForm();
                      setErrors({ ...errors, tour: validationErrors.tour || '' });
                    }}
                    className={errors.tour ? 'error' : ''}
                    required
                  >
                    <option value="">Choose a tour...</option>
                    <option value="cape-point">Cape Point / Cape of Good Hope</option>
                    <option value="penguins">Penguins at Boulders Beach</option>
                    <option value="table-mountain">Table Mountain Cableway</option>
                    <option value="robben-island">Robben Island Tour</option>
                    <option value="wine-route">Stellenbosch Wine Route</option>
                    <option value="safari">Safari Day Trip</option>
                    <option value="helicopter">Helicopter Scenic Flight</option>
                    <option value="other">Other / Custom Tour</option>
                  </select>
                  {errors.tour && <span className="error-message">{errors.tour}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => {
                      const validationErrors = validateForm();
                      setErrors({ ...errors, message: validationErrors.message || '' });
                    }}
                    className={errors.message ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                  {formData.message && !errors.message && (
                    <span className="character-count">{formData.message.trim().length} characters</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <p>Cape Town, South Africa</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <p>+27 63 045 4587</p>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <p>admtravels.sa@gmail.com</p>
            </div>
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/admtravels.sa" className="social-link">Facebook</a>
                <a href="https://www.instagram.com/adm__travels" className="social-link">Instagram</a>
                <a href="https://www.tiktok.com/@adm.travels" className="social-link">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
