/// <reference types="vite/client" />

interface Window {
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
  readonly VITE_YOCO_CHECKOUT_ENDPOINT: string;
  readonly VITE_MAKE_WEBHOOK_URL?: string;
  readonly VITE_TURNSTILE_SITE_KEY: string;
  readonly VITE_TURNSTILE_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
