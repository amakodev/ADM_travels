import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Button } from './button';

export const CurrencyToggle = () => {
  const { currency, toggleCurrency, isLoading, error } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={toggleCurrency}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <span className="font-medium">{currency}</span>
        <span className="text-muted-foreground text-xs">
          {isLoading ? '...' : currency === 'ZAR' ? '→ USD' : '→ ZAR'}
        </span>
      </Button>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      <p className="text-xs text-muted-foreground">
        All charges are processed in ZAR. USD values are estimates based on live exchange rates.
      </p>
    </div>
  );
};
