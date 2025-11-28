/// <reference types="vite/client" />

// PayPal SDK Types
interface Window {
  paypal?: {
    Buttons: (options: {
      style?: {
        layout?: 'vertical' | 'horizontal';
        color?: 'blue' | 'gold' | 'silver' | 'white' | 'black';
        shape?: 'rect' | 'pill';
        label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment';
      };
      createOrder: (data: any, actions: any) => Promise<string>;
      onApprove: (data: any, actions: any) => Promise<void> | void;
      onCancel?: (data: any) => void;
      onError?: (err: any) => void;
    }) => {
      render: (container: HTMLElement) => void;
    };
  };
  turnstile?: {
    render: (container: HTMLElement | string, options: {
      sitekey: string;
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
      theme?: 'light' | 'dark' | 'auto';
      size?: 'normal' | 'compact';
    }) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId?: string) => void;
    getResponse: (widgetId?: string) => string | undefined;
  };
}

// Environment Variables
interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string;
  readonly VITE_MAKE_WEBHOOK_URL?: string;
  readonly PAYPAL_SECRET?: string;
  readonly VITE_TURNSTILE_SITE_KEY: string;
  readonly VITE_TURNSTILE_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
