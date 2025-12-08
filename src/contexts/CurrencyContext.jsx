import React, { createContext, useContext, useEffect, useState } from 'react';

const CURRENCY_STORAGE_KEY = 'currency_preferences';
const FX_RATE_CACHE_KEY = 'fx_rate_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('ZAR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved currency preference on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(FX_RATE_CACHE_KEY));
    
    // Use cached rate if it's still valid
    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
      setExchangeRate(cached.rate);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      //Requires Access  Key
      // const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=ZAR');
      // if (!response.ok) throw new Error('Failed to fetch exchange rate');
      
      // const data = await response.json();
      // const rate = data.rates.ZAR;
      
      // // Cache the new rate
      // localStorage.setItem(FX_RATE_CACHE_KEY, JSON.stringify({
      //   rate,
      //   timestamp: now
      // }));
      
      // setExchangeRate(rate);

      //SetDefault
      setExchangeRate(18.0);
      
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError('Failed to load exchange rates. Using default conversion.');
      // Use a safe default rate if API fails
      setExchangeRate(18.0);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCurrency = () => {
    const newCurrency = currency === 'ZAR' ? 'USD' : 'ZAR';
    setCurrency(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
  };

  const formatPrice = (zarAmount) => {
    if (currency === 'ZAR' || !exchangeRate) {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR'
      }).format(zarAmount);
    }

    const usdAmount = zarAmount / exchangeRate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usdAmount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        toggleCurrency,
        formatPrice,
        isLoading,
        error,
        exchangeRate
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
//too cool
