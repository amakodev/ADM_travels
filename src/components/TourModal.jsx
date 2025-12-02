import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import '../styles/TourModal.css';
import handlePayment from '../../yoco';

const TourModal = ({ tour, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+27', // Default to South Africa
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Payment / integrations configuration
  const yocoCheckoutEndpoint = import.meta.env.VITE_YOCO_CHECKOUT_ENDPOINT;
  const makeWebhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+27',
      });
      setSelectedDate(null);
      setGuests(1);
      setErrors({});
      setTurnstileToken(null);
      // Reset Turnstile widget
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    }
  }, [isOpen]);

  // Note: Yoco Checkout API must be called from a secure backend using your secret key.
  // The frontend calls a backend endpoint defined by VITE_YOCO_CHECKOUT_ENDPOINT.

  // Validation function that returns error object
  const validateForm = () => {
    const validationErrors = {};

    // Check name
    if (!formData.name.trim()) {
      validationErrors.name = 'Full name is required';
    }

    // Check email - more strict validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      validationErrors.email = 'Email address is required';
    } else {
      // Check for spaces (invalid in email)
      if (/\s/.test(trimmedEmail)) {
        validationErrors.email = 'Email address cannot contain spaces';
      }
      // Better email regex: must have valid format with no spaces
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        validationErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
      }
      // Additional check: must have at least one character before @, domain name, and TLD
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        validationErrors.email = 'Please enter a valid email address with proper domain format';
      }
    }

    // Check phone
    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone number is required';
    }

    // Check date
    if (!selectedDate) {
      validationErrors.date = 'Please select a date';
    }

    // Check guests - must be a number >= 1
    const guestsNum = Number(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || !Number.isInteger(guestsNum)) {
      validationErrors.guests = 'Guests must be a whole number greater than or equal to 1';
    }

    return validationErrors;
  };

  const validationErrors = useMemo(
    () => validateForm(),
    [formData, selectedDate, guests]
  );

  // Calculate price: Extract base price and multiply by number of guests
  // Use optional chaining to handle null tour
  const basePrice = Number(tour?.price?.toString().replace(/[^0-9.]/g, '') || 0);
  const totalPrice = basePrice * guests;
  const isFreeOrCustom =
    totalPrice === 0 ||
    /custom/i.test(String(tour?.price || '')) ||
    /free/i.test(String(tour?.price || ''));

  // Form is valid if no errors exist
  // Turnstile token is only required if Turnstile is configured
  const isFormValid = Object.keys(validationErrors).length === 0;
  
  // Format price for display (with currency symbol)
  const formatPrice = (amount) => {
    return ` $${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Send booking details to Make.com webhook
  const sendBookingToWebhook = useCallback(async (paymentReference) => {
    if (!makeWebhookUrl) {
      console.warn('⚠️ Make.com webhook URL not configured. Skipping webhook call.');
      return { success: false, error: 'Webhook URL not configured' };
    }

    const bookingData = {
      // Payment Information
      payment_reference: paymentReference,
      payment_status: 'successful',
      payment_currency: 'ZAR',
      payment_amount: totalPrice,
      payment_amount_cents: Math.round(totalPrice * 100),
      
      // Customer Information
      customer_name: formData.name.trim(),
      customer_email: formData.email.trim(),
      customer_phone: `${formData.countryCode}${formData.phone.trim()}`,
      customer_country_code: formData.countryCode,
      
      // Tour Information
      tour_id: tour?.id,
      tour_name: tour?.name,
      tour_category: tour?.category,
      tour_description: tour?.description,
      tour_base_price: basePrice,
      
      // Booking Details
      booking_date: selectedDate?.toISOString() || new Date().toISOString(),
      booking_date_formatted: selectedDate?.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      number_of_guests: guests,
      total_price: totalPrice,
      
      // Timestamps
      booking_timestamp: new Date().toISOString(),
      booking_timestamp_formatted: new Date().toLocaleString('en-US'),
      
      // Additional Metadata
      booking_source: 'ADM Travels Website',
      booking_platform: 'Web',
      
      // Security (only include if Turnstile is configured and token exists)
      ...(turnstileToken && { turnstile_token: turnstileToken }),
    };

    try {
      const response = await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json().catch(() => ({})); // Handle non-JSON responses
      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Error sending booking data to Make.com:', error);
      return { success: false, error: error.message };
    }
  }, [makeWebhookUrl, totalPrice, formData, tour, basePrice, selectedDate, guests]);

  // Start Yoco Checkout by calling a secure backend endpoint
  const handleYocoCheckout = useCallback(async () => {
    if (!isFormValid || isFreeOrCustom) return;

    if (!yocoCheckoutEndpoint) {
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Yoco payment is not configured. Please contact support.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await handlePayment(totalPrice);

      if (!data || !data.redirectUrl) {
        throw new Error('Missing redirectUrl from payment service.');
      }

      // Redirect browser to hosted Yoco checkout page
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.error('❌ Error creating Yoco checkout:', error);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'There was an error starting your secure payment. Please try again or contact support.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [isFormValid, isFreeOrCustom, yocoCheckoutEndpoint, totalPrice, tour, guests, formData, toast]);

  // Initialize Turnstile widget
  useEffect(() => {
    if (!isOpen || !tour || !turnstileSiteKey || !turnstileContainerRef.current) {
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
            toast({
              variant: 'destructive',
              title: 'CAPTCHA Error',
              description: 'There was an error loading the security verification. Please refresh the page.',
            });
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
  }, [isOpen, tour, turnstileSiteKey, toast]);

  // All payment UI is now driven by the Yoco checkout button below.

  // Early return after all hooks to maintain hook order
  if (!isOpen || !tour) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="tour-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>

            {/* Tour Image */}
            <div className="modal-image-wrapper">
              <img
                src={
                  tour.images?.[0] ||
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                }
                alt={tour.name}
                loading="lazy"
                className="modal-image"
              />
            </div>

            {/* Scrollable Content */}
            <div className="modal-content">
              <h2 className="modal-title">{tour.name}</h2>
              <p className="modal-description">{tour.description}</p>

              <div className="price-tags">
                <span className="price-badge">{tour.price} per person</span>
                <span className="category-badge">{tour.category}</span>
              </div>

              {/* Booking Section */}
              <div className="booking-section visible-booking">
                <h3>Reserve Your Spot</h3>

                {/* Personal Info */}
                <div className="booking-fields">
                  <div className="booking-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        // Clear error when user starts typing
                        if (errors.name) {
                          setErrors({ ...errors, name: '' });
                        }
                      }}
                      onBlur={() => {
                        const validationErrors = validateForm();
                        setErrors({ ...errors, name: validationErrors.name || '' });
                      }}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="booking-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        // Remove spaces from email input
                        const emailValue = e.target.value.replace(/\s/g, '');
                        setFormData({ ...formData, email: emailValue });
                        // Clear error when user starts typing
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                      onBlur={() => {
                        // Trim whitespace on blur
                        const trimmedEmail = formData.email.trim();
                        if (trimmedEmail !== formData.email) {
                          setFormData({ ...formData, email: trimmedEmail });
                        }
                        const validationErrors = validateForm();
                        setErrors({ ...errors, email: validationErrors.email || '' });
                      }}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="booking-field">
                    <label>Phone Number</label>
                    <div className="phone-input-wrapper">
                      <select
                        className="country-code-select"
                        value={formData.countryCode}
                        onChange={(e) =>
                          setFormData({ ...formData, countryCode: e.target.value })
                        }
                      >
                        <option value="+1">🇺🇸 +1 (US)</option>
                        <option value="+27">🇿🇦 +27 (South Africa)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+234">🇳🇬 +234 (Nigeria)</option>
                        <option value="+61">🇦🇺 +61 (Australia)</option>
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+49">🇩🇪 +49 (Germany)</option>
                        <option value="+33">🇫🇷 +33 (France)</option>
                        <option value="+81">🇯🇵 +81 (Japan)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                        <option value="+55">🇧🇷 +55 (Brazil)</option>
                        <option value="+254">🇰🇪 +254 (Kenya)</option>
                      </select>

                      <input
                        type="tel"
                        placeholder="123 456 7890"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          // Clear error when user starts typing
                          if (errors.phone) {
                            setErrors({ ...errors, phone: '' });
                          }
                        }}
                        onBlur={() => {
                          const validationErrors = validateForm();
                          setErrors({ ...errors, phone: validationErrors.phone || '' });
                        }}
                        className={errors.phone ? 'error' : ''}
                      />
                    </div>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                {/* Date & Guests */}
                <div className="booking-fields">
                  <div className="booking-field">
                    <label>Select Date</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        // Clear error when date is selected
                        if (errors.date) {
                          setErrors({ ...errors, date: '' });
                        }
                      }}
                      minDate={new Date()}
                      placeholderText="Choose your date"
                      className={`date-picker ${errors.date ? 'error' : ''}`}
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="booking-field">
                    <label>Guests</label>
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setGuests(value);
                        // Clear error when user starts typing
                        if (errors.guests) {
                          setErrors({ ...errors, guests: '' });
                        }
                      }}
                      onBlur={() => {
                        const validationErrors = validateForm();
                        setErrors({ ...errors, guests: validationErrors.guests || '' });
                      }}
                      className={`guest-input ${errors.guests ? 'error' : ''}`}
                    />
                    {errors.guests && <span className="error-message">{errors.guests}</span>}
                  </div>
                </div>

                <div className="booking-total">
                  <div className="price-breakdown">
                    <div className="price-line">
                      <span>Base Price (per person):</span>
                      <span>{formatPrice(basePrice)}</span>
                    </div>
                    <div className="price-line">
                      <span>Number of Guests:</span>
                      <span>{guests}</span>
                    </div>
                    <div className="price-line total-line">
                      <strong>Total Amount:</strong>
                      <strong>{formatPrice(totalPrice)}</strong>
                    </div>
                  </div>
                </div>

                {/* Cloudflare Turnstile CAPTCHA */}
                {false && !isFreeOrCustom && turnstileSiteKey && (
                  <div className="turnstile-container">
                    <div ref={turnstileContainerRef} id="turnstile-widget"></div>
                  </div>
                )}

                {/* Primary action: Yoco checkout for paid tours, Contact for free/custom */}
                {isFormValid && !isFreeOrCustom && (
                  <button
                    type="button"
                    className="payment-button"
                    onClick={handleYocoCheckout}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Starting secure payment...' : 'Pay Securely Online'}
                  </button>
                )}
                {isFormValid && isFreeOrCustom && (
                  <button
                    type="button"
                    className="payment-button"
                    onClick={() => {
                      onClose();
                      navigate('/contact');
                    }}
                  >
                    Send Inquiry
                  </button>
                )}
                {!isFormValid && !isFreeOrCustom && (
                  <div className="payment-helper">
                    <p>
                      {Object.keys(validationErrors).length > 0 
                        ? 'Please fill in all required fields to proceed with payment.'
                        : 'Please complete all steps to proceed with payment.'}
                    </p>
                  </div>
                )}
      </div>
    </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TourModal;
