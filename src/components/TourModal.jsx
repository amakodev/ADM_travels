import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { PriceDisplay } from './ui/PriceDisplay';
import { useCurrency } from '../contexts/CurrencyContext';
import '../styles/TourModal.css';
import handlePayment from '../yoco';

const TourModal = ({ tour, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const { formatPrice: formatCurrency } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+27', // Default to South Africa
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    }
  }, [isOpen]);

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
  const isFormValid = Object.keys(validationErrors).length === 0;
  
  // Format price for display (with currency symbol)
  const formatPrice = useCallback(
    (amount) => formatCurrency(amount),
    [formatCurrency]
  );

  // Start Yoco Checkout by calling handlePayment helper
  const handleYocoCheckout = useCallback(async () => {
    if (!isFormValid || isFreeOrCustom) return;

    setIsSubmitting(true);
    try {
      const amountInCents = Math.round(totalPrice * 100);
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://admtravelssa.com';
      const checkout = await handlePayment({
        amount: amountInCents,
        currency: 'ZAR',
        cancelUrl: `${origin}/payment/cancelled`,
        successUrl: `${origin}/payment/success`,
        failureUrl: `${origin}/payment/failed`,
        metadata: {
          tourId: tour?.id,
          tourName: tour?.name,
          guests,
          selectedDate: selectedDate?.toISOString?.() || null,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: `${formData.countryCode} ${formData.phone}`.trim(),
        },
      });

      if (!checkout?.redirectUrl) {
        throw new Error('Secure checkout link unavailable.');
      }

      toast({
        title: 'Redirecting to Yoco',
        description: 'A secure Yoco window will open in a moment to finalize your booking.',
      });

      window.location.href = checkout.redirectUrl;
    } catch (error) {
      console.error('❌ Error creating Yoco checkout:', error);
      toast({
        variant: 'destructive',
        title: 'Unable to start payment',
        description:
          error?.message || 'There was an error starting your secure payment. Please try again or contact support.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData.email,
    formData.name,
    formData.phone,
    formData.countryCode,
    guests,
    isFormValid,
    isFreeOrCustom,
    selectedDate,
    toast,
    tour?.id,
    tour?.name,
    totalPrice,
  ]);

  // All payment UI is driven by the Yoco checkout button below.

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
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{tour.name}</h2>
              <div className="text-2xl font-bold text-primary">
                <PriceDisplay price={tour.price} />
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 block">per person</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 my-4">{tour.description}</p>

            <div className="mt-6 space-y-4">

              {/* Booking Section */}
              <div className="booking-section visible-booking">
                <h3>Reserve Your Experience</h3>

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
                      <PriceDisplay price={tour.price} />
                    </div>
                    <div className="flex items-center justify-between border-t pt-4 mt-4">
                      <span className="text-lg font-semibold">Total for {guests} {guests === 1 ? 'person' : 'people'}:</span>
                      <div className="text-xl font-bold text-primary">
                        <PriceDisplay price={tour.price * guests} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary action: Yoco checkout for paid tours, Contact for free/custom */}
                {isFormValid && !isFreeOrCustom && (
                  <>
                    <button
                      type="button"
                      className="payment-button"
                      onClick={handleYocoCheckout}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Preparing your secure checkout…' : 'Complete Secure Payment with Yoco'}
                    </button>
                    <div className="payment-assurance">
                      <p>
                        Encrypted payments are processed end-to-end by Yoco. You will receive an instant
                        confirmation once the booking is confirmed.
                      </p>
                    </div>
                  </>
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
                        ? 'Please complete the highlighted details so we can prepare your secure checkout.'
                        : 'Please complete all steps to proceed with payment.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};

export default TourModal;
