import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';

export const PriceDisplay = ({ price, className = '' }) => {
  const { formatPrice } = useCurrency();

  // Handle non-numeric prices (like "Free" or "Custom Price")
  if (price === 0 || price === '0' || price === 'Free') {
    return <span className={className}>Free</span>;
  }

  if (!price || isNaN(Number(price))) {
    return <span className={className}>{price || 'Price on request'}</span>;
  }

  return <span className={className}>{formatPrice(Number(price))}</span>;
};

export default PriceDisplay;
