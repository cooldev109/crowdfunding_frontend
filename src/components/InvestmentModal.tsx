import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../lib/stripe';
import api from '../lib/api';
import StripePaymentForm from './StripePaymentForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { DollarSign, TrendingUp, Calendar, Loader2 } from 'lucide-react';

interface InvestmentModalProps {
  open: boolean;
  onClose: () => void;
  project: {
    _id: string;
    title: string;
    minInvestment: number;
    roiPercent: number;
    targetAmount: number;
    fundedAmount: number;
    durationMonths: number;
    status?: string;
  };
  onSuccess?: () => void;
}

export default function InvestmentModal({
  open,
  onClose,
  project,
  onSuccess,
}: InvestmentModalProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [amount, setAmount] = useState(project.minInvestment.toString());
  const [paymentMethod, setPaymentMethod] = useState<string>('stripe');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stripe payment state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [investmentId, setInvestmentId] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const investmentAmount = parseFloat(amount) || 0;
  const expectedReturn = investmentAmount + (investmentAmount * project.roiPercent) / 100;
  const remainingFunding = project.targetAmount - project.fundedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate authentication
    if (!user) {
      toast.error('Please login to invest');
      navigate('/login');
      return;
    }

    // Validate amount
    if (investmentAmount < project.minInvestment) {
      toast.error(`Minimum investment is ${formatCurrency(project.minInvestment)}`);
      return;
    }

    if (investmentAmount > remainingFunding) {
      toast.error(
        `Investment amount exceeds remaining target. Maximum: ${formatCurrency(remainingFunding)}`
      );
      return;
    }

    // Validate payment method
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/investments', {
        projectId: project._id,
        amount: investmentAmount,
        paymentMethod,
      });

      // If payment method is Stripe, show payment form
      if (paymentMethod === 'stripe') {
        const { investment, paymentIntent } = response.data.data;

        if (paymentIntent?.clientSecret) {
          setClientSecret(paymentIntent.clientSecret);
          setInvestmentId(investment._id);
          setShowPaymentForm(true);
          toast.info('Please complete the payment to confirm your investment');
        } else {
          throw new Error('No payment intent received from server');
        }
      } else {
        // For other payment methods (not implemented yet)
        toast.success('Investment created! Complete payment to confirm.');
        onClose();

        if (onSuccess) {
          onSuccess();
        }

        navigate('/my-investments');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Investment failed';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Your investment is confirmed.');
    setShowPaymentForm(false);
    setClientSecret(null);
    onClose();

    if (onSuccess) {
      onSuccess();
    }

    // Navigate to investments page
    setTimeout(() => {
      navigate('/my-investments');
    }, 1000);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setClientSecret(null);
    toast.info('Payment cancelled. You can try again.');
  };

  // Show Stripe payment form if client secret is available
  if (showPaymentForm && clientSecret) {
    const stripePromise = getStripe();

    if (!stripePromise) {
      toast.error('Stripe is not configured properly. Please contact support.');
      setShowPaymentForm(false);
      return null;
    }

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Investment</DialogTitle>
            <DialogDescription>
              Securely complete your payment to confirm your investment in {project.title}
            </DialogDescription>
          </DialogHeader>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#2563eb',
                  colorBackground: '#ffffff',
                  colorText: '#1f2937',
                  colorDanger: '#ef4444',
                  fontFamily: 'system-ui, sans-serif',
                  borderRadius: '8px',
                },
              },
            }}
          >
            <StripePaymentForm
              amount={investmentAmount}
              projectTitle={project.title}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    );
  }

  // Show investment details form (original modal)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invest in {project.title}</DialogTitle>
          <DialogDescription>
            Enter your investment amount and payment details
          </DialogDescription>
        </DialogHeader>

        {/* Funded Notice */}
        {project.status === 'funded' && (
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-purple-800 font-medium">
                  ✅ This project is fully funded
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  The funding target has been reached. No additional investments are accepted.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Investment Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min={project.minInvestment}
                max={remainingFunding}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                placeholder={project.minInvestment.toString()}
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              Min: {formatCurrency(project.minInvestment)} | Max: {formatCurrency(remainingFunding)}
            </p>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">
                  💳 Credit/Debit Card (Stripe) - Recommended
                </SelectItem>
                {/* Other payment methods coming soon */}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Secure payment processing powered by Stripe
            </p>
          </div>

          {/* Investment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm">Investment Summary</h4>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  Investment Amount
                </span>
                <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  ROI ({project.roiPercent}%)
                </span>
                <span className="font-semibold text-green-600">
                  +{formatCurrency((investmentAmount * project.roiPercent) / 100)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Duration
                </span>
                <span className="font-semibold">{project.durationMonths} months</span>
              </div>

              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold">Expected Return</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(expectedReturn)}
                </span>
              </div>
            </div>
          </div>

          {/* Terms Notice */}
          <p className="text-xs text-gray-500 leading-relaxed">
            By investing, you agree to our terms and conditions. All investments are subject to risk.
            You can cancel your investment within 24 hours of placement.
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Continue to Payment →`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
