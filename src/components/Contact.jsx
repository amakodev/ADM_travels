import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  // Get webhook URL - use contact-specific or fallback to general webhook
  const contactWebhookUrl = import.meta.env.VITE_MAKE_CONTACT_WEBHOOK_URL || 
                           import.meta.env.VITE_MAKE_WEBHOOK_URL;
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

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

  // Initialize Turnstile widget
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current) {
      return;
    }

    // Wait for Turnstile to be available
    const checkTurnstile = setInterval(() => {
      if (window.turnstile && turnstileContainerRef.current) {
        clearInterval(checkTurnstile);
        
        // Remove any existing widget
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        }

        // Render Turnstile widget
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token) => {
            setTurnstileToken(token);
          },
          'error-callback': () => {
            setTurnstileToken(null);
          },
          'expired-callback': () => {
            setTurnstileToken(null);
          },
          theme: 'auto',
          size: 'normal',
        });
        
        turnstileWidgetIdRef.current = widgetId;
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey]);

  // Send contact form data to Make.com webhook
  const sendContactToWebhook = async () => {
    if (!contactWebhookUrl) {
      console.warn('⚠️ Make.com contact webhook URL not configured. Skipping webhook call.');
      return { success: false, error: 'Webhook URL not configured' };
    }

    const contactData = {
      // Contact Information
      contact_name: formData.name.trim(),
      contact_email: formData.email.trim(),
      contact_phone: formData.phone.trim(),
      
      // Inquiry Details
      inquiry_type: 'Contact Form',
      selected_tour: formData.tour,
      message: formData.message.trim(),
      message_length: formData.message.trim().length,
      
      // Timestamps
      inquiry_timestamp: new Date().toISOString(),
      inquiry_timestamp_formatted: new Date().toLocaleString('en-ZA'),
      inquiry_date: new Date().toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      
      // Additional Metadata
      contact_source: 'ADM Travels Website',
      contact_platform: 'Web',
      form_type: 'Contact Form',
      
      // Security (only include if Turnstile is configured and token exists)
      ...(turnstileToken && { turnstile_token: turnstileToken }),
    };

    try {
      const response = await fetch(contactWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json().catch(() => ({})); // Handle non-JSON responses
      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Error sending contact form data to Make.com:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check Turnstile token only if Turnstile is configured
    if (turnstileSiteKey && !turnstileToken) {
      setSubmitError('Please complete the security verification before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send to Make.com webhook
      const webhookResult = await sendContactToWebhook();
      
      if (webhookResult.success) {
        setSubmitted(true);
        // Reset form after successful submission
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
          setTurnstileToken(null);
          // Reset Turnstile widget
          if (turnstileWidgetIdRef.current && window.turnstile) {
            window.turnstile.reset(turnstileWidgetIdRef.current);
          }
        }, 3000);
      } else {
        // Show success to user even if webhook fails (don't block submission)
        console.warn('⚠️ Form submitted but webhook failed:', webhookResult.error);
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
          setTurnstileToken(null);
          // Reset Turnstile widget
          if (turnstileWidgetIdRef.current && window.turnstile) {
            window.turnstile.reset(turnstileWidgetIdRef.current);
          }
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Error submitting contact form:', error);
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

                {/* Cloudflare Turnstile CAPTCHA - Only show if configured */}
                {turnstileSiteKey && (
                  <div className="turnstile-container">
                    <div ref={turnstileContainerRef} id="turnstile-widget"></div>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting || (turnstileSiteKey && !turnstileToken)}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
                {turnstileSiteKey && !turnstileToken && Object.keys(validateForm()).length === 0 && (
                  <p className="turnstile-hint">Please complete the security verification above to submit your inquiry.</p>
                )}
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
