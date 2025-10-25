import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Loader2, Lock, CreditCard } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  projectTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StripePaymentForm({
  amount,
  projectTitle,
  onSuccess,
  onCancel,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet. Please wait and try again.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/my-investments?payment=success`,
        },
      });

      if (error) {
        // Show error to customer
        setErrorMessage(error.message || 'Payment failed. Please try again.');

        if (error.type === 'card_error' || error.type === 'validation_error') {
          toast.error(error.message || 'Payment failed');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        toast.success('Payment successful! Your investment is confirmed.');
        onSuccess();
      } else {
        // Handle other payment intent statuses
        toast.info('Payment is being processed...');
        onSuccess();
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      toast.error(err.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Payment Summary Header - Compact */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600">Amount</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(amount)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Project</p>
            <p className="text-sm font-semibold text-gray-900 max-w-[180px] truncate">
              {projectTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="border border-gray-200 rounded-lg p-3 bg-white">
        <PaymentElement
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            },
            paymentMethodOrder: ['card'],
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Error: </span>
            {errorMessage}
          </p>
        </div>
      )}

      {/* Test Mode Notice (only in development) - Compact */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
          <p className="text-xs text-yellow-800 text-center">
            🧪 Test: <code className="bg-yellow-100 px-1.5 py-0.5 rounded">4242 4242 4242 4242</code>
          </p>
        </div>
      )}

      {/* Action Buttons - Sticky at bottom */}
      <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay {formatCurrency(amount)}
            </>
          )}
        </Button>
      </div>

      {/* Security Notice - Compact */}
      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 pb-2">
        <Lock className="h-3 w-3 text-green-600" />
        <span>Secure payment by Stripe</span>
      </div>
    </form>
  );
}
