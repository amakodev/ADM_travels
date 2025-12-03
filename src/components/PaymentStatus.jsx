import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaymentStatus.css';

const statusConfig = {
  success: {
    title: 'Payment successful',
    description:
      'Thank you! Your payment was processed successfully. A confirmation email will arrive shortly.',
    actionLabel: 'Back to home',
    actionHref: '/',
  },
  cancelled: {
    title: 'Payment cancelled',
    description:
      'Looks like the checkout was cancelled. You can restart the payment at any time from the booking modal.',
    actionLabel: 'Browse tours',
    actionHref: '/tours',
  },
  failed: {
    title: 'Payment failed',
    description:
      'We could not complete the transaction. Please retry or contact support if the problem persists.',
    actionLabel: 'Try again',
    actionHref: '/contact',
  },
};

const PaymentStatus = ({ type = 'success' }) => {
  const config = statusConfig[type] || statusConfig.success;
  return (
    <div className="payment-status">
      <div className="payment-status__card">
        <h1>{config.title}</h1>
        <p>{config.description}</p>
        <Link to={config.actionHref} className="payment-status__action">
          {config.actionLabel}
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatus;
