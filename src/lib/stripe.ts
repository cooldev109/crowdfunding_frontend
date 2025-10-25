import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance
 * Loads Stripe.js with your publishable key
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('❌ Missing VITE_STRIPE_PUBLISHABLE_KEY in .env file');
      console.error('Please add: VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...');
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};
